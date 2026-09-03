# Emirates Textiles — Homepage Demo · Project Status

**Scope:** Homepage demo only (not the full site). Built on Bbettr Website OS.
**Goal:** Reposition Emirates Textiles from a linen-heavy site into a modern,
premium **fabric & textile supplier**, per client feedback.

---

## Visual Direction Brief

| Dimension | Decision | Why |
|---|---|---|
| **Density mode** | Editorial (light, airy, generous space) | Client explicitly asked for light/clean/airy; imagery carries the argument. |
| **Motion character** | `editorial` (ENGINE/motion) — unhurried, calm | Brief: "calm, editorial, tactile, smooth, confident." Not Cuisine-Foods-style. |
| **Display type** | Fraunces (serif) | Warm, tactile, editorial — evokes craft/fabric without being trendy. |
| **Body type** | Manrope | Clean, modern, premium; carries the wholesale/spec voice. |
| **Primary (structure/CTA)** | Navy `#0A2352` (from the real logo) | Recognisably Emirates; premium; white-on-navy passes AA easily. |
| **Accent (reserved)** | Gold `#C69A3F` (from the logo band) | Single accent, used sparingly: eyebrow marks, active swatch ring, rules, index numerals. Never as body text on light (fails contrast). |
| **Surfaces** | Warm neutrals: white / canvas `#F8F5F0` / linen / sand | Light, warm, textile-showroom feel. No dark page backgrounds. |
| **Radius family** | Small (`0.25–0.875rem`) | Editorial, not rounded-everything. |
| **Surface rhythm** | canvas → paper → linen → canvas → sand → paper → navy | No two adjacent sections share a tone. |
| **Dark spotlight** | One: the Final CTA (deep brand **navy**, not charcoal) + navy footer | OS wants one dark conversion moment; kept to brand navy to honour "not a dark website." |
| **Photography** | Real Emirates fabric photos, macro-cropped + optimised | Hero = real folded fabric stack; category tiles = real weave macros. |
| **Grid-break moments** | Hero image bleed into warm wash; wide Hospitality tile; giant "1999" | Deliberate, sparing. |

**Blocking Question:** *"Is this a serious fabric supplier, or just a linen store?"*
→ Hero leads with fabric (the image is the argument), states the category, and
carries wholesale/hospitality/heritage proof.

---

## Section chain (question → answer)

1. **Hero** — "What is this?" → Fabric, for every space. Real fabric stack.
2. **Fabrics** — "What do you actually stock?" → 6 real ranges (editorial grid).
3. **Colour experience** — "Can I see the colours properly?" → premium swatch
   lightbox that **replaces the dated sample cards** (the headline client ask).
4. **Applications** — "Where does it go?" → hospitality, interiors, curtaining…
5. **Heritage** — "Are you established?" → since **1999**, Pretoria.
6. **Simon Baker** — "What about the linen brand?" → present but supporting.
7. **Final CTA** — "How do I enquire?" → native form + WhatsApp/Call.

---

## Truth & verification

Every product name, width, composition and category is taken **verbatim** from
the live Emirates Textiles catalogue. No specs, certifications or statistics were
invented.

**Verified & used:** Founded 1999 · Pretoria (11 Rain Street, Westhills Business
Estate, Sunderland Ridge, Centurion, 0157) · real fabric ranges (Bull Denim,
Cotton Towelling, Conlyn Weave/Gingham, Damask, Jacquard, Poly Cotton Sheeting,
Egyptian Cotton, Percales/Hotel Collection, Curtain Linings) · categories
(Sheeting, Tabling, Towelling, Upholstery, Curtaining, Hospitality) · Simon Baker
is Emirates' **own** luxury bed-linen brand · Instagram @simonbakerlinen.

**Client-supplied (not on the live site):** the featured colour collection —
**136cm roll width · 18 colours** (Pink, Mint, Lemon, Sunlight, Light Grey,
Peach, White, Natural, Black, Orange, Coral, Light Olive, Green, Fatigue, Dark
Navy, Petrol, Light Navy, Red). Presented honestly as a **featured colour
collection**, not attributed to a specific published range. Swatch hex values are
close visual approximations for the demo.

**Contact inconsistencies to confirm with client** (the live site disagrees with
itself):
- Email: used `info@emirates-textiles.co.za` (letterhead); the contact page shows
  `sales@`.
- Phone: used `+27 12 666 7723`; the site also lists `/9/7273` extensions.
- WhatsApp/cell: `+27 82 521 2888` (a second cell `+27 82 786 5558` also exists).

All the above live in `config/site.ts` — a one-line change once confirmed.

---

## Temporary assets / placeholders to replace on full build

| Asset | Current (demo) | Replace with |
|---|---|---|
| **Swatch texture** | A synthesised seamless woven texture (`/img/weave.webp`) tinted per colour | Optional: photographed macro of each real dyed fabric, or keep — it reads as real cloth. |
| **Swatch colours** | Approximate hex for the 18 client colours | Exact dyed-fabric colour references / real swatch photography. |
| **Simon Baker image** | A crisp white percale crop (real Emirates fabric) | Proper Simon Baker lifestyle bed-linen photography. |
| **Category / hero imagery** | Real client fabric photos, macro-cropped | A short art-directed fabric shoot would lift every section further. |
| **Enquiry form** | Native, validates client-side, shows success state — **not wired to a backend** | Connect to the Bbettr webhook architecture (no GHL). |
| **`site.url`** | Vercel demo URL | Production domain. |

Images were processed from the client's own photos via `scripts/*.py`
(Pillow) — re-runnable and documented.

---

## OS compliance notes

- **Motion:** all reveals via `ENGINE/motion` presets; LCP (H1) never animated;
  `priority` hero image not opacity-animated; `MotionProvider` + `<noscript>`
  fallback in the root layout; reduced motion honoured (Reveal renders final
  state instantly; CSS uses `motion-safe:`).
- **Accent-on-non-CTA:** gold is used as the brand accent on small non-CTA marks
  (per the client's explicit "use existing brand colours as accents"), with the
  primary CTA rendered in solid navy so the conversion path stays unambiguous.
- **Performance:** First Load JS ~149kB; images optimised (public/img ~0.8MB
  total) and served AVIF/WebP via `next/image`.

**Motion character declared:** `editorial`.
