import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Lessons",
  path: "/admin/lessons",
  noIndex: true,
});

export default function AdminLessonsPage() {
  return (
    <AdminStub title="Lessons" description="Manage lesson content, order, and Lottie animations." />
  );
}
