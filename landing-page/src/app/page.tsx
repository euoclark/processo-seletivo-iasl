import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TheContrast from "@/components/TheContrast";
import WhatYouGet from "@/components/WhatYouGet";
import Mentors from "@/components/Mentors";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090d] text-white selection:bg-emerald-500/30 selection:text-white relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <TheContrast />
      <WhatYouGet />
      <Mentors />
      <FinalCTA />
      <FAQ />
      <Footer />
    </main>
  );
}
