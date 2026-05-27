import { PageHeader } from "@/components/common/page-header";
import { getUser } from "@/lib/auth/get-user";
import { createPageMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = createPageMetadata({
  title: "Profile",
  description: "Your Nutheer System profile.",
  path: "/dashboard/profile",
  noIndex: true,
});

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account information and role."
      />
      <Card className="mt-8 max-w-lg">
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email ?? "Not signed in"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium">
              {user?.profile?.full_name ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Role</p>
            <Badge className="mt-1 capitalize">{user?.role ?? "guest"}</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
