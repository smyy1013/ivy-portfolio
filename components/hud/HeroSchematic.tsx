"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

function wavePath(amplitude: number) {
  let d = "M0 450 ";
  for (let i = 0; i <= 8; i++) {
    const x = i * 100;
    const offset = i % 2 === 0 ? -amplitude : amplitude;
    d += `Q ${x + 50} ${450 + offset}, ${x + 100} 450 `;
  }
  return d;
}

/**
 * The hero drawing: circuit traces, a piston assembly, and a signal wave.
 * Moving the pointer down the screen raises the wave amplitude and drives
 * the piston rod, so the mechanism and the signal move together.
 */
export function HeroSchematic({ className }: { className?: string }) {
  const wave = useRef<SVGPathElement>(null);
  const rod = useRef<SVGLineElement>(null);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const amplitude = (event.clientY / window.innerHeight) * 100;
      wave.current?.setAttribute("d", wavePath(amplitude));
      rod.current?.setAttribute("y2", String(200 - amplitude / 2));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label="Schematic of a piston mechanism with a signal wave running beneath it"
      className={cn("w-full", className)}
    >
      <g stroke="var(--color-line)" fill="none">
        <path d="M0 300 H150 L200 250 H400 L450 300 H800" />
        <path d="M100 0 V200 L150 250" />
        <path d="M600 600 V400 L550 350" />
      </g>

      <g fill="none" stroke="var(--color-dim)" strokeWidth="1">
        <rect x="350" y="200" width="100" height="200" />
        <line ref={rod} x1="400" y1="200" x2="400" y2="100" strokeWidth="4" />
        <circle cx="400" cy="300" r="40" strokeDasharray="10 5" />
      </g>
      <circle cx="400" cy="100" r="6" fill="var(--color-accent)" />

      <g transform="translate(400, 300)">
        <circle r="30" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
        <line x1="-30" y1="0" x2="30" y2="0" stroke="var(--color-accent)" strokeWidth="1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="10s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      <path
        ref={wave}
        d="M0 450 Q 50 400, 100 450 T 200 450 T 300 450 T 400 450 T 500 450 T 600 450 T 700 450 T 800 450"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 0 5px var(--color-accent))" }}
      />

      <circle cx="200" cy="250" r="3" fill="var(--color-accent)">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="450" cy="300" r="3" fill="var(--color-warning)" />
    </svg>
  );
}
