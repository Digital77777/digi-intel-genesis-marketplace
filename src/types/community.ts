export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  category: string;
  tags: string[];
  likes: number;
  dislikes: number;
  replies_count: number;
  views: number;
  is_pinned: boolean;
  is_hot: boolean;
  created_at: string;
  updated_at: string;
}

export interface Reply {
  id: string;
  discussion_id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  message_type: 'text' | 'image' | 'file';
  created_at: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  member_count: number;
  created_at: string;
}

export interface VideoRoom {
  id: string;
  name: string;
  topic: string;
  host_id: string;
  host_name: string;
  participant_count: number;
  max_participants: number;
  is_active: boolean;
  created_at: string;
}