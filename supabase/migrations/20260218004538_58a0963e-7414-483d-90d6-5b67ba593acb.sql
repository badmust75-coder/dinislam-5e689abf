
-- Fix: Add admin INSERT and UPDATE policies on user_nourania_progress
-- Admins need to be able to INSERT and UPDATE progress records for any user when validating lessons

CREATE POLICY "Admins can insert nourania progress"
ON public.user_nourania_progress
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update nourania progress"
ON public.user_nourania_progress
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));
