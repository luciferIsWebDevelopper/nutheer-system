import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { getUser } from "@/lib/auth/get-user";
import { routes } from "@/config/routes";
import { createPageMetadata } from "@/lib/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Dashboard",
  description: "Your Nutheer System learning dashboard.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <>
      <PageHeader
        title={user ? `Welcome, ${user.profile?.full_name ?? user.email}` : "Dashboard"}
        description="Track bookings, applications, and your learning profile."
      />
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My bookings</CardTitle>
            <CardDescription>Live session reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={routes.dashboard.bookings}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              View bookings
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Applications</CardTitle>
            <CardDescription>Career applications you submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={routes.dashboard.applications}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              View applications
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>Account details and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={routes.dashboard.profile}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Edit profile
            </Link>
          </CardContent>
        </Card>
      </div>
      {!user && (
        <p className="mt-8 text-sm text-muted-foreground">
          Sign in with Supabase configured to sync your dashboard data.
        </p>
      )}
    </>
  );
}
