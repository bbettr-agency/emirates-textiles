import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/engine/motion";
import { EnquiryForm } from "@/components/funnel/enquiry-form";
import { WhatsAppCta } from "@/components/funnel/channel-ctas";
import { Button } from "@/components/ui/button";
import { finalCta } from "@/config/home";
import { site } from "@/config/site";

/**
 * Enquire — reworked light, in the site's textile-catalogue language (a trade
 * "order slip"): a spec-sheet header rule, an editorial statement with a pinned
 * fabric swatch, real contact details, and the native form. No dark panel.
 */
export function FinalCta() {
  const a = site.contact.address;
  return (
    <section id="enquire" className="section relative overflow-hidden bg-linen">
      <div className="container">
        {/* spec-sheet header rule */}
        <div className="flex items-center gap-4">
          <span className="tech text-ink-muted">Enquire</span>
          <span className="stitch stitch-gold flex-1" aria-hidden="true" />
          <span className="tech-code text-ink-muted">Emirates Textiles · Est. 1999</span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Statement + contact */}
          <div>
            <Reveal>
              <h2 className="max-w-xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
                {finalCta.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-measure text-base leading-relaxed text-ink-2 md:text-lg">{finalCta.body}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppCta
                  label="WhatsApp us"
                  message="Hi Emirates Textiles, I'd like to enquire about fabric — colours, widths and availability."
                  size="lg"
                  dataCta="cta-whatsapp"
                />
                <Button href={site.contact.phoneHref} variant="ghost" size="lg" external dataCta="cta-call">
                  <Phone className="h-[1.1em] w-[1.1em]" />
                  {site.contact.phoneDisplay}
                </Button>
              </div>
            </Reveal>

            {/* contact facts + a pinned fabric swatch */}
            <div className="mt-12 flex items-end justify-between gap-6 border-t border-hair-strong pt-8">
              <Reveal delay={0.15}>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-sm text-ink-2">
                      {a.line1}, {a.line2}
                      <br />
                      {a.city} {a.postcode}, {a.country}
                    </span>
                  </li>
                  <li>
                    <a href={site.contact.phoneHref} className="flex items-center gap-3 text-sm text-ink-2 hover:text-navy-ink">
                      <Phone className="h-4 w-4 shrink-0 text-gold" />
                      {site.contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="group flex items-center gap-3 text-sm text-ink-2 hover:text-navy-ink">
                      <Mail className="h-4 w-4 shrink-0 text-gold" />
                      {site.contact.email}
                    </a>
                  </li>
                </ul>
              </Reveal>

              {/* pinned swatch — a real, tactile detail */}
              <Reveal delay={0.2} preset="imageReveal" className="hidden shrink-0 sm:block">
                <div className="w-28 lg:w-32">
                  <div className="relative aspect-square overflow-hidden shadow-lift">
                    <Image src="/img/ex-hospitality.jpg" alt="Woven cotton fabric sample" fill sizes="130px" className="object-cover" />
                  </div>
                  <p className="mt-2 tech-code text-ink-muted">Sample · on request</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1} preset="fadeUp">
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
