import { Phone, MapPin } from "lucide-react";
import { Reveal } from "@/engine/motion";
import { EnquiryForm } from "@/components/funnel/enquiry-form";
import { WhatsAppGlyph } from "@/components/funnel/channel-ctas";
import { finalCta } from "@/config/home";
import { site, waLink } from "@/config/site";

/**
 * Final CTA — the page's one dark spotlight (deep brand navy, not charcoal), the
 * conversion moment. Native enquiry form (no GHL) + direct Call/WhatsApp. All
 * contact details are real.
 */
export function FinalCta() {
  const a = site.contact.address;
  return (
    <section id="enquire" className="section bg-navy text-white">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow !text-gold">
              <span className="eyebrow-mark" aria-hidden="true" />
              {finalCta.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight text-white md:text-5xl lg:text-[3.2rem] lg:leading-[1.02]">
              {finalCta.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-measure text-base leading-relaxed text-white/70 md:text-lg">
              {finalCta.body}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink("Hi Emirates Textiles, I'd like to enquire about fabric — colours, widths and availability.")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="cta-whatsapp"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-btn bg-whatsapp px-6 text-[0.95rem] font-semibold text-[#04310f] transition-transform duration-200 ease-emirates hover:-translate-y-0.5"
              >
                <WhatsAppGlyph className="h-[1.15em] w-[1.15em]" />
                WhatsApp us
              </a>
              <a
                href={site.contact.phoneHref}
                data-cta="cta-call"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-btn border border-white/25 px-6 text-[0.95rem] font-semibold text-white transition-[transform,border-color] duration-200 ease-emirates hover:-translate-y-0.5 hover:border-gold"
              >
                <Phone className="h-[1.1em] w-[1.1em]" />
                {site.contact.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-6 text-sm text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {a.line1}, {a.line2}, {a.city} {a.postcode}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} preset="fadeUp">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
