import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Content",
  path: "/admin/content",
  noIndex: true,
});

export default function AdminContentPage() {
  return (
    <AdminStub title="Content" description="Marketing pages, SEO copy, and site content." />
  );
}
