import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { MotionProvider, NOSCRIPT_FALLBACK } from "@/engine/motion";
import { Header } from "@/components/funnel/header";
import { Footer } from "@/components/funnel/footer";
import { StickyCta } from "@/components/funnel/sticky-cta";
import { site } from "@/config/site";
import { organizationJsonLd } from "@/lib/jsonld";

// Single family, per client direction. Hierarchy is carried by weight, scale,
// tracking and composition — not by a display serif.
const sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Emirates Textiles · Quality Fabrics & Textiles, South Africa",
    template: "%s · Emirates Textiles",
  },
  description:
    "South African wholesalers of quality fabrics and textiles since 1999 — sheeting, tabling, towelling, upholstery, curtaining and hospitality ranges, plus Simon Baker luxury bed linen. Based in Pretoria.",
  applicationName: site.name,
  keywords: [
    "fabric supplier South Africa",
    "textile wholesaler Pretoria",
    "hospitality fabrics",
    "bull denim",
    "damask tabling",
    "cotton towelling",
    "Simon Baker bed linen",
  ],
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  icons: { icon: "/img/logo.png" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Emirates Textiles · Fabric for every space",
    description:
      "Quality fabrics and textiles supplied across South Africa since 1999. Sheeting, tabling, towelling, upholstery, curtaining and hospitality ranges.",
    url: site.url,
    locale: "en_ZA",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Emirates Textiles fabric" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emirates Textiles · Fabric for every space",
    description: "Quality fabrics and textiles supplied across South Africa since 1999.",
    images: ["/img/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2352",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={sans.variable}>
      <head>
        <noscript>
          <style>{NOSCRIPT_FALLBACK}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[80] focus:left-3 focus:top-3 focus:rounded-btn focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyCta />
        </MotionProvider>
      </body>
    </html>
  );
}
