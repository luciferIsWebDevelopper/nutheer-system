import { createClient } from "@/lib/supabase/server";
import type { PreferAnalytics, PreferTopicType } from "@/types";
import type { PreferTopicInput } from "@/lib/validations/prefer";

export async function submitPreferTopic(
  input: PreferTopicInput,
  userId?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  if (!supabase) {
    // Graceful demo mode — log intent for development
    console.info("[Prefer] Demo submission:", input);
    return { success: true };
  }

  const { error } = await supabase.from("prefer_topics").insert({
    user_id: userId ?? null,
    topic_name: input.topicName.trim(),
    topic_type: input.topicType,
    proficiency_level: input.proficiencyLevel ?? null,
    notes: input.notes ?? null,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getPreferAnalytics(): Promise<PreferAnalytics[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("prefer_analytics")
    .select("*")
    .order("trend_score", { ascending: false })
    .limit(50);

  return (data as PreferAnalytics[]) ?? [];
}

export async function getTopTopicsByType(
  type: PreferTopicType,
  limit = 10
): Promise<PreferAnalytics[]> {
  const analytics = await getPreferAnalytics();
  return analytics.filter((a) => a.topic_type === type).slice(0, limit);
}
