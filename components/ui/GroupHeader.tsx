/** Cyan square, mono label, and a rule that runs to the edge. */
export function GroupHeader({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span aria-hidden className="size-2 shrink-0 bg-accent" />
      <h3 className="type-label whitespace-nowrap">{children}</h3>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}
