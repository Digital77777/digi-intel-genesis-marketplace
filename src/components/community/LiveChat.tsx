
import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

interface LiveChatProps {
  roomId: string;
  currentUser: string;
}

const LiveChat = ({ roomId, currentUser }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Alex Chen',
      message: 'Hey everyone! Excited to discuss the latest AI developments.',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: '2',
      user: 'Sarah Kim',
      message: 'Has anyone tried the new GPT-4 Vision API? The results are incredible!',
      timestamp: new Date(Date.now() - 3 * 60000),
    },
    {
      id: '3',
      user: 'Mike Johnson',
      message: 'I\'ve been experimenting with it for image analysis. The accuracy is impressive.',
      timestamp: new Date(Date.now() - 1 * 60000),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: currentUser,
        message: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Live Chat</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">47 online</span>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">
                    {message.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{message.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground break-words">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {isTyping && (
          <div className="px-4 py-2 text-sm text-muted-foreground border-t">
            Someone is typing...
          </div>
        )}

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button onClick={sendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveChat;
