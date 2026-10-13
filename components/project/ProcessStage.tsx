import { ImageSlot, RichText } from "@/components/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import type { ProcessStage as Stage } from "@/lib/copy";
import { imageRatio, resolveImage } from "@/lib/images";

/** True when a stage is only a "[to add: ...]" note with nothing written yet. */
export const isUnwritten = (text: string) => /^\[[^\]]+\]$/.test(text.trim());

export const isReasoning = (label: string) =>
  (site.process.reasoning as readonly string[]).includes(label.toLowerCase());

/** One stage of the process: its name, what happened, and the pictures. */
export async function ProcessStage({ stage }: { stage: Stage }) {
  const reasoning = isReasoning(stage.label);
  const images = await Promise.all(
    stage.images
      .filter((image) => resolveImage(image.src) || site.showEmptySlots)
      .map(async (image) => {
        const url = resolveImage(image.src);
        return { ...image, url, ratio: url ? await imageRatio(url) : null };
      }),
  );
  const [only] = images.length === 1 ? images : [];
  // Diagrams (PNG or SVG) take the full width under the text so their labels stay readable.
  const isDiagram = (image: (typeof images)[number]) => Boolean(image.url && /\.(png|svg)(\?|$)/i.test(image.url));
  // A wide drawing such as a schematic gets most of the width under the text.
  const panoramic = images.some((image) => isDiagram(image) && (image.ratio ?? 0) >= 1.5);
  // Other diagrams stay beside the text, in a picture column a little wider than usual.
  const chart = !panoramic && images.some(isDiagram);
  // Several pictures sit two to a row. Each keeps its own shape and is never cropped:
  // widths are shared out by aspect ratio, which makes the pair the same height.
  // Tall photos are shown no taller than 3:4 so a pair never towers over the text.
  const shape = (ratio: number | null) => Math.min(Math.max(ratio ?? 4 / 3, 0.75), 2);
  const rows: (typeof images)[] = [];
  for (let at = 0; at < images.length; at += 2) rows.push(images.slice(at, at + 2));

  return (
    <li className="grid gap-x-12 gap-y-4 border-t border-line py-10 lg:grid-cols-[9rem_minmax(0,1fr)]">
      <h3
        className={cn(
          "text-sm font-semibold uppercase tracking-[0.06em]",
          reasoning ? "text-accent" : "text-dim",
        )}
      >
        {stage.label}
      </h3>

      <div className="min-w-0">
        <p
          className={cn(
            "max-w-[68ch] text-base leading-[1.75]",
            reasoning ? "text-ink" : "text-muted",
          )}
        >
          <RichText text={stage.text} />
        </p>

        {images.length > 0 ? (
          <div
            className={cn(
              "mt-6 grid content-start gap-3",
              // One photo stays modest; diagrams and groups get more room.
              only && only.url && !isDiagram(only)
                ? (only.ratio ?? 4 / 3) < 1
                  ? "max-w-[20rem]"
                  : "max-w-[30rem]"
                : panoramic || chart
                  ? "max-w-[760px]"
                  : "max-w-[860px]",
              only && only.ratio === null && "sm:grid-cols-2",
            )}
          >
            {rows.map((row) => (
              <div
                key={row[0].src}
                className={cn(
                  only ? "contents" : "flex gap-3",
                  !only &&
                    row.length === 1 &&
                    shape(row[0].ratio) < 1.9 &&
                    "w-[calc(50%-0.375rem)]",
                )}
              >
                {row.map((image) => {
                  const slot = (
                    <ImageSlot
                      src={image.src}
                      alt={image.alt}
                      ratio={String(shape(image.ratio))}
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    />
                  );
                  const share = { flex: `${shape(image.ratio)} 1 0%` };
                  return image.url ? (
                    <a
                      key={image.src}
                      href={image.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${image.alt} (opens full size)`}
                      style={share}
                      className="block min-w-0 transition-opacity hover:opacity-85"
                    >
                      {slot}
                    </a>
                  ) : (
                    <div key={image.src} style={share} className="min-w-0">
                      {slot}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}
