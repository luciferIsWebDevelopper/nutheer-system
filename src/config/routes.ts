/**
 * Centralized route paths — single source of truth for navigation and redirects.
 */
export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  training: "/training",
  careers: "/careers",
  prefer: "/prefer",
  contact: "/contact",
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
  },
  learning: {
    courses: "/courses",
    course: (slug: string) => `/courses/${slug}` as const,
    lesson: (courseSlug: string, lessonSlug: string) =>
      `/courses/${courseSlug}/lessons/${lessonSlug}` as const,
    sessions: "/sessions",
  },
  dashboard: {
    root: "/dashboard",
    profile: "/dashboard/profile",
    bookings: "/dashboard/bookings",
    applications: "/dashboard/applications",
  },
  admin: {
    root: "/admin",
    courses: "/admin/courses",
    lessons: "/admin/lessons",
    jobs: "/admin/jobs",
    applications: "/admin/applications",
    sessions: "/admin/sessions",
    users: "/admin/users",
    prefer: "/admin/prefer",
    content: "/admin/content",
  },
} as const;
