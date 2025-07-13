
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bot, Users, Zap, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      title: "Total Tools",
      value: "50+",
      icon: Bot,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Active Users",
      value: "12.5K",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Tools Used Today",
      value: "2.3K",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Growth Rate",
      value: "+15%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const categories = [
    { name: "Content", count: 12, percentage: 85 },
    { name: "Development", count: 8, percentage: 70 },
    { name: "Analytics", count: 6, percentage: 60 },
    { name: "Vision", count: 5, percentage: 45 },
    { name: "Communication", count: 4, percentage: 35 }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white to-blue-50/30 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Platform Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.title}</div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-purple-50/30 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Popular Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.count} tools</span>
              </div>
              <Progress 
                value={category.percentage} 
                className="h-2 bg-slate-100"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
