import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Download, 
  DollarSign, 
  Play, 
  Code,
  Database,
  Brain,
  Zap,
  Shield,
  Globe,
  Settings,
  Eye,
  Heart,
  ShoppingCart
} from "lucide-react";

interface ToolsProps {
  searchQuery: string;
}

const tools = [
  {
    id: 1,
    name: "GPT-4 Fine-tuning API",
    description: "Pre-configured API for fine-tuning GPT-4 models on custom datasets with automated optimization and monitoring.",
    provider: "AI Labs Inc.",
    rating: 4.9,
    reviews: 342,
    downloads: "15.2k",
    price: 299,
    pricing_type: "one-time",
    category: "APIs & Models",
    tags: ["GPT-4", "Fine-tuning", "API", "NLP"],
    featured: true,
    demo_available: true,
    code_included: true,
    documentation: "comprehensive",
    support: "24/7",
    views: 2841,
    likes: 567,
    last_updated: "2 days ago"
  },
  {
    id: 2,
    name: "Computer Vision Toolkit",
    description: "Complete toolkit with pre-trained models for object detection, face recognition, and image segmentation. Plug-and-play solution.",
    provider: "VisionAI Solutions",
    rating: 4.8,
    reviews: 189,
    downloads: "8.7k",
    price: 149,
    pricing_type: "one-time",
    category: "Computer Vision",
    tags: ["Object Detection", "Face Recognition", "Image Segmentation", "OpenCV"],
    featured: false,
    demo_available: true,
    code_included: true,
    documentation: "detailed",
    support: "community",
    views: 1567,
    likes: 234,
    last_updated: "1 week ago"
  },
  {
    id: 3,
    name: "AutoML Pipeline Generator",
    description: "No-code solution for creating complete machine learning pipelines. Automated feature engineering, model selection, and deployment.",
    provider: "DataFlow Studios",
    rating: 4.7,
    reviews: 97,
    downloads: "3.4k",
    price: 79,
    pricing_type: "monthly",
    category: "No-Code Tools",
    tags: ["AutoML", "No-Code", "Pipeline", "Automation"],
    featured: true,
    demo_available: true,
    code_included: false,
    documentation: "basic",
    support: "email",
    views: 987,
    likes: 145,
    last_updated: "3 days ago"
  },
  {
    id: 4,
    name: "Sentiment Analysis Dataset",
    description: "Curated dataset of 1M+ labeled reviews and social media posts across 15 languages with preprocessing scripts included.",
    provider: "Global Data Collective",
    rating: 4.6,
    reviews: 156,
    downloads: "12.1k",
    price: 199,
    pricing_type: "one-time",
    category: "Datasets",
    tags: ["Sentiment Analysis", "Multilingual", "Social Media", "Reviews"],
    featured: false,
    demo_available: false,
    code_included: true,
    documentation: "comprehensive",
    support: "community",
    views: 2156,
    likes: 389,
    last_updated: "5 days ago"
  },
  {
    id: 5,
    name: "Real-time Chat Moderation AI",
    description: "AI-powered content moderation system for chat applications. Detects toxicity, spam, and inappropriate content in real-time.",
    provider: "SafeChat Technologies",
    rating: 4.9,
    reviews: 78,
    downloads: "2.8k",
    price: 49,
    pricing_type: "monthly",
    category: "Content Moderation",
    tags: ["Content Moderation", "Real-time", "Chat", "Safety"],
    featured: true,
    demo_available: true,
    code_included: true,
    documentation: "detailed",
    support: "priority",
    views: 1234,
    likes: 198,
    last_updated: "1 day ago"
  }
];

const MarketplaceTools = ({ searchQuery }: ToolsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && tool.price === 0) ||
                        (priceFilter === "under100" && tool.price < 100) ||
                        (priceFilter === "under500" && tool.price < 500);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = [...new Set(tools.map(tool => tool.category))];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "APIs & Models": return <Code className="h-4 w-4" />;
      case "Computer Vision": return <Eye className="h-4 w-4" />;
      case "No-Code Tools": return <Settings className="h-4 w-4" />;
      case "Datasets": return <Database className="h-4 w-4" />;
      case "Content Moderation": return <Shield className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number, type: string) => {
    if (price === 0) return "Free";
    return type === "monthly" ? `$${price}/mo` : `$${price}`;
  };

  const getSupportBadge = (support: string) => {
    switch (support) {
      case "24/7": return <Badge className="bg-green-500">24/7 Support</Badge>;
      case "priority": return <Badge className="bg-blue-500">Priority Support</Badge>;
      case "email": return <Badge variant="secondary">Email Support</Badge>;
      case "community": return <Badge variant="outline">Community</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-1"
            >
              {getCategoryIcon(category)}
              {category}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="under100">Under $100</option>
            <option value="under500">Under $500</option>
          </select>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className={`hover:shadow-lg transition-all ${tool.featured ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(tool.category)}
                  <Badge variant="outline">{tool.category}</Badge>
                </div>
                {tool.featured && (
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-lg flex items-center gap-2">
                {tool.name}
                {tool.demo_available && (
                  <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                    <Play className="h-3 w-3" />
                  </Button>
                )}
              </CardTitle>
              
              <CardDescription className="text-sm">
                {tool.description}
              </CardDescription>
              
              <div className="text-xs text-muted-foreground">
                by {tool.provider}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Rating and Downloads */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{tool.rating}</span>
                      <span className="text-sm text-muted-foreground">({tool.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="h-3 w-3" />
                    <span>{tool.downloads}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {tool.code_included && (
                    <Badge variant="outline" className="text-xs">
                      <Code className="h-3 w-3 mr-1" />
                      Code
                    </Badge>
                  )}
                  {tool.demo_available && (
                    <Badge variant="outline" className="text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      Demo
                    </Badge>
                  )}
                  {getSupportBadge(tool.support)}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{tool.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{tool.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{tool.likes}</span>
                    </div>
                  </div>
                  <span>Updated {tool.last_updated}</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(tool.price, tool.pricing_type)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {tool.demo_available && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Demo
                      </Button>
                    )}
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {tool.price === 0 ? "Download" : "Buy"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or browse different categories
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceTools;