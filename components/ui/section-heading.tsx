import { Reveal } from "@/engine/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  heading: ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "ink" | "light";
  className?: string;
  headingClassName?: string;
}

/** Eyebrow (with gold mark) → H2 → lead. The house section header. */
export function SectionHeading({
  eyebrow,
  heading,
  lead,
  align = "left",
  tone = "ink",
  className,
  headingClassName,
}: Props) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className={cn("eyebrow", light && "text-white/60")}>
            <span className="eyebrow-mark" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={eyebrow ? 0.05 : 0}>
        <h2
          className={cn(
            "mt-4 text-3xl md:text-4xl lg:text-[2.9rem] lg:leading-[1.06] tracking-tight",
            light ? "text-white" : "text-ink",
            headingClassName,
          )}
        >
          {heading}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-base md:text-lg leading-relaxed measure",
              align === "center" && "mx-auto",
              light ? "text-white/70" : "text-ink-2",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
