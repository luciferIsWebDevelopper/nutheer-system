import Link from "next/link";
import { MapPin, Building2 } from "lucide-react";
import type { JobOpening } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type JobCardProps = {
  job: JobOpening;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/careers/${job.slug}`} className="group block h-full">
      <Card className="h-full hover:shadow-md hover:border-primary/40 transition-all">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <Badge>{job.employment_type}</Badge>
          </div>
          <CardDescription className="line-clamp-2">{job.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Building2 className="h-4 w-4" aria-hidden />
            {job.department}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" aria-hidden />
            {job.location}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
