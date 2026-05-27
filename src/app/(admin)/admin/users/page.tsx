import { AdminStub } from "@/components/admin/admin-stub";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin · Users",
  path: "/admin/users",
  noIndex: true,
});

export default function AdminUsersPage() {
  return (
    <AdminStub title="Users" description="Manage profiles, roles, and access." />
  );
}
