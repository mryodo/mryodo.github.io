"use client";

import * as React from "react";

import type { AsciiChars } from "@/lib/ascii";
import { cn } from "@/lib/utils";

type Tone = "primary" | "soft" | "danger";

/** Which line of the glyph set a rule draws with. */
type AsciiLine = keyof Omit<AsciiChars, "junction">;

/* Most ASCII frames share one muted border color (matching the inputs'
 * and menus' rest-state frames); "primary" opts a frame into a fully
 * opaque border for emphasis without touching other call sites. */
const toneClass: Record<Tone, string> = {
  primary: "text-primary",
  soft: "text-primary/60",
  danger: "text-ascii-primary",
};

const borderClass: Record<Tone, string> = {
  primary: "border-border",
  soft: "border-border",
  danger: "border-destructive/60",
};

const AsciiBoxContext = React.createContext<{
  width: number;
  tone: Tone;
  /** Background utility class of the box surface — dividers repaint it
   * over the absolute side rules so intersections show only junctions. */
  bg: string;
  /** Fluid boxes take their width from CSS, so dividers are drawn as
   * clipped rules instead of fixed-length strings. */
  fluid: boolean;
}>({
  width: 40,
  tone: "soft",
  bg: "bg-card",
  fluid: false,
});

/** The junction glyph ("+" by default) — for corners and intersections
 * drawn outside a full AsciiBox (layout frames, fluid borders). */
function AsciiJunction({
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children">) {
  return null;
}

/** One glyph of a vertical edge — for single-row frames (inputs,
 * menu items, table rows) that draw their own sides per row. */
function AsciiSide({
  side = "left",
  row = 0,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  side?: "left" | "right";
  row?: number;
}) {
  return null;
}

/** A fixed-width "+----+" edge row for frames sized in characters —
 * the top (optionally titled) or bottom border of an input, menu,
 * avatar… Rendered as a block span so it can sit inside buttons. */
function AsciiEdge({
  edge,
  width,
  title,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children" | "title"> & {
  edge: "top" | "bottom";
  width: number;
  title?: string;
}) {
  return null;
}

/** A column of side glyphs that stretches to match its sibling's
 * height via flex `items-stretch` — real glyphs, clipped by overflow. */
function AsciiVRule({
  tone = "soft",
  side = "left",
  className,
}: {
  tone?: Tone;
  side?: "left" | "right";
  className?: string;
}) {
  return null;
}

/** One or more literal empty text rows — vertical padding that stays
 * on the character grid instead of arbitrary CSS lengths. */
function AsciiPad({
  rows = 1,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("select-none whitespace-pre", className)}>
      {Array.from({ length: rows }, () => " ").join("\n")}
    </div>
  );
}

type AsciiBoxProps = Omit<React.ComponentProps<"div">, "title"> & {
  width: number;
  title?: string;
  /** Extra classes for the title label only (e.g. a highlight background),
   * layered over the border's tone color. */
  titleClassName?: string;
  tone?: Tone;
  contentClassName?: string;
  /** Empty text rows rendered above and below the content. */
  padY?: number;
  /** Background utility class of the box surface. Pass this instead of a
   * bg-* class in className so dividers can repaint it at intersections. */
  bg?: string;
  /** Size the box with CSS (w-*, max-w-*) instead of `width`: the edge
   * rows become clipped rules that follow the container, so the box can
   * be `w-full` on a narrow screen. `width` is then only the fallback
   * used when no width class is given. */
  fluid?: boolean;
};

function AsciiBox({
  width,
  title,
  titleClassName,
  tone = "soft",
  bg = "bg-card",
  className,
  contentClassName,
  padY = 0,
  fluid = false,
  children,
  ...props
}: AsciiBoxProps) {
  return (
    <AsciiBoxContext.Provider value={{ width, tone, bg, fluid }}>
      <div
        data-slot="ascii-box"
        className={cn(
          "inline-flex flex-col rounded-[var(--radius)] border py-[0.8lh] text-card-foreground text-sm shadow-[0_8px_28px_rgb(0_0_0/0.10)]",
          borderClass[tone],
          bg,
          className
        )}
        style={fluid ? undefined : { width: `${width}ch` }}
        {...props}
      >
        {title ? (
          <span
            className={cn(
              "mx-[2ch] mb-[0.4lh] self-start rounded-full text-[11px] font-semibold uppercase tracking-[0.14em]",
              titleClassName ? cn("px-[1ch]", titleClassName) : "text-ascii-comment"
            )}
          >
            {title}
          </span>
        ) : null}
        {padY > 0 && <AsciiPad rows={padY} />}
        <div className={cn("min-w-0 px-[2ch] [&>:last-child]:mb-0", contentClassName)}>
          {children}
        </div>
        {padY > 0 && <AsciiPad rows={padY} />}
      </div>
    </AsciiBoxContext.Provider>
  );
}

/** A "+---+" divider spanning the box's full content width, flanked
 * by one empty text row on each side (disable with pad={false}) —
 * for separating sections (header/content/footer) inside an AsciiBox. */
function AsciiBoxDivider({
  className,
  pad = true,
}: {
  className?: string;
  pad?: boolean;
}) {
  return (
    <div aria-hidden className={cn("-mx-[2ch] select-none", className)}>
      {pad && <div> </div>}
      <div className="border-t border-current opacity-20" />
      {pad && <div> </div>}
    </div>
  );
}

/** A single side-glyph-flanked line — for list-style rows (menus, table
 * rows) that need their own hover/selection background per row. */
function AsciiBoxRow({
  className,
  contentClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & { contentClassName?: string }) {
  return (
    <div className={cn("-mx-[2ch] flex items-center", className)} {...props}>
      <div className={cn("min-w-0 flex-1 px-[2ch]", contentClassName)}>
        {children}
      </div>
    </div>
  );
}

/** A fluid single-character-tall rule for contexts where the exact
 * character width isn't known ahead of time (e.g. spans a flexible
 * container). Renders real repeated glyphs, clipped by overflow.
 *
 * Draws with the theme's `divider` line (horizontal) or `left` line
 * (vertical) unless `line` picks another edge; `char` overrides the
 * theme entirely. */
function AsciiRule({
  className,
  char,
  line,
  tone = "soft",
  orientation = "horizontal",
}: {
  className?: string;
  char?: string;
  line?: AsciiLine;
  tone?: Tone;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "select-none opacity-40",
        orientation === "vertical" ? "w-px self-stretch bg-current" : "h-px w-full bg-current",
        toneClass[tone],
        className
      )}
    />
  );
}

/** A fluid "+----+" row: junction, a horizontal line that fills the
 * available width, junction. For box edges whose width is set by
 * layout rather than a character count. */
function AsciiHBorder({
  line = "top",
  tone = "soft",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  line?: AsciiLine;
  tone?: Tone;
}) {
  return (
    <div
      aria-hidden
      className={cn("flex select-none", toneClass[tone], className)}
      {...props}
    >
      <AsciiRule line={line} tone={tone} className="min-w-0 flex-1" />
    </div>
  );
}

export type { AsciiLine, Tone };
export {
  AsciiBox,
  AsciiBoxContext,
  AsciiBoxDivider,
  AsciiBoxRow,
  AsciiEdge,
  AsciiHBorder,
  AsciiJunction,
  AsciiPad,
  AsciiRule,
  AsciiSide,
  AsciiVRule,
};
