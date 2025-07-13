import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import React from "react";
import { Star, Users, Zap, Brain, GraduationCap, Briefcase, Camera, Mic, Globe, Code, Shield, BookOpen, MessageSquare, Battery, Bot, Phone, FileText, Sprout, Sparkles, TrendingUp, Wand2, Eye, Terminal, BarChart3, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ToolCard from "@/components/ai-tools/ToolCard";
import ToolDetails from "@/components/ai-tools/ToolDetails";
import SearchAndFilter from "@/components/ai-tools/SearchAndFilter";
import StatsSection from "@/components/ai-tools/StatsSection";
import ToolInterface from "@/components/tools/ToolInterface";

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
}, {
  id: "text-generator",
  name: "AI Text Generator",
  description: "Create compelling content with AI assistance for blogs, articles, and marketing copy",
  longDescription: "Advanced text generation tool that helps you create high-quality content for any purpose with customizable tone and style.",
  icon: Wand2,
  category: "Content",
  tier: "freemium",
  freemiumLimit: 50,
  rating: 4.7,
  users: "45k+",
  tags: ["Writing", "Content Creation", "Marketing"],
  features: ["Multiple Formats", "Tone Customization", "SEO Optimization", "Plagiarism Check"],
  useCases: ["Blog Writing", "Marketing Copy", "Academic Writing"],
  pricing: {
    freemium: "50 generations/month",
    pro: "$19/month"
  }
}, {
  id: "image-analyzer",
  name: "AI Image Analyzer",
  description: "Upload and analyze images with AI-powered recognition and detailed insights",
  longDescription: "Comprehensive image analysis tool that provides object detection, text extraction, and detailed visual insights.",
  icon: Eye,
  category: "Content",
  tier: "freemium",
  freemiumLimit: 25,
  rating: 4.6,
  users: "38k+",
  tags: ["Image Processing", "Object Detection", "Analysis"],
  features: ["Object Recognition", "Text Extraction", "Color Analysis", "Metadata Extraction"],
  useCases: ["Content Moderation", "Accessibility", "Research"],
  pricing: {
    freemium: "25 analyses/month",
    pro: "$24/month"
  }
}, {
  id: "code-assistant",
  name: "AI Code Assistant",
  description: "Intelligent coding companion for code generation, debugging, and optimization",
  longDescription: "Advanced code assistant that helps developers write better code faster with intelligent suggestions and debugging.",
  icon: Terminal,
  category: "Development",
  tier: "freemium",
  freemiumLimit: 100,
  rating: 4.8,
  users: "52k+",
  tags: ["Programming", "Debugging", "Code Review"],
  features: ["Code Generation", "Bug Detection", "Performance Optimization", "Multi-Language Support"],
  useCases: ["Software Development", "Code Review", "Learning Programming"],
  pricing: {
    freemium: "100 requests/month",
    pro: "$39/month"
  }
}, {
  id: "data-analyzer",
  name: "AI Data Analyzer",
  description: "Transform raw data into actionable insights with automated analysis and visualization",
  longDescription: "Powerful data analysis tool that automatically processes datasets and generates comprehensive reports with visualizations.",
  icon: BarChart3,
  category: "Business",
  tier: "freemium",
  freemiumLimit: 10,
  rating: 4.5,
  users: "29k+",
  tags: ["Data Science", "Analytics", "Visualization"],
  features: ["Automated Analysis", "Interactive Charts", "Statistical Insights", "Export Options"],
  useCases: ["Business Intelligence", "Research", "Market Analysis"],
  pricing: {
    freemium: "10 datasets/month",
    pro: "$49/month"
  }
}, {
  id: "chatbot",
  name: "AI ChatBot Builder",
  description: "Create intelligent chatbots for customer service and engagement without coding",
  longDescription: "No-code chatbot builder that creates intelligent conversational agents for websites and applications.",
  icon: Bot,
  category: "Communication",
  tier: "freemium",
  freemiumLimit: 3,
  rating: 4.6,
  users: "33k+",
  tags: ["Chatbots", "Customer Service", "No-Code"],
  features: ["Visual Builder", "Natural Language Processing", "Integration Ready", "Analytics Dashboard"],
  useCases: ["Customer Support", "Lead Generation", "FAQ Automation"],
  pricing: {
    freemium: "3 bots/month",
    pro: "$29/month"
  }
}, {
  id: "translation-tool",
  name: "AI Translation Tool",
  description: "Translate text between multiple languages with AI precision and cultural context",
  longDescription: "Advanced translation service that provides accurate translations with cultural nuances and context awareness.",
  icon: Languages,
  category: "Communication",
  tier: "freemium",
  freemiumLimit: 1000,
  rating: 4.7,
  users: "67k+",
  tags: ["Translation", "Multilingual", "Localization"],
  features: ["100+ Languages", "Cultural Context", "Bulk Translation", "API Access"],
  useCases: ["International Business", "Content Localization", "Travel"],
  pricing: {
    freemium: "1000 words/month",
    pro: "$19/month"
  }
}];

const categories = ["All", "Education", "Business", "Content", "Development", "Communication", "Energy", "Productivity", "Agriculture"];

const usageData = {
  aks: { used: 7, limit: 10 },
  acb: { used: 2, limit: 3 },
  opaia: { used: 4, limit: 5 },
  cde: { used: 12, limit: 15 },
  aaa: { used: 18, limit: 20 },
  lcta: { used: 3, limit: 5 },
  awbe: { used: 1, limit: 2 },
  vts: { used: 0, limit: 1 },
  scc: { used: 2, limit: 3 },
  eduplanet: { used: 8, limit: 10 },
  r2t: { used: 20, limit: 25 },
  emobot: { used: 25, limit: 30 },
  aego: { used: 3, limit: 5 },
  mam: { used: 6, limit: 8 },
  aictsa: { used: 9, limit: 12 },
  sdps: { used: 12, limit: 15 },
  cropsense: { used: 15, limit: 20 },
  "text-generator": { used: 35, limit: 50 },
  "image-analyzer": { used: 18, limit: 25 },
  "code-assistant": { used: 78, limit: 100 },
  "data-analyzer": { used: 7, limit: 10 },
  chatbot: { used: 2, limit: 3 },
  "translation-tool": { used: 750, limit: 1000 }
};

const AIToolsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const { toast } = useToast();

  let filteredTools = innovativeTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered tools
  filteredTools = filteredTools.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0; // Could add actual date sorting here
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popular':
      default:
        return parseInt(b.users.replace(/\D/g, '')) - parseInt(a.users.replace(/\D/g, ''));
    }
  });

  const totalUsage = Object.values(usageData).reduce((sum, usage) => sum + usage.used, 0);
  const totalLimit = Object.values(usageData).reduce((sum, usage) => sum + usage.limit, 0);

  const handleToolUse = (toolId: string) => {
    const usage = usageData[toolId as keyof typeof usageData];
    if (usage && usage.used >= usage.limit) {
      toast({
        title: "Usage Limit Reached",
        description: "You've reached your freemium limit for this tool. Upgrade to Pro for unlimited access!",
        variant: "destructive"
      });
      return;
    }

    // Open the tool interface
    setActiveToolId(toolId);
  };

  const handleViewDetails = (tool: any) => {
    setSelectedTool(tool);
    setDetailsOpen(true);
  };

  const handleBackToDirectory = () => {
    setActiveToolId(null);
  };

  // If a tool is active, show its interface
  if (activeToolId) {
    return <ToolInterface toolId={activeToolId} onBack={handleBackToDirectory} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-accent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
          <div className="relative container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Revolutionary AI Tools Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                AI Tools Directory
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80 leading-relaxed mb-8">
                Discover groundbreaking AI tools that transform how you work. Access cutting-edge solutions with our freemium model and upgrade as you grow.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Badge variant="outline" className="bg-background/50 text-foreground border-border/50 backdrop-blur-sm">
                  <Zap className="h-4 w-4 mr-2 text-primary" />
                  {innovativeTools.length} Revolutionary Tools
                </Badge>
                <Badge variant="outline" className="bg-background/50 text-foreground border-border/50 backdrop-blur-sm">
                  <Users className="h-4 w-4 mr-2 text-secondary" />
                  250k+ Active Users
                </Badge>
                <Badge variant="outline" className="bg-background/50 text-foreground border-border/50 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 mr-2 text-success" />
                  99.9% Uptime
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <StatsSection 
                  totalTools={innovativeTools.length}
                  activeUsers="250k+"
                  totalUsage={totalUsage}
                  monthlyLimit={totalLimit}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search and Filters */}
                <SearchAndFilter
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  categories={categories}
                  filterCount={filteredTools.length}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                {/* Tools Grid */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedCategory === "All" ? "All Tools" : selectedCategory} 
                        <span className="text-muted-foreground ml-2">({filteredTools.length})</span>
                      </h2>
                      <p className="text-muted-foreground">
                        {searchQuery ? `Results for "${searchQuery}"` : "Discover powerful AI tools for every need"}
                      </p>
                    </div>
                  </div>

                  {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredTools.map(tool => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          usage={usageData[tool.id as keyof typeof usageData]}
                          onUse={handleToolUse}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="p-4 rounded-full bg-muted/30 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">No tools found</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Try adjusting your search terms or browse different categories to discover amazing AI tools.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {categories.slice(1, 4).map((category) => (
                          <Badge
                            key={category}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary/10"
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Details Modal */}
        <ToolDetails
          tool={selectedTool}
          isOpen={detailsOpen}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedTool(null);
          }}
          onUse={handleToolUse}
        />
      </main>
      <Footer />
    </div>
  );
};

export default AIToolsDirectory;
