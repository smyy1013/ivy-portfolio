import type { ReactNode } from "react";
import { Kicker } from "./Kicker";
import { MetaBox } from "./MetaBox";
import { TitleSplit } from "./TitleSplit";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  hint?: string;
  /** Readouts on the right, such as "GROUPS: 03". */
  meta?: ReactNode;
};

export function SectionHeader({ kicker, title, hint, meta }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10 lg:mb-[60px]">
      <div>
        {kicker ? <Kicker className="mb-4">{kicker}</Kicker> : null}
        <h2 className="type-display">
          <TitleSplit text={title} />
        </h2>
        {hint ? <p className="mt-4 font-mono text-xs text-dim">{hint}</p> : null}
      </div>
      {meta ? <MetaBox className="whitespace-nowrap sm:text-right">{meta}</MetaBox> : null}
    </div>
  );
}
