/** Fixed page furniture: background grid, scanlines, and four corner marks. */
export function Backdrop() {
  return (
    <div aria-hidden>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-10"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, rgb(0 0 0 / 0.2) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
      <span className="pointer-events-none fixed left-2 top-2 z-[6] size-5 border-l border-t border-line sm:left-5 sm:top-5" />
      <span className="pointer-events-none fixed right-2 top-2 z-[6] size-5 border-r border-t border-line sm:right-5 sm:top-5" />
      <span className="pointer-events-none fixed bottom-2 left-2 z-[6] size-5 border-b border-l border-line sm:bottom-5 sm:left-5" />
      <span className="pointer-events-none fixed bottom-2 right-2 z-[6] size-5 border-b border-r border-line sm:bottom-5 sm:right-5" />
    </div>
  );
}
