import type { ReactNode } from "react";
import { FaGithubAlt, FaResearchgate } from "react-icons/fa";
import { FaBluesky, FaGoogleScholar } from "react-icons/fa6";
import { SiCodeberg } from "react-icons/si";
import { cn } from "@/lib/utils";

// by name: JSX passed as a prop from MDX arrives as Astro JSX, not React
const ICONS = {
  github: <FaGithubAlt />,
  codeberg: <SiCodeberg />,
  scholar: <FaGoogleScholar />,
  researchgate: <FaResearchgate />,
  bluesky: <FaBluesky />,
};

/** A pill link like the sidebar's rows: icon, label, external-link mark.
 * data-slot="row-link" keeps .mdx's "#" prefix and underline off it. */
export function LinkButton({
  href,
  icon,
  primary,
  children,
}: {
  href: string;
  icon?: keyof typeof ICONS;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      data-slot="row-link"
      className={cn(
        "inline-flex items-center gap-[1ch] rounded-full px-[1.5ch] text-[14px] leading-[32px] no-underline transition-colors",
        primary
          ? "bg-primary text-white hover:bg-primary/85"
          : "bg-[var(--ascii-surface)] text-foreground shadow-[0_2px_8px_rgb(0_0_0/0.06)] hover:text-primary",
      )}
    >
      {icon && <span className={primary ? "text-[var(--amber)]" : "text-primary"}>{ICONS[icon]}</span>}
      {children}
      <span aria-hidden className="text-[11px] opacity-50">{""}</span>
    </a>
  );
}
