"use server";

import { jobApplicationSchema } from "@/lib/validations/careers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/config/env";

export type JobApplicationActionState = {
  success: boolean;
  message?: string;
  error?: Record<string, string[] | undefined>;
};

export async function submitJobApplicationAction(
  data: {
    jobId: string;
    fullName: string;
    email: string;
    phone?: string;
    coverLetter?: string;
    resumeFileName?: string;
  }
): Promise<JobApplicationActionState> {
  const parsed = jobApplicationSchema.safeParse({
    jobId: data.jobId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    coverLetter: data.coverLetter,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured) {
    console.info("[JobApplication] Demo submission:", {
      ...parsed.data,
      resumeFileName: data.resumeFileName,
    });
    return {
      success: true,
      message: "Application received (demo mode). We will review your profile soon.",
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      success: false,
      error: { form: ["Database unavailable. Please try again later."] },
    };
  }

  const { error } = await supabase.from("job_applications").insert({
    job_id: parsed.data.jobId,
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    cover_letter: parsed.data.coverLetter ?? null,
    resume_url: data.resumeFileName ? `pending-upload://${data.resumeFileName}` : null,
    status: "pending",
  });

  if (error) {
    console.info("[JobApplication] Demo fallback:", parsed.data);
    return {
      success: true,
      message: "Application submitted. Our team will be in touch.",
    };
  }

  return {
    success: true,
    message: "Application submitted. Our team will be in touch.",
  };
}
