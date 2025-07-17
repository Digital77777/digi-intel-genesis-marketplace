import { supabase } from '@/integrations/supabase/client';
import { Discussion, Reply, ChatMessage, ChatRoom, VideoRoom } from '@/types/community';

export class CommunityService {
  // Discussion methods
  async getDiscussions(category?: string, sortBy: string = 'hot'): Promise<Discussion[]> {
    try {
      let query = supabase
        .from('discussions')
        .select(`
          *,
          profiles!discussions_author_id_fkey(full_name, avatar_url)
        `);

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      // Apply sorting
      switch (sortBy) {
        case 'hot':
          query = query.order('is_hot', { ascending: false })
                      .order('likes', { ascending: false });
          break;
        case 'new':
          query = query.order('created_at', { ascending: false });
          break;
        case 'trending':
          query = query.order('views', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(20);
      
      if (error) throw error;
      
      return data?.map(item => ({
        ...item,
        author_name: item.profiles?.full_name || 'Anonymous',
        author_avatar: item.profiles?.avatar_url
      })) || [];
    } catch (error) {
      console.error('Error fetching discussions:', error);
      return [];
    }
  }

  async createDiscussion(discussion: Partial<Discussion>): Promise<Discussion | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('discussions')
        .insert({
          ...discussion,
          author_id: user.id,
          likes: 0,
          dislikes: 0,
          replies_count: 0,
          views: 0,
          is_pinned: false,
          is_hot: false
        })
        .select(`
          *,
          profiles!discussions_author_id_fkey(full_name, avatar_url)
        `)
        .single();

      if (error) throw error;

      return {
        ...data,
        author_name: data.profiles?.full_name || 'Anonymous',
        author_avatar: data.profiles?.avatar_url
      };
    } catch (error) {
      console.error('Error creating discussion:', error);
      return null;
    }
  }

  async likeDiscussion(discussionId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Check if already liked
      const { data: existingLike } = await supabase
        .from('discussion_likes')
        .select('id')
        .eq('discussion_id', discussionId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('discussion_likes')
          .delete()
          .eq('discussion_id', discussionId)
          .eq('user_id', user.id);

        // Decrement likes count
        await supabase.rpc('decrement_discussion_likes', { discussion_id: discussionId });
      } else {
        // Like
        await supabase
          .from('discussion_likes')
          .insert({ discussion_id: discussionId, user_id: user.id });

        // Increment likes count
        await supabase.rpc('increment_discussion_likes', { discussion_id: discussionId });
      }

      return true;
    } catch (error) {
      console.error('Error liking discussion:', error);
      return false;
    }
  }

  // Chat methods
  async getChatRooms(): Promise<ChatRoom[]> {
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('member_count', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      return [];
    }
  }

  async getChatMessages(roomId: string, limit: number = 50): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          profiles!chat_messages_author_id_fkey(full_name, avatar_url)
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(item => ({
        ...item,
        author_name: item.profiles?.full_name || 'Anonymous',
        author_avatar: item.profiles?.avatar_url
      })).reverse() || [];
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }
  }

  async sendChatMessage(roomId: string, content: string): Promise<ChatMessage | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: roomId,
          content,
          author_id: user.id,
          message_type: 'text'
        })
        .select(`
          *,
          profiles!chat_messages_author_id_fkey(full_name, avatar_url)
        `)
        .single();

      if (error) throw error;

      return {
        ...data,
        author_name: data.profiles?.full_name || 'Anonymous',
        author_avatar: data.profiles?.avatar_url
      };
    } catch (error) {
      console.error('Error sending chat message:', error);
      return null;
    }
  }

  // Video room methods
  async getVideoRooms(): Promise<VideoRoom[]> {
    try {
      const { data, error } = await supabase
        .from('video_rooms')
        .select(`
          *,
          profiles!video_rooms_host_id_fkey(full_name)
        `)
        .eq('is_active', true)
        .order('participant_count', { ascending: false });

      if (error) throw error;

      return data?.map(item => ({
        ...item,
        host_name: item.profiles?.full_name || 'Anonymous'
      })) || [];
    } catch (error) {
      console.error('Error fetching video rooms:', error);
      return [];
    }
  }

  // Real-time subscriptions
  subscribeToDiscussions(callback: (payload: any) => void) {
    return supabase
      .channel('discussions')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'discussions' }, 
        callback
      )
      .subscribe();
  }

  subscribeToChatMessages(roomId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`chat_messages:${roomId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        }, 
        callback
      )
      .subscribe();
  }
}

export const communityService = new CommunityService();