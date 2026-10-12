import { ProjectCard } from "@/components/project/ProjectCard";
import { GroupHeader, SectionHeader } from "@/components/ui";
import { getCopy, getProjects } from "@/lib/copy";

export function Projects() {
  const { work } = getCopy();
  const projects = getProjects();

  return (
    <section
      id="work"
      className="relative z-[5] border-t border-line px-gutter py-20 sm:px-gutter-lg lg:pb-[120px] lg:pt-section"
    >
      <SectionHeader title={work.title} />

      {work.groups.map((group) => (
        <div key={group.title} className="mb-14 last:mb-0 lg:mb-[70px]">
          <GroupHeader>{group.title}</GroupHeader>
          {projects
            .filter((project) => project.group === group.title)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      ))}
    </section>
  );
}
