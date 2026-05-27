import { createClient } from "@/lib/supabase/server";
import type { LiveSession } from "@/types";

const DEMO_SESSIONS: LiveSession[] = [
  {
    id: "s1",
    title: "Live Q&A: Next.js App Router",
    description: "Book a seat for our weekly live mentoring session.",
    instructor_id: null,
    scheduled_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    duration_minutes: 60,
    max_participants: 25,
    meeting_url: null,
    status: "scheduled",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getUpcomingSessions(): Promise<LiveSession[]> {
  const supabase = await createClient();
  if (!supabase) return DEMO_SESSIONS;

  const { data } = await supabase
    .from("live_sessions")
    .select("*")
    .eq("status", "scheduled")
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true });

  return (data as LiveSession[])?.length ? (data as LiveSession[]) : DEMO_SESSIONS;
}
