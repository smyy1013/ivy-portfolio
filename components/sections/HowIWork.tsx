import { ImageSlot, RichText, SectionHeader } from "@/components/ui";
import { getCopy } from "@/lib/copy";

export function HowIWork() {
  const { how } = getCopy();

  return (
    <section
      id="how"
      className="relative z-[5] border-t border-line px-gutter py-20 sm:px-gutter-lg lg:pb-[140px] lg:pt-section"
    >
      <SectionHeader title={how.title} />

      <div className="grid gap-y-16 lg:grid-cols-2">
        {how.stories.map((story) => (
          <article
            key={story.title}
            className="lg:px-[50px] lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-line"
          >
            <h3 className="type-heading mb-7">{story.title}</h3>
            {story.image ? (
              <ImageSlot
                src={story.image.src}
                alt={story.image.alt}
                ratio="16 / 9"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="mb-7"
              />
            ) : null}
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph.text}
                className={
                  paragraph.quote
                    ? "type-mono-body mb-[18px] border-l-2 border-accent pl-4 text-ink"
                    : "type-mono-body mb-[18px] text-muted"
                }
              >
                <RichText text={paragraph.text} />
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
