import Image from "next/image";
import { Reveal } from "@/engine/motion";
import { Button } from "@/components/ui/button";
import { simonBaker } from "@/config/home";

/**
 * Simon Baker — the in-house luxury bed-linen brand. Intentionally calmer and more
 * cinematic than the fabric sections: a full-bleed lifestyle image, a spaced
 * wordmark and minimal copy. Supporting, never dominant.
 */
export function SimonBaker() {
  return (
    <section id="simon-baker" className="bg-paper">
      <div className="grid items-stretch lg:grid-cols-[0.82fr_1.18fr]">
        {/* Copy */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-32 lg:pl-16 lg:pr-14">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-navy-ink">Simon&nbsp;Baker</p>
          <span className="mt-5 block h-px w-14 bg-gold" aria-hidden="true" />
          <Reveal preset="fadeUp">
            <h2 className="mt-7 max-w-md text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.6rem] lg:leading-[1.05]">
              {simonBaker.heading}
            </h2>
          </Reveal>
          <Reveal preset="fadeUp" delay={0.05}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-2">{simonBaker.body}</p>
          </Reveal>
          <Reveal preset="fadeUp" delay={0.1}>
            <p className="mt-8 tech-code text-ink-muted">{simonBaker.spec}</p>
            <div className="mt-6">
              <Button href={simonBaker.cta.href} variant="ghost" size="lg" external dataCta="simon-baker">
                {simonBaker.cta.label}
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Cinematic image, bleeds to the edge */}
        <Reveal preset="imageReveal" className="relative min-h-[60svh] overflow-hidden lg:min-h-[44rem]">
          <Image
            src={simonBaker.image}
            alt={simonBaker.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
