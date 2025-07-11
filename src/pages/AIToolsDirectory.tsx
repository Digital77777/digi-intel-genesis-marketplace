import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import React from "react";
import { Search, Filter, Star, Users, Zap, Brain, GraduationCap, Briefcase, Camera, Mic, Globe, Code, Shield, BookOpen, MessageSquare, Clock, Lock, Unlock, Play, Pause, Battery, Bot, Phone, FileText, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
const innovativeTools = [{
  id: "aks",
  name: "AI Knowledge Synthesizer",
  description: "Converts scattered data into interactive knowledge trees with mind maps, audio, and quizzes",
  longDescription: "Transform overwhelming internet content into personalized, teachable learning paths. Perfect for students, educators, and researchers.",
  icon: Brain,
  category: "Education",
  tier: "freemium",
  freemiumLimit: 10,
  rating: 4.9,
  users: "25k+",
  tags: ["Learning", "Research", "Visual"],
  features: ["Interactive Mind Maps", "Audio Summaries", "Quiz Generation", "Citation Tracking"],
  useCases: ["Academic Research", "Study Planning", "Knowledge Management"],
  pricing: {
    freemium: "10 syntheses/month",
    pro: "$29/month"
  }
}, {
  id: "acb",
  name: "AutoCurriculum Builder",
  description: "Automatically creates full curriculums with lesson plans, slides, and real-world projects",
  longDescription: "Design complete educational programs from a single topic idea. Includes slides, assignments, and market-aligned content.",
  icon: GraduationCap,
  category: "Education",
  tier: "freemium",
  freemiumLimit: 3,
  rating: 4.8,
  users: "15k+",
  tags: ["Curriculum", "Teaching", "Automation"],
  features: ["Lesson Plan Generation", "Slide Creation", "Assignment Builder", "Progress Tracking"],
  useCases: ["Course Creation", "Training Programs", "Workshop Design"],
  pricing: {
    freemium: "3 curricula/month",
    pro: "$49/month"
  }
}, {
  id: "opaia",
  name: "One-Person AI Agency",
  description: "Complete business toolkit: logo, website, ads, emails, and chatbot for solopreneurs",
  longDescription: "Everything a solo entrepreneur needs to build and run their business, powered by AI automation.",
  icon: Briefcase,
  category: "Business",
  tier: "freemium",
  freemiumLimit: 5,
  rating: 4.7,
  users: "32k+",
  tags: ["Business", "Automation", "Marketing"],
  features: ["Logo Design", "Website Builder", "Ad Creation", "Email Campaigns"],
  useCases: ["Startup Launch", "Freelancer Tools", "Small Business"],
  pricing: {
    freemium: "5 projects/month",
    pro: "$39/month"
  }
}, {
  id: "cde",
  name: "Content DNA Engine",
  description: "Transform one idea into 50+ content formats across all platforms with your unique style",
  longDescription: "Upload one piece of content and generate tweets, reels, blogs, newsletters, and more in your voice.",
  icon: Camera,
  category: "Content",
  tier: "freemium",
  freemiumLimit: 15,
  rating: 4.6,
  users: "41k+",
  tags: ["Content", "Social Media", "Automation"],
  features: ["Multi-Format Export", "Style Learning", "Platform Optimization", "SEO Integration"],
  useCases: ["Content Marketing", "Social Media", "Brand Building"],
  pricing: {
    freemium: "15 generations/month",
    pro: "$35/month"
  }
}, {
  id: "aaa",
  name: "AI Academic Ally",
  description: "Personalized study companion for students with ADHD, dyslexia, and learning differences",
  longDescription: "Adaptive learning that understands how you think and converts materials into your optimal format.",
  icon: BookOpen,
  category: "Education",
  tier: "freemium",
  freemiumLimit: 20,
  rating: 4.9,
  users: "18k+",
  tags: ["Accessibility", "Learning", "Neurodivergent"],
  features: ["Adaptive Formats", "Learning Analytics", "Progress Tracking", "Study Reminders"],
  useCases: ["Special Education", "Study Support", "Accessibility"],
  pricing: {
    freemium: "20 sessions/month",
    pro: "$25/month"
  }
}, {
  id: "lcta",
  name: "Live AI Co-Teaching Assistant",
  description: "Real-time classroom co-pilot that handles questions and engages students dynamically",
  longDescription: "AI assistant that understands student confusion and provides live support during classes.",
  icon: Users,
  category: "Education",
  tier: "freemium",
  freemiumLimit: 5,
  rating: 4.8,
  users: "12k+",
  tags: ["Teaching", "Live", "Interactive"],
  features: ["Real-time Q&A", "Pop Quiz Generation", "Engagement Analytics", "Multi-Language"],
  useCases: ["Live Teaching", "Online Classes", "Workshops"],
  pricing: {
    freemium: "5 sessions/month",
    pro: "$59/month"
  }
}, {
  id: "awbe",
  name: "AI World Builder for Educators",
  description: "Turn lessons into immersive 3D/VR/AR experiences without any coding required",
  longDescription: "Create engaging educational worlds that make learning feel like playing a game.",
  icon: Globe,
  category: "Education",
  tier: "freemium",
  freemiumLimit: 2,
  rating: 4.7,
  users: "8k+",
  tags: ["VR/AR", "Gamification", "Immersive"],
  features: ["3D World Creation", "VR/AR Support", "Game Mechanics", "Progress Tracking"],
  useCases: ["Immersive Learning", "Virtual Field Trips", "Skill Training"],
  pricing: {
    freemium: "2 worlds/month",
    pro: "$75/month"
  }
}, {
  id: "vts",
  name: "Voice-to-Startup",
  description: "Speak your startup idea and get a fully functional MVP with backend, frontend, and branding",
  longDescription: "Turn your spoken ideas into working software applications without any technical knowledge.",
  icon: Code,
  category: "Development",
  tier: "freemium",
  freemiumLimit: 1,
  rating: 4.5,
  users: "22k+",
  tags: ["No-Code", "Startup", "MVP"],
  features: ["Voice Recognition", "Full-Stack Generation", "Branding Package", "Deployment"],
  useCases: ["Startup MVPs", "Prototype Development", "Idea Validation"],
  pricing: {
    freemium: "1 MVP/month",
    pro: "$99/month"
  }
}, {
  id: "scc",
  name: "Smart Contract Co-Creator",
  description: "Generate and enforce contracts with AI + blockchain for automatic milestone tracking",
  longDescription: "Create legally sound smart contracts that automatically handle payments and deliverables.",
  icon: Shield,
  category: "Business",
  tier: "freemium",
  freemiumLimit: 3,
  rating: 4.6,
  users: "9k+",
  tags: ["Blockchain", "Legal", "Automation"],
  features: ["Smart Contracts", "Milestone Tracking", "Automatic Payments", "Legal Templates"],
  useCases: ["Freelance Contracts", "Project Management", "Payment Automation"],
  pricing: {
    freemium: "3 contracts/month",
    pro: "$45/month"
  }
}, {
  id: "eduplanet",
  name: "EduPlanet: Peer Learning Platform",
  description: "Learn something, then earn by teaching it back - democratizes education and income globally",
  longDescription: "A global learning economy where knowledge sharing becomes income generation.",
  icon: Globe,
  category: "Education",
  tier: "freemium",
  freemiumLimit: 10,
  rating: 4.8,
  users: "35k+",
  tags: ["Peer Learning", "Monetization", "Global"],
  features: ["Peer Teaching", "Coin System", "Content Rating", "Revenue Sharing"],
  useCases: ["Online Tutoring", "Skill Sharing", "Income Generation"],
  pricing: {
    freemium: "10 sessions/month",
    pro: "$19/month"
  }
}, {
  id: "r2t",
  name: "Reality2Text",
  description: "Wearable AI that documents real-world situations into structured reports and stories",
  longDescription: "Capture and transform real-life experiences into compelling narratives automatically.",
  icon: Mic,
  category: "Content",
  tier: "freemium",
  freemiumLimit: 25,
  rating: 4.4,
  users: "14k+",
  tags: ["Wearable", "Documentation", "Voice"],
  features: ["Real-time Transcription", "Story Generation", "Multi-format Output", "Privacy Controls"],
  useCases: ["Journalism", "Life Logging", "Content Creation"],
  pricing: {
    freemium: "25 recordings/month",
    pro: "$29/month"
  }
}, {
  id: "emobot",
  name: "EmoBot: Emotional Intelligence AI",
  description: "Real-time communication coaching with tone, empathy, and clarity feedback",
  longDescription: "Improve your communication skills with AI that understands emotional context and cultural nuances.",
  icon: MessageSquare,
  category: "Communication",
  tier: "freemium",
  freemiumLimit: 30,
  rating: 4.7,
  users: "28k+",
  tags: ["Communication", "Emotional Intelligence", "Coaching"],
  features: ["Tone Analysis", "Empathy Scoring", "Cultural Awareness", "Real-time Feedback"],
  useCases: ["Business Communication", "Leadership Training", "Therapy Support"],
  pricing: {
    freemium: "30 analyses/month",
    pro: "$35/month"
  }
}, {
  id: "aego",
  name: "AI Energy Grid Optimizer",
  description: "Predicts energy demand at hyper-local levels and manages distributed renewables to prevent outages",
  longDescription: "Dynamic energy management system that leverages real-time weather, consumption data, and grid constraints for optimal energy distribution.",
  icon: Battery,
  category: "Energy",
  tier: "freemium",
  freemiumLimit: 5,
  rating: 4.8,
  users: "7k+",
  tags: ["Energy", "Grid Management", "Sustainability"],
  features: ["Demand Prediction", "Renewable Integration", "Grid Optimization", "Cost Reduction"],
  useCases: ["Utility Companies", "Smart Cities", "Renewable Energy"],
  pricing: {
    freemium: "5 analyses/month",
    pro: "$149/month"
  }
}, {
  id: "mam",
  name: "Micro-Agent Manager",
  description: "Central platform to orchestrate multiple goal-specific AI agents across projects",
  longDescription: "Coordinate copywriter, analytics, and social scheduler agents in one unified system for maximum productivity.",
  icon: Bot,
  category: "Productivity",
  tier: "freemium",
  freemiumLimit: 8,
  rating: 4.6,
  users: "11k+",
  tags: ["AI Agents", "Automation", "Project Management"],
  features: ["Agent Coordination", "Task Assignment", "Progress Monitoring", "Goal Tracking"],
  useCases: ["Small Teams", "Content Creation", "Business Automation"],
  pricing: {
    freemium: "8 agent tasks/month",
    pro: "$69/month"
  }
}, {
  id: "aictsa",
  name: "AI Call Translator & Summary Agent",
  description: "Real-time multilingual transcription and translation with post-call intelligence",
  longDescription: "Live interpretation during calls plus automated summaries, action items, and sentiment analysis.",
  icon: Phone,
  category: "Communication",
  tier: "freemium",
  freemiumLimit: 12,
  rating: 4.9,
  users: "16k+",
  tags: ["Translation", "Transcription", "Meeting Intelligence"],
  features: ["Real-time Translation", "Call Summaries", "Action Items", "Sentiment Analysis"],
  useCases: ["Remote Teams", "International Business", "Education"],
  pricing: {
    freemium: "12 calls/month",
    pro: "$39/month"
  }
}, {
  id: "sdps",
  name: "Smart Document Processor Studio",
  description: "Automatically processes contracts, invoices, and forms with data extraction and audit trails",
  longDescription: "Advanced document intelligence that extracts data, highlights anomalies, and generates custom templates with full audit trails.",
  icon: FileText,
  category: "Business",
  tier: "freemium",
  freemiumLimit: 15,
  rating: 4.7,
  users: "9k+",
  tags: ["Document Processing", "Data Extraction", "Compliance"],
  features: ["Auto Data Extraction", "Anomaly Detection", "Template Generation", "Audit Trails"],
  useCases: ["Legal", "Finance", "HR", "Healthcare"],
  pricing: {
    freemium: "15 documents/month",
    pro: "$89/month"
  }
}, {
  id: "cropsense",
  name: "CropSense AR Advisor",
  description: "Mobile AR + AI tool for crop diagnosis and real-time farming recommendations",
  longDescription: "Scan crops with your camera for instant AI diagnosis of pests, nutrients, and water stress with AR overlay recommendations.",
  icon: Sprout,
  category: "Agriculture",
  tier: "freemium",
  freemiumLimit: 20,
  rating: 4.8,
  users: "5k+",
  tags: ["Agriculture", "AR", "Crop Management"],
  features: ["Crop Diagnosis", "AR Recommendations", "Pest Detection", "Nutrient Analysis"],
  useCases: ["Smallholder Farmers", "Agronomists", "Farm Cooperatives"],
  pricing: {
    freemium: "20 scans/month",
    pro: "$29/month"
  }
}];
const categories = ["All", "Education", "Business", "Content", "Development", "Communication", "Energy", "Productivity", "Agriculture"];
const usageData = {
  aks: {
    used: 7,
    limit: 10
  },
  acb: {
    used: 2,
    limit: 3
  },
  opaia: {
    used: 4,
    limit: 5
  },
  cde: {
    used: 12,
    limit: 15
  },
  aaa: {
    used: 18,
    limit: 20
  },
  lcta: {
    used: 3,
    limit: 5
  },
  awbe: {
    used: 1,
    limit: 2
  },
  vts: {
    used: 0,
    limit: 1
  },
  scc: {
    used: 2,
    limit: 3
  },
  eduplanet: {
    used: 8,
    limit: 10
  },
  r2t: {
    used: 20,
    limit: 25
  },
  emobot: {
    used: 25,
    limit: 30
  },
  aego: {
    used: 3,
    limit: 5
  },
  mam: {
    used: 6,
    limit: 8
  },
  aictsa: {
    used: 9,
    limit: 12
  },
  sdps: {
    used: 12,
    limit: 15
  },
  cropsense: {
    used: 15,
    limit: 20
  }
};
const AIToolsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTool, setSelectedTool] = useState(null);
  const {
    toast
  } = useToast();
  const filteredTools = innovativeTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase()) || tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleToolUse = toolId => {
    const usage = usageData[toolId];
    if (usage.used >= usage.limit) {
      toast({
        title: "Usage Limit Reached",
        description: "You've reached your freemium limit for this tool. Upgrade to Pro for unlimited access!",
        variant: "destructive"
      });
      return;
    }

    // Simulate tool usage
    toast({
      title: "Tool Launched!",
      description: `${innovativeTools.find(t => t.id === toolId)?.name} is starting up...`
    });
  };
  const getCategoryIcon = category => {
    switch (category) {
      case "Education":
        return GraduationCap;
      case "Business":
        return Briefcase;
      case "Content":
        return Camera;
      case "Development":
        return Code;
      case "Communication":
        return MessageSquare;
      case "Energy":
        return Battery;
      case "Productivity":
        return Bot;
      case "Agriculture":
        return Sprout;
      default:
        return Zap;
    }
  };
  const getUsageColor = (used, limit) => {
    const percentage = used / limit * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };
  return <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Revolutionary AI Tools Directory
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover groundbreaking AI tools that don't exist anywhere else. Start building the future today with our freemium access and usage limits.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Badge variant="secondary" className="text-sm">
                  <Zap className="h-3 w-3 mr-1" />
                  17 Revolutionary Tools
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Users className="h-3 w-3 mr-1" />
                  250k+ Active Users
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input placeholder="Search revolutionary AI tools..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-violet-600" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)} className="text-xs">
                    {category !== "All" && React.createElement(getCategoryIcon(category), {
                  className: "h-3 w-3 mr-1"
                })}
                    {category}
                  </Button>)}
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => {
              const IconComponent = tool.icon;
              const usage = usageData[tool.id];
              const usagePercentage = usage.used / usage.limit * 100;
              const isLimitReached = usage.used >= usage.limit;
              return <Card key={tool.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg leading-6">{tool.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">{tool.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed mt-2">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Usage Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Freemium Usage</span>
                          <span className={`text-xs font-medium ${getUsageColor(usage.used, usage.limit)}`}>
                            {usage.used}/{usage.limit}
                          </span>
                        </div>
                        <Progress value={usagePercentage} className="h-2" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>)}
                      </div>

                      {/* Users and Pricing */}
                      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{tool.users}</span>
                        </div>
                        <span>{tool.pricing.freemium}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button onClick={() => handleToolUse(tool.id)} disabled={isLimitReached} className="flex-1" size="sm">
                          {isLimitReached ? <>
                              <Lock className="h-3 w-3 mr-1" />
                              Upgrade to Use
                            </> : <>
                              <Play className="h-3 w-3 mr-1" />
                              Launch Tool
                            </>}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTool(tool)}>
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>;
            })}
            </div>

            {filteredTools.length === 0 && <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tools found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria to find the perfect AI tool.
                  </p>
                </div>
              </div>}
          </div>
        </section>

        {/* Usage Statistics */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Your Freemium Usage Overview</h2>
              <p className="text-muted-foreground">Track your monthly usage across all revolutionary AI tools</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(usageData).slice(0, 12).map(([toolId, usage]) => {
              const tool = innovativeTools.find(t => t.id === toolId);
              const percentage = usage.used / usage.limit * 100;
              return <Card key={toolId} className="text-center">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center mb-2">
                        {React.createElement(tool.icon, {
                      className: "h-4 w-4 text-primary"
                    })}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{tool.name}</h4>
                      <div className="text-xs text-muted-foreground mb-2">
                        {usage.used}/{usage.limit} used
                      </div>
                      <Progress value={percentage} className="h-1" />
                    </CardContent>
                  </Card>;
            })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default AIToolsDirectory;