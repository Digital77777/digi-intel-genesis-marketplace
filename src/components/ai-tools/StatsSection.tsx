import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Users, TrendingUp, Clock } from "lucide-react";

interface StatsSectionProps {
  totalTools: number;
  activeUsers: string;
  totalUsage: number;
  monthlyLimit: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ 
  totalTools, 
  activeUsers, 
  totalUsage, 
  monthlyLimit 
}) => {
  const usagePercentage = (totalUsage / monthlyLimit) * 100;

  const stats = [
    {
      icon: Zap,
      label: "AI Tools Available",
      value: totalTools.toString(),
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Users,
      label: "Active Users",
      value: activeUsers,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: TrendingUp,
      label: "Tools Used Today",
      value: "1,247",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Clock,
      label: "Avg. Response Time",
      value: "0.8s",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Usage Overview */}
      <Card className="bg-gradient-accent border-border/50 shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Monthly Usage</h3>
              <p className="text-sm text-muted-foreground">Track your activity across all AI tools</p>
            </div>
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/20"
            >
              Freemium Plan
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">
                Tools Used This Month
              </span>
              <span className="text-sm font-bold text-foreground">
                {totalUsage} / {monthlyLimit}
              </span>
            </div>
            
            <Progress 
              value={usagePercentage} 
              className="h-3 bg-muted/50" 
              // @ts-ignore
              indicatorClassName={`${
                usagePercentage >= 90 
                  ? 'bg-destructive' 
                  : usagePercentage >= 70 
                    ? 'bg-warning' 
                    : 'bg-gradient-primary'
              }`}
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {monthlyLimit - totalUsage} remaining
              </span>
              <span>
                {usagePercentage.toFixed(1)}% used
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-card/50 border-border/50 hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSection;