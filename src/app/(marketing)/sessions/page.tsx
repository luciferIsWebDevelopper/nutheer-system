import { Calendar, Clock, Users } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { EmptyState } from "@/components/common/empty-state";
import { createPageMetadata } from "@/lib/seo";
import { getUpcomingSessions } from "@/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = createPageMetadata({
  title: "Live Sessions",
  description: "Book live mentoring and Q&A sessions with Nutheer instructors.",
  path: "/sessions",
});

function formatSessionDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default async function SessionsPage() {
  const sessions = await getUpcomingSessions();

  return (
    <Section>
      <PageHeader
        title="Live sessions"
        description="Reserve a seat for instructor-led mentoring, code reviews, and cohort workshops."
      />
      {sessions.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No upcoming sessions"
          description="New live sessions are scheduled weekly."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {sessions.map((session) => (
            <Card key={session.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle>{session.title}</CardTitle>
                  <Badge variant="secondary">{session.status}</Badge>
                </div>
                {session.description && (
                  <CardDescription>{session.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" aria-hidden />
                  {formatSessionDate(session.scheduled_at)}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" aria-hidden />
                  {session.duration_minutes} minutes
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" aria-hidden />
                  Up to {session.max_participants} participants
                </p>
                <Button className="w-full mt-4" disabled>
                  Book session (sign in required)
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
