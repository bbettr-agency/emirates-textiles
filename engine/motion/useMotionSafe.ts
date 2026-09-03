"use client";

/**
 * Reduced-motion access.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §7
 *
 * WHY THIS EXISTS: the July 2026 audit found 96 animations across five
 * production sites running at full amplitude for users who had asked their OS
 * to stop motion. Two of those sites shipped the global CSS override
 * (`*{animation-duration:0.001ms!important}`) and believed they were covered.
 * They were not — Motion writes inline style values on animation frames, so it
 * never consults CSS `animation-duration` or `transition-duration`.
 *
 * The only reliable controls are `<MotionConfig reducedMotion="user">` (applied
 * by MotionProvider) and this hook for anything hand-rolled: rAF loops,
 * counters, autoplay, scroll effects.
 */

import { useReducedMotion } from "motion/react";

/**
 * `true` when the user has asked for reduced motion.
 *
 * Returns `false` during SSR and the first client render so that markup matches
 * between server and client; Motion updates it immediately after hydration.
 */
export function useMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
