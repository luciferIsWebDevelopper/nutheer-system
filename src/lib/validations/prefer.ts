import { z } from "zod";

export const preferTopicSchema = z.object({
  topicName: z
    .string()
    .min(2, "Topic must be at least 2 characters")
    .max(100, "Topic must be under 100 characters"),
  topicType: z.enum(["want_to_learn", "already_know", "future_technology"]),
  proficiencyLevel: z.string().optional(),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
});

export type PreferTopicInput = z.infer<typeof preferTopicSchema>;
