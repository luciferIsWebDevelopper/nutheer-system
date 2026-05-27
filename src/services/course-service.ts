import { createClient } from "@/lib/supabase/server";
import type { Course, Lesson } from "@/types";

/** Demo data when Supabase is not configured */
const DEMO_COURSES: Course[] = [
  {
    id: "1",
    slug: "nextjs-mastery",
    title: "Next.js 15 App Router Mastery",
    description:
      "Build production-grade full-stack applications with Server Components, streaming, and modern patterns.",
    thumbnail_url: null,
    level: "intermediate",
    status: "published",
    duration_hours: 24,
    instructor_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "ai-engineering",
    title: "AI Engineering Foundations",
    description:
      "Prepare for the AI-ready future with LLMs, RAG, agents, and responsible AI practices.",
    thumbnail_url: null,
    level: "advanced",
    status: "published",
    duration_hours: 32,
    instructor_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "cloud-devops",
    title: "Cloud & DevOps Essentials",
    description:
      "Deploy scalable infrastructure on Vercel, Supabase, and modern CI/CD pipelines.",
    thumbnail_url: null,
    level: "beginner",
    status: "published",
    duration_hours: 18,
    instructor_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getPublishedCourses(): Promise<Course[]> {
  const supabase = await createClient();
  if (!supabase) return DEMO_COURSES;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return DEMO_COURSES;
  return data as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient();
  if (!supabase) {
    return DEMO_COURSES.find((c) => c.slug === slug) ?? null;
  }

  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return (data as Course) ?? DEMO_COURSES.find((c) => c.slug === slug) ?? null;
}

export async function getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
  const supabase = await createClient();
  if (!supabase) {
    return [
      {
        id: "l1",
        course_id: courseId,
        slug: "introduction",
        title: "Introduction",
        content:
          "Welcome to Nutheer System learning. This lesson combines rich text with animation support for immersive learning.",
        animation_url: null,
        order_index: 1,
        duration_minutes: 15,
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  const { data } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  return (data as Lesson[]) ?? [];
}

export async function getLessonBySlug(
  courseSlug: string,
  lessonSlug: string
): Promise<{ course: Course; lesson: Lesson } | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;

  const lessons = await getLessonsByCourseId(course.id);
  const lesson = lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;

  return { course, lesson };
}
