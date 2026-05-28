-- Fix: Allow admin role updates
-- Run this in Supabase SQL Editor

-- Allow service role to update profiles (needed for admin role assignment)
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Also allow users to update their own profile (was missing UPDATE for own row)
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Force update your own role directly (run this with your actual email)
-- UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
