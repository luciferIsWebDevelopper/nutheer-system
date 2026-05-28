"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/get-user";

export async function bookSessionAction(
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await getUser();
  if (!user) return { success: false, error: "Sign in to book a session" };

  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Database unavailable" };

  const { error } = await supabase.from("session_bookings").insert({
    session_id: sessionId,
    user_id: user.id,
    status: "confirmed",
  });

  if (error?.code === "23505") return { success: false, error: "Already booked" };
  if (error) return { success: false, error: error.message };
  return { success: true };
}
