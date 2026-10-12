import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A stack of HUD readouts with a cyan rule on the left. */
export function MetaBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("type-hud border-l border-accent pl-2.5 tracking-normal text-dim", className)}>
      {children}
    </div>
  );
}
