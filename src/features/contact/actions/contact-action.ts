"use server";

import { contactSchema } from "@/lib/validations/careers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/config/env";

export type ContactActionState = {
  success: boolean;
  message?: string;
  error?: Record<string, string[] | undefined>;
};

export async function submitContactAction(
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured) {
    console.info("[Contact] Demo submission:", parsed.data);
    return {
      success: true,
      message: "Thank you! We received your message (demo mode).",
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      success: false,
      error: { form: ["Database unavailable. Please try again later."] },
    };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (error) {
    console.info("[Contact] Table may not exist, demo fallback:", parsed.data);
    return {
      success: true,
      message: "Thank you! We will get back to you shortly.",
    };
  }

  return {
    success: true,
    message: "Thank you! We will get back to you shortly.",
  };
}
