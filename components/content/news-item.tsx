import type { ReactNode } from "react";
import { Note } from "@/components/content/thread";
import { Badge } from "@/components/ui/badge";
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
    <Note stamp={date} tone={danger ? "danger" : "default"}>
      <div
        className="news-body text-ascii-soft min-w-0 text-[15px] leading-[1.35] [&_a]:text-foreground [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-2 [&_strong]:text-foreground"
        {...(html !== undefined
          ? { dangerouslySetInnerHTML: { __html: html } }
          : {})}
      >
        {html === undefined ? children : null}
      </div>
      {links.length > 0 && (
        <div className="-mt-[0.15lh] flex flex-wrap justify-end gap-[1ch]">
          {links.map(([href, label]) => (
            <Badge
              key={`${href}-${label}`}
              variant={badgeVariant(href, label)}
              render={<a href={href} />}
            >
              {label}
            </Badge>
          ))}
        </div>
      )}
    </Note>
  );
}
