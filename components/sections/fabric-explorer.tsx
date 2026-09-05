"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/engine/motion";
import { fabrics } from "@/config/home";
import { cn } from "@/lib/utils";

/**
 * Fabric explorer — replaces the category card grid. A vertical list of ranges
 * (editorial type + technical metadata) drives a single large preview that
 * clip-reveals the cloth. Interaction pattern adapted from 21st.dev "Slideshow"
 * (youcefbnm) — the clip-path bloom + stacked container — rebuilt in CSS and
 * restyled to Emirates. Hover or focus on desktop; tap on mobile.
 */
export function FabricExplorer() {
  const [active, setActive] = useState(0);
  const cats = fabrics.categories;
  const current = cats[active];

  return (
    <section id="fabrics" className="section bg-paper">
      <div className="container">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-3">
              <span className="eyebrow-mark" aria-hidden="true" />
              <span className="tech">{fabrics.eyebrow}</span>
            </p>
            <h2 className="mt-4 text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl">
              {fabrics.heading}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-2 md:text-right">{fabrics.lead}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Preview panel */}
          <div className="order-first lg:order-last">
            <div className="slide-stack relative grid aspect-[4/5] overflow-hidden bg-linen sm:aspect-[16/11] lg:aspect-[4/5]">
              {cats.map((c, i) => (
                <div key={c.name} data-active={i === active} className={cn("slide relative", i === active && "z-[2]")}>
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
              {/* overlay metadata */}
              <div className="pointer-events-none relative z-[3] col-start-1 row-start-1 flex flex-col justify-between p-5 lg:p-7">
                <div className="flex items-start justify-between">
                  <span className="tech bg-canvas/85 px-2 py-1 text-ink">№ {String(active + 1).padStart(2, "0")} / {String(cats.length).padStart(2, "0")}</span>
                  <span className="tech-code bg-canvas/85 px-2 py-1 text-ink">{current.width}</span>
                </div>
                <div>
                  <div className="selvage border-white/50 pl-3">
                    <p className="text-2xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                      {current.name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                      {current.composition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* active blurb (mobile shows it here) */}
            <p className="mt-4 max-w-measure text-sm leading-relaxed text-ink-2 lg:hidden">{current.blurb}</p>
          </div>

          {/* Range list */}
          <div className="lg:order-first">
            <ul className="border-t border-hair">
              {cats.map((c, i) => {
                const on = i === active;
                return (
                  <li key={c.name} className="border-b border-hair">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className="group flex w-full items-center gap-4 py-5 text-left transition-colors md:gap-6 md:py-6"
                    >
                      <span className={cn("tech-code w-6 shrink-0 transition-colors", on ? "text-gold" : "text-ink-muted")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-2xl uppercase tracking-tight transition-all duration-300 md:text-3xl lg:text-[2.1rem]",
                            on ? "font-extrabold text-ink" : "font-semibold text-ink/40 group-hover:text-ink/70",
                          )}
                        >
                          {c.name}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block overflow-hidden text-sm text-ink-2 transition-all duration-300",
                            on ? "max-h-16 opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          {c.composition} · {c.width}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-gold transition-all duration-300",
                          on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                        )}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Reveal>
              <p className="mt-6 hidden max-w-measure text-sm leading-relaxed text-ink-2 lg:block">{current.blurb}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
