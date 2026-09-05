"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Reveal } from "@/engine/motion";
import { colours } from "@/config/home";
import { cn } from "@/lib/utils";

const WEAVE = "url('/img/weave.webp')";
const swatches = colours.swatches;

export function SwatchExperience() {
  const [hover, setHover] = useState(0); // colour shown in the live preview
  const [open, setOpen] = useState<number | null>(null); // lightbox index
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + swatches.length) % swatches.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const active = open === null ? null : swatches[open];
  const preview = swatches[hover];

  return (
    <section id="colours" className="section bg-linen" style={{ "--weave-url": WEAVE } as React.CSSProperties}>
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-3">
              <span className="eyebrow-mark" aria-hidden="true" />
              <span className="tech">{colours.eyebrow}</span>
            </p>
            <h2 className="mt-4 text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl">{colours.heading}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-2 md:text-right">{colours.lead}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* LEFT — the "spec sheet": big count + active colour */}
          <div className="flex flex-col">
            <div className="flex items-start gap-5">
              <span className="text-[5.5rem] font-extrabold leading-[0.8] tracking-tightest text-ink sm:text-[7rem] lg:text-[8rem]">
                {colours.meta.count}
              </span>
              <div className="pt-2">
                <p className="text-lg font-bold uppercase tracking-wide text-ink">Colours</p>
                <div className="mt-3 flex items-stretch gap-2">
                  <span className="measure-rule" aria-hidden="true" />
                  <span className="tech-code self-center text-ink-2">{colours.meta.width} roll width</span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-hair-strong pt-6">
              <p className="tech text-ink-muted">
                Selected · {String(hover + 1).padStart(2, "0")} / {swatches.length}
              </p>
              <p className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-ink lg:text-5xl">
                {preview.name}
              </p>
              <p className="mt-4 max-w-measure text-sm leading-relaxed text-ink-2">
                Woven cotton-blend fabric, {colours.meta.width} roll width. Move across the archive to
                preview each colour, or open one full-screen.
              </p>
              <p className="mt-6 tech text-ink-muted">{colours.meta.label}</p>
            </div>
          </div>

          {/* RIGHT — live preview + archive */}
          <div>
            <button
              type="button"
              onClick={() => setOpen(hover)}
              aria-label={`Open ${preview.name} full-screen`}
              className="group relative block aspect-[16/10] w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span
                className="fabric-swatch absolute inset-0 block transition-[background-color] duration-500 ease-emirates"
                style={{ "--swatch": preview.hex } as React.CSSProperties}
              />
              <span className="absolute left-4 top-4 z-[4] tech bg-canvas/85 px-2 py-1 text-ink">{preview.name}</span>
              <span className="absolute right-4 top-4 z-[4] flex h-8 w-8 items-center justify-center rounded-full bg-canvas/85 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>

            {/* Archive — a dense strip of swatches, fabric-catalogue rhythm */}
            <ul className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-9 sm:gap-2.5">
              {swatches.map((s, i) => (
                <li key={s.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onClick={() => setOpen(i)}
                    aria-label={`${s.name}, colour ${i + 1} of ${swatches.length}`}
                    className="group block w-full text-left focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "fabric-swatch block aspect-square ring-1 transition-[transform,box-shadow] duration-200",
                        hover === i ? "ring-2 ring-navy" : "ring-hair group-hover:ring-gold",
                      )}
                      style={{ "--swatch": s.hex } as React.CSSProperties}
                    />
                    <span className="mt-1.5 block truncate text-[0.7rem] font-medium text-ink-2">{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-measure text-xs text-ink-muted">{colours.note}</p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && open !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm motion-safe:animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name}, colour ${open + 1} of ${swatches.length}`}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="relative w-full max-w-4xl overflow-hidden bg-paper shadow-modal" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-[1.2fr_0.8fr]">
              <div className="relative">
                <div
                  key={open}
                  className="fabric-swatch aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[26rem] motion-safe:animate-fade-in"
                  style={{ "--swatch": active.hex } as React.CSSProperties}
                />
                <button type="button" onClick={() => step(-1)} aria-label="Previous colour" className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 p-2.5 text-ink shadow-lift backdrop-blur transition hover:bg-paper md:flex">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next colour" className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 p-2.5 text-ink shadow-lift backdrop-blur transition hover:bg-paper md:flex">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <p className="tech">{colours.meta.label}</p>
                  <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-linen hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div key={open} className="mt-auto motion-safe:animate-fade-in">
                  <p className="tech-code text-ink-muted">{String(open + 1).padStart(2, "0")} / {swatches.length}</p>
                  <h3 className="mt-1 text-4xl font-extrabold uppercase tracking-tight text-ink">{active.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    Woven cotton-blend fabric, {colours.meta.width} roll width. Shown at true colour for the demo — physical samples on request.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 md:hidden">
                  <button type="button" onClick={() => step(-1)} className="flex flex-1 items-center justify-center gap-1.5 border border-hair-strong py-2.5 text-sm font-medium text-ink">
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>
                  <button type="button" onClick={() => step(1)} className="flex flex-1 items-center justify-center gap-1.5 border border-hair-strong py-2.5 text-sm font-medium text-ink">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
