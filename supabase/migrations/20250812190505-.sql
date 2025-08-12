-- Fix security vulnerability in live_chat_messages table RLS policy
-- Restrict message access to only participants of each specific room

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Users can view messages in rooms" ON public.live_chat_messages;

-- Create a more secure policy that only allows access to room participants
-- Users can only view messages in rooms where they are participants
CREATE POLICY "users_can_view_messages_in_joined_rooms" 
ON public.live_chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.video_chat_rooms 
    WHERE video_chat_rooms.room_id = live_chat_messages.room_id 
    AND (
      video_chat_rooms.created_by = auth.uid() 
      OR 
      video_chat_rooms.participants ? auth.uid()::text
    )
  )
);

-- Ensure insert policy is also secure - users can only insert messages in rooms they've joined
DROP POLICY IF EXISTS "Users can insert messages in rooms" ON public.live_chat_messages;

CREATE POLICY "users_can_insert_messages_in_joined_rooms" 
ON public.live_chat_messages 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND 
  EXISTS (
    SELECT 1 FROM public.video_chat_rooms 
    WHERE video_chat_rooms.room_id = live_chat_messages.room_id 
    AND (
      video_chat_rooms.created_by = auth.uid() 
      OR 
      video_chat_rooms.participants ? auth.uid()::text
    )
  )
);