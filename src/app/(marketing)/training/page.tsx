import Link from "next/link";
import { BookOpen, MonitorPlay, Users, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { AnimatedSection } from "@/components/common/animated-section";
import { createPageMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "IT Training",
  description: "Future-ready IT training with courses, live sessions, and AI-powered learning.",
  path: "/training",
});

const programs = [
  {
    icon: BookOpen,
    title: "Self-paced courses",
    body: "Structured curricula with animated lessons, assessments, and progress tracking across cloud, full-stack, and AI topics.",
  },
  {
    icon: MonitorPlay,
    title: "Live mentoring sessions",
    body: "Book seats for instructor-led Q&A, code reviews, and cohort workshops aligned with enterprise delivery standards.",
  },
  {
    icon: Users,
    title: "Corporate upskilling",
    body: "Custom learning paths for teams adopting Next.js, Supabase, DevOps, and responsible AI engineering practices.",
  },
  {
    icon: Sparkles,
    title: "Prefer intelligence",
    body: "Capture what your teams want to learn, already know, and see on the horizon — fueling smarter curriculum design.",
  },
];

export default function TrainingPage() {
  return (
    <Section>
      <PageHeader
        title="IT Training"
        description="Enterprise-grade training designed for developers, architects, and teams building the AI-ready future."
      />
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {programs.map((program, i) => (
          <AnimatedSection key={program.title} delay={i * 0.08}>
            <div className="flex gap-4 rounded-xl border p-6 bg-card h-full">
              <program.icon className="h-8 w-8 text-primary shrink-0" aria-hidden />
              <div>
                <h3 className="font-semibold">{program.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {program.body}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <Link href={routes.learning.courses} className={cn(buttonVariants())}>
          Browse courses
        </Link>
        <Link
          href={routes.learning.sessions}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Live sessions
        </Link>
      </div>
    </Section>
  );
}
