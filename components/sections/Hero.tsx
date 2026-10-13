import { HeroSchematic } from "@/components/hud/HeroSchematic";
import { Button, RichText } from "@/components/ui";
import { site } from "@/content/site";
import { getCopy } from "@/lib/copy";
import { SiteHeader } from "./SiteHeader";

export function Hero() {
  const { hero } = getCopy();

  return (
    <div id="top" className="relative flex flex-col">
      <SiteHeader />

      <div className="relative z-[5] grid gap-8 px-gutter pb-16 pt-2 sm:px-gutter-lg sm:pb-20 sm:pt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-10">
        {/* Schematic: beside the name on wider screens, above it on phones. */}
        <div className="relative flex aspect-[4/3] max-h-[30svh] w-full min-w-0 items-center justify-center overflow-hidden md:order-last md:max-h-[min(55svh,460px)]">
          <HeroSchematic className="relative h-full max-w-[640px]" />
        </div>

        <div className="@container min-w-0 max-w-[680px]">
          <h1 className="type-hero">{hero.headline}</h1>
          {hero.role ? (
            <p className="mt-5 font-mono text-xs uppercase leading-relaxed tracking-[0.08em] text-accent">
              {hero.role.split(" | ").join(" · ")}
            </p>
          ) : null}
          {hero.tagline ? (
            <p className="mt-8 text-xl font-semibold leading-snug text-ink">{hero.tagline}</p>
          ) : null}
          {hero.subtitle ? (
            <p className="mt-3 max-w-[66ch] text-base leading-relaxed text-muted"><RichText text={hero.subtitle} /></p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#work">{hero.primary}</Button>
            <Button href={site.resumeHref} variant="secondary" download>
              {hero.secondary}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
