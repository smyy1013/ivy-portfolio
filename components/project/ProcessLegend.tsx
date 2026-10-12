import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isReasoning } from "./ProcessStage";

const pad = (n: number) => String(n).padStart(2, "0");

/** The order every project is told in: Problem, Thinking, Build, Test, Result. */
export function ProcessLegend({ className }: { className?: string }) {
  return (
    <ol
      aria-label="The process every project follows"
      className={cn("type-hud flex flex-wrap items-center gap-x-3 gap-y-2", className)}
    >
      {site.process.frame.map((label, index) => (
        <li key={label} className="flex items-center gap-3">
          <span className="text-dim">{pad(index + 1)}</span>
          <span className={isReasoning(label) ? "text-accent" : "text-ink"}>{label}</span>
          {index < site.process.frame.length - 1 ? (
            <span aria-hidden className="h-px w-6 bg-dim sm:w-10" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
