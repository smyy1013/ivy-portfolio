import fs from "node:fs";
import path from "node:path";

/**
 * Reads content/copy.md and turns it into typed data for the page.
 * copy.md is the single source of truth for every word on the site:
 * edit the markdown, rebuild, and the page follows.
 */

export type CopyImage = { src: string; alt: string };

/** One stage of a project's engineering process, such as Problem or Thinking. */
export type ProcessStage = {
  label: string;
  text: string;
  images: CopyImage[];
};

export type Project = {
  id: string;
  title: string;
  meta: string;
  cover: CopyImage | null;
  result: string;
  tools: string[];
  stages: ProcessStage[];
};

export type ProjectGroup = { title: string; projects: Project[] };

export type Story = {
  title: string;
  image: CopyImage | null;
  /** A paragraph that starts with ">" in copy.md is rendered as a pull quote. */
  paragraphs: { text: string; quote: boolean }[];
};

/** One entry in the "Beyond the Bench" section: a trade show, event, or outreach. */
export type Happening = {
  title: string;
  /** The line under the title, such as "Chicago, IL · Sep 2026". */
  meta: string;
  images: CopyImage[];
  paragraphs: string[];
};

/** One role in the Experience section. */
export type Role = {
  org: string;
  /** "Engineering Intern · May to Aug 2026" */
  meta: string;
  /** Lines in copy.md that start with "- ". */
  points: string[];
};

export type Copy = {
  hero: {
    headline: string;
    /** Short slogan under the name. Optional. */
    tagline: string | null;
    /** Who and where. " | " starts a new line. Optional. */
    role: string | null;
    /** A sentence of introduction. Optional. */
    subtitle: string | null;
    primary: string;
    secondary: string;
  };
  work: { title: string; groups: ProjectGroup[] };
  how: { title: string; stories: Story[] };
  /** Optional "# Experience" section, shown right after the hero. */
  experience: { title: string; roles: Role[] } | null;
  /** Optional section between How I Work and the contact block. */
  beyond: { title: string; intro: string | null; entries: Happening[] } | null;
  contact: {
    title: string;
    headline: string;
    paragraphs: string[];
    primary: string;
    secondary: string;
  };
};

const IMAGE = /!\[(.*?)\]\((.*?)\)/;
const STEP = /^\d+\.\s+\*\*(.+?)\.?\*\*\s*(.*)$/;

function splitBy(source: string, marker: string) {
  const out: { title: string; body: string }[] = [];
  let current: { title: string; lines: string[] } | null = null;
  for (const line of source.split("\n")) {
    if (line.startsWith(marker + " ")) {
      if (current) out.push({ title: current.title, body: current.lines.join("\n") });
      current = { title: line.slice(marker.length + 1).trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) out.push({ title: current.title, body: current.lines.join("\n") });
  return out;
}

function optionalField(body: string, name: string) {
  const match = body.match(new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.+)$`, "m"));
  return match ? match[1].trim() : null;
}

function field(body: string, name: string, where: string) {
  const value = optionalField(body, name);
  if (value === null) throw new Error(`copy.md: "${where}" is missing a "**${name}:**" line.`);
  return value;
}

function image(text: string): CopyImage | null {
  const match = text.match(IMAGE);
  return match ? { alt: match[1].trim(), src: match[2].trim() } : null;
}

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Plain paragraphs: skips images, "**Field:**" lines, and layout notes. */
function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block && !IMAGE.test(block) && !/^\*\*[^*]+:\*\*/.test(block));
}

function parseProject(title: string, body: string): Project {
  const lines = body.split("\n");
  const meta = lines.find((line) => line.trim())?.trim() ?? "";
  const stepsStart = lines.findIndex((line) => STEP.test(line.trim()));
  const head = (stepsStart === -1 ? lines : lines.slice(0, stepsStart)).join("\n");

  const stages: ProcessStage[] = [];
  if (stepsStart !== -1) {
    for (const raw of lines.slice(stepsStart)) {
      const line = raw.trim();
      const step = line.match(STEP);
      if (step) {
        stages.push({ label: step[1].trim(), text: step[2].trim(), images: [] });
      } else if (stages.length) {
        // Every picture line under a stage belongs to that stage.
        const picture = image(line);
        if (picture) stages[stages.length - 1].images.push(picture);
      }
    }
  }

  return {
    id: slug(title),
    title,
    meta,
    cover: image(head),
    result: field(head, "Result", title),
    tools: (optionalField(head, "Tools") ?? "")
      .split(",")
      .map((tool) => tool.trim())
      .filter(Boolean),
    stages,
  };
}

function parse(source: string): Copy {
  const sections = splitBy(source, "#");
  const find = (index: number, name: string) => {
    const section = sections[index];
    if (!section) throw new Error(`copy.md: expected a "# ${name}" section.`);
    return section;
  };

  // Sections are found by title, so optional ones can come and go. The first
  // section is always the hero and the last is always the contact block.
  const named = (title: string) =>
    sections.find((section) => section.title.toLowerCase() === title.toLowerCase()) ?? null;
  const hero = find(0, "Hero");
  const work = named("What I Build") ?? find(1, "What I Build");
  const how = named("How I Work") ?? find(2, "How I Work");
  const contact = find(sections.length - 1, "Let's Build Something");
  const extra = named("Beyond the Bench");
  const experienceSection = named("Experience");

  return {
    hero: {
      headline: field(hero.body, "Headline", "Hero"),
      tagline: optionalField(hero.body, "Tagline"),
      role: optionalField(hero.body, "Role"),
      subtitle: optionalField(hero.body, "Subtitle"),
      primary: field(hero.body, "Primary button", "Hero"),
      secondary: field(hero.body, "Secondary button", "Hero"),
    },
    work: {
      title: work.title,
      groups: splitBy(work.body, "##").map((group) => ({
        title: group.title,
        projects: splitBy(group.body, "###").map((p) => parseProject(p.title, p.body)),
      })),
    },
    how: {
      title: how.title,
      stories: splitBy(how.body, "###").map((story) => ({
        title: story.title,
        image: image(story.body),
        paragraphs: paragraphs(story.body).map((text) => ({
          quote: text.startsWith(">"),
          text: text.replace(/^>\s*/, ""),
        })),
      })),
    },
    experience: experienceSection
      ? {
          title: experienceSection.title,
          roles: splitBy(experienceSection.body, "###").map((role) => {
            const lines = role.body.split("\n").map((line) => line.trim()).filter(Boolean);
            return {
              org: role.title,
              meta: lines.find((line) => !line.startsWith("- ")) ?? "",
              points: lines.filter((line) => line.startsWith("- ")).map((line) => line.slice(2).trim()),
            };
          }),
        }
      : null,
    beyond: extra
      ? {
          title: extra.title,
          intro:
            paragraphs(extra.body.split(/^### /m)[0]).find((text) => !text.startsWith(">")) ??
            null,
          entries: splitBy(extra.body, "###").map((entry) => {
            const lines = entry.body.split("\n");
            const meta = lines.find((line) => line.trim())?.trim() ?? "";
            const rest = lines.slice(lines.findIndex((line) => line.trim()) + 1).join("\n");
            return {
              title: entry.title,
              meta: IMAGE.test(meta) ? "" : meta,
              images: lines.map((line) => image(line)).filter((pic): pic is CopyImage => pic !== null),
              paragraphs: paragraphs(IMAGE.test(meta) ? entry.body : rest),
            };
          }),
        }
      : null,
    contact: {
      title: contact.title,
      headline: field(contact.body, "Headline", contact.title),
      paragraphs: paragraphs(contact.body),
      primary: field(contact.body, "Primary button", contact.title),
      secondary: field(contact.body, "Secondary button", contact.title),
    },
  };
}

/** Every project in page order, with its number (1 to 8) and the group it belongs to. */
export type NumberedProject = Project & { number: number; group: string };

const FILE = path.join(process.cwd(), "content", "copy.md");

let cache: { mtimeMs: number; copy: Copy; projects: NumberedProject[] } | null = null;

/**
 * Parses copy.md, and parses it again whenever the file has been saved since
 * the last read. That way an edit to copy.md shows up on the next page refresh
 * while `npm run dev` is running, without restarting it.
 */
function load() {
  const { mtimeMs } = fs.statSync(FILE);
  if (!cache || cache.mtimeMs !== mtimeMs) {
    const copy = parse(fs.readFileSync(FILE, "utf-8"));
    const projects = copy.work.groups
      .flatMap((group) => group.projects.map((project) => ({ ...project, group: group.title })))
      .map((project, index) => ({ ...project, number: index + 1 }));
    cache = { mtimeMs, copy, projects };
  }
  return cache;
}

export function getCopy(): Copy {
  return load().copy;
}

export function getProjects(): NumberedProject[] {
  return load().projects;
}

export function projectHref(project: Pick<Project, "id">) {
  return `/projects/${project.id}`;
}
