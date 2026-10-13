import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProcessLegend } from "@/components/project/ProcessLegend";
import { ProcessStage, isUnwritten } from "@/components/project/ProcessStage";
import { SiteHeader } from "@/components/sections/SiteHeader";
import {
  Button,
  ContactMenu,
  GroupHeader,
  ImageSlot,
  Kicker,
  RichText,
} from "@/components/ui";
import { site } from "@/content/site";
import { getCopy, getProjects, projectHref } from "@/lib/copy";
import { resolveImage } from "@/lib/images";

const pad = (n: number) => String(n).padStart(2, "0");

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
  const { contact } = getCopy();
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
    <main className="relative z-[5] px-gutter pb-24 sm:px-gutter-lg">
      <Link
        href={`/#${project.id}`}
        className="type-hud inline-flex items-center gap-2 text-dim transition-colors hover:text-accent"
      >
        <span aria-hidden>&larr;</span> All projects
      </Link>

      {/* Outcome first: what it is, where and when, and the result */}
      <header className="mt-10 grid gap-10 border-b border-line pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          <Kicker className="mb-5">{project.group}</Kicker>
          <h1 className="type-title">{project.title}</h1>
          <p className="type-meta mt-5 text-dim">{project.meta}</p>

          <div className="mt-10 border-l-2 border-accent pl-4">
            <div className="type-hud mb-2 text-dim">Summary</div>
            <p className="max-w-[52ch] text-lg leading-snug text-ink">
              <RichText text={project.result} />
            </p>
          </div>

          {project.tools.length > 0 ? (
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <span className="type-hud mr-2 text-dim">Tools</span>
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {showCover && project.cover ? (
          <ImageSlot
            src={project.cover.src}
            alt={project.cover.alt}
            ratio="16 / 10"
            priority
            original
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : null}
      </header>

      {/* The process, stage by stage */}
      <section className="pt-14">
        <GroupHeader>Process</GroupHeader>
        <ProcessLegend className="mb-8" />
        <ol className="border border-line bg-panel/60">
          {stages.map((stage, stageIndex) => (
            <ProcessStage
              key={stage.label + stageIndex}
              stage={stage}
              number={stageIndex + 1}
              last={stageIndex === stages.length - 1}
            />
          ))}
        </ol>
      </section>

      {/* Previous and next project */}
      <nav
        aria-label="More projects"
        className="mt-14 grid gap-3 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={projectHref(previous)}
            className="group border border-line bg-panel/60 p-5 transition-colors hover:border-accent sm:p-6"
          >
            <div className="type-hud mb-3 text-dim group-hover:text-accent">
              &larr; {pad(previous.number)} Previous
            </div>
            <div className="type-card">{previous.title}</div>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={projectHref(next)}
            className="group border border-line bg-panel/60 p-5 text-right transition-colors hover:border-accent sm:p-6"
          >
            <div className="type-hud mb-3 text-dim group-hover:text-accent">
              Next {pad(next.number)} &rarr;
            </div>
            <div className="type-card">{next.title}</div>
          </Link>
        ) : null}
      </nav>

      <div className="mt-14 flex flex-col gap-3 sm:flex-row">
        <Button href="/#work">{contact.primary}</Button>
        <ContactMenu
          label={contact.secondary}
          email={site.email}
          linkedin={site.linkedin}
        />
      </div>
    </main>
  );
}
