import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { fileName, resolveImage } from "@/lib/images";

type ImageSlotProps = {
  /** Path as written in copy.md, for example "images/eco-cover.jpg". */
  src: string;
  /** Describes the shot. Used as alt text and as the note on an empty slot. */
  alt: string;
  /** CSS aspect ratio. Pass null when the parent sets the height. */
  ratio?: string | null;
  sizes?: string;
  priority?: boolean;
  /** Serve the file exactly as saved, with no resizing or recompression. */
  original?: boolean;
  className?: string;
};

/**
 * A framed picture. If the file exists in /public it is shown; if not, the
 * slot shows the filename to add and what the shot should be. Returns null
 * for a missing picture when site.showEmptySlots is false.
 */
export function ImageSlot({
  src,
  alt,
  ratio = "4 / 3",
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority,
  original,
  className,
}: ImageSlotProps) {
  const url = resolveImage(src);
  if (!url && !site.showEmptySlots) return null;

  const style: CSSProperties | undefined = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <div
      style={style}
      className={cn("relative overflow-hidden border border-line bg-panel", className)}
    >
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={original || /\.(svg|gif)(\?|$)/i.test(url)}
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <svg
            aria-hidden
            className="absolute inset-0 size-full text-line"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M0 0L100 100M100 0L0 100"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="type-hud relative text-accent">Image slot</span>
          <span className="relative break-all font-mono text-[11px] text-ink">
            {fileName(src)}
          </span>
          <span className="relative max-w-[26ch] font-mono text-[10px] leading-snug text-dim">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
