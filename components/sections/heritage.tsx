import Image from "next/image";
import { Reveal } from "@/engine/motion";
import { heritage } from "@/config/home";

/**
 * Heritage — restrained credibility. A large "1999" typographic anchor, concise
 * copy and a verified pull-quote from the company's own words. Warm band (sand).
 */
export function Heritage() {
  return (
    <section id="heritage" className="section bg-sand">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              {heritage.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 font-display text-[6rem] leading-none tracking-tight text-navy sm:text-[8rem] lg:text-[9rem]">
              {heritage.year}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-2 max-w-xl font-display text-3xl tracking-tight text-ink md:text-4xl">
              {heritage.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-measure text-base leading-relaxed text-ink-2 md:text-lg">
              {heritage.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {heritage.points.map((p) => (
                <div key={p.k}>
                  <dt className="eyebrow">{p.k}</dt>
                  <dd className="mt-1 font-display text-lg text-ink">{p.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal preset="fadeUp" className="relative">
          <figure className="relative overflow-hidden rounded-panel shadow-card">
            <div className="relative aspect-[4/5]">
              <Image
                src="/img/hero-stack.jpg"
                alt="Folded Emirates Textiles fabrics held in depth"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </figure>
          {/* verified pull-quote */}
          <figcaption className="mt-6 border-l-2 border-gold pl-5">
            <p className="font-display text-xl italic leading-snug text-ink md:text-2xl">
              “{heritage.quote}”
            </p>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
