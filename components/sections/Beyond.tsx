import { ImageSlot, RichText, SectionHeader } from "@/components/ui";
import { resolveImage } from "@/lib/images";
import { getCopy } from "@/lib/copy";

/**
 * Trade shows, events, and outreach. Each "###" entry in the "# Beyond the Bench"
 * section of copy.md becomes a card. The section is hidden while it has no entries.
 */
export function Beyond() {
  const { beyond } = getCopy();
  if (!beyond || beyond.entries.length === 0) return null;

  return (
    <section
      id="beyond"
      className="relative z-[5] border-t border-line px-gutter py-20 sm:px-gutter-lg lg:pb-[140px] lg:pt-section"
    >
      <SectionHeader title={beyond.title} hint={beyond.intro ?? undefined} />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {beyond.entries.map((entry) => {
          const pictures = entry.images.filter((picture) => resolveImage(picture.src));
          return (
            <article key={entry.title} className="flex flex-col border border-line bg-panel/60">
              {pictures[0] ? (
                <ImageSlot
                  src={pictures[0].src}
                  alt={pictures[0].alt}
                  ratio="16 / 10"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  className="border-0 border-b"
                />
              ) : null}
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <h3 className="type-heading">{entry.title}</h3>
                {entry.meta ? <p className="type-hud text-dim">{entry.meta}</p> : null}
                {entry.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
              {pictures.length > 1 ? (
                <div className="grid grid-cols-2 gap-2 px-5 pb-5 sm:px-6 sm:pb-6">
                  {pictures.slice(1, 3).map((picture) => (
                    <ImageSlot
                      key={picture.src}
                      src={picture.src}
                      alt={picture.alt}
                      sizes="(min-width: 768px) 20vw, 50vw"
                    />
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
