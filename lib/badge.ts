import type { VariantProps } from "class-variance-authority";
import { type badgeVariants } from "@/components/ui/badge";

export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>["variant"]
>;

export function badgeVariant(href: string, label: string): BadgeVariant {
  const l = label.toLowerCase();
  if (l.includes("github") || /github|gitlab/.test(href)) return "destructive";
  if (
    l === "pdf" ||
    l === "slides" ||
    l === "poster" ||
    /\.pdf($|\?)/i.test(href)
  )
    return "outline";
  return "default";
}