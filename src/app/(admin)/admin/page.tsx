import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { adminNavigation } from "@/config";
import { createPageMetadata } from "@/lib/seo";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = createPageMetadata({
  title: "Admin",
  description: "Nutheer System admin panel.",
  path: "/admin",
  noIndex: true,
});

export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader
        title="Admin overview"
        description="Manage courses, careers, sessions, users, and Prefer analytics."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {adminNavigation
          .filter((item) => item.href !== "/admin")
          .map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-base">{item.label}</CardTitle>
                  <CardDescription>Manage {item.label.toLowerCase()}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
}
