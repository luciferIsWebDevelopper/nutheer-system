import Link from "next/link";
import { Shield } from "lucide-react";
import { mainNavigation, routes } from "@/config";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getUser } from "@/lib/auth/get-user";

export async function SiteHeader() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <>
                {/* Role badge */}
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className="capitalize text-xs"
                >
                  {user.role}
                </Badge>

                {/* Admin panel shortcut */}
                {user.role === "admin" && (
                  <Link
                    href={routes.admin.root}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")}
                  >
                    <Shield className="h-3 w-3" />
                    Admin
                  </Link>
                )}

                <Link
                  href={routes.dashboard.root}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={routes.auth.login}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  Sign in
                </Link>
                <Link
                  href={routes.auth.register}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
