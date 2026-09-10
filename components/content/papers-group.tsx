import type { ReactNode } from "react";

function PapersGroup({
  year,
  count,
  defaultOpen,
  children,
}: {
  year: string;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group/papers-group">
      <summary className="flex cursor-pointer list-none items-center gap-[1ch] select-none text-left text-sm text-foreground outline-none hover:text-primary">
        <span aria-hidden className="shrink-0 text-primary select-none">
          <span className="group-open/papers-group:hidden">&gt;</span>
          <span className="hidden group-open/papers-group:inline">v</span>
        </span>
        <span className="uppercase tracking-[0.08em]">{year}</span>
        <span className="text-ascii-soft">· {count} papers</span>
      </summary>
      <div className="flex flex-col gap-[1lh] pt-[0.25lh] text-sm">
        {children}
      </div>
    </details>
  );
}

export { PapersGroup };