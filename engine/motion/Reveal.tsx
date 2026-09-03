"use client";

/**
 * Reveal — the standard way to animate content into view.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §4
 *
 *   <Reveal>            …</Reveal>   // section content, scroll-triggered
 *   <Reveal eager>      …</Reveal>   // above the fold — animates on mount
 *   <Reveal preset="fadeUpItem" index={i}>…</Reveal>   // card in a list
 *
 * Centralising this is proven: of the five audited sites, the one that routed
 * its reveals through a single component had 26 consistent call sites, while the
 * other four hand-wrote 57 variations with eight stagger steps and five
 * distances between them.
 *
 * Reliability: content must never depend on animation to be visible. The reveal
 * is state-driven, not `whileInView` — <Reveal> owns a `shown` flag it flips as
 * soon as the element is in view (immediately at mount for in-view / above-fold /
 * reduced-motion / eager content), on scroll into view, once scrolled past (fast
 * scroll can deliver the observer callback late), or after a layout shift. A
 * missed IntersectionObserver callback can therefore never strand content
 * invisible. Below the fold the server-rendered `opacity: 0` is covered for the
 * no-JS case by NOSCRIPT_FALLBACK. `eager` additionally drops the opacity fade
 * (transform-only) to protect the LCP element.
 */

import { m } from "motion/react";
import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { fadeIn, fadeUp, fadeUpItem, imageReveal, scaleIn, slideX } from "./presets";
import type { MotionCharacter } from "./tokens";
import { useMotionSafe } from "./useMotionSafe";

const PRESETS = { fadeUp, fadeUpItem, fadeIn, scaleIn, imageReveal, slideX } as const;

export type RevealPreset = keyof typeof PRESETS;

/**
 * Shared safety net (one listener for the whole page, not one per Reveal).
 * An IntersectionObserver does not fire when an element goes from below the fold
 * straight to above it (an anchor jump or a hard flick can skip the intersecting
 * frame). This rAF-throttled scroll/resize sweep reveals any pending element that
 * is at or above the fold, so content can never be stranded invisible.
 */
const pendingSweeps = new Set<() => boolean>();
let sweepScheduled = false;
function runSweep() {
  sweepScheduled = false;
  for (const check of pendingSweeps) {
    if (check()) pendingSweeps.delete(check);
  }
}
function scheduleSweep() {
  if (sweepScheduled) return;
  sweepScheduled = true;
  requestAnimationFrame(runSweep);
}
function registerSweep(check: () => boolean) {
  if (typeof window === "undefined") return;
  if (pendingSweeps.size === 0) {
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep, { passive: true });
  }
  pendingSweeps.add(check);
}
function unregisterSweep(check: () => boolean) {
  pendingSweeps.delete(check);
  if (typeof window !== "undefined" && pendingSweeps.size === 0) {
    window.removeEventListener("scroll", scheduleSweep);
    window.removeEventListener("resize", scheduleSweep);
  }
}

export interface RevealProps {
  children: ReactNode;
  /** Which approved preset to use. Defaults to the house reveal. */
  preset?: RevealPreset;
  /** Rendered element. Use a semantic tag — motion must never change semantics. */
  as?: ElementType;
  /** Index in a staggered group. Delay is capped automatically (STAGGER_CAP). */
  index?: number;
  /** Extra delay in seconds, applied after the staggered delay. */
  delay?: number;
  /** REQUIRED above the fold: animate on mount rather than on scroll. */
  eager?: boolean;
  /** Override the project's motion character. Rarely needed. */
  character?: MotionCharacter;
  className?: string;
}

/**
 * Development guard: an element carrying Next's `priority` flag is a declared
 * LCP candidate. Fading it in defeats the preload it just requested — a defect
 * found in production during the audit.
 */
function warnOnPriorityImage(children: ReactNode, preset: RevealPreset) {
  if (process.env.NODE_ENV === "production") return;
  if (preset === "imageReveal") return; // scale-only, never hides the image

  const hasPriority = Children.toArray(children).some(
    (child) =>
      isValidElement<{ priority?: boolean }>(child) &&
      child.props?.priority === true,
  );

  if (hasPriority) {
    console.error(
      "[bbettr/motion] <Reveal> wraps an image marked `priority`, so an opacity " +
        "animation will hide the LCP image and defeat its preload. Move the image " +
        "outside <Reveal>, or use preset=\"imageReveal\" (scale only). " +
        "See SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §5.",
    );
  }
}

export function Reveal({
  children,
  preset = "fadeUp",
  as = "div",
  index = 0,
  delay = 0,
  eager = false,
  character,
  className,
}: RevealProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  warnOnPriorityImage(children, preset);

  // Reveal trigger — reliability first (SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM §5).
  // Content is DRIVEN VISIBLE by state, never left waiting on an observer:
  //  · reduced motion / eager (above the fold)  → show immediately
  //  · already in view at mount                  → show immediately
  //    (covers direct inner-page navigation, refresh mid-page, short pages)
  //  · below the fold                            → observer, which reveals on
  //    entering view OR once scrolled past (a fast scroll can deliver the
  //    callback after the element has already left the viewport)
  //  · late layout shift (fonts/images)          → an rAF re-check
  useEffect(() => {
    if (reduced || eager) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    let done = false;
    const inView = () => node.getBoundingClientRect().top < window.innerHeight;
    const cleanup = () => {
      io.disconnect();
      unregisterSweep(check);
      cancelAnimationFrame(raf);
    };
    const reveal = () => {
      if (!done) {
        done = true;
        setShown(true);
        cleanup();
      }
    };
    if (inView()) {
      setShown(true);
      return;
    }
    // Primary trigger: reveal as the element scrolls into view.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(node);
    // Catch-all: shared scroll/resize sweep (handles anchor jumps / hard flicks
    // that skip the observer's intersecting frame) + a post-layout rAF check.
    const check = () => {
      if (!done && inView()) {
        reveal();
        return true;
      }
      return done;
    };
    registerSweep(check);
    const raf = requestAnimationFrame(() => {
      if (!done && inView()) reveal();
    });
    return cleanup;
  }, [reduced, eager]);

  const props = PRESETS[preset]({ character, index, delay, reduced, eager, shown });

  // `data-reveal` is the hook for the no-JS fallback. A scroll-triggered reveal
  // ships `opacity: 0` in the server-rendered HTML, so without this the whole
  // page below the fold stays invisible if JavaScript never runs. The root
  // layout must carry the <noscript> rule — see NOSCRIPT_FALLBACK.
  return (
    <MotionTag ref={ref} className={className} data-reveal="" {...props}>
      {children}
    </MotionTag>
  );
}

/**
 * Required in the root layout <head>, verbatim:
 *
 *   <noscript>
 *     <style>{NOSCRIPT_FALLBACK}</style>
 *   </noscript>
 *
 * Gate 3 checks for it. Without it, a JavaScript failure hides every revealed
 * section on the page.
 */
export const NOSCRIPT_FALLBACK =
  "[data-reveal]{opacity:1!important;transform:none!important}";
