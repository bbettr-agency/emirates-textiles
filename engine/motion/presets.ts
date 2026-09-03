/**
 * Motion presets — the approved vocabulary.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md
 *
 * Every preset here replaces a pattern proven in 2+ production sites. Presets
 * return plain Motion prop objects so they can be spread onto any `m.*` element:
 *
 *   <m.div {...fadeUp()}>…</m.div>
 *
 * Each accepts `reduced` so callers can collapse motion at the call site. The
 * MotionProvider also sets `reducedMotion="user"` globally, which suppresses
 * transform/layout animation; passing `reduced` additionally drops the opacity
 * fade, which is what a truly still interface requires.
 */

import {
  DISTANCE,
  EASE,
  durationsFor,
  staggerDelay,
  type MotionCharacter,
} from "./tokens";

export interface PresetOptions {
  /** Brand motion character. Defaults to the project's declared character. */
  character?: MotionCharacter;
  /** Index within a staggered group. Delay is capped automatically. */
  index?: number;
  /** Extra delay in seconds, added after the staggered delay. */
  delay?: number;
  /**
   * Collapse to a still state. Pass `useReducedMotion()` from `./useMotionSafe`.
   * Content still renders — only the motion is removed.
   */
  reduced?: boolean;
  /**
   * Animate on mount instead of on scroll into view.
   * REQUIRED for anything above the fold — an IntersectionObserver that has not
   * fired yet leaves content invisible on first paint.
   */
  eager?: boolean;
  /**
   * Reveal state, owned by <Reveal>. The animation is DRIVEN BY STATE, not by
   * Motion's `whileInView`: <Reveal> flips this to `true` the instant the element
   * is in view (or has been scrolled past, or after a layout shift), so content
   * can never be stranded invisible by a missed IntersectionObserver callback.
   */
  shown?: boolean;
}

/** Motion props consumed by `m.*` elements. State-driven: `initial` → `animate`. */
export interface MotionProps {
  initial: Record<string, number>;
  animate: Record<string, number>;
  transition: { duration: number; delay?: number; ease?: typeof EASE };
}

/**
 * Shared assembly. Reliability rule (SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM §5):
 * content must never depend on animation to be visible. The reveal is therefore
 * state-driven — `animate` targets the hidden `from` state until <Reveal> sets
 * `shown`, then the visible `to` state. No `whileInView`, so nothing waits on an
 * observer that a fast scroll or slow device might skip.
 */
function build(
  from: Record<string, number>,
  to: Record<string, number>,
  duration: number,
  { index = 0, delay = 0, reduced = false, eager = false, character, shown = false }: PresetOptions,
): MotionProps {
  if (reduced) {
    // Render in the final state, with no transition of any kind.
    return { initial: to, animate: to, transition: { duration: 0 } };
  }

  const step = durationsFor(character).stagger;
  const total = staggerDelay(index, step) + delay;
  const transition = {
    duration,
    ease: EASE,
    ...(total > 0 ? { delay: total } : {}),
  };

  if (eager) {
    // Above the fold, the opacity fade is dropped entirely: Motion writes the
    // `initial` state into the server-rendered HTML, so an opacity of 0 would
    // leave the hero blank until hydration — invisible to a slow connection,
    // to a JavaScript failure, and to anything measuring LCP. Transform-only
    // entrances paint immediately and still read as an entrance.
    const { opacity: _dropped, ...visible } = from;
    return { initial: visible, animate: shown ? to : visible, transition };
  }

  return { initial: from, animate: shown ? to : from, transition };
}

/**
 * The house reveal. Replaces 57 hand-written call sites across five sites.
 * Use for section headings, copy blocks and any block-level content.
 */
export function fadeUp(options: PresetOptions = {}): MotionProps {
  const { section } = durationsFor(options.character);
  return build(
    { opacity: 0, y: DISTANCE.md },
    { opacity: 1, y: 0 },
    section,
    options,
  );
}

/**
 * Opacity-only reveal. Use where vertical travel would fight a tight layout —
 * table rows, FAQ items, inline chips.
 */
export function fadeIn(options: PresetOptions = {}): MotionProps {
  const { card } = durationsFor(options.character);
  return build({ opacity: 0 }, { opacity: 1 }, card, options);
}

/** Card / list-item reveal. Shorter than a section reveal; expects `index`. */
export function fadeUpItem(options: PresetOptions = {}): MotionProps {
  const { card } = durationsFor(options.character);
  return build(
    { opacity: 0, y: DISTANCE.md },
    { opacity: 1, y: 0 },
    card,
    options,
  );
}

/**
 * Confirmation / success emphasis. Reserved for moments that have earned it —
 * thank-you pages, submitted states. Never for decoration.
 */
export function scaleIn(options: PresetOptions = {}): MotionProps {
  const { card } = durationsFor(options.character);
  return build(
    { opacity: 0, scale: 0.85 },
    { opacity: 1, scale: 1 },
    card,
    options,
  );
}

/**
 * Slow settle for photography.
 *
 * SAFETY: never wrap the LCP image in this. It animates `scale` only, so the
 * image is painted at full opacity from the first frame and `priority`
 * preloading is preserved. Opacity is deliberately absent — the audit found a
 * production hero where a 1.2s opacity fade defeated its own `priority` hint.
 */
export function imageReveal(options: PresetOptions = {}): MotionProps {
  const { hero } = durationsFor(options.character);
  return build({ scale: 1.06 }, { scale: 1 }, hero, options);
}

/** Horizontal reveal for side-entering content. Direction follows reading order. */
export function slideX(
  options: PresetOptions & { from?: "left" | "right" } = {},
): MotionProps {
  const { section } = durationsFor(options.character);
  const offset = options.from === "left" ? -DISTANCE.md : DISTANCE.md;
  return build({ opacity: 0, x: offset }, { opacity: 1, x: 0 }, section, options);
}
