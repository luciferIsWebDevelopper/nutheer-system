import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { createPageMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";
import { getCourseBySlug, getLessonsByCourseId } from "@/services";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return createPageMetadata({ title: "Course not found", noIndex: true });

  return createPageMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${slug}`,
  });
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const lessons = await getLessonsByCourseId(course.id);

  return (
    <Section>
      <Link
        href={routes.learning.courses}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4 -ml-2 inline-flex")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" aria-hidden />
        All courses
      </Link>
      <PageHeader title={course.title} description={course.description}>
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge variant="secondary" className="capitalize">
            {course.level}
          </Badge>
          {course.duration_hours && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden />
              {course.duration_hours} hours
            </span>
          )}
        </div>
      </PageHeader>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-muted-foreground text-sm">Lessons coming soon.</p>
        ) : (
          <ul className="space-y-2">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={routes.learning.lesson(slug, lesson.slug)}
                  className="flex items-center justify-between rounded-lg border px-4 py-3 hover:border-primary/40 hover:bg-accent/50 transition-colors"
                >
                  <span className="font-medium">{lesson.title}</span>
                  {lesson.duration_minutes && (
                    <span className="text-sm text-muted-foreground">
                      {lesson.duration_minutes} min
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
