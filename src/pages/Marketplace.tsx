import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Briefcase, Code, Wrench, TrendingUp, Users, Star, Shield, Award, Zap, Globe, Brain } from "lucide-react";
import MarketplaceServices from "@/components/marketplace/MarketplaceServices";
import MarketplaceTools from "@/components/marketplace/MarketplaceTools";
import MarketplaceJobs from "@/components/marketplace/MarketplaceJobs";
import FreelancerDashboard from "@/components/marketplace/FreelancerDashboard";
import BusinessDashboard from "@/components/marketplace/BusinessDashboard";
import MarketplaceStats from "@/components/marketplace/MarketplaceStats";
const marketplaceStats = [{
  icon: Users,
  label: "Active Freelancers",
  value: "12,500+",
  color: "text-blue-600"
}, {
  icon: Briefcase,
  label: "Projects Completed",
  value: "8,900+",
  color: "text-green-600"
}, {
  icon: Code,
  label: "AI Tools Available",
  value: "450+",
  color: "text-purple-600"
}, {
  icon: TrendingUp,
  label: "Success Rate",
  value: "94%",
  color: "text-orange-600"
}];
const categories = [{
  id: "services",
  name: "Services",
  icon: Briefcase,
  description: "Custom AI solutions, consulting, and development",
  count: "2.1k"
}, {
  id: "tools",
  name: "Tools",
  icon: Wrench,
  description: "Pre-built models, APIs, and templates",
  count: "450"
}, {
  id: "jobs",
  name: "Jobs",
  icon: Code,
  description: "Freelance projects and long-term contracts",
  count: "180"
}];
const featuredFreelancers = [{
  id: 1,
  name: "Sarah Chen",
  title: "ML Engineer",
  rating: 4.9,
  projects: 127,
  badge: "Gold",
  skills: ["Computer Vision", "TensorFlow", "PyTorch"],
  avatar: "/placeholder.svg"
}, {
  id: 2,
  name: "Marcus Rodriguez",
  title: "NLP Specialist",
  rating: 4.8,
  projects: 89,
  badge: "Silver",
  skills: ["BERT", "GPT", "Transformers"],
  avatar: "/placeholder.svg"
}, {
  id: 3,
  name: "Aisha Patel",
  title: "AI Consultant",
  rating: 5.0,
  projects: 234,
  badge: "Gold",
  skills: ["Strategy", "MLOps", "Cloud AI"],
  avatar: "/placeholder.svg"
}];
const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);
  return <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 bg-zinc-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl text-blue-700">
                Digital Intelligence Marketplace
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-8 text-indigo-100">
                Connect with AI talent, discover cutting-edge tools, and build the future of artificial intelligence together.
              </p>
              
              {!userType && <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button size="lg" onClick={() => setUserType("buyer")} className="min-w-48">
                    <Briefcase className="h-5 w-5 mr-2" />
                    I'm Looking to Hire
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setUserType("seller")} className="min-w-48">
                    <Code className="h-5 w-5 mr-2" />
                    I'm Offering Services
                  </Button>
                </div>}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {marketplaceStats.map((stat, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Main Marketplace Content */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto">
            {userType === "buyer" ? <BusinessDashboard /> : userType === "seller" ? <FreelancerDashboard /> : <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                  <TabsList className="grid w-full lg:w-auto grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search marketplace..." className="pl-10 w-full sm:w-80" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <TabsContent value="overview" className="space-y-8">
                  {/* Categories */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {categories.map(category => <Card key={category.id} className="hover:shadow-lg transition-all cursor-pointer hover:scale-105" onClick={() => setActiveTab(category.id)}>
                          <CardHeader className="text-center">
                            <category.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                            <CardTitle className="flex items-center justify-between">
                              {category.name}
                              <Badge variant="secondary">{category.count}</Badge>
                            </CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </CardHeader>
                        </Card>)}
                    </div>
                  </div>

                  {/* Featured Freelancers */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Top Rated Freelancers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {featuredFreelancers.map(freelancer => <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <Brain className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{freelancer.name}</h3>
                                  <Badge variant={freelancer.badge === "Gold" ? "default" : "secondary"}>
                                    {freelancer.badge === "Gold" ? <Award className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
                                    {freelancer.badge}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{freelancer.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {freelancer.projects} projects
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {freelancer.skills.slice(0, 3).map((skill, idx) => <Badge key={idx} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>)}
                            </div>
                            <Button className="w-full" size="sm">
                              View Profile
                            </Button>
                          </CardContent>
                        </Card>)}
                    </div>
                  </div>

                  {/* Trust Features */}
                  <div className="rounded-lg p-8 bg-slate-950">
                    <h2 className="text-2xl font-bold mb-6 text-center">Why Choose DIM Marketplace?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                        <h3 className="font-semibold mb-2">Verified Talent</h3>
                        <p className="text-sm text-muted-foreground">
                          All freelancers undergo AI skills assessment and background verification
                        </p>
                      </div>
                      <div className="text-center">
                        <Zap className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                        <h3 className="font-semibold mb-2">Smart Escrow</h3>
                        <p className="text-sm text-muted-foreground">
                          Blockchain-based milestone payments with full transaction transparency
                        </p>
                      </div>
                      <div className="text-center">
                        <Globe className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                        <h3 className="font-semibold mb-2">Global Network</h3>
                        <p className="text-sm text-muted-foreground">
                          Access AI talent worldwide with local currency and language support
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services">
                  <MarketplaceServices searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="tools">
                  <MarketplaceTools searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="jobs">
                  <MarketplaceJobs searchQuery={searchQuery} />
                </TabsContent>
              </Tabs>}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Marketplace;