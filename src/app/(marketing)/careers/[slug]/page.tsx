import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { JobApplicationForm } from "@/features/careers/components/job-application-form";
import { createPageMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";
import { getJobBySlug } from "@/services";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return createPageMetadata({ title: "Job not found", noIndex: true });

  return createPageMetadata({
    title: job.title,
    description: job.description,
    path: `/careers/${slug}`,
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <Section>
      <Link
        href={routes.careers}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4 -ml-2 inline-flex")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" aria-hidden />
        All careers
      </Link>
      <PageHeader title={job.title} description={job.description}>
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge>{job.employment_type}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" aria-hidden />
            {job.department}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden />
            {job.location}
          </span>
        </div>
      </PageHeader>
      <div className="prose prose-neutral dark:prose-invert max-w-none mt-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Requirements</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {job.requirements}
          </p>
        </div>
      </div>
      <div className="mt-12 max-w-2xl">
        <JobApplicationForm jobId={job.id} jobTitle={job.title} />
      </div>
    </Section>
  );
}
