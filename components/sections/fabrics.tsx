import Image from "next/image";
import { Reveal, Stagger } from "@/engine/motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { fabrics } from "@/config/home";
import { cn } from "@/lib/utils";

/**
 * Discover our Fabrics — an editorial, asymmetric grid (2 / 3 / 1-wide), not a row
 * of identical icon cards. Real ranges and widths are the evidence. Image-forward
 * with typographic overlays; hover scales the fabric and grows a gold rule.
 */

// Bespoke bento layout classes, in config order:
// Sheeting · Tabling · Towelling · Upholstery · Curtaining · Hospitality
const layout = [
  "lg:col-span-4 h-64 md:h-72 lg:h-[23rem]",
  "lg:col-span-2 h-64 md:h-72 lg:h-[23rem]",
  "lg:col-span-2 h-56 lg:h-72",
  "lg:col-span-2 h-56 lg:h-72",
  "lg:col-span-2 h-56 lg:h-72",
  "lg:col-span-6 h-56 lg:h-64",
];

export function Fabrics() {
  return (
    <section id="fabrics" className="section bg-paper">
      <div className="container">
        <SectionHeading eyebrow={fabrics.eyebrow} heading={fabrics.heading} lead={fabrics.lead} />

        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {fabrics.categories.map((c, i) => (
            <Reveal
              key={c.name}
              preset="fadeUpItem"
              className={cn("group relative overflow-hidden rounded-card ring-1 ring-hair", layout[i])}
            >
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 ease-emirates group-hover:scale-[1.05]"
              />
              {/* legibility scrim (bottom-anchored) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-gold transition-all duration-500 ease-emirates group-hover:w-10" />
                  <p className="eyebrow !text-white/70">{c.spec}</p>
                </div>
                <h3 className="mt-2 font-display text-2xl text-white lg:text-[1.75rem]">{c.name}</h3>
                <p className="mt-1 max-w-md text-xs leading-relaxed text-white/70">{c.ranges}</p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
