import { Fragment } from "react";

const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

/**
 * Renders copy text. [text](url) becomes a link. Unfinished placeholders such as
 * "[to add: ...]" are highlighted so they are not published by accident.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(LINK);
        if (link) {
          const external = /^https?:/.test(link[2]);
          return (
            <a
              key={index}
              href={link[2]}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-ink underline decoration-accent/60 underline-offset-[3px] transition-colors hover:text-accent"
            >
              {link[1]}
            </a>
          );
        }
        return /^\[[^\]]+\]$/.test(part) ? (
          <mark key={index} className="todo">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        );
      })}
    </>
  );
}
