import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { EmptyState } from "@/components/common/empty-state";
import { CourseCard } from "@/features/learning/components/course-card";
import { createPageMetadata } from "@/lib/seo";
import { getPublishedCourses } from "@/services";

export const metadata = createPageMetadata({
  title: "Courses",
  description: "Self-paced IT and AI engineering courses from Nutheer System.",
  path: "/courses",
});

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <Section>
      <PageHeader
        title="Courses"
        description="Production-grade curricula with animated lessons and clear learning paths."
      />
      {courses.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No courses yet"
          description="New courses are published regularly."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </Section>
  );
}
