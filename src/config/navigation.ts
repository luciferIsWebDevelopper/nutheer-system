import { routes } from "@/config/routes";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Public marketing navigation */
export const mainNavigation: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Training", href: routes.training },
  { label: "Courses", href: routes.learning.courses },
  { label: "Careers", href: routes.careers },
  { label: "Prefer", href: routes.prefer },
  { label: "Contact", href: routes.contact },
];

/** Authenticated user dashboard navigation */
export const dashboardNavigation: NavItem[] = [
  { label: "Overview", href: routes.dashboard.root },
  { label: "My Bookings", href: routes.dashboard.bookings },
  { label: "Applications", href: routes.dashboard.applications },
  { label: "Profile", href: routes.dashboard.profile },
];

/** Admin panel navigation */
export const adminNavigation: NavItem[] = [
  { label: "Overview", href: routes.admin.root },
  { label: "Courses", href: routes.admin.courses },
  { label: "Lessons", href: routes.admin.lessons },
  { label: "Jobs", href: routes.admin.jobs },
  { label: "Applications", href: routes.admin.applications },
  { label: "Live Sessions", href: routes.admin.sessions },
  { label: "Users", href: routes.admin.users },
  { label: "Prefer Analytics", href: routes.admin.prefer },
  { label: "Content", href: routes.admin.content },
];
