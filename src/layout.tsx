import type { ReactNode } from "react";

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
} from "@/components/ascii/ascii-box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  { label: "teaching", href: "/teaching" },
  { label: "non-work", href: "/non-work" },
];

const SIDEBAR_LINKS = [
  { label: "github", href: "https://github.com/mryodo" },
  { label: "codeberg", href: "https://codeberg.org/mryodo" },
  { label: "scholar", href: "https://scholar.google.com/citations?user=E0nt-XYAAAAJ&hl=en" },
  { label: "researchgate", href: "https://www.researchgate.net/profile/Anton-Savostianov-3?ev=hdr_xprf" },
  { label: "bluesky", href: "https://bsky.app/profile/antsav.me" },
];

const CONTACT_LINKS = [
  { label: "github", href: "https://github.com/mryodo" },
  { label: "scholar", href: "https://scholar.google.com/citations?user=E0nt-XYAAAAJ&hl=en" },
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
  return (
    <header className="flex w-full flex-col">
      <div className="flex flex-wrap items-center gap-x-[2ch] gap-y-[1lh] px-[2ch] pt-[1lh] pb-[0.5lh]">
        <a
          href="/"
          className="flex min-w-0 items-center gap-[1ch] whitespace-nowrap text-primary"
        >
          <span aria-hidden>#</span>
          <span className="font-bold tracking-tight">tony.savostianov</span>
        </a>
        {toc.length > 0 && (
          <Drawer>
            <DrawerTrigger
              render={
                <Button variant="outline" size="icon" className="md:hidden">
                  toc
                </Button>
              }
            />
            <DrawerContent
              side="bottom"
              className="mx-auto w-full max-w-[1000px]"
            >
              <DrawerHeader>
                <DrawerTitle>toc</DrawerTitle>
              </DrawerHeader>
              <div className="px-[2ch] pb-[1lh]">
                <TocNav toc={toc} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        <Drawer>
          <DrawerTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="ml-auto md:hidden"
              >
                menu
              </Button>
            }
          />
          <DrawerContent side="bottom" className="mx-auto w-full max-w-[1000px]">
            <DrawerHeader>
              <DrawerTitle>nav</DrawerTitle>
            </DrawerHeader>
            {NAV_LINKS.map((link) => (
              <AsciiBoxRow key={link.label} className="px-[2ch] hover:bg-card">
                <a
                  href={link.href}
                  className="nav-link flex items-center justify-between py-[1lh] uppercase text-ascii-soft hover:text-primary"
                >
                  {link.label}
                </a>
              </AsciiBoxRow>
            ))}
          </DrawerContent>
        </Drawer>
        <nav className="ml-auto hidden items-center gap-[2ch] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-ascii-soft transition-colors hover:text-primary"
            >
              {link.label}
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

function TocNav({ toc }: { toc: Heading[] }) {
  return (
    <AsciiBox width={30} title="toc" contentClassName="flex flex-col">
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
                "block overflow-hidden text-ellipsis whitespace-nowrap text-ascii-soft uppercase hover:text-primary",
                h.depth >= 3 && "pl-[2ch] text-ascii-comment",
                h.depth >= 4 && "pl-[4ch]"
              )}
            >
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
      <AsciiBox width={30} title="nav" contentClassName="flex flex-col">
<Avatar width={26} aspect={892 / 926}>
    <AvatarImage src="/1.svg" alt="User avatar" keepMounted />
    <AvatarFallback>TS</AvatarFallback>
  </Avatar>
        <div className="flex flex-col gap-[1lh] py-[1lh] text-ascii-comment text-sm">
          <p>status: postdoc</p>
          <p>group: netsci @ rwth</p>
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
                {i === 0 ? <Badge variant="secondary"><FaGithubAlt/></Badge> : null}
                {i === 1 ? <Badge variant="secondary"><SiCodeberg/></Badge> : null}
                {i === 2 ? <Badge variant="secondary"><FaGoogleScholar/></Badge> : null}
                {i === 3 ? <Badge variant="secondary"><FaResearchgate/></Badge> : null}
                {i === 4 ? <Badge variant="secondary"><FaBluesky/></Badge> : null}
              </a>
            </AsciiBoxRow>
          ))}
        </nav>
      </AsciiBox>

      {toc.length > 0 ? (
        <div className="sticky top-[1lh] hidden md:block">
          <TocNav toc={toc} />
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
          <Badge variant="secondary"><a href="https://github.com/mryodo/mryodo.github.io">CODE</a></Badge>
        </span>
        <span className="ml-auto flex flex-wrap items-center gap-x-[2ch] gap-y-[0.5lh] text-right">
          <span className="text-ascii-comment">savostianov [at] netsci dot rwth-aachen.de</span>
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
            <AsciiVRule side="left" className="absolute inset-y-0 left-0" />
          </div>
        </div>

        <main className="min-w-0 w-full max-w-[80ch] flex-1">{children}</main>

        <Sidebar headings={headings} />
      </div>

      <Footer />
    </div>
  );
}
