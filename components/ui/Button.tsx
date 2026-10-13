import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

/** Primary is a solid accent button; secondary is outlined. */
export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex h-11 items-center rounded-md border px-5 text-sm font-semibold no-underline transition-colors",
    variant === "primary" && "border-accent bg-accent text-white hover:bg-ink hover:border-ink",
    variant === "secondary" && "border-line bg-transparent text-ink hover:border-ink",
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
