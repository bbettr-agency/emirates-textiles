"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, Stagger } from "@/engine/motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { colours } from "@/config/home";

const WEAVE = "url('/img/weave.webp')";
const swatches = colours.swatches;

export function SwatchExperience() {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const show = (i: number, el?: HTMLButtonElement) => {
    triggerRef.current = el ?? null;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + swatches.length) % swatches.length)),
    [],
  );

  // Keyboard + scroll lock while the modal is open.
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

  return (
    <section id="colours" className="section bg-linen" style={{ "--weave-url": WEAVE } as React.CSSProperties}>
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={colours.eyebrow} heading={colours.heading} lead={colours.lead} />
          <Reveal delay={0.1}>
            <dl className="flex shrink-0 items-center gap-8 border-t border-hair-strong pt-4 lg:border-t-0 lg:pt-0">
              <div>
                <dt className="eyebrow">{colours.meta.label}</dt>
                <dd className="mt-1 font-display text-xl text-ink">{colours.meta.count}</dd>
              </div>
              <div>
                <dt className="eyebrow">Roll width</dt>
                <dd className="mt-1 font-display text-xl text-ink">{colours.meta.width.replace(" roll width", "")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Swatch grid */}
        <Stagger className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {swatches.map((s, i) => (
            <Reveal key={s.name} preset="fadeUpItem" index={Math.min(i, 5)}>
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                aria-label={`View ${s.name} — colour ${i + 1} of ${swatches.length}`}
                className="group block w-full text-left focus-visible:outline-none"
              >
                <span
                  className="fabric-swatch relative block aspect-square rounded-card ring-1 ring-hair transition-[transform,box-shadow] duration-300 ease-emirates group-hover:-translate-y-1 group-hover:shadow-lift group-hover:ring-gold group-focus-visible:ring-2 group-focus-visible:ring-navy"
                  style={{ "--swatch": s.hex } as React.CSSProperties}
                >
                  <span className="absolute right-2 top-2 z-[4] flex h-7 w-7 items-center justify-center rounded-full bg-paper/85 text-ink opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </span>
                <span className="mt-2.5 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-ink transition-colors group-hover:text-navy-ink">
                    {s.name}
                  </span>
                  <span className="text-xs tabular-nums text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </Stagger>

        <Reveal>
          <p className="mt-8 max-w-measure text-sm text-ink-muted">{colours.note}</p>
        </Reveal>
      </div>

      {/* Lightbox modal */}
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
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-panel bg-paper shadow-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-[1.2fr_0.8fr]">
              {/* Enlarged fabric */}
              <div className="relative">
                <div
                  key={open}
                  className="fabric-swatch aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[26rem] motion-safe:animate-fade-in"
                  style={{ "--swatch": active.hex } as React.CSSProperties}
                />
                {/* edge chevrons (desktop) */}
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous colour"
                  className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 p-2.5 text-ink shadow-lift backdrop-blur transition hover:bg-paper hover:-translate-y-[calc(50%+2px)] md:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next colour"
                  className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 p-2.5 text-ink shadow-lift backdrop-blur transition hover:bg-paper hover:-translate-y-[calc(50%+2px)] md:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Info */}
              <div className="flex flex-col p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <p className="eyebrow">{colours.meta.label}</p>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-linen hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div key={open} className="mt-auto motion-safe:animate-fade-in">
                  <p className="text-sm text-ink-muted">
                    {String(open + 1).padStart(2, "0")} / {swatches.length}
                  </p>
                  <h3 className="mt-1 font-display text-4xl tracking-tight text-ink">{active.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    Woven cotton-blend fabric, {colours.meta.width}. Shown at true colour
                    for the demo — physical samples on request.
                  </p>
                </div>

                {/* mobile nav */}
                <div className="mt-6 flex items-center gap-3 md:hidden">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-btn border border-hair-strong py-2.5 text-sm font-medium text-ink"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-btn border border-hair-strong py-2.5 text-sm font-medium text-ink"
                  >
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
