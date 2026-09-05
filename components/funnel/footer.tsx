import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { site, waLink } from "@/config/site";
import { WhatsAppGlyph } from "@/components/funnel/channel-ctas";

/**
 * Footer — deep brand navy (the one dark surface, expected of a footer), kept
 * clean and simplified. Typographic wordmark rather than the colour logo file, so
 * the brand reads clearly on navy without altering the logo artwork.
 */
export function Footer() {
  const a = site.contact.address;
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + positioning */}
          <div className="max-w-sm">
            <p className="text-2xl font-extrabold uppercase tracking-tight text-white">
              Emirates <span className="text-gold">Textiles</span>
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {site.positioning}
            </p>
            <p className="mt-6 tech !text-white/40">Est. {site.founded} · Pretoria, SA</p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <p className="eyebrow !text-white/40">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/70 transition-colors duration-200 hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="eyebrow !text-white/40">Get in touch</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-white/70">
                  {a.line1}
                  <br />
                  {a.line2}
                  <br />
                  {a.city} {a.postcode}, {a.country}
                </span>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hi Emirates Textiles, I'd like to enquire about fabric.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                >
                  <WhatsAppGlyph className="h-4 w-4 shrink-0 text-gold" />
                  {site.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-gold" />
                  {site.contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>South African fabric &amp; textile wholesalers since {site.founded}.</p>
        </div>
      </div>
    </footer>
  );
}
