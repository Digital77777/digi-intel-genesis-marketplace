import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Users, Clock } from "lucide-react";

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    category: string;
    tier: string;
    rating: number;
    users: string;
    tags: string[];
    pricing: {
      freemium: string;
      pro: string;
    };
  };
  usage?: {
    used: number;
    limit: number;
  };
  onUse: (toolId: string) => void;
  onViewDetails: (tool: any) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, usage, onUse, onViewDetails }) => {
  const IconComponent = tool.icon;
  const usagePercentage = usage ? (usage.used / usage.limit) * 100 : 0;
  
  const getUsageColor = () => {
    if (usagePercentage >= 90) return "bg-destructive";
    if (usagePercentage >= 70) return "bg-warning";
    return "bg-success";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Education: "bg-primary/10 text-primary border-primary/20",
      Business: "bg-secondary/10 text-secondary border-secondary/20",
      Content: "bg-accent text-accent-foreground border-accent-foreground/20",
      Development: "bg-primary-light/20 text-primary-dark border-primary/30",
      Communication: "bg-secondary-light/20 text-secondary-dark border-secondary/30",
      Energy: "bg-success/10 text-success border-success/20",
      Productivity: "bg-warning/10 text-warning border-warning/20",
      Agriculture: "bg-muted text-muted-foreground border-border"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground border-border";
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-primary text-white shadow-soft">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`text-xs ${getCategoryColor(tool.category)}`}>
                  {tool.category}
                </Badge>
                {tool.tier === "freemium" && (
                  <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
                    Freemium
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-medium">{tool.rating}</span>
          </div>
        </div>
        
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{tool.users}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Last updated: 2 days ago</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground border-border/50"
            >
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground">
              +{tool.tags.length - 3} more
            </Badge>
          )}
        </div>

        {usage && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Usage this month
              </span>
              <span className="text-xs font-medium text-foreground">
                {usage.used} / {usage.limit}
              </span>
            </div>
            <Progress 
              value={usagePercentage} 
              className="h-2" 
              // @ts-ignore
              indicatorClassName={getUsageColor()}
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={() => onUse(tool.id)}
            className="flex-1 bg-gradient-primary text-white hover:opacity-90 transition-opacity"
            disabled={usage && usage.used >= usage.limit}
          >
            {usage && usage.used >= usage.limit ? "Upgrade for More" : "Use Tool"}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(tool)}
            className="border-primary/30 text-primary hover:bg-primary/5"
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;