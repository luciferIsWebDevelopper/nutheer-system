import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Courses",
  path: "/admin/courses",
  noIndex: true,
});

export default function AdminCoursesPage() {
  return (
    <AdminStub title="Courses" description="Create, publish, and archive learning courses." />
  );
}
