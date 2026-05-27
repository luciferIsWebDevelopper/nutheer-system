"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { dashboardNavigation, routes } from "@/config";
import { signOutAction } from "@/features/auth/actions/auth-actions";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border">
        <Logo />
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <LayoutDashboard className="h-3 w-3" aria-hidden />
          Dashboard
        </p>
      </div>
      <nav className="flex-1 p-3 space-y-1" aria-label="Dashboard">
        {dashboardNavigation.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== routes.dashboard.root && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <form action={signOutAction}>
          <Button type="submit" variant="ghost" size="sm" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" aria-hidden />
            Sign out
          </Button>
        </form>
      </div>
    </aside>
  );
}
