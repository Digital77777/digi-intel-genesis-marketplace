import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Zap, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";

interface ToolDetailsProps {
  tool: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    icon: React.ComponentType<any>;
    category: string;
    tier: string;
    rating: number;
    users: string;
    tags: string[];
    features: string[];
    useCases: string[];
    pricing: {
      freemium: string;
      pro: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onUse: (toolId: string) => void;
}

const ToolDetails: React.FC<ToolDetailsProps> = ({ tool, isOpen, onClose, onUse }) => {
  if (!tool) return null;

  const IconComponent = tool.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
        <DialogHeader className="pb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary text-white shadow-medium">
              <IconComponent className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {tool.name}
              </DialogTitle>
              <div className="flex items-center gap-3 mb-3">
                <Badge 
                  variant="outline" 
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {tool.category}
                </Badge>
                {tool.tier === "freemium" && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Freemium Available
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{tool.rating}</span>
                  <span className="text-muted-foreground">({tool.users} users)</span>
                </div>
              </div>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                {tool.longDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Features */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
              <Zap className="h-5 w-5 text-primary" />
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tool.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Use Cases */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-secondary" />
              Perfect For
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map((useCase, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1"
                >
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-accent text-accent-foreground border-accent-foreground/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Pricing */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border/50 bg-accent/30">
                <h4 className="font-semibold text-base mb-2 text-foreground">Freemium</h4>
                <p className="text-sm text-muted-foreground mb-3">{tool.pricing.freemium}</p>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  Free to start
                </Badge>
              </div>
              <div className="p-4 rounded-lg border border-primary/30 bg-gradient-accent/30">
                <h4 className="font-semibold text-base mb-2 text-foreground">Pro</h4>
                <p className="text-sm text-muted-foreground mb-3">{tool.pricing.pro}</p>
                <Badge className="bg-gradient-primary text-white">
                  Unlimited access
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => {
                onUse(tool.id);
                onClose();
              }}
              className="flex-1 bg-gradient-primary text-white hover:opacity-90 transition-opacity"
            >
              Start Using Tool
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-primary/30 text-primary hover:bg-primary/5"
            >
              Learn More
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolDetails;