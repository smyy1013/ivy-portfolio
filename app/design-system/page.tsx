import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BracketFrame,
  Button,
  ContactMenu,
  GroupHeader,
  ImageSlot,
  Kicker,
  LiveTag,
  MetaBox,
  RichText,
  SectionHeader,
} from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Design System | Ivy Yoon" };

const colors = [
  { name: "bg", value: "#050505", use: "Page background" },
  { name: "panel", value: "#0D0D0F", use: "Cards, frames, image slots" },
  { name: "ink", value: "#FFFFFF", use: "Headings, primary text" },
  { name: "muted", value: "#8F8F8F", use: "Paragraph text" },
  { name: "dim", value: "#707070", use: "Outlines, quiet HUD text" },
  { name: "accent", value: "#00F5FF", use: "Signal cyan, the brand accent" },
  { name: "warning", value: "#FF3E00", use: "Live tag, hover, unfinished copy" },
  { name: "line", value: "white 7%", use: "Borders and dividers" },
];

const type = [
  { cls: "type-display", name: "type-display", note: "Section titles", sample: "What I Build" },
  { cls: "type-hero", name: "type-hero", note: "Hero headline", sample: "Metal that moves." },
  { cls: "type-title", name: "type-title", note: "Contact headline", sample: "Have a mechanism?" },
  { cls: "type-heading", name: "type-heading", note: "Story titles", sample: "The night I learned" },
  { cls: "type-card", name: "type-card", note: "Project titles", sample: "Wheel speed sensor PCB" },
  {
    cls: "type-body text-muted",
    name: "type-body",
    note: "Captions and reading text",
    sample: "A Hall switch that fires once per revolution updates only once per second at 3.6 mph.",
  },
  {
    cls: "type-mono-body text-muted",
    name: "type-mono-body",
    note: "Introductions and stories",
    sample: "The work I like most happens where a mechanism meets a sensor and a controller.",
  },
  { cls: "type-label", name: "type-label", note: "Group headers", sample: "Student Teams" },
  {
    cls: "type-meta text-dim",
    name: "type-meta",
    note: "Where and when",
    sample: "Eco Illini Supermileage · Aug 2026 to present",
  },
  { cls: "type-hud text-accent", name: "type-hud", note: "Kickers, readouts", sample: "SEC.02 // PROJECT_ARCHIVE" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <GroupHeader>{title}</GroupHeader>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="relative z-[5] px-gutter py-16 sm:px-gutter-lg">
      <SectionHeader
        kicker="SYS.00 // DESIGN_SYSTEM"
        title="Design System"
        hint="Tokens live in app/globals.css. Components live in components/ui."
        meta={
          <>
            <div>FONT: PRETENDARD</div>
            <div className="text-accent">MONO: JETBRAINS MONO</div>
          </>
        }
      />
      <p className="type-mono-body mb-14 max-w-[70ch] text-muted">
        <Link href="/" className="text-accent underline underline-offset-4">
          Back to the portfolio
        </Link>
      </p>

      <Block title="Color">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {colors.map((color) => (
            <div key={color.name} className="border border-line bg-panel/60">
              <div
                className="h-20 border-b border-line"
                style={{ background: `var(--color-${color.name})` }}
              />
              <div className="p-3">
                <div className="type-label tracking-normal">{color.name}</div>
                <div className="type-meta mt-1 text-accent">{color.value}</div>
                <div className="type-body mt-1 text-muted">{color.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Typography">
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="border border-line bg-panel/60 p-6">
            <Kicker className="mb-3">Sans / Pretendard Variable</Kicker>
            <p className="text-5xl font-black">Aa 가나다 0123</p>
            <p className="type-body mt-4 text-muted">
              금속은 움직이고, 신호는 방향을 잡는다. The quick brown fox jumps over the lazy dog.
            </p>
            <p className="type-meta mt-4 flex flex-wrap gap-x-4 gap-y-1 text-dim">
              <span className="font-normal normal-case">Regular 400</span>
              <span className="font-semibold normal-case">SemiBold 600</span>
              <span className="font-bold normal-case">Bold 700</span>
              <span className="font-black normal-case">Black 900</span>
            </p>
          </div>
          <div className="border border-line bg-panel/60 p-6">
            <Kicker className="mb-3">Mono / JetBrains Mono</Kicker>
            <p className="font-mono text-5xl font-bold">Aa 0123 //</p>
            <p className="type-mono-body mt-4 text-muted">
              X:0412 Y:0288 · 12-bit ADC at 200 to 500 Hz · 1.5 mm air gap
            </p>
          </div>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {type.map((row) => (
            <div key={row.name} className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-8">
              <div>
                <div className="font-mono text-xs text-accent">{row.name}</div>
                <div className="type-meta mt-1 text-dim">{row.note}</div>
              </div>
              <div className={row.cls}>{row.sample}</div>
            </div>
          ))}
          <div className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-8">
            <div>
              <div className="font-mono text-xs text-accent">text-outline</div>
              <div className="type-meta mt-1 text-dim">Hollow second word</div>
            </div>
            <div className="type-display">
              How I <span className="text-outline">Work</span>
            </div>
          </div>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex max-w-md flex-col gap-3">
          <Button href="#">Primary: See What I&apos;ve Built</Button>
          <Button href="#" variant="secondary">
            Secondary: Download Resume
          </Button>
          <ContactMenu
            label="Contact menu: Get in Touch"
            email={site.email}
            linkedin={site.linkedin}
          />
        </div>
      </Block>

      <Block title="Labels and readouts">
        <div className="flex flex-wrap items-start gap-10">
          <Kicker>SEC.02 // PROJECT_ARCHIVE</Kicker>
          <div className="type-hud">
            <LiveTag />
            SYS.OPERATIONAL
          </div>
          <MetaBox>
            <div>GROUPS: 03</div>
            <div className="text-accent">ENTRIES: 08</div>
          </MetaBox>
          <p className="type-body text-muted">
            <RichText text="Unfinished copy stays visible: [term and year]" />
          </p>
        </div>
      </Block>

      <Block title="Image slots">
        <p className="type-body mb-6 max-w-[70ch] text-muted">
          A slot shows its picture when the file exists in public/images, and a labelled
          placeholder when it does not. Three ratios are in use.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <ImageSlot src="images/example-cover.jpg" alt="Cover picture, 16:10" ratio="16 / 10" />
            <div className="type-meta mt-2 text-dim">Project cover · 16 / 10</div>
          </div>
          <div>
            <ImageSlot src="images/example-step.jpg" alt="Process step, 4:3" />
            <div className="type-meta mt-2 text-dim">Process step · 4 / 3</div>
          </div>
          <div>
            <ImageSlot src="images/example-story.jpg" alt="Story picture, 16:9" ratio="16 / 9" />
            <div className="type-meta mt-2 text-dim">Story · 16 / 9</div>
          </div>
        </div>
      </Block>

      <Block title="Frames">
        <BracketFrame className="max-w-xl p-10 text-center">
          <Kicker className="mb-4">SEC.04 // CONTACT</Kicker>
          <p className="type-heading">Bracket frame</p>
        </BracketFrame>
      </Block>

      <Block title="Breakpoints and spacing">
        <div className="type-mono-body grid gap-2 text-muted md:grid-cols-2">
          <div>Mobile: below 640px, 20px gutter, single column</div>
          <div>sm 640px: 40px gutter, process steps in 2 columns</div>
          <div>md 768px: project header becomes one row</div>
          <div>lg 1024px: three-column hero, stories side by side</div>
          <div>xl 1280px: process steps in 4 columns</div>
          <div>Section padding: 80px mobile, 100px desktop</div>
        </div>
      </Block>
    </main>
  );
}
