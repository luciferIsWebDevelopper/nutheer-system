import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Jobs",
  path: "/admin/jobs",
  noIndex: true,
});

export default function AdminJobsPage() {
  return (
    <AdminStub title="Job openings" description="Publish and close career listings." />
  );
}
