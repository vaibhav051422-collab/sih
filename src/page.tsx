import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { FeaturesSection } from "./components/feature-section";

import { Footer } from "./components/footer.tsx";
import { FaqSectionDemo } from "./data/data";
import ThreeDTestimonials from "./components/demo";

export default function CivicReportingLandingPage() {
  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Black Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <section className="container mx-auto px-4 my-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Trusted by Citizens Nationwide
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
              See how our platform is helping communities across the country
              create positive change
            </p>
          </div>
          <ThreeDTestimonials />
        </section>
        <FaqSectionDemo />
        <Footer />
      </div>
    </div>
  );
}
