"use client";

/**
 * CountUp — animated statistic.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §6
 *
 * Replaces four independent implementations with incompatible APIs (`value` vs
 * `end`, three durations, two thresholds) and fixes three shared defects:
 *
 *  1. SSR CORRECTNESS — the others render `0` in server HTML, so crawlers,
 *     no-JS visitors and anything reading the initial payload see a zero where
 *     a proof point should be. This renders the FINAL value on the server and
 *     only resets to zero in a layout effect, before the browser paints.
 *  2. REDUCED MOTION — one of the four had no guard at all. rAF loops are not
 *     covered by MotionConfig, so this checks explicitly.
 *  3. ACCESSIBILITY — none of the four exposed the real figure to assistive
 *     technology. The final value is always in the accessible name, and the
 *     ticking text is hidden from screen readers.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMotionSafe } from "./useMotionSafe";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface CountUpProps {
  /** The real, verified figure. Never a placeholder. */
  value: number;
  /** Milliseconds for the full count. Clamped to a sane ceiling. */
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** `compact` renders 15200 as "15.2K". */
  format?: "plain" | "compact";
  className?: string;
}

const MAX_DURATION_MS = 2000;

function formatValue(
  n: number,
  { decimals = 0, format = "plain" }: Pick<CountUpProps, "decimals" | "format">,
): string {
  if (format === "compact") {
    return new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumFractionDigits: decimals || 1,
    }).format(n);
  }
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function CountUp({
  value,
  durationMs = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  format = "plain",
  className,
}: CountUpProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  // Server and first client render both produce the final value, so the markup
  // is correct before any JavaScript runs and hydration matches.
  const [display, setDisplay] = useState(value);

  const finalText = `${prefix}${formatValue(value, { decimals, format })}${suffix}`;

  useIsomorphicLayoutEffect(() => {
    if (reduced || hasRun.current) return;
    // Runs before paint, so the reset to zero is never visible as a flash.
    setDisplay(0);
  }, [reduced]);

  useEffect(() => {
    if (reduced || hasRun.current) return;
    const node = ref.current;
    if (!node) return;

    const duration = Math.min(Math.max(durationMs, 0), MAX_DURATION_MS);
    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        const tick = (now: number) => {
          if (start === 0) start = now;
          const progress = Math.min((now - start) / duration, 1);
          // easeOutCubic — matches the deceleration of the house curve.
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setDisplay(value);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
    // `value` and `durationMs` are read once when the observer fires; `hasRun`
    // guards re-entry. Deliberately not depending on mutable render state —
    // one audited implementation put its `started` flag in the dependency array
    // and tore down the observer mid-count.
  }, [reduced, value, durationMs]);

  return (
    <span ref={ref} className={className} aria-label={finalText}>
      <span aria-hidden="true">
        {prefix}
        {formatValue(display, { decimals, format })}
        {suffix}
      </span>
    </span>
  );
}
