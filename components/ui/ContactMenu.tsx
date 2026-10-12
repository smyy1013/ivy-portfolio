"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { buttonClass } from "./Button";

type ContactMenuProps = {
  /** Text on the button, for example "Get in Touch". */
  label: string;
  email: string;
  linkedin: string;
  variant?: "primary" | "secondary";
  className?: string;
};

/**
 * A button that opens a small panel with the two ways to reach Ivy: email and
 * LinkedIn. The panel closes on Escape, on a click outside, or on a second
 * click of the button.
 */
export function ContactMenu({
  label,
  email,
  linkedin,
  variant = "secondary",
  className,
}: ContactMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const linkedinLabel = linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const row =
    "flex items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-accent/10 focus-visible:bg-accent/10";

  return (
    <div ref={wrapper} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={buttonClass(variant, cn("w-full", open && "border-accent", className))}
      >
        {label}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute bottom-full left-0 z-20 mb-3 w-full min-w-[18rem] border border-accent bg-panel shadow-[0_0_40px_rgb(0_245_255/0.12)]"
        >
          <a href={`mailto:${email}`} className={cn(row, "border-b border-line")}>
            <span className="min-w-0">
              <span className="type-hud block text-accent">Email</span>
              <span className="block truncate font-mono text-xs text-ink">{email}</span>
            </span>
            <span aria-hidden className="font-mono text-accent">
              &rarr;
            </span>
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className={row}>
            <span className="min-w-0">
              <span className="type-hud block text-accent">LinkedIn</span>
              <span className="block truncate font-mono text-xs text-ink">{linkedinLabel}</span>
            </span>
            <span aria-hidden className="font-mono text-accent">
              &#8599;
            </span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
