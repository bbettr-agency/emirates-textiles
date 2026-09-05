"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionSafe } from "@/engine/motion";

/**
 * Continuous 0..1 progress of an element travelling through the viewport, sampled
 * with one rAF-throttled scroll listener (same discipline as the OS useScrollPast).
 * `start`/`end` map the element's top position (as a fraction of viewport height)
 * to the 0..1 range — defaults suit a tall pinned/scroll scene.
 *
 * Under reduced motion it returns 1 immediately, so any effect driven by it
 * renders in its final, fully-revealed state.
 */
export function useScrollProgress<T extends HTMLElement>(
  start = 0.85,
  end = 0.35,
): { ref: React.RefObject<T>; progress: number } {
  const ref = useRef<T>(null);
  const reduced = useMotionSafe();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const read = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const topFrac = rect.top / vh; // 1 = at bottom of viewport, 0 = at top
      const p = (start - topFrac) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, start, end]);

  return { ref, progress };
}
