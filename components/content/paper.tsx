import { Badge } from "@/components/ui/badge";
import { Note } from "@/components/content/thread";
import { badgeVariant } from "@/lib/badge";

export interface PaperLink {
  label: string;
  href: string;
}

export interface PaperImage {
  src: string;
  alt?: string;
}

export function Paper({
  status,
  title,
  authors,
  venue,
  abstract,
  links = [],
  image,
}: {
  status: "preprint" | "journal";
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  links?: PaperLink[];
  image?: PaperImage;
}) {
  return (
    <Note stamp={status} tone={status === "journal" ? "primary" : "muted"}>
      {image && (
        <img
          src={image.src}
          alt={image.alt ?? ""}
          className="my-[0.3lh] block max-h-[36lh] w-auto rounded-[14px] object-contain"
        />
      )}
      <span className="font-bold text-foreground">{title}</span>
      <span className="text-sm text-ascii-soft">
        <span className="text-primary">{authors}</span>
        <br />
        <span className="italic">{venue}</span>
      </span>
      <details className="group/abstract flex flex-col">
        <summary className="flex cursor-pointer list-none items-center gap-[1ch] select-none text-left text-sm text-foreground outline-none hover:text-primary [&::-webkit-details-marker]:hidden">
          <span aria-hidden className="shrink-0 text-primary select-none">
            <span className="group-open/abstract:hidden">{"\uf054"}</span>
            <span className="hidden group-open/abstract:inline">{"\uf078"}</span>
          </span>
          abstract
        </summary>
        <div
          className="m-0 pt-[0.3lh] text-sm text-ascii-soft leading-[1.35]"
          dangerouslySetInnerHTML={{ __html: abstract }}
        />
      </details>
      {links.length > 0 && (
        <div className="-mt-[0.15lh] flex flex-wrap justify-end gap-[1ch]">
          {links.map((link) => (
            <Badge
              key={link.label}
              variant={badgeVariant(link.href, link.label)}
              render={<a href={link.href} />}
            >
              {link.label}
            </Badge>
          ))}
        </div>
      )}
    </Note>
  );
}
