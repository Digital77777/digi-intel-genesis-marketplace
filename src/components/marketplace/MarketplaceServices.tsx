import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Clock, 
  DollarSign, 
  User, 
  Shield, 
  Award,
  Brain,
  Eye,
  MessageSquare,
  Heart
} from "lucide-react";

interface ServiceProps {
  searchQuery: string;
}

const services = [
  {
    id: 1,
    title: "Custom Computer Vision Solution",
    description: "I'll develop a custom object detection and tracking system tailored to your specific use case using state-of-the-art YOLOv8 and DeepSORT.",
    provider: {
      name: "Sarah Chen",
      rating: 4.9,
      reviews: 127,
      badge: "Gold",
      completedProjects: 89,
      responseTime: "1 hour"
    },
    pricing: {
      type: "fixed",
      amount: 2500,
      currency: "$"
    },
    delivery: "7 days",
    skills: ["Computer Vision", "PyTorch", "OpenCV", "Python"],
    category: "Computer Vision",
    featured: true,
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    views: 234,
    likes: 45
  },
  {
    id: 2,
    title: "NLP Text Analysis & Sentiment API",
    description: "Build a complete NLP pipeline for text classification, sentiment analysis, and entity extraction with 95%+ accuracy using transformers.",
    provider: {
      name: "Marcus Rodriguez",
      rating: 4.8,
      reviews: 89,
      badge: "Silver",
      completedProjects: 67,
      responseTime: "2 hours"
    },
    pricing: {
      type: "hourly",
      amount: 85,
      currency: "$"
    },
    delivery: "5 days",
    skills: ["NLP", "BERT", "Transformers", "FastAPI"],
    category: "Natural Language Processing",
    featured: false,
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    views: 156,
    likes: 28
  },
  {
    id: 3,
    title: "MLOps Pipeline & Model Deployment",
    description: "Set up complete MLOps pipeline with automated training, testing, and deployment using Docker, Kubernetes, and CI/CD best practices.",
    provider: {
      name: "Aisha Patel",
      rating: 5.0,
      reviews: 234,
      badge: "Gold",
      completedProjects: 156,
      responseTime: "30 min"
    },
    pricing: {
      type: "package",
      packages: [
        { name: "Basic", price: 1500, description: "Single model deployment" },
        { name: "Standard", price: 3000, description: "Multi-model pipeline" },
        { name: "Premium", price: 5000, description: "Enterprise MLOps setup" }
      ]
    },
    delivery: "10 days",
    skills: ["MLOps", "Docker", "Kubernetes", "AWS"],
    category: "MLOps & Deployment",
    featured: true,
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    views: 312,
    likes: 67
  },
  {
    id: 4,
    title: "AI Chatbot Development",
    description: "Create intelligent conversational AI using latest language models, with custom training on your data and seamless integration.",
    provider: {
      name: "David Kim",
      rating: 4.7,
      reviews: 76,
      badge: "Silver",
      completedProjects: 45,
      responseTime: "3 hours"
    },
    pricing: {
      type: "fixed",
      amount: 1800,
      currency: "$"
    },
    delivery: "6 days",
    skills: ["Chatbots", "GPT", "Dialogflow", "Node.js"],
    category: "Conversational AI",
    featured: false,
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    views: 189,
    likes: 34
  }
];

const MarketplaceServices = ({ searchQuery }: ServiceProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(services.map(service => service.category))];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Gold": return "default";
      case "Silver": return "secondary";
      default: return "outline";
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Gold": return <Award className="h-3 w-3 mr-1" />;
      case "Silver": return <Shield className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  const formatPricing = (pricing: any) => {
    if (pricing.type === "fixed") {
      return `${pricing.currency}${pricing.amount.toLocaleString()}`;
    } else if (pricing.type === "hourly") {
      return `${pricing.currency}${pricing.amount}/hr`;
    } else {
      return `From ${pricing.packages[0].price}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
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
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className={`hover:shadow-lg transition-all ${service.featured ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{service.provider.name}</h4>
                      <Badge variant={getBadgeVariant(service.provider.badge)}>
                        {getBadgeIcon(service.provider.badge)}
                        {service.provider.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{service.provider.rating}</span>
                        <span>({service.provider.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{service.provider.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {service.featured && (
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {service.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{service.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{service.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{service.delivery} delivery</span>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">
                      {formatPricing(service.pricing)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm">
                      <User className="h-4 w-4 mr-1" />
                      Hire Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or browse different categories
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceServices;