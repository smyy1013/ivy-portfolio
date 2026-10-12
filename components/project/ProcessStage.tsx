import { ImageSlot, RichText } from "@/components/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import type { ProcessStage as Stage } from "@/lib/copy";
import { imageRatio, resolveImage } from "@/lib/images";

const pad = (n: number) => String(n).padStart(2, "0");

/** True when a stage is only a "[to add: ...]" note with nothing written yet. */
export const isUnwritten = (text: string) => /^\[[^\]]+\]$/.test(text.trim());

export const isReasoning = (label: string) =>
  (site.process.reasoning as readonly string[]).includes(label.toLowerCase());

/** One stage of the process: what it is, the question it answers, the answer, the evidence. */
export async function ProcessStage({
  stage,
  number,
  last,
}: {
  stage: Stage;
  number: number;
  last: boolean;
}) {
  const question = site.process.questions[stage.label.toLowerCase()];
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
    <li
      className={cn(
        "grid gap-x-8 gap-y-4 p-5 sm:p-6 lg:py-8",
        chart
          ? "lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1.25fr)]"
          : "lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)]",
        !last && "border-b border-line",
        reasoning && "bg-accent/[0.03]",
      )}
    >
      <div>
        <div className="flex items-baseline gap-3">
          <span className="type-hud text-dim">{pad(number)}</span>
          <h3 className={cn("type-label", reasoning ? "text-accent" : "text-ink")}>
            {stage.label}
          </h3>
        </div>
        {question ? (
          <p className="mt-2 max-w-[24ch] font-mono text-[11px] leading-snug text-dim">
            {question}
          </p>
        ) : null}
      </div>

      <p
        className={cn(
          "max-w-[62ch] self-start",
          reasoning
            ? "border-l-2 border-accent pl-4 text-base leading-relaxed text-ink"
            : "text-[15px] leading-relaxed text-muted",
          (images.length === 0 || panoramic) && "lg:col-span-2",
        )}
      >
        <RichText text={stage.text} />
      </p>

      {images.length > 0 ? (
        <div
          className={cn(
            "grid content-start gap-3",
            panoramic && "lg:col-span-2 lg:col-start-2 lg:max-w-[55%]",
            // An empty slot stays small. A lone photo is kept from filling the column;
            // a lone diagram (PNG or SVG) keeps the full width so it stays readable.
            only && only.ratio === null && "sm:grid-cols-2",
            only && only.url && !/\.(png|svg)(\?|$)/i.test(only.url) &&
              ((only.ratio ?? 4 / 3) < 1 ? "max-w-[16rem]" : "max-w-[22rem]"),
          )}
        >
          {rows.map((row) => (
            <div
              key={row[0].src}
              className={cn(
                only ? "contents" : "flex gap-3",
                // An odd picture left on the last row keeps tile size instead of stretching,
                // unless it is a wide shot, which takes the whole row.
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
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  />
                );
                const share = { flex: `${shape(image.ratio)} 1 0%` };
                // A picture that exists opens at full size in a new tab.
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
    </li>
  );
}
