import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { EmptyState } from "@/components/common/empty-state";
import { JobCard } from "@/features/careers/components/job-card";
import { createPageMetadata } from "@/lib/seo";
import { getOpenJobs } from "@/services";

export const metadata = createPageMetadata({
  title: "Careers",
  description: "Join Nutheer System — open roles in engineering, education, and operations.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await getOpenJobs();

  return (
    <Section>
      <PageHeader
        title="Careers"
        description="Build the future of enterprise IT services and AI-ready learning with us."
      />
      {jobs.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No open positions"
          description="Check back soon — we are growing fast."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </Section>
  );
}
