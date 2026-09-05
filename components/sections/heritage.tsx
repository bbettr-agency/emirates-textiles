import { Reveal } from "@/engine/motion";
import { heritage } from "@/config/home";

/**
 * Heritage — a giant, partially-cropped "1999" with the real woven cloth showing
 * through the numerals (background-clip: text), a narrow copy column and textile
 * measurement rules. Light, restrained, striking. Falls back to solid navy where
 * background-clip:text is unsupported.
 */
export function Heritage() {
  return (
    <section id="heritage" className="section relative overflow-hidden bg-sand">
      <div className="container">
        <Reveal>
          <p className="flex items-center gap-3">
            <span className="eyebrow-mark" aria-hidden="true" />
            <span className="tech">{heritage.eyebrow}</span>
          </p>
        </Reveal>

        {/* Giant fabric-filled year, cropped left */}
        <Reveal preset="fadeIn">
          <div className="relative -ml-2 mt-6 select-none lg:-ml-4">
            <span
              aria-hidden="true"
              className="block text-navy font-extrabold leading-[0.78] tracking-tightest"
              style={{
                fontSize: "clamp(8rem, 34vw, 26rem)",
                backgroundImage: "url('/img/sig-fabric.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {heritage.year}
            </span>
            <span className="sr-only">Established {heritage.year}</span>
          </div>
        </Reveal>

        {/* Copy + proof */}
        <div className="mt-10 grid gap-10 border-t border-hair-strong pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                {heritage.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-measure text-base leading-relaxed text-ink-2 md:text-lg">{heritage.body}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                {heritage.points.map((p) => (
                  <div key={p.k} className="flex items-start gap-2.5">
                    <span className="reg-mark mt-1" aria-hidden="true" />
                    <div>
                      <dt className="tech text-ink-muted">{p.k}</dt>
                      <dd className="mt-1 text-lg font-bold text-ink">{p.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Verified pull-quote, set as an editorial statement */}
          <Reveal preset="fadeUp" className="lg:border-l lg:border-hair-strong lg:pl-12">
            <div className="stitch stitch-gold mb-6 w-20" aria-hidden="true" />
            <blockquote className="text-2xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
              “{heritage.quote}”
            </blockquote>
            <p className="mt-5 tech text-ink-muted">Emirates Textiles</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
