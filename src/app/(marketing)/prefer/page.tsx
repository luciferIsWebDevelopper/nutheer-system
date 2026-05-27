import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { PreferForm } from "@/features/prefer/components/prefer-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Prefer",
  description: "Tell Nutheer what to teach next — skill intelligence for AI-ready teams.",
  path: "/prefer",
});

export default function PreferPage() {
  return (
    <Section>
      <PageHeader
        title="Prefer"
        description="Three lenses on your skills — want to learn, already know, and future technology — powering smarter curricula."
      />
      <div className="max-w-xl mt-8">
        <PreferForm />
      </div>
    </Section>
  );
}
