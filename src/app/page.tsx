"use client";

import { BackgroundCanvas } from "../components/landing/BackgroundCanvas";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { DashboardPreviewSection } from "../components/landing/DashboardPreviewSection";
import { SecuritySection } from "../components/landing/SecuritySection";
import { FaqSection } from "../components/landing/FaqSection";
import { CtaSection } from "../components/landing/CtaSection";

export default function Page() {
  return (
    <div className="w-full min-h-screen font-sans overflow-x-hidden bg-transparent text-white">
      <BackgroundCanvas />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <SecuritySection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
