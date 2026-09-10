import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Marker } from "@/components/ui/marker";
import { badgeVariant } from "@/lib/badge";

export function NewsItem({
  date,
  danger,
  html,
  links = [],
  children,
}: {
  date: string;
  danger?: boolean;
  html?: string;
  links?: ReadonlyArray<readonly [string, string]>;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col py-[0.5lh]">
      <div className="flex items-baseline gap-[1ch]">
        {danger ? (
          <Marker tone="danger" className="shrink-0" />
        ) : (
          <span aria-hidden className="w-[1ch] shrink-0 select-none" />
        )}
        <span className="w-[8ch] shrink-0 text-ascii-comment text-[10pt]">
          {date}
        </span>
        <span
          className="text-ascii-soft min-w-0 text-[11pt] leading-[1.2] [&_a]:text-foreground [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-2 [&_strong]:text-foreground"
          {...(html !== undefined
            ? { dangerouslySetInnerHTML: { __html: html } }
            : {})}
        >
          {html === undefined ? children : null}
        </span>
      </div>
      {links.length > 0 && (
        <div className="flex items-center justify-end gap-[1ch] pl-[11ch]">
          {links.map(([href, label]) => (
            <Badge
              key={`${href}-${label}`}
              variant={badgeVariant(href, label)}
              render={<a href={href} />}
              style={{ fontSize: "10pt" }}
            >
              {label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
