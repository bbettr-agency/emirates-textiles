import { Hero } from "@/components/sections/hero";
import { FabricExplorer } from "@/components/sections/fabric-explorer";
import { SwatchExperience } from "@/components/sections/swatch-experience";
import { Signature } from "@/components/sections/signature";
import { Applications } from "@/components/sections/applications";
import { Heritage } from "@/components/sections/heritage";
import { SimonBaker } from "@/components/sections/simon-baker";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FabricExplorer />
      <SwatchExperience />
      <Signature />
      <Applications />
      <Heritage />
      <SimonBaker />
      <FinalCta />
    </>
  );
}
