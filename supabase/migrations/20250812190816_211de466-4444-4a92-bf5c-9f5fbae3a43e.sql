
-- Add foreign key relationships between tables and profiles
-- First, let's add a user_id column to discussion_threads to properly link to profiles
ALTER TABLE discussion_threads ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id);

-- Update existing discussion_threads to set user_id based on author email
-- This is a one-time migration to link existing discussions to profiles
UPDATE discussion_threads 
SET user_id = profiles.id 
FROM profiles 
WHERE discussion_threads.author = profiles.email 
AND discussion_threads.user_id IS NULL;

-- Add foreign key constraint for video_chat_rooms to profiles
ALTER TABLE video_chat_rooms ADD CONSTRAINT video_chat_rooms_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES profiles(id);

-- Add foreign key constraint for live_chat_messages to profiles  
ALTER TABLE live_chat_messages ADD CONSTRAINT live_chat_messages_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id);
