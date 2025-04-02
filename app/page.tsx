import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/CTA-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
