import { createClient } from "@/lib/supabase/server";
import type { JobOpening } from "@/types";

const DEMO_JOBS: JobOpening[] = [
  {
    id: "a0000001-0000-4000-8000-000000000001",
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    employment_type: "Full-time",
    description:
      "Build and scale the Nutheer learning platform using Next.js, TypeScript, and Supabase.",
    requirements:
      "5+ years experience, Next.js, TypeScript, PostgreSQL, strong system design skills.",
    status: "open",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "a0000002-0000-4000-8000-000000000002",
    slug: "ai-learning-specialist",
    title: "AI Learning Specialist",
    department: "Education",
    location: "Hybrid",
    employment_type: "Full-time",
    description:
      "Design AI-ready curricula and learning experiences for enterprise clients.",
    requirements:
      "Experience with LLMs, instructional design, and technical training delivery.",
    status: "open",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getOpenJobs(): Promise<JobOpening[]> {
  const supabase = await createClient();
  if (!supabase) return DEMO_JOBS;

  const { data } = await supabase
    .from("job_openings")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  return (data as JobOpening[])?.length ? (data as JobOpening[]) : DEMO_JOBS;
}

export async function getJobBySlug(slug: string): Promise<JobOpening | null> {
  const supabase = await createClient();
  if (!supabase) {
    return DEMO_JOBS.find((j) => j.slug === slug) ?? null;
  }

  const { data } = await supabase
    .from("job_openings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "open")
    .single();

  return (data as JobOpening) ?? DEMO_JOBS.find((j) => j.slug === slug) ?? null;
}
