import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, Video, TrendingUp } from "lucide-react";

interface CommunityStatsProps {
  totalMembers: number;
  onlineMembers: number;
  activeRooms: number;
  dailyMessages: number;
}

const CommunityStats: React.FC<CommunityStatsProps> = ({
  totalMembers,
  onlineMembers,
  activeRooms,
  dailyMessages
}) => {
  const stats = [
    {
      label: "Members",
      value: `${(totalMembers / 1000).toFixed(1)}K`,
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Online Now",
      value: `${(onlineMembers / 1000).toFixed(1)}K`,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      label: "Live Rooms",
      value: activeRooms.toString(),
      icon: Video,
      color: "text-purple-600"
    },
    {
      label: "Daily Messages",
      value: `${(dailyMessages / 1000).toFixed(1)}K`,
      icon: MessageSquare,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <IconComponent className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommunityStats;