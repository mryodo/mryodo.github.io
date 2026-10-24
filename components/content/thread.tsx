import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Caps is threader's small tracked label. */
function Caps({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("text-[11px] font-semibold uppercase tracking-[0.14em]", className)}>
      {children}
    </span>
  );
}

/** Thread is threader's thread: a dark one-line title card that unfolds into the
 * notes hanging from a timeline below it. */
function Thread({
  title,
  count,
  noun,
  defaultOpen,
  children,
}: {
  title: string;
  count: number;
  /** What the notes are, singular: "update", "paper". */
  noun: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const n = `${count} ${noun}${count === 1 ? "" : "s"}`;
  return (
    <details open={defaultOpen} className="group/thread [&+details]:mt-[22px]">
      <summary className="flex cursor-pointer list-none items-center gap-[1.5ch] rounded-[var(--radius)] bg-[#303038] px-[22px] py-[14px] text-white shadow-[0_8px_28px_rgb(0_0_0/0.10)] select-none [&::-webkit-details-marker]:hidden">
        <Caps className="shrink-0 text-white/60">{"\uf0e5"} {n}</Caps>
        <span className="min-w-0 flex-1 truncate font-bold text-[var(--amber)]">{title}</span>
        <span className="shrink-0 rounded-full bg-white/15 px-[1.5ch] text-[13px] leading-[26px] transition-colors hover:bg-white/25">
          <span className="group-open/thread:hidden">Show</span>
          <span className="hidden group-open/thread:inline">Fold</span>
        </span>
      </summary>
      <div className="flex flex-col pt-[0.3lh]">{children}</div>
    </details>
  );
}

const dotClass = { default: "bg-[var(--bullet)]", primary: "bg-primary", danger: "bg-destructive", muted: "bg-ascii-comment" };
const stampClass = { default: "text-ascii-comment", primary: "text-primary", danger: "text-destructive", muted: "text-ascii-comment" };
/* journals sit on a light card, like the AsciiBox on the title page */
const bodyClass = { default: "hover:bg-primary/[0.06]", primary: "my-[0.2lh] border border-border bg-card text-card-foreground shadow-[0_8px_28px_rgb(0_0_0/0.10)]", danger: "hover:bg-primary/[0.06]", muted: "hover:bg-ascii-comment/[0.08]" };

/** Note is one post on a thread's timeline: the rail with its dot, a caps
 * stamp, then the body. Must be a direct child of Thread's note list so
 * the last one can cut the rail short. */
function Note({
  stamp,
  tone = "default",
  children,
}: {
  stamp: ReactNode;
  tone?: keyof typeof dotClass;
  children: ReactNode;
}) {
  return (
    <div className="group/note flex gap-[14px]">
      <div aria-hidden className="relative w-[22px] shrink-0">
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[var(--line)] group-first/note:-top-[0.3lh] group-last/note:bottom-auto group-last/note:h-[30px] group-first/note:group-last/note:h-[calc(30px+0.3lh)]" />
        <div
          className={cn(
            "absolute top-[18px] left-1/2 size-[11px] -translate-x-1/2 rounded-full ring-2 ring-background",
            dotClass[tone],
          )}
        />
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-[0.2lh] rounded-[16px] px-[14px] py-[10px] transition-colors",
          bodyClass[tone],
        )}
      >
        <Caps className={stampClass[tone]}>{stamp}</Caps>
        {children}
      </div>
    </div>
  );
}

export { Caps, Note, Thread };
