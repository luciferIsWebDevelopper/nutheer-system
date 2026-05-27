"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { routes } from "@/config/routes";
import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/validations/auth";
import { isSupabaseConfigured } from "@/config/env";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.flatten().fieldErrors };
  }

  if (!isSupabaseConfigured) {
    return {
      success: false as const,
      error: { form: ["Configure Supabase in .env.local to enable authentication"] },
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { success: false as const, error: { form: ["Database unavailable"] } };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { success: false as const, error: { form: [error.message] } };
  }

  redirect(routes.dashboard.root);
}

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.flatten().fieldErrors };
  }

  if (!isSupabaseConfigured) {
    return {
      success: false as const,
      error: { form: ["Configure Supabase in .env.local to enable registration"] },
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { success: false as const, error: { form: ["Database unavailable"] } };
  }

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
    },
  });

  if (error) {
    return { success: false as const, error: { form: [error.message] } };
  }

  redirect(routes.dashboard.root);
}

export async function forgotPasswordAction(formData: FormData) {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { success: false as const, error: parsed.error.flatten().fieldErrors };
  }

  if (!isSupabaseConfigured) {
    return {
      success: false as const,
      error: { form: ["Configure Supabase to enable password reset"] },
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { success: false as const, error: { form: ["Database unavailable"] } };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
  });

  if (error) {
    return { success: false as const, error: { form: [error.message] } };
  }

  return { success: true as const, message: "Check your email for a reset link." };
}

export async function signOutAction() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect(routes.home);
}
