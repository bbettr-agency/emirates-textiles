import type { Config } from "tailwindcss";

/**
 * Emirates Textiles — design tokens.
 * Structure per SYSTEM/01-DESIGN-TOKENS.md. Values derived from the real brand:
 * navy + gold logo, elevated into a light, warm, editorial textile-showroom system.
 * Density: Editorial. Motion: editorial. Accent (gold) is reserved and used sparingly.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Light, warm surfaces (the ground the whole site sits on)
        paper: "#FFFFFF",
        canvas: "#F8F5F0", // warm off-white — primary ground
        linen: "#F1EBE1", // light warm beige — tinted sections
        sand: "#E9E0D2", // deeper warm band
        hair: {
          DEFAULT: "#E5DBCC", // warm hairline
          strong: "#D6C9B4",
        },
        // Warm charcoal ink scale (text)
        ink: {
          DEFAULT: "#221F1A", // headings + strong body (warm near-black)
          2: "#453F37", // secondary text  (~8:1 on canvas)
          muted: "#6C6457", // labels / captions (~4.7:1 on white)
        },
        // Brand navy — structure, CTA, footer, dark spotlight
        navy: {
          DEFAULT: "#0A2352",
          deep: "#071733",
          ink: "#0C2456", // navy used as heading/link colour on light
          tint: "#EEF1F7", // very light navy wash (sparingly)
        },
        // Brand gold — the single reserved accent (marks, rules, active states)
        gold: {
          DEFAULT: "#C69A3F",
          deep: "#9C7522", // gold-on-light when a text-weight accent is needed
          soft: "#F3E9D2",
        },
        // The only non-accent action colour (SA channel)
        whatsapp: "#25D366",
      },
      fontFamily: {
        // One family (Open Sans). "display" kept as an alias so existing usages
        // resolve to the same face — hierarchy comes from weight/scale/tracking.
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        label: "0.24em",
        wide: "0.14em",
        tightest: "-0.04em",
      },
      borderRadius: {
        // one restrained radius family — editorial, not rounded-everything
        xs: "0.25rem",
        card: "0.5rem",
        panel: "0.875rem",
        btn: "0.5rem",
      },
      boxShadow: {
        card: "0 20px 50px -30px rgba(30, 26, 20, 0.30)",
        lift: "0 12px 28px -16px rgba(30, 26, 20, 0.28)",
        panel: "0 34px 80px -40px rgba(20, 24, 40, 0.40)",
        cta: "0 16px 34px -16px rgba(10, 35, 82, 0.42)",
        modal: "0 50px 120px -30px rgba(6, 12, 24, 0.65)",
      },
      maxWidth: {
        measure: "62ch",
      },
      transitionTimingFunction: {
        emirates: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
