import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Flag, 
  Clock,
  Eye,
  Pin
} from "lucide-react";
import { Discussion } from "@/types/community";
import { formatDistanceToNow } from "date-fns";

interface DiscussionCardProps {
  discussion: Discussion;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onReply: (id: string) => void;
  onShare: (id: string) => void;
  onBookmark: (id: string) => void;
  onReport: (id: string) => void;
  onView: (id: string) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  discussion,
  onLike,
  onDislike,
  onReply,
  onShare,
  onBookmark,
  onReport,
  onView
}) => {
  const timeAgo = formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true });

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onView(discussion.id)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            {discussion.is_pinned && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Pin className="h-3 w-3" />
                Pinned
              </Badge>
            )}
            {discussion.is_hot && (
              <Badge variant="destructive">Hot</Badge>
            )}
            <Badge variant="outline">{discussion.category}</Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {timeAgo}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold hover:text-primary transition-colors text-left">
          {discussion.title}
        </h3>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={discussion.author_avatar} />
            <AvatarFallback className="text-xs">
              {discussion.author_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">by {discussion.author_name}</span>
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
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(discussion.id);
                }}
                className="h-8 px-2"
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {discussion.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDislike(discussion.id);
                }}
                className="h-8 px-2"
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                {discussion.dislikes}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReply(discussion.id);
              }}
              className="h-8 px-2"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              {discussion.replies_count} replies
            </Button>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-3 w-3" />
              {discussion.views}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onShare(discussion.id);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(discussion.id);
              }}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onReport(discussion.id);
              }}
            >
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;