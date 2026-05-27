/** Application-wide constants */
export const APP_NAME = "Nutheer System";

export const DEFAULT_PAGE_SIZE = 12;

export const MAX_RESUME_SIZE_MB = 5;

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const PREFER_TOPIC_TYPES = [
  { value: "want_to_learn", label: "Want to Learn" },
  { value: "already_know", label: "Already Know" },
  { value: "future_technology", label: "Future Technology" },
] as const;

export const PROFICIENCY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;
