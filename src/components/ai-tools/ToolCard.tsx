
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  users: string;
  isNew: boolean;
  path: string;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="group h-full bg-gradient-to-br from-white to-blue-50/30 border-slate-200 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              {tool.isNew && (
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-primary text-white text-xs px-2 py-0.5">
                  <Sparkles className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
              {tool.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tool.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{tool.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{tool.users}</span>
            </div>
          </div>
        </div>
        
        <Link to={tool.path}>
          <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium">
            Try Tool
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
