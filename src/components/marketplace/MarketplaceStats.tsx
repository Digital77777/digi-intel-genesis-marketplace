import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle,
  Globe,
  Clock,
  Star,
  Award
} from "lucide-react";

const MarketplaceStats = () => {
  const globalStats = [
    {
      title: "Active Freelancers",
      value: "12,500+",
      growth: "+23%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Projects",
      value: "$2.4M",
      growth: "+18%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Success Rate",
      value: "94%",
      growth: "+5%",
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      title: "Countries",
      value: "65+",
      growth: "+12%",
      icon: Globe,
      color: "text-orange-600"
    }
  ];

  const qualityMetrics = [
    {
      title: "Average Response Time",
      value: "< 2 hours",
      description: "Freelancers respond to inquiries",
      icon: Clock
    },
    {
      title: "Client Satisfaction",
      value: "4.8/5.0",
      description: "Average project rating",
      icon: Star
    },
    {
      title: "Repeat Hire Rate",
      value: "73%",
      description: "Clients hiring same freelancer again",
      icon: Award
    }
  ];

  return (
    <div className="space-y-8">
      {/* Global Statistics */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Marketplace Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {globalStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.growth} this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quality Metrics */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Quality & Trust</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualityMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="text-center">
                <metric.icon className="h-12 w-12 mx-auto mb-3 text-primary" />
                <CardTitle className="text-2xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Trending This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { category: "Computer Vision", growth: 35, projects: 89 },
            { category: "LLM Fine-tuning", growth: 67, projects: 45 },
            { category: "MLOps", growth: 28, projects: 67 },
            { category: "Chatbot Development", growth: 42, projects: 123 },
            { category: "Data Analysis", growth: 19, projects: 234 },
            { category: "AI Research", growth: 55, projects: 34 }
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.projects} active projects
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+{item.growth}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceStats;