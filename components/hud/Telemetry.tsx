"use client";

import { useEffect, useRef } from "react";

/** Throttle readout that follows the pointer's horizontal position. */
export function Telemetry() {
  const value = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const throttle = Math.round((event.clientX / window.innerWidth) * 100);
      if (value.current) value.current.textContent = throttle.toFixed(2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <span ref={value}>0.00</span>;
}
