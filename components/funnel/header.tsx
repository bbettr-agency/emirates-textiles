"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollPast, THRESHOLD } from "@/engine/motion";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Header — fixed, transparent over the hero, condensing to a solid warm surface on
 * scroll (background/shadow only). Nav labels are small tracked caps (a technical,
 * textile-catalogue register) with a gold underline that draws on hover. The
 * mobile overlay is a sibling of <header> so its fixed positioning is relative to
 * the viewport, not trapped by the header's backdrop-filter.
 */
export function Header() {
  const scrolled = useScrollPast(THRESHOLD.header);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ease-emirates",
          open
            ? "border-hair bg-canvas"
            : scrolled
              ? "border-hair bg-canvas/90 shadow-[0_8px_30px_-24px_rgba(30,26,20,0.5)] backdrop-blur-md"
              : "border-transparent bg-transparent",
        )}
      >
        <div className="container flex h-[4.5rem] items-center justify-between lg:h-20">
          <div className="flex items-center gap-4">
            <a href="#top" className="relative z-10 flex items-center" aria-label={`${site.name} — home`}>
              <Image src="/img/logo.png" alt={site.name} width={205} height={100} priority className="h-9 w-auto lg:h-10" />
            </a>
            <span className="hidden h-8 w-px bg-hair-strong xl:block" aria-hidden="true" />
            <span className="hidden tech-code text-ink-muted xl:block">Est. 1999 · Pretoria</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-xs font-semibold uppercase tracking-wide text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-emirates group-hover:w-full" />
              </a>
            ))}
            <a
              href="#enquire"
              data-cta="nav-enquire"
              className="group inline-flex min-h-[42px] items-center gap-2 rounded-btn bg-navy px-5 text-xs font-semibold uppercase tracking-wide text-white shadow-cta transition-[transform,background-color] duration-200 ease-emirates hover:-translate-y-0.5 hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Enquire
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="relative z-10 -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-btn text-ink hover:text-navy-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay — sibling of <header> (fixed relative to viewport) */}
      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col overflow-y-auto bg-canvas animate-fade-in lg:hidden">
          <nav className="container flex flex-1 flex-col py-6" aria-label="Mobile">
            {site.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-hair py-4"
              >
                <span className="flex items-baseline gap-4">
                  <span className="tech-code text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-3xl font-extrabold uppercase tracking-tight text-ink">{item.label}</span>
                </span>
                <span className="text-gold" aria-hidden="true">→</span>
              </a>
            ))}
            <a
              href="#enquire"
              onClick={() => setOpen(false)}
              data-cta="nav-enquire-mobile"
              className="mt-8 inline-flex min-h-[54px] items-center justify-center rounded-btn bg-navy px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-cta"
            >
              Enquire now
            </a>
            <div className="mt-auto pt-8">
              <p className="tech text-ink-muted">Est. 1999 · Pretoria, South Africa</p>
              <a href={site.contact.phoneHref} className="mt-2 block text-lg font-semibold text-ink">
                {site.contact.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
