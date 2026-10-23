import { useRef, useState, type ReactNode } from "react";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}
import { AsciiCharsProvider } from "@/components/ascii/ascii-chars";

import { AsciiBoxRow, AsciiHBorder } from "@/components/ascii/ascii-box";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Caps } from "@/components/content/thread";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "news", href: "/news" },
  { label: "research", href: "/research" },
  { label: "papers", href: "/papers" },
  { label: "teach", href: "/teaching" },
  { label: "non-work", short: "nw", href: "/non-work" },
];

const SIDEBAR_LINKS = [
  { label: "github", href: "https://github.com/mryodo", icon: <FaGithubAlt /> },
  { label: "codeberg", href: "https://codeberg.org/mryodo", icon: <SiCodeberg /> },
  {
    label: "scholar",
    href: "https://scholar.google.com/citations?user=E0nt-XYAAAAJ&hl=en",
    icon: <FaGoogleScholar />,
  },
  {
    label: "researchgate",
    href: "https://www.researchgate.net/profile/Anton-Savostianov-3?ev=hdr_xprf",
    icon: <FaResearchgate />,
  },
  { label: "bluesky", href: "https://bsky.app/profile/antsav.me", icon: <FaBluesky />, },
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

function Navbar({ headings, path = "/" }: { headings?: Heading[]; path?: string }) {
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
          <span className="font-heading font-bold text-[18px]">tony.savostianov</span>
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
        <nav className="ml-auto hidden items-baseline gap-[1.2ch] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href, path) ? "page" : undefined}
              className="font-heading font-bold text-[20px] leading-none text-[var(--ascii-text)]/25 transition-colors hover:text-[var(--ascii-text)]/50 aria-[current=page]:text-[var(--ascii-text)]"
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

/* sections of the sidebar are split by a hairline, no labels */
function SideRule() {
  return <div aria-hidden className="mx-[10px] my-[0.4lh] h-px bg-white/15" />;
}

const sideRow =
  "flex min-w-0 items-center gap-[1ch] rounded-full px-[10px] py-[2px] text-[14px] text-white transition-colors hover:bg-white/10 hover:text-[var(--amber)]";

function SideIcon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("w-[18px] shrink-0 text-center text-[var(--amber)]", className)}>{children}</span>
  );
}

const panel =
  "flex flex-col rounded-[var(--radius)] bg-primary p-[12px] shadow-[0_8px_28px_rgb(0_0_0/0.10)]";

function Sidebar({ headings }: { headings?: Heading[] }) {
  const toc = headings?.filter((h) => h.depth > 1) ?? [];
  const top = Math.min(...toc.map((h) => h.depth));
  return (
    <aside className="mx-auto flex w-full max-w-[300px] shrink-0 flex-col self-stretch gap-[0.75lh] md:mx-0">
      <div className={panel}>
        <div className="flex items-center gap-[1ch] px-[10px] pb-[0.4lh]">
          <span className="text-[var(--amber)]">{"\uf2bd"}</span>
          <span className="flex-1 font-bold text-white">Tony Savostianov</span>
          <Caps className="text-white/60">{"\uf041"} aachen</Caps>
        </div>
        <img src="/1.svg" alt="User avatar" className="mx-auto w-[200px] rounded-[18px] bg-white" />
        <div className="h-[0.4lh]" />
        <div className={sideRow}>
          <SideIcon className="text-destructive">{"\uf19d"}</SideIcon>
          <span>postdoc</span>
        </div>
        <div className={sideRow}>
          <SideIcon className="text-destructive">{"\uf0c0"}</SideIcon>
          <span>netsci @ rwth</span>
        </div>
        <SideRule />
        <nav className="flex flex-col">
          {SIDEBAR_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={sideRow}>
              <SideIcon>{link.icon}</SideIcon>
              <span className="flex-1">{link.label}</span>
              <span className="text-[12px] text-white/40">{"\uf08e"}</span>
            </a>
          ))}
        </nav>
      </div>

      {toc.length > 0 ? (
        <nav
          className="sticky top-[1lh] hidden flex-col rounded-[var(--radius)] bg-[var(--ascii-surface)] p-[12px] shadow-[0_8px_28px_rgb(0_0_0/0.10)] md:flex"
          aria-label="table of contents"
        >
          <Caps className="block px-[10px] pt-[0.6lh] pb-[0.1lh] text-ascii-comment">{"\uf03a"} on this page</Caps>
          {toc.map((h) => (
            <a
              key={h.slug}
              href={`#${h.slug}`}
              className={cn(
                "flex min-w-0 items-center rounded-full px-[10px] py-[2px] text-[14px] transition-colors hover:bg-[var(--sunk)] hover:text-primary",
                h.depth === top ? "text-foreground" : "text-ascii-comment",
              )}
              // indent by depth below the shallowest heading on the page
              style={{ paddingLeft: `calc(10px + ${(h.depth - top) * 2}ch)` }}
            >
              <span className="truncate">{h.text}</span>
            </a>
          ))}
        </nav>
      ) : null}
    </aside>
  );
}

function Footer() {
  return (
    <footer className="flex w-full flex-col">
      <AsciiHBorder className="text-primary/60" />
      <div className="flex flex-wrap items-center gap-x-[4ch] gap-y-[1lh] px-[2ch] py-[0.5lh] text-ascii-soft text-sm">
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

function isActive(href: string, path: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

export default function Layout({
  children,
  headings,
  path,
}: {
  children: ReactNode;
  headings?: Heading[];
  path?: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col px-[2ch] sm:px-[2ch] md:px-0">
      <Navbar headings={headings} path={path} />

      <div className="flex flex-col items-start gap-[2ch] px-[2ch] pt-[0.75lh] pb-[1lh] md:flex-row">
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
