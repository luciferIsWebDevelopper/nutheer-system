/**
 * Supabase database types — mirrors PostgreSQL schema.
 * Regenerate with: npx supabase gen types typescript --project-id <id>
 */

export type UserRole = "student" | "instructor" | "admin";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseStatus = "draft" | "published" | "archived";

export type JobStatus = "open" | "closed" | "draft";

export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "interview"
  | "rejected"
  | "accepted";

export type PreferTopicType =
  | "want_to_learn"
  | "already_know"
  | "future_technology";

export type SessionStatus = "scheduled" | "completed" | "cancelled";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  level: CourseLevel;
  status: CourseStatus;
  duration_hours: number | null;
  instructor_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  content: string;
  animation_url: string | null;
  order_index: number;
  duration_minutes: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LiveSession {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string | null;
  scheduled_at: string;
  duration_minutes: number;
  max_participants: number;
  meeting_url: string | null;
  status: SessionStatus;
  created_at: string;
  updated_at: string;
}

export interface SessionBooking {
  id: string;
  session_id: string;
  user_id: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  status: JobStatus;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  resume_url: string | null;
  cover_letter: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface PreferTopic {
  id: string;
  user_id: string | null;
  topic_name: string;
  topic_type: PreferTopicType;
  proficiency_level: string | null;
  notes: string | null;
  created_at: string;
}

export interface PreferAnalytics {
  id: string;
  topic_name: string;
  topic_type: PreferTopicType;
  submission_count: number;
  last_submitted_at: string;
  trend_score: number;
  created_at: string;
  updated_at: string;
}
