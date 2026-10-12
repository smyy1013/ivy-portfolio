/** Pulsing orange status tag. */
export function LiveTag({ children = "LIVE" }: { children?: string }) {
  return (
    <span className="mr-2 animate-pulse-live bg-warning px-1.5 py-0.5 text-[9px] text-ink">
      {children}
    </span>
  );
}
