import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { AnimatedSection } from "@/components/common/animated-section";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name} — IT services, training, and AI-ready education.`,
  path: "/about",
});

const values = [
  {
    title: "Enterprise-grade delivery",
    body: "We build and operate systems with the rigor expected by global IT teams.",
  },
  {
    title: "Future-ready learning",
    body: "Animated lessons, live sessions, and Prefer intelligence prepare learners for what's next.",
  },
  {
    title: "AI-native architecture",
    body: "Every layer is designed to plug in recommendations, analytics, and OpenAI APIs later.",
  },
];

export default function AboutPage() {
  return (
    <Section>
      <PageHeader
        title="About Nutheer System"
        description="We bridge enterprise IT services, professional training, and an AI-ready learning ecosystem."
      />
      <div className="grid gap-8 md:grid-cols-3 mt-8">
        {values.map((value, i) => (
          <AnimatedSection key={value.title} delay={i * 0.1}>
            <div className="rounded-xl border p-6 h-full bg-card">
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {value.body}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
