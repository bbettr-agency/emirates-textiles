"use client";

import { Phone } from "lucide-react";
import { useScrollPast, THRESHOLD } from "@/engine/motion";
import { site, waLink } from "@/config/site";
import { WhatsAppGlyph } from "@/components/funnel/channel-ctas";
import { cn } from "@/lib/utils";

/**
 * Mobile-only sticky action bar (Call + WhatsApp). Appears once the hero has
 * scrolled away, so it never competes with the hero's own CTAs. Respects the
 * home-indicator safe area.
 */
export function StickyCta() {
  const show = useScrollPast(THRESHOLD.floatingCta);

  return (
    <div
      className={cn(
        "lg:hidden fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-emirates",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-2 border-t border-hair bg-canvas/95 backdrop-blur-md p-3 shadow-[0_-8px_30px_-20px_rgba(30,26,20,0.5)]">
        <a
          href={site.contact.phoneHref}
          data-cta="sticky-call"
          className="flex flex-1 items-center justify-center gap-2 rounded-btn border border-hair-strong bg-paper py-3 text-sm font-semibold text-ink"
        >
          <Phone className="h-[1.1em] w-[1.1em]" />
          Call
        </a>
        <a
          href={waLink("Hi Emirates Textiles, I'd like to enquire about fabric.")}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="sticky-whatsapp"
          className="flex flex-[1.6] items-center justify-center gap-2 rounded-btn bg-whatsapp py-3 text-sm font-semibold text-[#04310f]"
        >
          <WhatsAppGlyph className="h-[1.15em] w-[1.15em]" />
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
