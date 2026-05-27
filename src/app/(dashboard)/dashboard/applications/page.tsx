import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Applications",
  description: "Your job applications at Nutheer System.",
  path: "/dashboard/applications",
  noIndex: true,
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Applications"
        description="Track status of roles you have applied for."
      />
      <EmptyState
        className="mt-8"
        title="No applications yet"
        description="Apply from the careers page — your submissions will show here."
      />
    </>
  );
}
