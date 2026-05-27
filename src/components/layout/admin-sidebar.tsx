"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import { adminNavigation, routes } from "@/config";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border">
        <Logo />
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Shield className="h-3 w-3" aria-hidden />
          Admin
        </p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Admin">
        {adminNavigation.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== routes.admin.root && pathname.startsWith(item.href));
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
    </aside>
  );
}
