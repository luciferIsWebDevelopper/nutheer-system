import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Applications",
  path: "/admin/applications",
  noIndex: true,
});

export default function AdminApplicationsPage() {
  return (
    <AdminStub
      title="Applications"
      description="Review candidate applications and update pipeline status."
    />
  );
}
