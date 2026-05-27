import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { LottiePlayer } from "@/components/common/lottie-player";
import { lessonPlaceholderAnimation } from "@/lib/lottie-placeholder";
import { createPageMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";
import { getLessonBySlug } from "@/services";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  const data = await getLessonBySlug(slug, lessonSlug);
  if (!data) return createPageMetadata({ title: "Lesson not found", noIndex: true });

  return createPageMetadata({
    title: data.lesson.title,
    description: data.lesson.content.slice(0, 160),
    path: `/courses/${slug}/lessons/${lessonSlug}`,
  });
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  const data = await getLessonBySlug(slug, lessonSlug);
  if (!data) notFound();

  const { course, lesson } = data;

  return (
    <Section>
      <Link
        href={routes.learning.course(slug)}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4 -ml-2 inline-flex")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" aria-hidden />
        {course.title}
      </Link>
      <PageHeader title={lesson.title} description={`Lesson · ${course.title}`} />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border bg-muted/30 p-4 min-h-[200px]">
          <LottiePlayer
            animationData={lessonPlaceholderAnimation}
            className="max-h-64 mx-auto"
          />
          <p className="text-xs text-center text-muted-foreground mt-2">
            Animation placeholder — connect lesson.animation_url in production
          </p>
        </div>
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {lesson.content}
          </p>
        </article>
      </div>
    </Section>
  );
}
