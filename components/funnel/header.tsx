"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollPast, THRESHOLD } from "@/engine/motion";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header. Transparent over the hero, condenses to a solid warm surface on
 * scroll (background + shadow only — never height/padding, per Motion System §4).
 * Mobile menu is a full overlay with generous tap targets.
 */
export function Header() {
  const scrolled = useScrollPast(THRESHOLD.header);
  const [open, setOpen] = useState(false);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-emirates border-b",
          // A solid fill (not backdrop-blur) while the menu is open: backdrop-filter
          // would make the header the containing block for the fixed menu overlay.
          open
            ? "bg-canvas border-hair"
            : scrolled
              ? "bg-canvas/90 backdrop-blur-md border-hair shadow-[0_8px_30px_-24px_rgba(30,26,20,0.5)]"
              : "bg-transparent border-transparent",
        )}
      >
      <div className="container flex items-center justify-between h-[4.5rem] lg:h-20">
        <a href="#top" className="relative z-10 flex items-center" aria-label={`${site.name} — home`}>
          <Image
            src="/img/logo.png"
            alt={site.name}
            width={205}
            height={100}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-ink-2 hover:text-navy-ink transition-colors duration-200"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-emirates group-hover:w-full" />
            </a>
          ))}
          <a
            href="#enquire"
            data-cta="nav-enquire"
            className="inline-flex items-center min-h-[42px] rounded-btn bg-navy px-5 text-sm font-semibold text-white shadow-cta transition-[transform,background-color] duration-200 ease-emirates hover:-translate-y-0.5 hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Enquire
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden relative z-10 -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-btn text-ink hover:text-navy-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      </header>

      {/* Mobile overlay — sibling of <header> so its fixed positioning is relative
          to the viewport, not trapped inside the header's backdrop-filter box. */}
      {open ? (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-canvas animate-fade-in">
          <nav className="container flex flex-col py-6" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-hair py-4 font-display text-2xl text-ink"
              >
                {item.label}
                <span className="text-gold text-lg" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
            <a
              href="#enquire"
              onClick={() => setOpen(false)}
              data-cta="nav-enquire-mobile"
              className="mt-7 inline-flex items-center justify-center min-h-[52px] rounded-btn bg-navy px-6 text-base font-semibold text-white shadow-cta"
            >
              Enquire now
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
