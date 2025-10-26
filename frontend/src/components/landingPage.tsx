import CTASection from "./cta-section";
import FeaturesSection from "./features-section";
import Footer from "./footer";
import HeroSection from "./herosection";
import HowItWorksSection from "./how-it-works-section";
import TestimonialsSection from "./testimonilas-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
