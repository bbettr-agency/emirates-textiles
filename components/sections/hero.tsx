import Image from "next/image";
import { Reveal, heroStack } from "@/engine/motion";
import { Button } from "@/components/ui/button";
import { hero } from "@/config/home";

/**
 * Hero — Split editorial (archetype B), fabric-first.
 * Blocking Question: "Is this a serious fabric supplier, or just a linen store?"
 * → the image is the argument (a real stack of Emirates fabric), the H1 states
 * the category, and the copy carries the wholesale/hospitality/heritage proof.
 * LCP = H1 (never animated). The priority image is scale-safe, no opacity fade.
 */
export function Hero() {
  const h = heroStack({ character: "editorial" });

  return (
    <section id="top" className="relative overflow-hidden bg-canvas">
      {/* faint warm wash behind the image side */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-linen/60 lg:block"
        aria-hidden="true"
      />
      <div className="container relative grid items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-36 lg:pb-24">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal {...h.step(0)}>
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <h1
            {...h.lcp}
            className="mt-5 font-display text-[3rem] leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem] lg:leading-[0.98]"
          >
            {hero.h1}
          </h1>

          <Reveal {...h.step(1)}>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink-2 md:text-lg">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal {...h.step(2)}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={hero.primaryCta.href} size="lg" dataCta="hero-explore">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg" dataCta="hero-sample">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal {...h.step(3)}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
              {hero.proof.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-medium text-ink-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Evidence: a real stack of Emirates fabric */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-panel shadow-card sm:aspect-[5/6] lg:aspect-[4/5]">
            <Image
              src="/img/hero-stack.jpg"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          {/* spec chip — a real, tactile detail (evidence, not decoration) */}
          <Reveal {...h.step(3)} className="absolute -bottom-4 left-4 sm:-left-5">
            <div className="rounded-btn border border-hair bg-paper/95 px-4 py-3 shadow-lift backdrop-blur">
              <p className="eyebrow !tracking-wide text-navy-ink">Soft-touch fabric</p>
              <p className="mt-0.5 text-sm font-semibold text-ink">Held in 18+ colours · to 280cm</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
