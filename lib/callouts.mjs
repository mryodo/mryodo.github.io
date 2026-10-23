// Turns `> [!TYPE] optional title` blockquotes into callouts, as threader
// and markview read them: the blockquote gets class "callout" and
// data-callout="type", and its first line becomes a .callout-title
// paragraph (the title, or the type when none is given). A Sätteri mdast
// plugin, the processor Astro's Markdown and MDX run on.
import { defineMdastPlugin } from "satteri";

const marker = /^\[!(\w+)\][+-]?[ \t]*/;

export default defineMdastPlugin({
  name: "callouts",
  blockquote(node, ctx) {
    const [first, ...body] = node.children;
    const text = first?.type === "paragraph" ? first.children[0] : null;
    const m = text?.type === "text" && text.value.match(marker);
    if (!m) return;
    const type = m[1].toLowerCase();

    // the title is the rest of the marker line; the body starts after it
    const rest = text.value.slice(m[0].length);
    const nl = rest.indexOf("\n");
    const title = (nl < 0 ? rest : rest.slice(0, nl)).trim() || type;
    const after = nl < 0 ? "" : rest.slice(nl + 1);
    const inline = [...(after ? [{ type: "text", value: after }] : []), ...first.children.slice(1)];

    ctx.replaceNode(node, {
      type: "blockquote",
      data: { hProperties: { className: ["callout"], dataCallout: type } },
      children: [
        { type: "paragraph", data: { hProperties: { className: ["callout-title"] } }, children: [{ type: "text", value: title }] },
        ...(inline.length ? [{ type: "paragraph", children: inline }] : []),
        ...body,
      ],
    });
  },
});
