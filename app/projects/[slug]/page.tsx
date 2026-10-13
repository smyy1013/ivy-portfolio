import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProcessStage, isUnwritten } from "@/components/project/ProcessStage";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { ImageSlot, RichText } from "@/components/ui";
import { site } from "@/content/site";
import { getProjects, projectHref, projectLabel } from "@/lib/copy";
import { resolveImage } from "@/lib/images";

// One static page per project in content/copy.md.
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((item) => item.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${site.name}`,
    description: project.result,
  };
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  // The header renders at once; the project itself resolves from the address.
  return (
    <>
      <SiteHeader home={false} />
      <Suspense fallback={<main className="min-h-svh" />}>
        <ProjectContent params={params} />
      </Suspense>
    </>
  );
}

async function ProjectContent({
  params,
}: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const projects = getProjects();
  const index = projects.findIndex((item) => item.id === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const stages = project.stages.filter(
    (stage) => site.showEmptySlots || !isUnwritten(stage.text),
  );
  const showCover = Boolean(
    project.cover && (resolveImage(project.cover.src) || site.showEmptySlots),
  );

  return (
    <main className="relative z-[5] mx-auto max-w-[1180px] px-gutter pb-24 sm:px-gutter-lg">
      <Link
        href={`/#${project.id}`}
        className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-accent"
      >
        <span aria-hidden>&larr;</span> All projects
      </Link>

      <header className="mt-10 pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          {projectLabel(project)}
        </p>
        <h1 className="type-title mt-4">{project.title}</h1>
        <p className="mt-4 text-sm text-dim">{project.meta}</p>
        <p className="mt-8 max-w-[64ch] text-lg leading-relaxed text-ink">
          <RichText text={project.result} />
        </p>
        {project.tools.length > 0 ? (
          <p className="mt-5 max-w-[80ch] text-sm leading-relaxed text-dim">
            {project.tools.join(" · ")}
          </p>
        ) : null}

        {showCover && project.cover ? (
          <ImageSlot
            src={project.cover.src}
            alt={project.cover.alt}
            ratio="16 / 9"
            priority
            original
            sizes="(min-width: 1180px) 1100px, 100vw"
            className="mt-12"
          />
        ) : null}
      </header>

      <ol>
        {stages.map((stage, stageIndex) => (
          <ProcessStage key={stage.label + stageIndex} stage={stage} />
        ))}
      </ol>

      <nav
        aria-label="More projects"
        className="mt-6 flex flex-col justify-between gap-6 border-t border-line pt-10 sm:flex-row"
      >
        {previous ? (
          <Link href={projectHref(previous)} className="group">
            <div className="text-sm text-dim">&larr; Previous</div>
            <div className="mt-1 text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              {previous.title}
            </div>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={projectHref(next)} className="group sm:text-right">
            <div className="text-sm text-dim">Next &rarr;</div>
            <div className="mt-1 text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              {next.title}
            </div>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
