import { Fragment } from "react";

/**
 * Renders copy text and highlights unfinished placeholders such as
 * "[term and year]" or "[to add: ...]" so they are not published by accident.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, index) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark key={index} className="todo">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
