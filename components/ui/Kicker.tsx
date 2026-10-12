import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small cyan mono line that sits above a title: "SEC.02 // PROJECT_ARCHIVE". */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("type-hud text-accent", className)}>{children}</div>;
}
