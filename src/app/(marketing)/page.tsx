import { HeroSection } from "@/features/home/components/hero-section";
import { FeaturesGrid } from "@/features/home/components/features-grid";
import { CtaSection } from "@/features/home/components/cta-section";
import { Section } from "@/components/common/section";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "Nutheer System — IT services, training, and AI-ready learning with live sessions and skill intelligence.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            One platform. Three pillars.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Services, training, and future-ready learning — engineered for scale.
          </p>
        </div>
        <FeaturesGrid />
      </Section>
      <CtaSection />
    </>
  );
}
