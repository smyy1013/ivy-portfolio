import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

/**
 * The look of the one button in the system. Primary is a solid white plate with
 * a cyan edge; secondary is an outlined plate. Both slide right on hover.
 */
export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "relative flex h-[54px] items-center border px-6 font-mono text-xs uppercase no-underline",
    "transition-all duration-300 hover:translate-x-2.5 hover:border-accent",
    "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:transition-colors before:duration-300",
    variant === "primary" && "border-transparent bg-ink text-bg before:bg-accent hover:bg-accent",
    variant === "secondary" && "border-line bg-transparent text-ink before:bg-dim",
    className,
  );
}

type ButtonProps = ComponentProps<"a"> & { variant?: Variant };

/** A link that looks like a button. */
export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <a {...props} className={buttonClass(variant, className)}>
      {children}
    </a>
  );
}
