import { HeroSchematic } from "@/components/hud/HeroSchematic";
import { Button } from "@/components/ui";
import { site } from "@/content/site";
import { getCopy } from "@/lib/copy";
import { SiteHeader } from "./SiteHeader";

export function Hero() {
  const { hero } = getCopy();

  return (
    <div id="top" className="relative flex flex-col">
      <SiteHeader />

      {/* Sized by its content, not the screen, so the project list starts close below. */}
      <div className="relative z-[5] grid gap-6 px-gutter pb-14 sm:grid-cols-2 sm:items-center sm:gap-10 sm:px-gutter-lg sm:pb-16 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* Schematic. It sits beside the name from 640px up, and above it on phones. */}
        <div className="relative flex aspect-[4/3] max-h-[30svh] w-full min-w-0 items-center justify-center overflow-hidden sm:max-h-[min(50svh,440px)]">
          <HeroSchematic className="relative h-full max-w-[800px]" />
        </div>

        {/* Name, slogan, who and where, and calls to action */}
        <div className="@container flex min-w-0 flex-col gap-8">
          <div>
            <h1 className="type-hero">{hero.headline}</h1>
            {hero.tagline ? (
              <p className="mt-4 text-lg font-bold leading-snug tracking-[-0.01em] text-ink">
                {hero.tagline}
              </p>
            ) : null}
            {hero.role ? (
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-accent">
                {hero.role.split(" | ").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : null}
            {hero.subtitle ? (
              <p className="mt-3 max-w-[360px] font-mono text-sm leading-[1.6] text-muted">
                {hero.subtitle}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
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
