import {
  BookOpen,
  Briefcase,
  Cpu,
  Video,
} from "lucide-react";
import { AnimatedSection } from "@/components/common/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Animated Learning",
    description:
      "Text-based lessons enriched with Lottie animations for deeper understanding.",
  },
  {
    icon: Video,
    title: "Live Sessions",
    description:
      "Book expert-led video sessions for mentorship and real-time guidance.",
  },
  {
    icon: Briefcase,
    title: "Careers",
    description:
      "Apply to open roles with secure resume uploads and application tracking.",
  },
  {
    icon: Cpu,
    title: "Prefer Intelligence",
    description:
      "Tell us what you want to learn — powering future AI recommendations and trends.",
  },
];

export function FeaturesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <AnimatedSection key={feature.title} delay={index * 0.1}>
          <Card className="h-full border-border/60 hover:border-primary/30 transition-colors">
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary mb-2" aria-hidden />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        </AnimatedSection>
      ))}
    </div>
  );
}
