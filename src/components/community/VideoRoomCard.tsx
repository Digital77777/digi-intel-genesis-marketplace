import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video, Users, Clock } from "lucide-react";
import { VideoRoom } from "@/types/community";
import { formatDistanceToNow } from "date-fns";

interface VideoRoomCardProps {
  room: VideoRoom;
  onJoin: (roomId: string) => void;
}

const VideoRoomCard: React.FC<VideoRoomCardProps> = ({ room, onJoin }) => {
  const timeAgo = formatDistanceToNow(new Date(room.created_at), { addSuffix: true });
  const isFull = room.participant_count >= room.max_participants;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={room.is_active ? "default" : "secondary"}>
            {room.is_active ? "Live" : "Offline"}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </div>
        </div>
        
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="h-5 w-5" />
          {room.name}
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {room.host_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Hosted by {room.host_name}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{room.topic}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {room.participant_count}/{room.max_participants}
            </span>
            {isFull && <Badge variant="outline" className="text-xs">Full</Badge>}
          </div>
          
          <Button 
            size="sm" 
            onClick={() => onJoin(room.id)}
            disabled={!room.is_active || isFull}
          >
            {isFull ? "Full" : "Join Room"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoRoomCard;