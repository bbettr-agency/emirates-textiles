"use client";

/**
 * useScrollPast — one rAF-throttled scroll listener.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §6
 *
 * Replaces five hand-rolled `window.scrollY` effects found in production, none
 * of which was throttled and each of which invented its own threshold
 * (16 / 24 / 500 / 640).
 *
 *   const scrolled = useScrollPast(THRESHOLD.header);
 *   <header className={scrolled ? "bg-white/90 shadow-card" : "bg-transparent"}>
 *
 * Animate colour, shadow and opacity on the result — never `height` or
 * `padding`. One audited navbar transitions height and padding on every scroll
 * past 16px, which forces layout on the main thread instead of running on the
 * compositor.
 */

import { useEffect, useState } from "react";

/** Consolidated thresholds in px. */
export const THRESHOLD = {
  /** Sticky header condenses almost immediately. */
  header: 24,
  /** Floating/sticky CTAs appear once the hero is behind the visitor. */
  floatingCta: 500,
} as const;

export function useScrollPast(threshold: number = THRESHOLD.header): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setPast(window.scrollY > threshold);
    };

    const onScroll = () => {
      // Coalesce bursts of scroll events into one read per animation frame.
      if (frame === 0) frame = window.requestAnimationFrame(read);
    };

    read(); // Sync on mount — the page may load already scrolled.
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return past;
}
