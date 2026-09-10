"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import * as React from "react";

import { AsciiEdge, AsciiVRule } from "@/components/ascii/ascii-box";
import { cn } from "@/lib/utils";

/* "+--+" over "|AA|" — the box hugs the two initial characters. */
const AVATAR_WIDTH = 4;
const AVATAR_ROWS = 1;

function Avatar({
  className,
  width = AVATAR_WIDTH,
  aspect = 1,
  children,
  ...props
}: AvatarPrimitive.Root.Props & {
  /** Frame width in characters. */
  width?: number;
  /** Inner-box aspect ratio (width / height) — height is derived in ch
   * units so `object-contain` fills the frame edge-to-edge. */
  aspect?: number;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "group/avatar relative inline-flex shrink-0 flex-col font-mono text-sm text-primary/60 select-none",
        className
      )}
      style={{ width: `${width}ch` }}
      {...props}
    >
      <AsciiEdge edge="top" width={width} />
      <span
        className="relative block"
        style={{ height: `${Math.max(width - 2, 1) / aspect}ch` }}
      >
        <AsciiVRule
          side="left"
          className="absolute inset-y-0 left-0"
        />
        <span className="absolute inset-x-[1ch] inset-y-0 flex items-center justify-center overflow-hidden uppercase isolate">
          {children}
        </span>
        <AsciiVRule
          side="right"
          className="absolute inset-y-0 right-0"
        />
      </span>
      <AsciiEdge edge="bottom" width={width} />
    </AvatarPrimitive.Root>
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <>
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn(
          "absolute inset-0 size-full object-contain transition-[filter] duration-300 group-hover/avatar:grayscale",
          className
        )}
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-primary mix-blend-screen opacity-0 transition-opacity duration-300 group-hover/avatar:opacity-100"
      />
    </>
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("text-primary", className)}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("group/avatar-group flex -space-x-[1ch]", className)}
      {...props}
    />
  );
}

/** Overflow count drawn as the same "+--+" box as a regular avatar. */
function AvatarGroupCount({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const width = AVATAR_WIDTH;
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative inline-flex shrink-0 flex-col font-mono text-sm text-primary/60 select-none",
        className
      )}
      style={{ width: `${width}ch` }}
      {...props}
    >
      <AsciiEdge edge="top" width={width} />
      <span className="relative block" style={{ height: `${AVATAR_ROWS}lh` }}>
        <AsciiVRule side="left" className="absolute inset-y-0 left-0" />
        <span className="absolute inset-x-[1ch] inset-y-0 flex items-center justify-center text-ascii-comment">
          +{children}
        </span>
        <AsciiVRule side="right" className="absolute inset-y-0 right-0" />
      </span>
      <AsciiEdge edge="bottom" width={width} />
    </div>
  );
}

export { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };
