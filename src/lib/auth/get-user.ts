import { createClient } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/types";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  profile: Profile | null;
};

/**
 * Resolves the current authenticated user and profile on the server.
 */
export async function getUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? "",
    role: (profile?.role as UserRole) ?? "student",
    profile: profile as Profile | null,
  };
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireUser();
  if (user.role !== "admin") {
    throw new Error("Admin access required");
  }
  return user;
}
