import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Star,
  DollarSign,
  Eye,
  MessageSquare,
  Award,
  Target,
  Zap,
  Calendar,
  BarChart3
} from "lucide-react";

const FreelancerDashboard = () => {
  const [activeProjects, setActiveProjects] = useState(3);
  const [totalEarnings, setTotalEarnings] = useState(12450);
  const [completedProjects, setCompletedProjects] = useState(27);
  const [rating, setRating] = useState(4.8);

  const stats = [
    { label: "Active Projects", value: activeProjects, icon: Clock, color: "text-blue-600" },
    { label: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
    { label: "Completed Projects", value: completedProjects, icon: CheckCircle, color: "text-purple-600" },
    { label: "Rating", value: rating, icon: Star, color: "text-yellow-600" }
  ];

  const recentProjects = [
    {
      id: 1,
      title: "Computer Vision for Retail Analytics",
      client: "RetailTech Solutions",
      status: "in_progress",
      progress: 65,
      budget: 3500,
      deadline: "Dec 15, 2024",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      title: "NLP Sentiment Analysis API",
      client: "StartupHub Inc",
      status: "review",
      progress: 90,
      budget: 2800,
      deadline: "Dec 10, 2024",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      title: "MLOps Pipeline Setup",
      client: "DataFlow Corp",
      status: "completed",
      progress: 100,
      budget: 4200,
      deadline: "Completed",
      lastActivity: "3 days ago"
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: "AI Chatbot for Customer Service",
      budget: "$2,500 - $4,000",
      skills: ["NLP", "Chatbots", "Python"],
      urgency: "high",
      applicants: 8,
      posted: "2 hours ago"
    },
    {
      id: 2,
      title: "Image Classification Model",
      budget: "$1,800 - $2,500",
      skills: ["Computer Vision", "TensorFlow", "Python"],
      urgency: "medium",
      applicants: 12,
      posted: "1 day ago"
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      budget: "$3,000 - $5,000",
      skills: ["Data Science", "Visualization", "Python"],
      urgency: "low",
      applicants: 15,
      posted: "2 days ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress": return "In Progress";
      case "review": return "Under Review";
      case "completed": return "Completed";
      default: return status;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600";
      case "medium": return "text-orange-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects, track earnings, and discover new opportunities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Service
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>Client: {project.client}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{project.deadline}</span>
                        </div>
                        <span>Last activity: {project.lastActivity}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recommended Opportunities</h2>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Browse All Jobs
            </Button>
          </div>
          
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>{opportunity.budget}</span>
                        <span className={getUrgencyColor(opportunity.urgency)}>
                          {opportunity.urgency === "high" && <Zap className="h-3 w-3 inline mr-1" />}
                          {opportunity.urgency.toUpperCase()} PRIORITY
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {opportunity.applicants} applicants
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Posted {opportunity.posted}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Earnings Overview</h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Detailed Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">$4,250</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+23% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 mb-2">$2,100</div>
                <div className="text-sm text-muted-foreground">
                  2 projects awaiting completion
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">$1,850</div>
                <Button size="sm" className="mt-2">
                  Withdraw
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profile Management</h2>
            <Button variant="outline" size="sm">
              <Award className="h-4 w-4 mr-2" />
              Verify Skills
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to attract more clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Strength</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Portfolio uploaded</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Skills verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>Add video introduction</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your marketplace performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">&lt; 1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivery Rate</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Client Satisfaction</span>
                    <span className="text-sm font-medium">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Repeat Clients</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FreelancerDashboard;