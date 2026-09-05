# Emirates Textiles — Homepage Demo

A premium homepage demo for **Emirates Textiles**, a South African fabric &
textile wholesaler (est. 1999, Pretoria). Repositions the brand from a
linen-heavy site into a modern, light, editorial **fabric-first** presentation.

Built on **Bbettr Website OS**: Next.js App Router · TypeScript · Tailwind CSS ·
Motion (via the OS `engine/motion` presets) · Lucide icons.

> Homepage demo only. See [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) for the
> visual direction, truth/verification notes and what to replace on full build.

## Highlights

- **Fabric-first hero** with a real folded-fabric image (LCP-safe).
- **Interactive fabric explorer** — six real ranges; the cloth clip-reveals as you move through the list (not a card grid).
- **Signature scroll moment** — a strip of fabric unfurls to a full-width scene.
- **Colour experience** — a premium swatch lightbox (keyboard nav, Esc,
  click-outside, swipe) that replaces the client's dated fabric sample cards.
- **Native enquiry form** (no GoHighLevel) — wire to the Bbettr webhook on approval.
- Fully responsive, light & airy, reduced-motion aware, semantic + OG metadata.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Structure

```
app/              layout, page, robots, sitemap, not-found, globals.css
components/
  sections/       hero, fabrics, swatch-experience, applications, heritage,
                  simon-baker, final-cta
  funnel/         header, footer, sticky-cta, channel-ctas, enquiry-form
  ui/             button, section-heading
config/           site.ts (real NAP + nav) · home.ts (all copy & content)
engine/motion/    Bbettr OS motion presets (Reveal, Stagger, heroStack, …)
scripts/          Pillow image-processing (fabric crops, weave texture, OG)
public/img/       optimised real fabric imagery + synthesised weave texture
```

All business facts, copy and contact details live in `config/` — no data is
hardcoded in components.
