-- Fix: "Database error saving new user"
-- Run this in Supabase SQL Editor

-- 1. Allow the trigger function to insert profiles (bypasses RLS for service role)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop and recreate the handle_new_user trigger with proper security
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 3. Add the missing INSERT policy on profiles
-- (the trigger runs as the function owner, but RLS still applies without this)
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- 4. Grant necessary permissions to authenticated and anon roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT SELECT ON public.lessons TO anon, authenticated;
GRANT SELECT ON public.live_sessions TO anon, authenticated;
GRANT SELECT ON public.job_openings TO anon, authenticated;
GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT SELECT ON public.job_applications TO authenticated;
GRANT INSERT ON public.prefer_topics TO anon, authenticated;
GRANT SELECT ON public.prefer_topics TO authenticated;
GRANT INSERT, UPDATE ON public.prefer_analytics TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.session_bookings TO authenticated;
