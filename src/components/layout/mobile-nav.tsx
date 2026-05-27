"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { mainNavigation, routes } from "@/config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Mobile navigation drawer — Client Component for Sheet interactivity.
 */
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[340px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-2 border-t pt-6">
            <Link
              href={routes.auth.login}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Sign in
            </Link>
            <Link
              href={routes.auth.register}
              className={cn(buttonVariants(), "w-full")}
            >
              Get started
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
