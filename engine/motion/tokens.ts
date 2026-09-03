/**
 * Motion tokens — the fixed grammar.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md
 *
 * Values derived from the July 2026 SHOWCASE audit, which found eight competing
 * stagger steps, five reveal distances and five viewport margins expressing the
 * same three ideas. These are the consolidated defaults. Do not add new easing,
 * duration or viewport values in a client project — extend this file in the OS.
 */

/** The house curve. Fixed grammar — never varies by brand. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Brand motion character (Design Language §10, "motion personality").
 * The ease stays fixed; duration and stagger carry the brand's temperament.
 * Declared once per project in the Visual Direction Brief.
 */
export type MotionCharacter = "precise" | "considered" | "editorial";

export const CHARACTER = {
  precise: { section: 0.45, card: 0.4, hero: 0.6, stagger: 0.05 },
  considered: { section: 0.7, card: 0.5, hero: 0.8, stagger: 0.08 },
  editorial: { section: 0.85, card: 0.6, hero: 0.9, stagger: 0.12 },
} as const satisfies Record<
  MotionCharacter,
  { section: number; card: number; hero: number; stagger: number }
>;

/** Default character when a project has not declared one. */
export const DEFAULT_CHARACTER: MotionCharacter = "considered";

/** Reveal travel distance in px. `y: 24` was the clear mode (36 of 75 uses). */
export const DISTANCE = {
  sm: 12,
  md: 24,
  lg: 32,
} as const;

/** Interaction timings (seconds). */
export const INTERACTION = {
  hover: 0.2,
  press: 0.12,
  chrome: 0.3,
} as const;

/** Hover lift in px. Negative = upward. */
export const HOVER_LIFT = -4;

/**
 * Standard viewport config for scroll reveals.
 * `once: true` was already unanimous across all 57 audited call sites — keep it.
 */
export const VIEWPORT = { once: true, margin: "-60px" } as const;

/**
 * Maximum number of staggered steps before delay stops accumulating.
 * Without this a 12-card grid leaves its last card waiting over a second.
 * Only two of 25 audited stagger sites capped their delay.
 */
export const STAGGER_CAP = 5;

/** Longest permitted entrance. Anything above this reads as a gimmick. */
export const MAX_DURATION = 1.0;

/** Resolve the duration set for a character, falling back to the default. */
export function durationsFor(character: MotionCharacter = DEFAULT_CHARACTER) {
  return CHARACTER[character] ?? CHARACTER[DEFAULT_CHARACTER];
}

/**
 * Capped stagger delay for an item at `index`.
 * Delay stops growing past STAGGER_CAP so long lists never strand their tail.
 */
export function staggerDelay(
  index: number,
  step: number = CHARACTER[DEFAULT_CHARACTER].stagger,
  cap: number = STAGGER_CAP,
): number {
  return Math.min(Math.max(index, 0), cap) * step;
}
