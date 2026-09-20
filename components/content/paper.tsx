import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { badgeVariant } from "@/lib/badge";
import { cn } from "@/lib/utils";

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
    <Card fluid className="w-full" danger={status === "journal"}>
      <CardHeader>
        {image && (
          <img
            src={image.src}
            alt={image.alt ?? ""}
            className="mb-[1lh] block max-h-[36lh] w-auto rounded border border-primary/30 object-contain"
          />
        )}
        <CardTitle>
          <span
            className={cn(
              "uppercase tracking-[0.08em]",
              status === "journal" ? "text-ascii-primary" : "text-ascii-comment"
            )}
          >
            {status}
          </span>
          <span aria-hidden className="text-ascii-comment">
            {" \u00b7 "}
          </span>
          <span className="font-medium text-foreground">{title}</span>
        </CardTitle>
        <CardDescription>
          <span className="text-primary">{authors}</span>
          <br />
          <span className="italic">{venue}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <details className="group/abstract flex flex-col">
          <summary className="flex cursor-pointer list-none items-center gap-[1ch] select-none text-left text-sm text-foreground outline-none hover:text-primary">
            <span aria-hidden className="shrink-0 text-primary select-none">
              <span className="group-open/abstract:hidden">&gt;</span>
              <span className="hidden group-open/abstract:inline">v</span>
            </span>
            abstract
          </summary>
          <div
            className="m-0 pt-[0.5lh] text-sm text-ascii-soft leading-[1.2]"
            dangerouslySetInnerHTML={{ __html: abstract }}
          />
        </details>
      </CardContent>
      <CardFooter className="gap-[1ch]">
        {links.map((link) => (
          <Badge
            key={link.label}
            variant={badgeVariant(link.href, link.label)}
            render={<a href={link.href} />}
            className="hover:font-medium"
            style={{ fontSize: "10pt" }}
          >
            {link.label}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
