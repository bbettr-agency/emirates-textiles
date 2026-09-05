import Image from "next/image";
import { Reveal, heroStack } from "@/engine/motion";
import { Button } from "@/components/ui/button";
import { hero } from "@/config/home";

/**
 * Hero — editorial, not a split. A weight-contrast headline occupies the page;
 * the real fabric image bleeds off the right edge with an overlapping macro crop,
 * a selvage-style spec label and a roll-width measurement rule. LCP = H1 and the
 * priority image are static (never animated); only supporting elements enter.
 */
export function Hero() {
  const h = heroStack({ character: "editorial" });
  const [l1, l2, l3] = hero.h1;

  return (
    <section id="top" className="relative overflow-hidden bg-canvas">
      {/* Left margin measurement rule + vertical est label (desktop) */}
      <div className="pointer-events-none absolute left-8 top-0 z-20 hidden h-full items-center xl:flex">
        <span className="tech-code rotate-180 [writing-mode:vertical-rl] text-ink-muted">
          {hero.est}
        </span>
      </div>

      <div className="container relative min-h-[88svh] pt-28 pb-16 lg:min-h-[92svh] lg:pt-32">
        {/* Headline block */}
        <div className="relative z-10 flex h-full flex-col justify-center lg:max-w-[62%] lg:pt-16">
          <Reveal {...h.step(0)}>
            <p className="flex items-center gap-3">
              <span className="eyebrow-mark" aria-hidden="true" />
              <span className="tech">{hero.eyebrow}</span>
            </p>
          </Reveal>

          <h1 {...h.lcp} className="mt-6 select-none">
            <span className="block text-[3.4rem] font-extrabold uppercase leading-[0.9] tracking-tightest text-ink sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
              {l1}
            </span>
            <span className="mt-1 block pl-1 text-[2rem] font-light lowercase leading-[1] tracking-tight text-ink-2 sm:text-4xl lg:text-5xl xl:text-6xl">
              {l2}
            </span>
            <span className="block text-[3.4rem] font-extrabold uppercase leading-[0.9] tracking-tightest text-ink sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
              {l3}
            </span>
          </h1>

          <Reveal {...h.step(1)}>
            <p className="mt-8 max-w-[42ch] text-base leading-relaxed text-ink-2 md:text-lg">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal {...h.step(2)}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={hero.primaryCta.href} size="lg" dataCta="hero-explore">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg" dataCta="hero-sample">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal {...h.step(3)}>
            <div className="mt-12 flex items-center gap-6">
              <span className="hidden h-px w-16 bg-hair-strong sm:block" aria-hidden="true" />
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <li className="tech-code text-ink-2">EST. 1999</li>
                <li className="tech-code text-ink-2">PRETORIA, SA</li>
                <li className="tech-code text-ink-2">WHOLESALE &amp; HOSPITALITY</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Fabric image — bleeds off the right edge (desktop) */}
        <div className="relative mt-10 lg:mt-0 lg:absolute lg:right-[-6%] lg:top-0 lg:h-full lg:w-[48%]">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-full">
            <Image
              src="/img/hero-stack.jpg"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            {/* roll-width measurement rule down the left of the image (desktop) */}
            <div className="absolute left-5 top-1/4 hidden h-1/2 lg:block">
              <div className="measure-rule h-full" aria-hidden="true" />
              <span className="tech-code absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-canvas/80 px-1 text-ink">
                W. to 280cm
              </span>
            </div>
          </div>

          {/* overlapping macro texture + selvage spec label (not a rounded card) */}
          <Reveal preset="imageReveal" {...h.step(2)} className="absolute -bottom-8 -left-6 hidden w-40 overflow-hidden shadow-lift sm:block lg:-left-10 lg:w-52">
            <div className="relative aspect-square">
              <Image src="/img/hero-macro.jpg" alt={hero.macroAlt} fill sizes="200px" className="object-cover" />
            </div>
          </Reveal>
          <Reveal {...h.step(3)} className="absolute bottom-6 left-6 hidden sm:block lg:bottom-10 lg:left-auto lg:right-10">
            <div className="selvage bg-canvas/85 py-1 pr-1 backdrop-blur">
              <p className="tech text-navy-ink">{hero.spec.label}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{hero.spec.value}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
