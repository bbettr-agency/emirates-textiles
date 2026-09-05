import Image from "next/image";
import { Reveal } from "@/engine/motion";
import { applications } from "@/config/home";
import { cn } from "@/lib/utils";

/**
 * Fabric in use — a lookbook, not a card grid. Full-bleed scenes alternate sides;
 * an oversized application word carries each, imagery bleeds to the page edge, and
 * motion enters horizontally (slideX) rather than the usual fade-up.
 */
export function Applications() {
  return (
    <section id="applications" className="bg-canvas">
      {/* intro */}
      <div className="container section pb-8 md:pb-10">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3">
            <span className="eyebrow-mark" aria-hidden="true" />
            <span className="tech">{applications.eyebrow}</span>
          </p>
          <h2 className="mt-4 text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl">{applications.heading}</h2>
        </div>
      </div>

      <div>
        {applications.items.map((item, i) => {
          const imageLeft = i % 2 === 1;
          return (
            <article
              key={item.name}
              className={cn(
                "grid items-stretch border-t border-hair lg:grid-cols-2",
                i % 2 === 1 ? "bg-linen/50" : "bg-canvas",
              )}
            >
              {/* Text side */}
              <div
                className={cn(
                  "relative flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-24",
                  imageLeft ? "lg:order-last" : "lg:order-first",
                )}
              >
                <span className="tech-code text-gold">{String(i + 1).padStart(2, "0")} — {applications.eyebrow}</span>
                <Reveal preset="fadeUp">
                  <h3 className="mt-3 text-5xl font-extrabold uppercase leading-[0.92] tracking-tightest text-ink sm:text-6xl lg:text-7xl">
                    {item.name}
                  </h3>
                </Reveal>
                <Reveal preset="fadeUp" delay={0.05}>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-2">{item.note}</p>
                </Reveal>
                <div className="mt-8 flex items-center gap-3">
                  <span className="reg-mark" aria-hidden="true" />
                  <span className="h-px w-16 bg-hair-strong" aria-hidden="true" />
                  <span className="tech text-ink-muted">Emirates Textiles</span>
                </div>
              </div>

              {/* Image side — bleeds to the page edge */}
              <Reveal
                preset="slideX"
                className={cn("relative min-h-[52svh] overflow-hidden lg:min-h-[40rem]", imageLeft ? "lg:order-first" : "lg:order-last")}
              >
                <Image
                  src={item.image}
                  alt={`${item.name} — Emirates Textiles fabric`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
