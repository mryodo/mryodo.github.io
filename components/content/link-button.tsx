import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function LinkButton({
  href,
  variant = "outline",
  children,
}: {
  href: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  children: ReactNode;
}) {
  return (
    <Button variant={variant} render={<a href={href} />}>
      {children}
    </Button>
  );
}