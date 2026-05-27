import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { AnimatedSection } from "@/components/common/animated-section";
import { createPageMetadata } from "@/lib/seo";
import { Cloud, Shield, Code2, Headphones } from "lucide-react";

export const metadata = createPageMetadata({
  title: "IT Services",
  description: "Enterprise IT services from Nutheer System.",
  path: "/services",
});

const services = [
  { icon: Cloud, title: "Cloud & Infrastructure", description: "Modern cloud architecture, migration, and DevOps on Vercel, Supabase, and beyond." },
  { icon: Shield, title: "Security & Compliance", description: "RLS, secure auth, audits, and enterprise security best practices." },
  { icon: Code2, title: "Custom Development", description: "Full-stack applications with Next.js, TypeScript, and scalable patterns." },
  { icon: Headphones, title: "Managed Support", description: "24/7-ready support models for startups and growing enterprises." },
];

export default function ServicesPage() {
  return (
    <Section>
      <PageHeader
        title="IT Services"
        description="Enterprise-grade technology services built for startups and scale-ups."
      />
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {services.map((service, i) => (
          <AnimatedSection key={service.title} delay={i * 0.08}>
            <div className="flex gap-4 rounded-xl border p-6 bg-card h-full">
              <service.icon className="h-8 w-8 text-primary shrink-0" aria-hidden />
                <div>
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
