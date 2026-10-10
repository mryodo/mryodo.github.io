import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

export const config = { path: "/api/slack" };

const TZ = process.env.OFFICE_TZ || "Europe/Berlin";
const OFFICE = process.env.OFFICE_NAME || "CS";
// Only these Slack member IDs may use /desktest (comma-separated env var)
const TEST_ADMINS = (process.env.TEST_USER_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
// ---------- Slack signature check ----------
function verify(req, body) {
  const ts = req.headers.get("x-slack-request-timestamp");
  const sig = req.headers.get("x-slack-signature");
  if (!ts || !sig || Math.abs(Date.now() / 1000 - Number(ts)) > 300)
    return false;
  const mine =
    "v0=" +
    crypto
      .createHmac("sha256", process.env.SLACK_SIGNING_SECRET)
      .update(`v0:${ts}:${body}`)
      .digest("hex");
  return (
    sig.length === mine.length &&
    crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(mine))
  );
}

// ---------- Time helpers (office timezone) ----------
function localParts(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  return Object.fromEntries(parts.map((p) => [p.type, Number(p.value)]));
}
function localToUtc(y, m, d, h, min) {
  const guess = Date.UTC(y, m - 1, d, h, min);
  const l = localParts(new Date(guess));
  const asUtc = Date.UTC(
    l.year,
    l.month - 1,
    l.day,
    l.hour,
    l.minute,
    l.second,
  );
  return guess - (asUtc - guess);
}
// Accepts optional "HH:MM" and "YYYY-MM-DD" in any order. Default: today 23:59.
function parseDeadline(text) {
  const now = localParts(new Date());
  let time = null,
    date = null;
  for (const t of text.trim().split(/\s+/).filter(Boolean)) {
    if (/^\d{1,2}:\d{2}$/.test(t)) time = t;
    else if (/^\d{4}-\d{2}-\d{2}$/.test(t)) date = t;
    else return null; // unrecognised argument
  }
  let [y, m, d] = [now.year, now.month, now.day];
  if (date) [y, m, d] = date.split("-").map(Number);
  let [h, min] = [23, 59];
  if (time) [h, min] = time.split(":").map(Number);
  return localToUtc(y, m, d, h, min);
}
const fmt = (ms) =>
  `<!date^${Math.floor(ms / 1000)}^{date_short_pretty} {time}|${new Date(ms).toISOString()}>`;
const who = (r) => (r.testName ? `*${r.testName}* _(test)_` : `<@${r.userId}>`);

// ---------- Commands ----------
const HELP = `*Hot desk bot (${OFFICE})*
Your desk is tied to your Slack account, so there is nothing to set up.
- \`/check\`: see whose desks are free right now
- \`/mydeskisfree [HH:MM] [YYYY-MM-DD]\`: mark your desk free until the deadline (default: end of today)
- \`/mydeskisoccupied\`: take your desk back off the list
Examples: \`/mydeskisfree\`, \`/mydeskisfree 17:00\`, \`/mydeskisfree 2026-10-14\``;

export default async (req) => {
  if (req.method !== "POST") return new Response("ok");
  const body = await req.text();
  if (!verify(req, body)) return new Response("Bad signature", { status: 401 });

  const p = new URLSearchParams(body);
  const command = p.get("command");
  const text = p.get("text") || "";
  const userId = p.get("user_id");
  const store = getStore("desks");
  const reply = (t) => Response.json({ response_type: "ephemeral", text: t });
  const now = Date.now();

  if (command === "/help" || command === "/deskhelp") return reply(HELP);

  if (command === "/check") {
    const { blobs } = await store.list();
    const rows = [];
    for (const b of blobs) {
      const r = await store.get(b.key, { type: "json" });
      if (r?.freeUntil && r.freeUntil > now) rows.push(r);
      else await store.delete(b.key); // clean up expired / withdrawn entries
    }
    if (!rows.length) return reply(`No free hot desks in ${OFFICE} right now.`);
    rows.sort((a, b) => a.freeUntil - b.freeUntil);
    return reply(
      `*Free hot desks in ${OFFICE}:*\n` +
        rows
          .map((r) => `• <@${r.userId}>'s desk: free until ${fmt(r.freeUntil)}`)
          .join("\n"),
    );
  }

  if (command === "/mydeskisfree") {
    const until = parseDeadline(text);
    if (until === null)
      return reply(
        "I couldn't read that. Use `HH:MM` and/or `YYYY-MM-DD`, e.g. `/mydeskisfree 17:00`.",
      );
    if (until <= now) return reply("That deadline is already in the past.");
    await store.setJSON(userId, { userId, freeUntil: until });
    return reply(`Your desk is now listed as free until ${fmt(until)}.`);
  }

  if (command === "/mydeskisoccupied") {
    const existing = await store.get(userId, { type: "json" });
    if (!existing?.freeUntil || existing.freeUntil <= now)
      return reply("Your desk isn't currently listed as free.");
    await store.delete(userId);
    return reply("Your desk is removed from the free list. Welcome back!");
  }
  if (command === "/desktest") {
    if (!TEST_ADMINS.includes(userId))
      return reply(
        `/desktest is restricted. Your Slack member ID is \`${userId}\`; add it to the TEST_USER_IDS environment variable to enable it.`,
      );

    const [sub, rawName, ...rest] = text.trim().split(/\s+/);
    const usage =
      "Usage: `/desktest free <name> [HH:MM] [YYYY-MM-DD]`, `/desktest occupied <name>`, `/desktest clear`";

    if (sub === "clear") {
      const { blobs } = await store.list({ prefix: "test:" });
      await Promise.all(blobs.map((b) => store.delete(b.key)));
      return reply(
        `Removed ${blobs.length} test entr${blobs.length === 1 ? "y" : "ies"}.`,
      );
    }

    const name = (rawName || "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "")
      .slice(0, 30);
    if (!["free", "occupied"].includes(sub) || !name) return reply(usage);
    const key = `test:${name}`;

    if (sub === "free") {
      const until = parseDeadline(rest.join(" "));
      if (until === null)
        return reply(
          "I couldn't read that deadline. Use `HH:MM` and/or `YYYY-MM-DD`.",
        );
      if (until <= now) return reply("That deadline is already in the past.");
      await store.setJSON(key, { testName: name, freeUntil: until });
      return reply(
        `Test desk *${name}* is listed as free until ${fmt(until)}.`,
      );
    }

    await store.delete(key);
    return reply(`Test desk *${name}* removed from the free list.`);
  }
  return reply("Unknown command. Try `/help`.");
};
