import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage as ChatMessageType } from "@/types/community";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwn }) => {
  const timeAgo = formatDistanceToNow(new Date(message.created_at), { addSuffix: true });

  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {!isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.author_avatar} />
          <AvatarFallback className="text-xs">
            {message.author_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex-1 min-w-0 ${isOwn ? 'text-right' : ''}`}>
        {!isOwn && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{message.author_name}</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        )}
        <div
          className={`inline-block p-3 rounded-lg max-w-[80%] ${
            isOwn
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-muted/50'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        </div>
        {isOwn && (
          <div className="text-xs text-muted-foreground mt-1">{timeAgo}</div>
        )}
      </div>
      
      {isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.author_avatar} />
          <AvatarFallback className="text-xs">
            {message.author_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;