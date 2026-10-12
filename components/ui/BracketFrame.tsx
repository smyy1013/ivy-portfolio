import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Panel with cyan brackets on the top-left and bottom-right corners. */
export function BracketFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative border border-line bg-panel/60", className)}>
      <span
        aria-hidden
        className="absolute -left-px -top-px size-6 border-l border-t border-accent"
      />
      <span
        aria-hidden
        className="absolute -bottom-px -right-px size-6 border-b border-r border-accent"
      />
      {children}
    </div>
  );
}
