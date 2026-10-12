"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, [data-cursor='active']";

/**
 * Crosshair cursor with a live coordinate readout. It only takes over on
 * devices with a mouse; touch screens keep their normal behaviour.
 */
export function Cursor() {
  const box = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const el = box.current;
    const text = label.current;
    if (!el || !text) return;

    document.documentElement.classList.add("hud-cursor");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const { clientX: x, clientY: y } = event;
      el.style.opacity = "1";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      text.textContent = `X:${String(Math.round(x)).padStart(4, "0")} Y:${String(Math.round(y)).padStart(4, "0")}`;

      const active = (event.target as Element | null)?.closest?.(INTERACTIVE);
      el.dataset.active = active ? "true" : "false";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("hud-cursor");
    };
  }, []);

  return (
    <div
      ref={box}
      aria-hidden
      data-active="false"
      className="pointer-events-none fixed z-[9999] hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-accent opacity-0 transition-[width,height,border-color] duration-200 before:absolute before:h-px before:w-full before:bg-accent after:absolute after:h-full after:w-px after:bg-accent data-[active=true]:size-[60px] data-[active=true]:border-warning [@media(hover:hover)_and_(pointer:fine)]:flex"
    >
      <div
        ref={label}
        className="absolute left-[45px] top-[45px] whitespace-nowrap font-mono text-[10px] text-accent"
      >
        X:0000 Y:0000
      </div>
    </div>
  );
}
