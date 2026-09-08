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
| **Typeface** | Open Sans — one family, all weights (client direction) | Hierarchy is carried by scale, weight, tracking and composition, not a display serif. Avoids the "AI luxury serif" look; reads as technical/textile-editorial. |
| **Primary (structure/CTA)** | Navy `#0A2352` (from the real logo) | Recognisably Emirates; premium; white-on-navy passes AA easily. |
| **Accent (reserved)** | Gold `#C69A3F` (from the logo band) | Single accent, used sparingly: eyebrow marks, active swatch ring, rules, index numerals. Never as body text on light (fails contrast). |
| **Surfaces** | Warm neutrals: white / canvas `#F8F5F0` / linen / sand | Light, warm, textile-showroom feel. No dark page backgrounds. |
| **Radius family** | Small (`0.25–0.875rem`) | Editorial, not rounded-everything. |
| **Surface rhythm** | canvas → paper → linen → canvas → sand → paper → navy | No two adjacent sections share a tone. |
| **Dark spotlight** | None — the page is light end-to-end (client direction) | The Enquire section and footer were reworked from navy to warm light surfaces (linen / dune) so the close reads as a fabric catalogue, not a bolted-on dark CTA. |
| **Logo** | Real Emirates logo, background flood-filled to transparent (`scripts/logo_transparent.py`) — used in the nav and the footer | White box removed so it sits on any surface. |
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

## Art-direction rework (v2)

The first build read as a predictable "hero → cards → cards → CTA" template. v2
rebuilds every section as its own composition, removes the AI/component-library
tells, and keeps the strategy, real content and light direction unchanged.

**Section-by-section:**
- **Type** — switched to Open Sans everywhere (client direction). Character now
  comes from weight contrast, oversized words, tight tracking and small tracked
  technical labels.
- **Textile graphic language** (new, in `globals.css`) — selvage edge rules, roll-
  width measurement rules, dashed stitch lines, registration crosshairs, tabular
  fabric codes. Applied sparingly so the site feels specific to a textile supplier.
- **Hero** — no longer a plain split. Weight-contrast headline (FABRIC / for every
  / SPACE.), the fabric image bleeds off the right edge with an overlapping macro
  crop, a selvage spec label and a roll-width measurement rule. LCP (H1 + priority
  image) stays static.
- **Fabric explorer** (replaces the 6-card grid) — a range list drives one large
  preview that clip-reveals the cloth on hover/tap, with live technical metadata.
- **Colour experience** — reworked into a textile design tool: giant "18 COLOURS",
  a large live preview that updates on hover, and the swatches as a compact
  archive. The full-screen lightbox is retained (the client's core request).
- **Signature moment** (new) — a strip of cloth unfurls to a full-width scene on
  scroll (clip-path driven by rAF progress). One memorable, textile-specific
  interaction. Reduced-motion shows the full frame immediately.
- **Applications** — a full-bleed alternating lookbook (oversized words, edge-bleed
  imagery, horizontal reveals), not a card grid.
- **Heritage** — a giant, cropped "1999" with the real woven cloth showing through
  the numerals (background-clip: text).
- **Simon Baker** — calmer and cinematic, using the real Simon Baker branded
  lifestyle bed image (overlays cropped out).
- **Navigation** — small tracked-caps labels with a gold underline draw, a brand
  detail line, and a numbered full-screen mobile menu.
- **Motion** — less generic fade; adds clip-path reveals, horizontal (slideX)
  image entrances, the scroll unfurl and live swatch transitions. All reduced-
  motion guarded (engine `useReducedMotion` + CSS `motion-safe:` / media queries).

**Surface rhythm:** canvas → paper → linen → full-bleed signature → canvas/linen
alternating lookbook → sand → paper → navy (final CTA) → navy-deep (footer).

## 21st.dev intake register (per RESEARCH/EXTERNAL-COMPONENT-INTAKE.md)

Used as *reference only* — structural/interaction patterns, rebuilt in CSS to
Emirates tokens (no code, copy, colour, type or imagery taken; no dependency
added; the OS `motion` engine remains the only animation library).

| Pattern taken | 21st.dev source (author) | Where it influenced | How adapted |
|---|---|---|---|
| Clip-path bloom + stacked-slide container | "Slideshow" (youcefbnm) | Fabric explorer preview | Rebuilt with CSS `clip-path` transitions + React state; no framer, restyled to Emirates. |
| Scroll image-mask / bloom reveal | "Reveal Image Mask" (daiwiikharihar), "Scroll Reveal Image" (unlumen) | Signature unfurl | Rebuilt as CSS `clip-path inset` driven by a rAF scroll-progress hook. |
| Hover-to-change large image | "Hover Image Gallery" (isaiahbjork) | Swatch live-preview panel | Reduced to hover/focus → active index updating one preview. |
| Editorial image-led hero | "Editorial Image Hero" (felipemenezes098) | Hero composition | Only the idea of an edge-bleed image + asymmetric headline; fully re-laid-out. |
| Alternating full-bleed scenes / horizontal reveal | "Horizontal Scroll Gallery" (pulkitxm) family | Applications lookbook | Simplified to alternating edge-bleed rows with slideX entrances. |

No 21st.dev component was installed or shipped. Status: `project-only`, reference.

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
| **Simon Baker image** | The client's real Simon Baker branded lifestyle bed shot (overlays cropped out) | A dedicated shoot would lift it further. |
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
