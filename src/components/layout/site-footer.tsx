import Link from "next/link";
import { siteConfig, routes, mainNavigation } from "@/config";
import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";

/**
 * Global site footer with navigation and company info.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo showTagline />
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {mainNavigation.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Learning</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={routes.learning.courses} className="hover:text-foreground">
                  Courses
                </Link>
              </li>
              <li>
                <Link href={routes.learning.sessions} className="hover:text-foreground">
                  Live Sessions
                </Link>
              </li>
              <li>
                <Link href={routes.prefer} className="hover:text-foreground">
                  Prefer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{siteConfig.company.email}</li>
              <li>{siteConfig.company.phone}</li>
              <li>{siteConfig.company.address}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={routes.about} className="hover:text-foreground">
              Privacy
            </Link>
            <Link href={routes.contact} className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
