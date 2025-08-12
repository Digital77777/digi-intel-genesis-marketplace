
import { supabase } from '@/integrations/supabase/client';
import { Discussion, Reply, ChatMessage, ChatRoom, VideoRoom } from '@/types/community';

export class CommunityService {
  // Discussion methods
  async getDiscussions(category?: string, sortBy: string = 'hot'): Promise<Discussion[]> {
    try {
      let query = supabase
        .from('discussion_threads')
        .select('*');

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
          query = query.order('likes', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(20);
      
      if (error) throw error;
      
      // Get profile data separately to avoid relationship errors
      const userIds = data?.map(item => (item as any).user_id).filter(Boolean) || [];
      let profilesMap: Record<string, any> = {};
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);
        
        profilesMap = profiles?.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>) || {};
      }
      
      return data?.map(item => {
        const typedItem = item as any;
        const profile = profilesMap[typedItem.user_id];
        
        return {
          id: typedItem.id,
          title: typedItem.title,
          content: typedItem.content,
          author_id: typedItem.user_id || typedItem.author || '',
          author_name: profile?.full_name || typedItem.author || 'Anonymous',
          author_avatar: profile?.avatar_url,
          category: typedItem.category,
          tags: typedItem.tags || [],
          likes: typedItem.likes || 0,
          dislikes: typedItem.dislikes || 0,
          replies_count: typedItem.replies || 0,
          views: 0, // Not available in current schema
          is_pinned: typedItem.is_pinned || false,
          is_hot: typedItem.is_hot || false,
          created_at: typedItem.created_at,
          updated_at: typedItem.updated_at
        };
      }) || [];
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
        .from('discussion_threads')
        .insert({
          title: discussion.title,
          content: discussion.content,
          category: discussion.category,
          author: user.email || 'Anonymous',
          user_id: user.id,
          tags: discussion.tags || [],
          time_ago: 'just now',
          likes: 0,
          dislikes: 0,
          replies: 0,
          is_pinned: false,
          is_hot: false
        })
        .select('*')
        .single();

      if (error) throw error;

      // Get profile data separately
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();

      const typedData = data as any;
      return {
        id: typedData.id,
        title: typedData.title,
        content: typedData.content,
        author_id: typedData.user_id || typedData.author || '',
        author_name: profile?.full_name || typedData.author || 'Anonymous',
        author_avatar: profile?.avatar_url,
        category: typedData.category,
        tags: typedData.tags || [],
        likes: typedData.likes || 0,
        dislikes: typedData.dislikes || 0,
        replies_count: typedData.replies || 0,
        views: 0,
        is_pinned: typedData.is_pinned || false,
        is_hot: typedData.is_hot || false,
        created_at: typedData.created_at,
        updated_at: typedData.updated_at
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

      // Get current likes count and increment it
      const { data: currentData, error: fetchError } = await supabase
        .from('discussion_threads')
        .select('likes')
        .eq('id', discussionId)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from('discussion_threads')
        .update({ 
          likes: (currentData.likes || 0) + 1
        })
        .eq('id', discussionId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error liking discussion:', error);
      return false;
    }
  }

  // Chat methods - using mock data since tables don't exist yet
  async getChatRooms(): Promise<ChatRoom[]> {
    try {
      // Mock data since chat_rooms table doesn't exist
      return [
        {
          id: 'general',
          name: 'general',
          description: 'General AI discussions',
          is_private: false,
          member_count: 142,
          created_at: new Date().toISOString()
        },
        {
          id: 'ml-research',
          name: 'ml-research',
          description: 'Machine Learning Research',
          is_private: false,
          member_count: 89,
          created_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      return [];
    }
  }

  async getChatMessages(roomId: string, limit: number = 50): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('live_chat_messages')
        .select('*')
        .eq('room_id', roomId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;

      if (!data || data.length === 0) return [];

      // Get profile data separately to avoid relationship errors
      const userIds = data.map(item => item.user_id).filter(Boolean);
      let profilesMap: Record<string, any> = {};
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);
        
        profilesMap = profiles?.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>) || {};
      }

      return data.map(item => {
        const profile = profilesMap[item.user_id || ''];
        return {
          id: item.id,
          room_id: item.room_id,
          content: item.message,
          author_id: item.user_id || '',
          author_name: profile?.full_name || item.user_name || 'Anonymous',
          author_avatar: profile?.avatar_url,
          message_type: item.message_type as 'text' | 'image' | 'file',
          created_at: item.timestamp
        };
      }).reverse();
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }
  }

  async sendChatMessage(roomId: string, content: string): Promise<ChatMessage | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get user profile for display name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();

      const { data, error } = await supabase
        .from('live_chat_messages')
        .insert({
          room_id: roomId,
          message: content,
          user_id: user.id,
          user_name: profile?.full_name || user.email || 'Anonymous',
          message_type: 'text'
        })
        .select('*')
        .single();

      if (error) throw error;

      return {
        id: data.id,
        room_id: data.room_id,
        content: data.message,
        author_id: data.user_id || '',
        author_name: profile?.full_name || data.user_name || 'Anonymous',
        author_avatar: profile?.avatar_url,
        message_type: data.message_type as 'text' | 'image' | 'file',
        created_at: data.timestamp
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
        .from('video_chat_rooms')
        .select('*')
        .eq('room_status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) return [];

      // Get profile data separately
      const creatorIds = data.map(item => item.created_by).filter(Boolean);
      let profilesMap: Record<string, any> = {};
      
      if (creatorIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', creatorIds);
        
        profilesMap = profiles?.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>) || {};
      }

      return data.map(item => {
        const profile = profilesMap[item.created_by || ''];
        return {
          id: item.id,
          name: item.room_id,
          topic: 'AI Discussion', // Default topic
          host_id: item.created_by || '',
          host_name: profile?.full_name || 'Anonymous',
          participant_count: Array.isArray(item.participants) ? item.participants.length : 0,
          max_participants: item.max_participants || 10,
          is_active: item.room_status === 'active',
          created_at: item.created_at
        };
      });
    } catch (error) {
      console.error('Error fetching video rooms:', error);
      return [];
    }
  }

  // Real-time subscriptions
  subscribeToDiscussions(callback: (payload: any) => void) {
    return supabase
      .channel('discussion_threads')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'discussion_threads' }, 
        callback
      )
      .subscribe();
  }

  subscribeToChatMessages(roomId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`live_chat_messages:${roomId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'live_chat_messages',
          filter: `room_id=eq.${roomId}`
        }, 
        callback
      )
      .subscribe();
  }
}

export const communityService = new CommunityService();
