"use client";

/**
 * MotionProvider — mount once in the root layout, inside <body>.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §7
 *
 * Does two structural jobs that discipline alone has never achieved:
 *
 * 1. `reducedMotion="user"` makes every Motion animation in the tree honour the
 *    operating-system preference. Opting out is not possible from a component.
 *
 * 2. `LazyMotion … strict` throws at runtime if any component imports the full
 *    `motion` proxy instead of `m`. That keeps the animation bundle at the
 *    smaller `domAnimation` feature set (SYSTEM/07 first-load JS budget) and
 *    forces every author through the shared presets — the V1 failure mode was a
 *    preset file that four sites shipped and none imported.
 */

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

export interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
