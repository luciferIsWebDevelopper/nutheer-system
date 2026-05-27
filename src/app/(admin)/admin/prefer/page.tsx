import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Prefer",
  path: "/admin/prefer",
  noIndex: true,
});

export default function AdminPreferPage() {
  return (
    <AdminStub
      title="Prefer analytics"
      description="Trending topics across want to learn, already know, and future technology."
    />
  );
}
