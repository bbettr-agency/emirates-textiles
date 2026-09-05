"use client";

import Image from "next/image";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { signature } from "@/config/home";

/**
 * Signature moment — a narrow strip of cloth unfurls to a full-width length as it
 * scrolls through the viewport (clip-path driven by rAF scroll progress). One
 * memorable, textile-specific interaction. Reduced motion → the full frame is
 * shown immediately (progress forced to 1 by the hook). Not an LCP element.
 * Reveal structure inspired by 21st.dev scroll image-mask blooms (adapted to CSS).
 */
export function Signature() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.95, 0.3);
  const textIn = Math.max(0, Math.min(1, (progress - 0.45) / 0.4));

  return (
    <section aria-labelledby="sig-heading" className="relative bg-canvas">
      <div ref={ref} className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
        <div className="unfurl absolute inset-0" style={{ "--p": progress } as React.CSSProperties}>
          <Image
            src={signature.image}
            alt={signature.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/15 to-navy-deep/25" aria-hidden="true" />
        </div>

        {/* vertical strip label — reads while the cloth is still narrow */}
        <span
          className="tech-code absolute left-1/2 top-6 z-10 -translate-x-1/2 text-white/80 transition-opacity duration-300"
          style={{ opacity: 1 - textIn }}
        >
          {signature.strip}
        </span>

        {/* revealed statement */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textIn, transform: `translateY(${(1 - textIn) * 24}px)` }}
        >
          <h2 id="sig-heading" className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {signature.headline}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{signature.sub}</p>
          <span className="mt-8 h-10 w-px bg-white/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
