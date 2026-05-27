"use server";

import { preferTopicSchema } from "@/lib/validations/prefer";
import { submitPreferTopic } from "@/services/prefer-service";
import { getUser } from "@/lib/auth/get-user";

export type PreferActionState = {
  success: boolean;
  message?: string;
  error?: Record<string, string[] | undefined>;
};

export async function submitPreferAction(
  data: {
    topicName: string;
    topicType: "want_to_learn" | "already_know" | "future_technology";
    proficiencyLevel?: string;
    notes?: string;
  }
): Promise<PreferActionState> {
  const parsed = preferTopicSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const user = await getUser();
  const result = await submitPreferTopic(parsed.data, user?.id);

  if (!result.success) {
    return {
      success: false,
      error: { form: [result.error ?? "Submission failed"] },
    };
  }

  return {
    success: true,
    message: "Topic saved. Thank you for shaping our curriculum intelligence.",
  };
}
