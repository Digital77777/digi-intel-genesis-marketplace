/*
  # Community Forum Database Schema

  1. New Tables
    - `discussions` - Forum discussions/posts
    - `discussion_likes` - User likes on discussions
    - `discussion_replies` - Replies to discussions
    - `chat_rooms` - Chat room definitions
    - `chat_messages` - Chat messages
    - `video_rooms` - Video chat rooms
    - `video_room_participants` - Video room participants

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure users can only modify their own content

  3. Functions
    - Increment/decrement like counters
    - Update reply counts
*/

-- Discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  replies_count integer DEFAULT 0,
  views integer DEFAULT 0,
  is_pinned boolean DEFAULT false,
  is_hot boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Discussion likes table
CREATE TABLE IF NOT EXISTS discussion_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(discussion_id, user_id)
);

-- Discussion replies table
CREATE TABLE IF NOT EXISTS discussion_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  content text NOT NULL,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat rooms table
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  is_private boolean DEFAULT false,
  member_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  content text NOT NULL,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  created_at timestamptz DEFAULT now()
);

-- Video rooms table
CREATE TABLE IF NOT EXISTS video_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  topic text,
  host_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participant_count integer DEFAULT 0,
  max_participants integer DEFAULT 50,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Video room participants table
CREATE TABLE IF NOT EXISTS video_room_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES video_rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Enable RLS
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_room_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for discussions
CREATE POLICY "discussions_select" ON discussions FOR SELECT USING (true);
CREATE POLICY "discussions_insert" ON discussions FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "discussions_update" ON discussions FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "discussions_delete" ON discussions FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for discussion_likes
CREATE POLICY "discussion_likes_select" ON discussion_likes FOR SELECT USING (true);
CREATE POLICY "discussion_likes_insert" ON discussion_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "discussion_likes_delete" ON discussion_likes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for discussion_replies
CREATE POLICY "discussion_replies_select" ON discussion_replies FOR SELECT USING (true);
CREATE POLICY "discussion_replies_insert" ON discussion_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "discussion_replies_update" ON discussion_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "discussion_replies_delete" ON discussion_replies FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for chat_rooms
CREATE POLICY "chat_rooms_select" ON chat_rooms FOR SELECT USING (true);

-- RLS Policies for chat_messages
CREATE POLICY "chat_messages_select" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "chat_messages_insert" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = author_id);

-- RLS Policies for video_rooms
CREATE POLICY "video_rooms_select" ON video_rooms FOR SELECT USING (true);
CREATE POLICY "video_rooms_insert" ON video_rooms FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "video_rooms_update" ON video_rooms FOR UPDATE USING (auth.uid() = host_id);

-- RLS Policies for video_room_participants
CREATE POLICY "video_room_participants_select" ON video_room_participants FOR SELECT USING (true);
CREATE POLICY "video_room_participants_insert" ON video_room_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "video_room_participants_delete" ON video_room_participants FOR DELETE USING (auth.uid() = user_id);

-- Functions for like counting
CREATE OR REPLACE FUNCTION increment_discussion_likes(discussion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE discussions 
  SET likes = likes + 1 
  WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_discussion_likes(discussion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE discussions 
  SET likes = GREATEST(likes - 1, 0) 
  WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default chat rooms
INSERT INTO chat_rooms (name, description, member_count) VALUES
('general', 'General AI discussions', 1247),
('ai-research', 'Latest AI research and papers', 892),
('ml-help', 'Get help with machine learning', 634),
('career-advice', 'AI career guidance and tips', 456),
('show-and-tell', 'Share your AI projects', 321)
ON CONFLICT (name) DO NOTHING;

-- Insert sample discussions
INSERT INTO discussions (title, content, author_id, category, tags, likes, replies_count, views, is_hot, is_pinned) 
SELECT 
  'Welcome to the AI Community Forum!',
  'This is a place for AI enthusiasts, researchers, and developers to connect, share knowledge, and collaborate on exciting projects. Feel free to introduce yourself and share what brings you to the world of artificial intelligence.',
  (SELECT id FROM auth.users LIMIT 1),
  'General Discussion',
  ARRAY['welcome', 'introduction', 'community'],
  42,
  8,
  156,
  true,
  true
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1);