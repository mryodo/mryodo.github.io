import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function NewsGroup({
  label,
  labelClassName,
  count,
  defaultOpen,
  children,
}: {
  label: string;
  /** Extra classes for the label only (e.g. a highlight background). */
  labelClassName?: string;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group/news-group">
      <summary className="flex cursor-pointer list-none items-center gap-[1ch] select-none py-[0.25lh] text-left text-sm text-foreground outline-none hover:text-primary">
        <span aria-hidden className="shrink-0 text-primary select-none">
          <span className="group-open/news-group:hidden">&gt;</span>
          <span className="hidden group-open/news-group:inline">v</span>
        </span>
        <span className={cn(labelClassName)}>{label}</span>
        <span className="text-ascii-soft">· {count} updates</span>
      </summary>
      <div className="pt-[0.25lh] text-sm">{children}</div>
    </details>
  );
}

export { NewsGroup };