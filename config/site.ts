/**
 * Emirates Textiles — canonical site + contact data.
 * All values are REAL, taken from the existing website and the company's own
 * fabric sample-card letterhead. Where the live site is inconsistent (e.g. sales@
 * vs info@), the letterhead value is used and flagged in PROJECT_STATUS.md.
 */
export const site = {
  name: "Emirates Textiles",
  legalName: "Emirates Textiles",
  founded: 1999,
  url: "https://emirates-textiles-demo.vercel.app",
  tagline: "Quality fabrics & textiles, supplied across South Africa since 1999.",
  positioning:
    "South African wholesalers of quality fabrics, hospitality textiles and Simon Baker luxury bed linen.",

  contact: {
    phoneDisplay: "+27 12 666 7723",
    phoneHref: "tel:+27126667723",
    whatsappDisplay: "+27 82 521 2888",
    whatsappNumber: "27825212888",
    email: "info@emirates-textiles.co.za",
    address: {
      line1: "11 Rain Street, Westhills Business Estate",
      line2: "Sunderland Ridge, Centurion",
      city: "Pretoria",
      postcode: "0157",
      country: "South Africa",
    },
    instagram: "https://www.instagram.com/simonbakerlinen",
    instagramHandle: "@simonbakerlinen",
  },

  nav: [
    { label: "Fabrics", href: "#fabrics" },
    { label: "Colours", href: "#colours" },
    { label: "Applications", href: "#applications" },
    { label: "Simon Baker", href: "#simon-baker" },
    { label: "Contact", href: "#enquire" },
  ],
} as const;

/** Pre-filled WhatsApp link. */
export function waLink(message: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
