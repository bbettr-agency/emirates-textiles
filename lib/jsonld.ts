import { site } from "@/config/site";

/** Organization + LocalBusiness structured data from real NAP. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    foundingDate: String(site.founded),
    description: site.positioning,
    logo: `${site.url}/img/logo.png`,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    sameAs: [site.contact.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
      addressLocality: site.contact.address.city,
      postalCode: site.contact.address.postcode,
      addressCountry: "ZA",
    },
  };
}
