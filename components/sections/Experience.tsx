import { RichText, SectionHeader } from "@/components/ui";
import { getCopy } from "@/lib/copy";

/**
 * Where I have worked and what I did there, read straight from the
 * "# Experience" section of copy.md. Hidden when that section is missing.
 */
export function Experience() {
  const { experience } = getCopy();
  if (!experience || experience.roles.length === 0) return null;

  return (
    <section
      id="experience"
      className="relative z-[5] border-t border-line px-gutter py-20 sm:px-gutter-lg lg:pb-[120px] lg:pt-section"
    >
      <SectionHeader title={experience.title} />
      <ol className="divide-y divide-line border-y border-line">
        {experience.roles.map((role) => (
          <li
            key={role.org + role.meta}
            className="grid gap-3 py-6 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-10"
          >
            <div>
              <h3 className="type-card">{role.org}</h3>
              <p className="type-meta mt-2 text-dim">{role.meta}</p>
            </div>
            <ul className="flex flex-col gap-2">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-4 text-[15px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:bg-accent"
                >
                  <RichText text={point} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
