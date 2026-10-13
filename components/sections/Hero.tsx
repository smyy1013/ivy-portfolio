import { Button } from "@/components/ui";
import { site } from "@/content/site";
import { getCopy } from "@/lib/copy";
import { SiteHeader } from "./SiteHeader";

export function Hero() {
  const { hero } = getCopy();

  return (
    <div id="top" className="relative flex flex-col">
      <SiteHeader />

      <div className="relative z-[5] px-gutter pb-16 pt-6 sm:px-gutter-lg sm:pb-20 sm:pt-10">
        <div className="@container max-w-[560px]">
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
            <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-muted">{hero.subtitle}</p>
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
