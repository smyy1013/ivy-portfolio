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
      className="project-summary group scroll-mt-6 border-b border-line transition-colors hover:bg-panel"
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
        <h4 className="type-card transition-colors group-hover:text-accent">{project.title}</h4>
        <p className="type-meta mt-2 text-dim">{project.meta}</p>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-muted">
          <RichText text={project.result} />
        </p>
      </div>

      <span
        data-area="toggle"
        aria-hidden
        className="text-center text-lg leading-none text-dim transition-colors group-hover:text-accent"
      >
        &rarr;
      </span>
    </Link>
  );
}
