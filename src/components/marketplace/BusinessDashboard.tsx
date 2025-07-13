import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Users,
  DollarSign,
  Star,
  MessageSquare,
  Briefcase,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Eye,
  Brain
} from "lucide-react";

const BusinessDashboard = () => {
  const [activeProjects, setActiveProjects] = useState(5);
  const [totalSpent, setTotalSpent] = useState(28750);
  const [completedProjects, setCompletedProjects] = useState(12);
  const [averageRating, setAverageRating] = useState(4.7);

  const stats = [
    { label: "Active Projects", value: activeProjects, icon: Clock, color: "text-blue-600" },
    { label: "Total Investment", value: `$${totalSpent.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
    { label: "Completed Projects", value: completedProjects, icon: CheckCircle, color: "text-purple-600" },
    { label: "Avg. Rating Given", value: averageRating, icon: Star, color: "text-yellow-600" }
  ];

  const recentProjects = [
    {
      id: 1,
      title: "E-commerce Recommendation Engine",
      freelancer: "Sarah Chen",
      status: "in_progress",
      progress: 75,
      budget: 8500,
      deadline: "Dec 20, 2024",
      lastUpdate: "1 hour ago",
      freelancerRating: 4.9,
      category: "Machine Learning"
    },
    {
      id: 2,
      title: "Customer Support Chatbot",
      freelancer: "Marcus Rodriguez",
      status: "review",
      progress: 95,
      budget: 4200,
      deadline: "Dec 12, 2024",
      lastUpdate: "6 hours ago",
      freelancerRating: 4.8,
      category: "NLP"
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      freelancer: "Aisha Patel",
      status: "completed",
      progress: 100,
      budget: 6100,
      deadline: "Completed",
      lastUpdate: "2 days ago",
      freelancerRating: 5.0,
      category: "Data Science"
    }
  ];

  const recommendedTalent = [
    {
      id: 1,
      name: "Dr. Emily Watson",
      title: "AI Research Scientist",
      rating: 4.9,
      projects: 89,
      hourlyRate: 150,
      skills: ["Deep Learning", "Research", "Publications"],
      badge: "Gold",
      matchScore: 98,
      available: true
    },
    {
      id: 2,
      name: "Roberto Silva",
      title: "Computer Vision Expert",
      rating: 4.8,
      projects: 67,
      hourlyRate: 120,
      skills: ["Computer Vision", "Object Detection", "Medical AI"],
      badge: "Silver",
      matchScore: 94,
      available: true
    },
    {
      id: 3,
      name: "Lisa Zhang",
      title: "MLOps Specialist",
      rating: 4.9,
      projects: 156,
      hourlyRate: 130,
      skills: ["MLOps", "AWS", "Production ML"],
      badge: "Gold",
      matchScore: 91,
      available: false
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

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Gold": return "default";
      case "Silver": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Business Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your AI projects and discover top talent
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Find Talent
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post Project
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
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="talent">Find Talent</TabsTrigger>
          <TabsTrigger value="post-job">Post Job</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>Freelancer: {project.freelancer}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{project.freelancerRating}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{project.category}</Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>
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
                        <span>Last update: {project.lastUpdate}</span>
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

        <TabsContent value="talent" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold">Recommended Talent</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by skills..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {recommendedTalent.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{person.name}</CardTitle>
                          <Badge variant={getBadgeVariant(person.badge)}>
                            <Award className="h-3 w-3 mr-1" />
                            {person.badge}
                          </Badge>
                          {!person.available && (
                            <Badge variant="outline" className="text-red-600">
                              Busy
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{person.title}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{person.rating}</span>
                            <span>({person.projects} projects)</span>
                          </div>
                          <span>${person.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {person.matchScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Match Score
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {person.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{person.projects} completed projects</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={!person.available}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button size="sm" disabled={!person.available}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {person.available ? "Contact" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="post-job" className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">Post a New Project</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Provide clear project requirements to attract the best talent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Title</label>
                  <Input placeholder="e.g. Build a computer vision system for quality control" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>Select a category</option>
                    <option>Machine Learning</option>
                    <option>Computer Vision</option>
                    <option>Natural Language Processing</option>
                    <option>Data Science</option>
                    <option>MLOps</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Description</label>
                  <Textarea 
                    placeholder="Describe your project requirements, expected deliverables, and any specific technologies you'd like to use..."
                    className="min-h-32"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget Range</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>Select budget range</option>
                      <option>$500 - $1,000</option>
                      <option>$1,000 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timeline</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>Select timeline</option>
                      <option>Less than 1 month</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6+ months</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Required Skills</label>
                  <Input placeholder="e.g. Python, TensorFlow, Computer Vision (separate with commas)" />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button className="flex-1">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Project Analytics</h2>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  ${totalSpent.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>ROI: 340%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">92%</div>
                <div className="text-sm text-muted-foreground">
                  Projects completed on time
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avg. Project Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">6.2 weeks</div>
                <div className="text-sm text-muted-foreground">
                  15% faster than industry avg.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;