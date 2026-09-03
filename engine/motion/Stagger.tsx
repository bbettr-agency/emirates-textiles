"use client";

/**
 * Stagger — sequences a group of sibling reveals.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §4
 *
 *   <Stagger className="grid gap-6 md:grid-cols-3">
 *     {services.map((s) => (
 *       <Reveal key={s.slug} preset="fadeUpItem">…</Reveal>
 *     ))}
 *   </Stagger>
 *
 * Injects `index` into each <Reveal> child so authors never thread it manually —
 * the audit found ten different hand-written delay formulas (`i * 0.04` through
 * `0.3 + i * 0.12`) expressing one idea, and only two of twenty-five capped the
 * delay. Here the cap is structural (tokens.STAGGER_CAP): a twenty-item grid
 * cannot strand its last item.
 */

import { Children, cloneElement, isValidElement, type ReactNode } from "react";

export interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Rendered wrapper element. Use a semantic tag where one applies. */
  as?: "div" | "ul" | "ol" | "section";
  /** Index offset, for a group continuing a sequence started elsewhere. */
  startIndex?: number;
}

export function Stagger({
  children,
  className,
  as: Tag = "div",
  startIndex = 0,
}: StaggerProps) {
  return (
    <Tag className={className}>
      {Children.map(children, (child, i) =>
        isValidElement<{ index?: number }>(child)
          ? cloneElement(child, { index: startIndex + i })
          : child,
      )}
    </Tag>
  );
}
