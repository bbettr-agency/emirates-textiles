import Image from "next/image";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { site, waLink } from "@/config/site";
import { WhatsAppGlyph } from "@/components/funnel/channel-ctas";

/**
 * Footer — light warm ground (a catalogue colophon), grounding the page without a
 * dark panel. Uses the real transparent Emirates logo, textile detailing (selvage
 * rule, technical labels, gold marks) and an asymmetric layout so it reads as part
 * of the same site, not a generic footer.
 */
export function Footer() {
  const a = site.contact.address;
  return (
    <footer className="bg-dune text-ink-2">
      {/* selvage top edge */}
      <div className="container">
        <div className="flex items-center gap-4 pt-12">
          <span className="reg-mark" aria-hidden="true" />
          <span className="stitch flex-1 !border-hair-strong" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-ink-2">Fabric &amp; textile supply</span>
        </div>
      </div>

      <div className="container grid gap-12 pb-10 pt-12 md:grid-cols-[1.3fr_0.8fr_1fr]">
        {/* Brand */}
        <div className="max-w-sm">
          <Image src="/img/logo.png" alt={`${site.name} logo`} width={205} height={100} className="h-11 w-auto" />
          <p className="mt-6 text-sm leading-relaxed text-ink-2">{site.positioning}</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-ink-muted">
            Est. {site.founded} · Pretoria, SA
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink-muted">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group inline-flex items-center gap-2 text-ink-2 transition-colors duration-200 hover:text-navy-ink">
                  <span className="h-px w-0 bg-gold transition-all duration-300 ease-emirates group-hover:w-4" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink-muted">Get in touch</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="text-ink-2">
                {a.line1}
                <br />
                {a.line2}
                <br />
                {a.city} {a.postcode}, {a.country}
              </span>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="flex items-center gap-3 text-ink-2 transition-colors hover:text-navy-ink">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={waLink("Hi Emirates Textiles, I'd like to enquire about fabric.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-2 transition-colors hover:text-navy-ink">
                <WhatsAppGlyph className="h-4 w-4 shrink-0 text-gold" />
                {site.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-ink-2 transition-colors hover:text-navy-ink">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-2 transition-colors hover:text-navy-ink">
                <Instagram className="h-4 w-4 shrink-0 text-gold" />
                {site.contact.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* colophon bar */}
      <div className="border-t border-hair-strong">
        <div className="container flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="tech-code !text-ink-muted">South African fabric &amp; textile wholesalers · since {site.founded}</p>
        </div>
      </div>
    </footer>
  );
}
