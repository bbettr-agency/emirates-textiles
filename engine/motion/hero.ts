/**
 * Hero entrance ladder.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §5
 *           SYSTEM/DESIGN-LANGUAGE/01-HERO-SYSTEM.md
 *
 * Replaces five bespoke delay ladders found in production (0.8/0.15 on three
 * sites; 0/0.35/0.55/0.75 and 0/0.1/0.35/0.5/0.75 on two more).
 *
 * THE RULE THIS ENCODES: the LCP element never animates in. All five audited
 * sites wrapped their hero H1 in `initial={{ opacity: 0 }}`, so the largest
 * text on the page was invisible at first paint and absent for any visitor
 * without JavaScript. One site delayed its H1 to roughly 950ms.
 *
 *   const hero = heroStack({ character: "considered" });
 *
 *   <h1 {...hero.lcp}>…</h1>              // no animation. Paints immediately.
 *   <Reveal eager {...hero.step(0)}>…</Reveal>   // supporting copy
 *   <Reveal eager {...hero.step(1)}>…</Reveal>   // CTAs
 *   <Reveal eager {...hero.step(2)}>…</Reveal>   // trust row
 */

import { MAX_DURATION, durationsFor, type MotionCharacter } from "./tokens";

export interface HeroStackOptions {
  character?: MotionCharacter;
  /** Seconds between rungs. Defaults to the character's stagger. */
  step?: number;
}

export interface HeroStep {
  /** Always true — hero content is above the fold and animates on mount. */
  eager: true;
  delay: number;
  character?: MotionCharacter;
}

export interface HeroStack {
  /**
   * Props for the LCP element (the H1, and any `priority` hero image).
   * Deliberately empty: this element must render at first paint. Spreading it
   * documents the decision at the call site rather than leaving it implicit.
   */
  lcp: Record<string, never>;
  /** Props for supporting element `n`, entering after the LCP content. */
  step: (n: number) => HeroStep;
  /** Entrance duration for this character, for hand-rolled cases. */
  duration: number;
}

export function heroStack({ character, step }: HeroStackOptions = {}): HeroStack {
  const durations = durationsFor(character);
  const gap = step ?? durations.stagger;
  const duration = Math.min(durations.hero, MAX_DURATION);

  return {
    lcp: Object.freeze({}) as Record<string, never>,
    step: (n: number): HeroStep => ({
      eager: true,
      delay: Math.max(n, 0) * gap,
      character,
    }),
    duration,
  };
}
