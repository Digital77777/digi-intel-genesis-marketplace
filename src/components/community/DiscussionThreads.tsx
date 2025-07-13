
import { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Share2, Bookmark, Flag, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  replies: number;
  likes: number;
  dislikes: number;
  timeAgo: string;
  isHot: boolean;
  isPinned: boolean;
  tags: string[];
}

const DiscussionThreads = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: '1',
      title: 'Revolutionary Breakthrough: GPT-5 Capabilities Leaked',
      author: 'AI_Researcher_2024',
      content: 'Just saw some incredible demos of what appears to be GPT-5 capabilities. The reasoning improvements are mind-blowing...',
      category: 'Breaking News',
      replies: 156,
      likes: 1243,
      dislikes: 23,
      timeAgo: '2 hours ago',
      isHot: true,
      isPinned: true,
      tags: ['GPT-5', 'OpenAI', 'Breakthrough']
    },
    {
      id: '2',
      title: 'Building AGI: Are We Ready for the Implications?',
      author: 'EthicsInAI',
      content: 'As we get closer to AGI, we need to seriously consider the societal implications. What regulations should be in place?',
      category: 'Ethics & Society',
      replies: 89,
      likes: 567,
      dislikes: 12,
      timeAgo: '4 hours ago',
      isHot: true,
      isPinned: false,
      tags: ['AGI', 'Ethics', 'Society']
    },
    {
      id: '3',
      title: 'Show & Tell: My AI-Powered Trading Bot Results',
      author: 'QuantTrader',
      content: 'After 6 months of development, my AI trading bot has achieved 23% returns. Here\'s what I learned...',
      category: 'Show & Tell',
      replies: 34,
      likes: 298,
      dislikes: 8,
      timeAgo: '6 hours ago',
      isHot: false,
      isPinned: false,
      tags: ['Trading', 'Bot', 'Results']
    }
  ]);

  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleLike = (id: string) => {
    setDiscussions(prev => prev.map(d => 
      d.id === id ? { ...d, likes: d.likes + 1 } : d
    ));
  };

  const handleDislike = (id: string) => {
    setDiscussions(prev => prev.map(d => 
      d.id === id ? { ...d, dislikes: d.dislikes + 1 } : d
    ));
  };

  const submitReply = (discussionId: string) => {
    if (replyText.trim()) {
      setDiscussions(prev => prev.map(d => 
        d.id === discussionId ? { ...d, replies: d.replies + 1 } : d
      ));
      setReplyText('');
      setSelectedDiscussion(null);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="hot" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hot" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Hot
          </TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="followed">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="hot" className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {discussion.isPinned && (
                      <Badge variant="secondary">Pinned</Badge>
                    )}
                    {discussion.isHot && (
                      <Badge variant="destructive">Hot</Badge>
                    )}
                    <Badge variant="outline">{discussion.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {discussion.timeAgo}
                  </div>
                </div>
                
                <CardTitle className="hover:text-primary cursor-pointer text-left">
                  {discussion.title}
                </CardTitle>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>by {discussion.author}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {discussion.content}
                </p>

                <div className="flex flex-wrap gap-1">
                  {discussion.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(discussion.id)}
                        className="h-8 px-2"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {discussion.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDislike(discussion.id)}
                        className="h-8 px-2"
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {discussion.dislikes}
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDiscussion(discussion.id)}
                      className="h-8 px-2"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {discussion.replies} replies
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {selectedDiscussion === discussion.id && (
                  <div className="border-t pt-4 space-y-3">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDiscussion(null)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => submitReply(discussion.id)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">New discussions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Trending discussions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followed">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Discussions from people you follow will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscussionThreads;
