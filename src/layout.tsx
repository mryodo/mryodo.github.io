import { useRef, useState, type ReactNode } from "react";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}
import { AsciiCharsProvider } from "@/components/ascii/ascii-chars";

import {
  AsciiBox,
  AsciiBoxDivider,
  AsciiBoxRow,
  AsciiHBorder,
  AsciiVRule,
  type Tone,
} from "@/components/ascii/ascii-box";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "news", href: "/news" },
  { label: "research", href: "/research" },
  { label: "papers", href: "/papers" },
  { label: "teach", href: "/teaching" },
  { label: "non-work", short: "nw", href: "/non-work" },
];

const SIDEBAR_LINKS = [
  { label: "github", href: "https://github.com/mryodo" },
  { label: "codeberg", href: "https://codeberg.org/mryodo" },
  {
    label: "scholar",
    href: "https://scholar.google.com/citations?user=E0nt-XYAAAAJ&hl=en",
  },
  {
    label: "researchgate",
    href: "https://www.researchgate.net/profile/Anton-Savostianov-3?ev=hdr_xprf",
  },
  { label: "bluesky", href: "https://bsky.app/profile/antsav.me" },
];

const CONTACT_LINKS = [
  { label: "github", href: "https://github.com/mryodo" },
  {
    label: "scholar",
    href: "https://scholar.google.com/citations?user=E0nt-XYAAAAJ&hl=en",
  },
  // { label: "researchgate", href: "https://www.researchgate.net/profile/Anton-Savostianov-3?ev=hdr_xprf" },
  { label: "bluesky", href: "https://bsky.app/profile/antsav.me" },
];

import { FaGithubAlt } from "react-icons/fa";
import { FaResearchgate } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { FaGoogleScholar } from "react-icons/fa6";
import { SiCodeberg } from "react-icons/si";

function Navbar({ headings }: { headings?: Heading[] }) {
  const toc = headings?.filter((h) => h.depth > 1) ?? [];
  const [tocOpen, setTocOpen] = useState(false);
  // jump only after the drawer closes, so its scroll-lock restore doesn't undo it
  const pendingSlug = useRef<string | null>(null);
  return (
    <header className="@container flex w-full flex-col">
      <div className="flex flex-wrap items-center gap-x-[1ch] gap-y-[1lh] px-[2ch] md:gap-x-[2ch] pt-[1lh] pb-[0.5lh]">
        <a
          href="/"
          className="flex min-w-0 items-center whitespace-nowrap text-primary"
        >
          <span aria-hidden>#</span>
          <span className="font-bold tracking-tight">tony.savostianov</span>
        </a>
        <div className="ml-auto flex gap-[1ch] md:hidden">
          {toc.length > 0 && (
            <Drawer
              open={tocOpen}
              onOpenChange={setTocOpen}
              onOpenChangeComplete={(open) => {
                if (!open && pendingSlug.current) {
                  location.hash = pendingSlug.current;
                  pendingSlug.current = null;
                }
              }}
            >
              <DrawerTrigger
                render={
                  <button className="nav-link bg-primary px-[1ch] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary">
                    toc
                  </button>
                }
              />
              <DrawerContent
                side="bottom"
                className="mx-auto w-full max-w-[1000px]"
              >
                <DrawerHeader>
                  <DrawerTitle>table of contents</DrawerTitle>
                </DrawerHeader>
                <nav
                  className="flex flex-col px-[2ch] pb-[1lh]"
                  aria-label="table of contents"
                >
                  {toc.map((h) => (
                    <a
                      key={h.slug}
                      href={`#${h.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        pendingSlug.current = h.slug;
                        setTocOpen(false);
                      }}
                      className={cn(
                        "text-ascii-soft hover:text-primary",
                        h.depth >= 3 && "text-ascii-comment",
                      )}
                    >
                      <span className="text-ascii-dim">
                        {h.depth === 2 ? "• " : ".".repeat(h.depth - 2)}
                      </span>
                      {h.text}
                    </a>
                  ))}
                </nav>
              </DrawerContent>
            </Drawer>
          )}
          <Drawer>
            <DrawerTrigger
              render={
                <button className="nav-link bg-primary px-[1ch] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary">
                  menu
                </button>
              }
            />
            <DrawerContent
              side="bottom"
              className="mx-auto w-full max-w-[1000px]"
            >
              <DrawerHeader>
                <DrawerTitle>nav</DrawerTitle>
              </DrawerHeader>
              {NAV_LINKS.map((link) => (
                <AsciiBoxRow key={link.label} className="px-[2ch]">
                  <a
                    href={link.href}
                    className="nav-link inline-block bg-primary px-[0.ech] py-[0.5lh] text-sm text-primary-foreground normal-case transition-colors hover:bg-primary-foreground hover:text-primary"
                  >
                    {link.label}
                  </a>
                </AsciiBoxRow>
              ))}
            </DrawerContent>
          </Drawer>
        </div>
        <nav className="ml-auto hidden items-center gap-[2ch] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link bg-primary px-[1ch] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              {/* 96ch = header padding + logo + full nav; below it the nav wraps */}
              {link.short ? (
                <>
                  <span className="@max-[96ch]:hidden">{link.label}</span>
                  <span className="@min-[96ch]:hidden">{link.short}</span>
                </>
              ) : (
                link.label
              )}
            </a>
          ))}
        </nav>
        {/*  <Button variant="outline" className="max-md:hidden">
          login
        </Button> */}
      </div>
      <AsciiHBorder className="text-primary/60" />
    </header>
  );
}

function TocNav({ toc, tone = "soft" }: { toc: Heading[]; tone?: Tone }) {
  return (
    <AsciiBox
      width={30}
      title="toc"
      tone={tone}
      contentClassName="flex flex-col"
    >
      <nav className="flex flex-col py-[1lh]" aria-label="table of contents">
        {toc.map((h) => (
          <AsciiBoxRow
            key={h.slug}
            className="hover:bg-card"
            contentClassName={cn("pr-[1ch]")}
          >
            <a
              href={`#${h.slug}`}
              className={cn(
                "block overflow-hidden text-ellipsis whitespace-nowrap text-ascii-soft hover:text-primary",
                h.depth >= 3 && "text-ascii-comment",
              )}
            >
              <span className="text-ascii-dim">{".".repeat(h.depth - 2)}</span>
              {h.text}
            </a>
          </AsciiBoxRow>
        ))}
      </nav>
    </AsciiBox>
  );
}

function Sidebar({ headings }: { headings?: Heading[] }) {
  const toc = headings?.filter((h) => h.depth > 1) ?? [];
  return (
    <aside className="mx-auto flex w-full max-w-[30ch] shrink-0 flex-col self-stretch gap-[1lh] md:mx-0">
      <AsciiBox
        width={30}
        title="nav"
        titleClassName="bg-primary text-primary-foreground"
        tone="primary"
        contentClassName="flex flex-col"
      >
        <Avatar width={26} aspect={892 / 926}>
          <AvatarImage src="/1.svg" alt="User avatar" keepMounted />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-[1lh] py-[1lh] text-ascii-comment text-sm">
          <p>
            status: <span className="text-destructive">postdoc</span>
          </p>
          <p>
            group: <span className="text-destructive">netsci @ rwth</span>
          </p>
        </div>
        <AsciiBoxDivider pad={false} />
        <nav className="flex flex-col py-[1lh]">
          {SIDEBAR_LINKS.map((link, i) => (
            <AsciiBoxRow key={link.label} className="hover:bg-secondary">
              <a
                href={link.href}
                className="flex items-center justify-between gap-[1ch] text-ascii-soft hover:text-primary"
              >
                <span>{link.label}</span>
                {i === 0 ? (
                  <Badge variant="secondary">
                    <FaGithubAlt />
                  </Badge>
                ) : null}
                {i === 1 ? (
                  <Badge variant="secondary">
                    <SiCodeberg />
                  </Badge>
                ) : null}
                {i === 2 ? (
                  <Badge variant="secondary">
                    <FaGoogleScholar />
                  </Badge>
                ) : null}
                {i === 3 ? (
                  <Badge variant="secondary">
                    <FaResearchgate />
                  </Badge>
                ) : null}
                {i === 4 ? (
                  <Badge variant="secondary">
                    <FaBluesky />
                  </Badge>
                ) : null}
              </a>
            </AsciiBoxRow>
          ))}
        </nav>
      </AsciiBox>

      {toc.length > 0 ? (
        <div className="sticky top-[1lh] hidden md:block">
          <TocNav toc={toc} tone="primary" />
        </div>
      ) : null}
    </aside>
  );
}

function Footer() {
  return (
    <footer className="flex w-full flex-col">
      <AsciiHBorder className="text-primary/60" />
      <div className="flex flex-wrap items-center gap-x-[4ch] gap-y-[1lh] px-[2ch] py-[1lh] text-ascii-soft text-sm">
        <span className="flex items-center gap-[1ch]">
          <Badge variant="secondary">
            <a href="https://github.com/mryodo/mryodo.github.io">CODE</a>
          </Badge>
        </span>
        <span className="ml-auto flex flex-wrap items-center gap-x-[2ch] gap-y-[0.5lh] text-right">
          <span className="text-ascii-comment">
            savostianov [at] netsci dot rwth-aachen.de
          </span>
          {CONTACT_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-primary">
              {link.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}

export default function Layout({
  children,
  headings,
}: {
  children: ReactNode;
  headings?: Heading[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col px-[2ch] sm:px-[2ch] md:px-0">
      <Navbar headings={headings} />

      <div className="flex flex-col items-start gap-[2ch] px-[2ch] pt-[0.25lh] pb-[1lh] md:flex-row">
        {/* fluid side frame on the left keeps the grid honest */}
        <div className="hidden w-full max-w-[3ch] shrink-0 self-stretch md:block">
          <div className="relative h-full w-[0ch]">
            {/*<AsciiVRule side="left" className="absolute inset-y-0 left-0" />*/}
          </div>
        </div>

        <main className="min-w-0 w-full max-w-[80ch] flex-1">{children}</main>

        <Sidebar headings={headings} />
      </div>

      <Footer />
    </div>
  );
}
