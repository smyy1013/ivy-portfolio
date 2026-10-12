import Link from "next/link";
import { ImageSlot, RichText } from "@/components/ui";
import { site } from "@/content/site";
import { projectHref, type NumberedProject } from "@/lib/copy";
import { resolveImage } from "@/lib/images";

const pad = (n: number) => String(n).padStart(2, "0");

/** Home-page card: the outcome at a glance, linking to the project's own page. */
export function ProjectCard({ project }: { project: NumberedProject }) {
  const showCover = Boolean(
    project.cover && (resolveImage(project.cover.src) || site.showEmptySlots),
  );

  return (
    <Link
      id={project.id}
      href={projectHref(project)}
      className="project-summary group mb-3 scroll-mt-6 border border-l-2 border-line bg-panel/60 transition-colors duration-300 hover:border-accent hover:border-l-accent"
      data-cover={showCover}
    >
      <span
        data-area="index"
        className="pt-1 font-mono text-xs text-dim transition-colors group-hover:text-accent"
      >
        {pad(project.number)}
      </span>

      {showCover && project.cover ? (
        <div data-area="cover">
          <ImageSlot
            src={project.cover.src}
            alt={project.cover.alt}
            ratio="16 / 10"
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 240px, 100vw"
          />
        </div>
      ) : null}

      <div data-area="text" className="min-w-0">
        <h4 className="type-card">{project.title}</h4>
        <p className="type-meta mt-2 text-dim">{project.meta}</p>
        <p className="mt-4 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="type-hud shrink-0 text-dim">Result</span>
          <span className="max-w-[60ch] text-[15px] leading-snug text-accent">
            <RichText text={project.result} />
          </span>
        </p>
      </div>

      <span
        data-area="toggle"
        aria-hidden
        className="text-center font-mono text-xl leading-none text-accent transition-transform duration-300 group-hover:translate-x-1.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
