-- Fix security vulnerability in subscribers table RLS policy
-- Remove email-based access that could allow unauthorized data harvesting

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;

-- Create a more secure policy that only allows access based on user_id
CREATE POLICY "users_can_view_own_subscription" 
ON public.subscribers 
FOR SELECT 
USING (auth.uid() = user_id);

-- Ensure the policy is restrictive and only allows authenticated users to see their own data