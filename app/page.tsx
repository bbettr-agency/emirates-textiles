import { Hero } from "@/components/sections/hero";
import { Fabrics } from "@/components/sections/fabrics";
import { SwatchExperience } from "@/components/sections/swatch-experience";
import { Applications } from "@/components/sections/applications";
import { Heritage } from "@/components/sections/heritage";
import { SimonBaker } from "@/components/sections/simon-baker";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Fabrics />
      <SwatchExperience />
      <Applications />
      <Heritage />
      <SimonBaker />
      <FinalCta />
    </>
  );
}
