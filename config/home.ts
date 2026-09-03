/**
 * Emirates Textiles — homepage content.
 *
 * TRUTH DISCIPLINE: every product name, width, composition and category below is
 * taken verbatim from the live Emirates Textiles catalogue. No specifications,
 * certifications or statistics are invented. The featured colour collection uses
 * the client-supplied reference (136cm · 18 colours) and is labelled as a
 * featured collection, not attributed to a specific published range.
 */

export const hero = {
  eyebrow: "Fabric & textile supply · Est. 1999",
  h1: "Fabric for every space.",
  sub: "Emirates Textiles has supplied South Africa with quality fabrics and textiles since 1999 — sheeting, tabling, towelling, upholstery, curtaining and hospitality ranges, held in depth and supplied wholesale from Pretoria.",
  primaryCta: { label: "Explore fabrics", href: "#fabrics" },
  secondaryCta: { label: "Request a sample", href: "#enquire" },
  proof: ["Established 1999", "Pretoria, South Africa", "Wholesale & hospitality"],
  imageAlt:
    "A stack of folded Emirates Textiles soft-touch fabrics in muted tones — grey, blush, red, stone, duck-egg and navy",
} as const;

export const fabrics = {
  eyebrow: "Our fabrics",
  heading: "A fabric for every application.",
  lead: "Six core textile ranges, held in depth and colour and supplied to interiors, hospitality and manufacturing across South Africa.",
  categories: [
    {
      name: "Sheeting",
      spec: "Poly cotton & Egyptian cotton · 240–280cm",
      ranges: "144TC Poly Cotton Plain Sheeting · Egyptian Cotton 280cm · Percale",
      image: "/img/cat-sheeting.jpg",
      alt: "Folded poly-cotton and Egyptian-cotton sheeting fabric",
      span: "lg",
    },
    {
      name: "Tabling",
      spec: "Damask, jacquard & Conlyn weave · to 320cm",
      ranges: "Damask Polyester 280cm · Jacquard Polyester 280/320cm · Conlyn Weave 235cm",
      image: "/img/cat-tabling.jpg",
      alt: "Woven damask tabling fabric with a subtle jacquard pattern",
      span: "sm",
    },
    {
      name: "Towelling",
      spec: "100% cotton towelling · 150cm",
      ranges: "Cotton Towelling · terry loop",
      image: "/img/cat-towelling.jpg",
      alt: "Close-up of 100% cotton terry towelling",
      span: "sm",
    },
    {
      name: "Upholstery",
      spec: "Bull denim & heavyweight cottons · 150cm",
      ranges: "Bull Denim 100% Cotton · workwear-weight cotton",
      image: "/img/cat-upholstery.jpg",
      alt: "Diagonal twill weave of 100% cotton bull denim in olive",
      span: "sm",
    },
    {
      name: "Curtaining",
      spec: "Linings & drapery textiles",
      ranges: "Curtain Linings · drape-weight fabrics",
      image: "/img/cat-curtaining.jpg",
      alt: "Draped curtaining fabric in soft neutral tones",
      span: "sm",
    },
    {
      name: "Hospitality",
      spec: "Hotel-grade percales & sateens",
      ranges: "230TC Cotton Percale · T200 Poly Cotton Percale · T300 Egyptian Cotton",
      image: "/img/cat-hospitality.jpg",
      alt: "Crisp white hotel-grade cotton percale",
      span: "lg",
    },
  ],
} as const;

/**
 * Featured colour collection — client-supplied reference (Roll width 136cm,
 * 18 colours). Presented as a featured collection, not a specific published range.
 * Hex values are close visual approximations for the demo swatches only.
 */
export const colours = {
  eyebrow: "Colour",
  heading: "The whole colour range. Up close.",
  lead: "A cleaner way to explore fabric colour — the dated sample card, replaced. Select any colour to see the weave enlarged.",
  meta: { width: "136cm roll width", count: "18 colours", label: "Featured colour collection" },
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

export const applications = {
  eyebrow: "In use",
  heading: "What these textiles become.",
  lead: "The same fabrics, chosen and cut for the spaces they end up in — from hotel floors to living rooms.",
  items: [
    { name: "Hospitality", note: "Table linen, bedding and bath for hotels, lodges and guesthouses." },
    { name: "Interiors & décor", note: "Upholstery, scatter and soft furnishing for designers and homes." },
    { name: "Curtaining", note: "Drapery and linings, cut to width for makers and installers." },
    { name: "Bedding & linen", note: "Sheeting, percale and sateen — including our Simon Baker range." },
    { name: "Manufacturing", note: "Bull denim and cotton drills for workwear and production." },
  ],
  imageAlt: "A wide band of folded Emirates Textiles fabrics in graduated tones",
} as const;

export const heritage = {
  eyebrow: "Since 1999",
  year: "1999",
  heading: "Supplying quality textiles since 1999.",
  body: "From a base in Pretoria, Emirates Textiles has grown into one of South Africa's leading textile wholesalers — supplying retail, interiors and the hospitality industry with fabrics chosen for quality and held in depth.",
  quote: "Our name Emirates Textiles is synonymous with quality.",
  points: [
    { k: "Est.", v: "1999" },
    { k: "Based in", v: "Pretoria, SA" },
    { k: "Supply", v: "Wholesale & hospitality" },
  ],
} as const;

export const simonBaker = {
  eyebrow: "Simon Baker",
  heading: "Luxury bed linen, by Emirates Textiles.",
  body: "Our own brand, Simon Baker, is well known for excellent quality — a luxury bed-linen range that sits alongside the fabric business, supplying homes and the hospitality trade.",
  cta: { label: "Explore Simon Baker", href: "https://www.instagram.com/simonbakerlinen", external: true },
  imageAlt: "Folded luxury bed-linen fabric from the Simon Baker range",
} as const;

export const finalCta = {
  eyebrow: "Enquire",
  heading: "Looking for a specific fabric?",
  body: "Talk to our team about colours, widths, quantities and availability. We supply wholesale and to the hospitality trade across South Africa.",
} as const;
