import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Sessions",
  path: "/admin/sessions",
  noIndex: true,
});

export default function AdminSessionsPage() {
  return (
    <AdminStub title="Live sessions" description="Schedule and manage instructor-led sessions." />
  );
}
