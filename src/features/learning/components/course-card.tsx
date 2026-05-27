import Link from "next/link";
import { Clock, GraduationCap } from "lucide-react";
import type { Course } from "@/types";
import { routes } from "@/config/routes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={routes.learning.course(course.slug)} className="group block h-full">
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
              {course.title}
            </CardTitle>
            <Badge variant="secondary" className="shrink-0 capitalize">
              {course.level}
            </Badge>
          </div>
          <CardDescription className="line-clamp-3">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 text-sm text-muted-foreground">
          {course.duration_hours && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden />
              {course.duration_hours}h
            </span>
          )}
          <span className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" aria-hidden />
            Course
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
