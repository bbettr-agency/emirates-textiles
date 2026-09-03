import Image from "next/image";
import { Reveal } from "@/engine/motion";
import { Button } from "@/components/ui/button";
import { simonBaker } from "@/config/home";

/**
 * Simon Baker — the in-house luxury bed-linen brand. Deliberately more
 * lifestyle/luxurious than the fabric sections (intentional contrast), but kept
 * as a supporting section so it no longer dominates the identity.
 */
export function SimonBaker() {
  return (
    <section id="simon-baker" className="section bg-paper">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal preset="fadeUp" className="order-last lg:order-first">
          <div className="relative overflow-hidden rounded-panel shadow-card">
            <div className="relative aspect-[5/4]">
              <Image
                src="/img/cat-hospitality.jpg"
                alt={simonBaker.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-5 left-6 font-display text-3xl italic text-white">
              Simon Baker
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              {simonBaker.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-lg font-display text-3xl tracking-tight text-ink md:text-4xl lg:text-[2.9rem] lg:leading-[1.06]">
              {simonBaker.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-measure text-base leading-relaxed text-ink-2 md:text-lg">
              {simonBaker.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Button href={simonBaker.cta.href} variant="ghost" size="lg" external dataCta="simon-baker">
                {simonBaker.cta.label}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
