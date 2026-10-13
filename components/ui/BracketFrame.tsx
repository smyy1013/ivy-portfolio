import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Panel with cyan brackets on the top-left and bottom-right corners. */
export function BracketFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-lg border border-line bg-panel", className)}>
      {children}
    </div>
  );
}
