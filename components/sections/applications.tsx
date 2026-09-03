import Image from "next/image";
import { Reveal, Stagger } from "@/engine/motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { applications } from "@/config/home";

/**
 * Fabric in use — shifts perception from "here are samples" to "here is what these
 * become". Editorial: a typographic list of applications anchored by one tactile
 * fabric image. No card grid.
 */
export function Applications() {
  return (
    <section id="applications" className="section bg-canvas">
      <div className="container">
        <SectionHeading eyebrow={applications.eyebrow} heading={applications.heading} lead={applications.lead} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* List */}
          <Stagger as="ul" className="lg:col-span-7">
            {applications.items.map((item, i) => (
              <Reveal key={item.name} preset="fadeUpItem" as="li">
                <div className="group flex items-baseline gap-5 border-b border-hair py-6 transition-colors hover:border-gold md:gap-8">
                  <span className="font-display text-lg text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-ink md:text-[1.7rem]">{item.name}</h3>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-2 md:text-base">
                      {item.note}
                    </p>
                  </div>
                  <span
                    className="hidden shrink-0 translate-x-0 text-gold opacity-0 transition-all duration-300 ease-emirates group-hover:translate-x-1 group-hover:opacity-100 sm:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Reveal>
            ))}
          </Stagger>

          {/* Anchoring image */}
          <Reveal className="lg:col-span-5" preset="fadeUp">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-panel ring-1 ring-hair">
              <Image
                src="/img/fabric-band.jpg"
                alt={applications.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 to-transparent" aria-hidden="true" />
              <p className="absolute bottom-5 left-5 right-5 font-display text-xl leading-snug text-white">
                One supplier, from hospitality floors to living rooms.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
