import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Hash } from "lucide-react";
import { ChatRoom } from "@/types/community";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  activeRoom: string;
  onRoomSelect: (roomId: string) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ 
  rooms, 
  activeRoom, 
  onRoomSelect 
}) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Hash className="h-4 w-4" />
        Active Rooms
      </h3>
      
      {rooms.map((room) => (
        <Button
          key={room.id}
          variant={activeRoom === room.id ? "default" : "ghost"}
          className="w-full justify-start h-auto p-3"
          onClick={() => onRoomSelect(room.id)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <div className="font-medium">#{room.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {room.description}
              </div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Users className="h-3 w-3" />
              <span className="text-xs">{room.member_count}</span>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ChatRoomList;