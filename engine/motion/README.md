# @bbettr/motion

The approved motion vocabulary. Standard:
[`SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md`](../../SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md).

## Install

```bash
npm install motion
```

Copy `ENGINE/motion` into the project as `engine/motion/`, then wire the root
layout — both steps are required:

```tsx
// app/layout.tsx
import { MotionProvider, NOSCRIPT_FALLBACK } from "@/engine/motion";

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA">
      <head>
        <noscript><style>{NOSCRIPT_FALLBACK}</style></noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```

`MotionProvider` applies `reducedMotion="user"` to the whole tree and runs
`LazyMotion` in strict mode. The `<noscript>` rule keeps scroll-revealed content
visible if JavaScript never runs. Gate 3 checks for both.

## Use

```tsx
// Section content — scroll-triggered, reveals once
<Reveal><SectionHeading title="What we make" /></Reveal>

// A grid — index and delay cap are handled for you
<Stagger className="grid gap-6 md:grid-cols-3">
  {services.map((s) => (
    <Reveal key={s.slug} preset="fadeUpItem"><ServiceCard {...s} /></Reveal>
  ))}
</Stagger>

// A hero — above the fold, so everything is eager and the LCP element is unanimated
const hero = heroStack({ character: "considered" });
<h1 {...hero.lcp}>Precision-engineered curtains, made in Pretoria</h1>
<Reveal eager {...hero.step(0)}><p>{lede}</p></Reveal>
<Reveal eager {...hero.step(1)}><CtaGroup /></Reveal>

// A statistic — real, verified figures only
<CountUp value={1_000_000} format="compact" suffix="+" />

// Sticky header — never animate height or padding
const scrolled = useScrollPast(THRESHOLD.header);
```

## API

| Export | Purpose |
|---|---|
| `MotionProvider` | root wiring: reduced-motion + strict LazyMotion |
| `NOSCRIPT_FALLBACK` | CSS string for the `<noscript>` rule |
| `Reveal` | the standard entrance. Presets: `fadeUp` (default), `fadeUpItem`, `fadeIn`, `scaleIn`, `imageReveal`, `slideX` |
| `Stagger` | sequences sibling `<Reveal>`s; injects `index`, caps delay |
| `heroStack` | hero delay ladder with an unanimated `lcp` slot |
| `CountUp` | SSR-correct, accessible, reduced-motion-safe statistic |
| `useScrollPast` | one rAF-throttled scroll listener (`THRESHOLD.header`, `.floatingCta`) |
| `useMotionSafe` | reduced-motion boolean for hand-rolled motion |
| presets / tokens | `fadeUp`… , `EASE`, `CHARACTER`, `VIEWPORT`, `STAGGER_CAP`, `staggerDelay` |

## Rules that are enforced, not just documented

| Rule | How |
|---|---|
| Reduced motion cannot be ignored | `MotionConfig reducedMotion="user"` at the root; presets collapse when passed `reduced` |
| Full `motion` proxy cannot be imported | `LazyMotion … strict` throws at runtime |
| Above-fold content is never invisible | `eager` presets drop the opacity fade entirely |
| LCP element is never animated | `heroStack().lcp` is frozen and empty |
| `priority` images are never faded | `<Reveal>` errors in development on detection |
| Scroll-triggered above the fold | `<Reveal>` warns in development |
| Stagger delay cannot run away | capped at `STAGGER_CAP` inside `staggerDelay` |
| No-JS pages are not blank | `data-reveal` + `NOSCRIPT_FALLBACK` |

## Choosing a character

Declared once per project in the Visual Direction Brief, recorded in
PROJECT_STATUS.md. `precise` (engineered, technical) · `considered` (default,
premium) · `editorial` (unhurried, luxury). Ease never changes — only duration
and stagger.

## Validate

```bash
npm run validate
```

30 runtime assertions covering reduced motion, LCP protection, above-fold
triggers, stagger caps, single-easing and server-rendered visibility. Run it
after any change to this module.

## Not included (deliberately)

`Marquee` — only one production consumer; graduates at two.
`Disclosure`/accordion — belongs in `ENGINE/components`, not motion.
Page-route transitions — no proven case; they delay content.
Parallax, scroll-linked timelines — fail the removal test.
