
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Discussion } from '@/types/community';
import { communityService } from '@/services/communityService';
import DiscussionCard from './DiscussionCard';
import DiscussionFilters from './DiscussionFilters';
import CreateDiscussionForm from './CreateDiscussionForm';

const DiscussionThreads = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('hot');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = [
    'all',
    'General Discussion',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'AI Ethics',
    'Show & Tell',
    'Help & Support',
    'News & Updates',
    'Research Papers'
  ];

  useEffect(() => {
    loadDiscussions();
  }, [selectedCategory, sortBy]);

  const loadDiscussions = async () => {
    setLoading(true);
    try {
      const data = await communityService.getDiscussions(
        selectedCategory === 'all' ? undefined : selectedCategory,
        sortBy
      );
      setDiscussions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load discussions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like discussions",
        variant: "destructive"
      });
      return;
    }
    
    await communityService.likeDiscussion(id);
    loadDiscussions(); // Refresh to get updated counts
  };

  const handleCreateDiscussion = async (discussionData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create discussions",
        variant: "destructive"
      });
      return;
    }

    const newDiscussion = await communityService.createDiscussion(discussionData);
    if (newDiscussion) {
      setDiscussions(prev => [newDiscussion, ...prev]);
      setShowCreateForm(false);
    }
  };

  const handleDislike = (id: string) => {
    // Implement dislike functionality similar to like
    console.log('Dislike discussion:', id);
  };

  const handleReply = (id: string) => {
    console.log('Reply to discussion:', id);
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/community/discussion/${id}`);
    toast({
      title: "Link Copied",
      description: "Discussion link copied to clipboard"
    });
  };

  const handleBookmark = (id: string) => {
    console.log('Bookmark discussion:', id);
  };

  const handleReport = (id: string) => {
    console.log('Report discussion:', id);
  };

  const handleView = (id: string) => {
    console.log('View discussion:', id);
    // Navigate to discussion detail page
  };

  const filteredDiscussions = discussions.filter(discussion => {
    if (!searchQuery) return true;
    return discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
           discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  if (showCreateForm) {
    return (
      <CreateDiscussionForm
        onSubmit={handleCreateDiscussion}
        onCancel={() => setShowCreateForm(false)}
        categories={categories}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Community Discussions</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>

      <DiscussionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
      />

      <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hot">Hot</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="followed">Following</TabsTrigger>
        </TabsList>

        <TabsContent value={sortBy} className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading discussions...</p>
            </div>
          ) : filteredDiscussions.length > 0 ? (
            filteredDiscussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                onLike={handleLike}
                onDislike={handleDislike}
                onReply={handleReply}
                onShare={handleShare}
                onBookmark={handleBookmark}
                onReport={handleReport}
                onView={handleView}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No discussions found</p>
              <Button 
                className="mt-4" 
                onClick={() => setShowCreateForm(true)}
              >
                Start the first discussion
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
  };

export default DiscussionThreads;
