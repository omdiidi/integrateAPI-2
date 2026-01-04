import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ModularSolutions } from "@/components/sections/ModularSolutions";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { ScaleSection } from "@/components/sections/ScaleSection";
import { CardCarousel } from "@/components/sections/CardCarousel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="scroll-smooth snap-y snap-proximity">
        <Hero />
        <ModularSolutions />
        <FeatureSplit />
        <ScaleSection />
        <CardCarousel />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
