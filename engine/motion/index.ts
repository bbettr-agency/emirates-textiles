/**
 * @bbettr/motion — the approved motion vocabulary.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md
 *
 * Import everything from here. Do not import `motion/react` directly in a
 * component: MotionProvider runs LazyMotion in strict mode, so the full `motion`
 * proxy throws at runtime by design.
 *
 *   import { MotionProvider, Reveal, Stagger, heroStack } from "@/engine/motion";
 */

export { MotionProvider, type MotionProviderProps } from "./MotionProvider";
export { Reveal, NOSCRIPT_FALLBACK, type RevealProps, type RevealPreset } from "./Reveal";
export { Stagger, type StaggerProps } from "./Stagger";
export { CountUp, type CountUpProps } from "./CountUp";

export { heroStack, type HeroStack, type HeroStackOptions, type HeroStep } from "./hero";
export { useScrollPast, THRESHOLD } from "./useScrollPast";
export { useMotionSafe } from "./useMotionSafe";

export {
  fadeUp,
  fadeUpItem,
  fadeIn,
  scaleIn,
  imageReveal,
  slideX,
  type PresetOptions,
  type MotionProps,
} from "./presets";

export {
  EASE,
  CHARACTER,
  DEFAULT_CHARACTER,
  DISTANCE,
  INTERACTION,
  HOVER_LIFT,
  VIEWPORT,
  STAGGER_CAP,
  MAX_DURATION,
  durationsFor,
  staggerDelay,
  type MotionCharacter,
} from "./tokens";
