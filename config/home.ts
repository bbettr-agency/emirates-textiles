/**
 * Emirates Textiles — homepage content.
 *
 * TRUTH DISCIPLINE: every product name, width, composition and category below is
 * taken verbatim from the live Emirates Textiles catalogue. No specifications,
 * certifications or statistics are invented. Index numbers (01–06) are ordering
 * only, not product SKUs. The featured colour collection uses the client-supplied
 * reference (136cm · 18 colours), labelled as a featured collection.
 */

export const hero = {
  eyebrow: "Fabric & textile supply",
  est: "Est. 1999 · Pretoria",
  h1: ["Fabric", "for every", "space."],
  sub: "Emirates Textiles has supplied South Africa with quality fabrics and textiles since 1999 — sheeting, tabling, towelling, upholstery, curtaining and hospitality ranges, held in depth and supplied wholesale.",
  primaryCta: { label: "Explore fabrics", href: "#fabrics" },
  secondaryCta: { label: "Request a sample", href: "#enquire" },
  spec: { label: "Soft-touch fabric", value: "Held in 18+ colours · to 280cm" },
  imageAlt:
    "A stack of folded Emirates Textiles soft-touch fabrics in muted tones — grey, blush, red, stone, duck-egg and navy",
  macroAlt: "Macro detail of a woven damask textile",
} as const;

export const fabrics = {
  eyebrow: "The range",
  heading: "Six fabrics. One supplier.",
  lead: "Held in depth and colour, supplied to interiors, hospitality and manufacturing across South Africa. Hover a range to see the cloth.",
  categories: [
    {
      name: "Sheeting",
      composition: "Poly cotton & Egyptian cotton",
      width: "240–280cm",
      blurb: "144TC Poly Cotton Plain Sheeting, Egyptian Cotton 280cm and percale — the base cloth of the range.",
      image: "/img/ex-sheeting.jpg",
      alt: "Folded poly-cotton and Egyptian-cotton sheeting fabric",
    },
    {
      name: "Tabling",
      composition: "Damask, jacquard & Conlyn weave",
      width: "235–320cm",
      blurb: "Damask Polyester 280cm, Jacquard Polyester 280/320cm and Conlyn Weave 235cm for tables that dress a room.",
      image: "/img/ex-tabling.jpg",
      alt: "Woven damask tabling fabric with a subtle jacquard pattern",
    },
    {
      name: "Towelling",
      composition: "100% cotton terry",
      width: "150cm",
      blurb: "Absorbent 100% cotton towelling in a full colour card — bath, spa and hospitality.",
      image: "/img/ex-towelling.jpg",
      alt: "Close-up of 100% cotton terry towelling",
    },
    {
      name: "Upholstery",
      composition: "Bull denim & heavyweight cottons",
      width: "150cm",
      blurb: "Bull Denim 100% Cotton and workwear-weight cottons — hard-wearing cloth for furniture and production.",
      image: "/img/ex-upholstery.jpg",
      alt: "Diagonal twill weave of 100% cotton bull denim in olive",
    },
    {
      name: "Curtaining",
      composition: "Linings & drapery textiles",
      width: "to 280cm",
      blurb: "Curtain linings and drape-weight fabrics, cut to width for makers and installers.",
      image: "/img/ex-curtaining.jpg",
      alt: "Draped curtaining fabric in soft neutral tones",
    },
    {
      name: "Hospitality",
      composition: "Hotel-grade percales & sateens",
      width: "to 280cm",
      blurb: "230TC Cotton Percale, T200 Poly Cotton Percale and T300 Egyptian Cotton for the hospitality trade.",
      image: "/img/ex-hospitality.jpg",
      alt: "Crisp white hotel-grade cotton percale",
    },
  ],
} as const;

/**
 * Featured colour collection — client-supplied reference (136cm, 18 colours).
 * Presented as a featured collection, not a specific published range. Hex values
 * are close visual approximations for the demo swatches only.
 */
export const colours = {
  eyebrow: "Colour",
  heading: "The whole colour range. Up close.",
  lead: "No more sample cards. Move across the colours to preview the cloth; select one to open it full-screen.",
  meta: { width: "136cm", count: "18", label: "Featured colour collection" },
  note: "Featured demo collection. Exact ranges, widths and colour availability are confirmed on enquiry.",
  swatches: [
    { name: "White", hex: "#F4F4F0" },
    { name: "Natural", hex: "#DED2BC" },
    { name: "Light Grey", hex: "#C4C7C9" },
    { name: "Lemon", hex: "#F0E4AA" },
    { name: "Sunlight", hex: "#F3D282" },
    { name: "Peach", hex: "#F0CDB4" },
    { name: "Pink", hex: "#E8C2C7" },
    { name: "Coral", hex: "#E07468" },
    { name: "Orange", hex: "#D87837" },
    { name: "Red", hex: "#B02C2E" },
    { name: "Mint", hex: "#C6E0CD" },
    { name: "Light Olive", hex: "#969660" },
    { name: "Green", hex: "#3C784E" },
    { name: "Fatigue", hex: "#68684E" },
    { name: "Petrol", hex: "#2C606E" },
    { name: "Light Navy", hex: "#48608C" },
    { name: "Dark Navy", hex: "#202842" },
    { name: "Black", hex: "#262628" },
  ],
} as const;

/** Signature scroll moment — a fabric strip unfurls to full width. */
export const signature = {
  strip: "The loom",
  headline: "From the weave to the room.",
  sub: "One length of cloth, chosen for how it falls, wears and holds colour — then cut for the space it belongs in.",
  image: "/img/sig-fabric.jpg",
  imageAlt: "A broad length of woven Emirates Textiles fabric",
} as const;

export const applications = {
  eyebrow: "In use",
  heading: "What the cloth becomes.",
  items: [
    { name: "Hospitality", note: "Table linen, bedding and bath for hotels, lodges and guesthouses.", image: "/img/app-hospitality.jpg" },
    { name: "Interiors", note: "Upholstery, scatter and soft furnishing for designers and homes.", image: "/img/app-interiors.jpg" },
    { name: "Curtaining", note: "Drapery and linings, cut to width for makers and installers.", image: "/img/app-curtaining.jpg" },
    { name: "Bedding", note: "Sheeting, percale and sateen — including our Simon Baker range.", image: "/img/app-bedding.jpg" },
    { name: "Manufacturing", note: "Bull denim and cotton drills for workwear and production.", image: "/img/app-manufacturing.jpg" },
  ],
} as const;

export const heritage = {
  eyebrow: "Since 1999",
  year: "1999",
  heading: "Supplying quality textiles since 1999.",
  body: "From a base in Pretoria, Emirates Textiles has grown into one of South Africa's leading textile wholesalers — supplying retail, interiors and the hospitality industry with fabrics chosen for quality and held in depth.",
  quote: "Our name Emirates Textiles is synonymous with quality.",
  points: [
    { k: "Established", v: "1999" },
    { k: "Based in", v: "Pretoria, SA" },
    { k: "Supply", v: "Wholesale & hospitality" },
  ],
  image: "/img/heritage.jpg",
  imageAlt: "Folded Emirates Textiles fabrics held in depth",
} as const;

export const simonBaker = {
  eyebrow: "Simon Baker",
  heading: "Luxury bed linen, by Emirates Textiles.",
  body: "Our own brand, Simon Baker, is well known for excellent quality — a luxury bed-linen range that sits alongside the fabric business, supplying homes and the hospitality trade.",
  spec: "300TC Egyptian Giza Cotton · Satin Stitched",
  cta: { label: "Explore Simon Baker", href: "https://www.instagram.com/simonbakerlinen", external: true },
  image: "/img/sb.jpg",
  imageAlt: "A made bed dressed in Simon Baker satin-stitched grey Egyptian cotton bed linen",
} as const;

export const finalCta = {
  eyebrow: "Enquire",
  heading: "Looking for a specific fabric?",
  body: "Talk to our team about colours, widths, quantities and availability. We supply wholesale and to the hospitality trade across South Africa.",
} as const;
