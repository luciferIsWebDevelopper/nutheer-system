/**
 * Global site metadata and branding constants.
 * Centralized for SEO, Open Graph, and consistent UI copy.
 */
export const siteConfig = {
  name: "Nutheer System",
  tagline: "IT Services · Training · AI-Ready Learning",
  description:
    "Nutheer System delivers enterprise IT services, future-ready training, and an AI-powered learning ecosystem with live sessions, careers, and skill intelligence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  company: {
    email: "hello@nutheer.com",
    phone: "+1 (000) 000-0000",
    address: "Global · Remote-first",
  },
  social: {
    linkedin: "https://linkedin.com/company/nutheer",
    twitter: "https://twitter.com/nutheer",
    github: "https://github.com/nutheer",
  },
} as const;
