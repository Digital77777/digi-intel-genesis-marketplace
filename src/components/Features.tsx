
import { GraduationCap, Code, DollarSign, Zap, Users, Shield, Crown, Rocket, Globe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";

const allFeatures = [
  {
    icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
    title: "Learn",
    description: "Master AI with curated courses, expert tutorials, and hands-on projects designed for every skill level.",
    color: "from-blue-500 to-cyan-500",
    tier: "freemium",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-green-600" />,
    title: "Marketplace",
    description: "Buy and sell AI models, datasets, and tools. Access a vast library of AI solutions and monetize your creations.",
    color: "from-green-500 to-emerald-500",
    tier: "freemium",
  },
  {
    icon: <Rocket className="h-10 w-10 text-red-600" />,
    title: "AI Streams",
    description: "Join live AI development sessions, workshops, and discussions with experts and the community.",
    color: "from-red-500 to-pink-500",
    tier: "freemium",
  },
  {
    icon: <Code className="h-10 w-10 text-purple-600" />,
    title: "Build",
    description: "Create powerful AI solutions with our intuitive tools, pre-built models, and collaborative workspace.",
    color: "from-purple-500 to-pink-500",
    tier: "basic",
  },
  {
    icon: <Users className="h-10 w-10 text-indigo-600" />,
    title: "Collaborate",
    description: "Work with teams seamlessly using advanced collaboration tools and shared workspaces.",
    color: "from-indigo-500 to-purple-500",
    tier: "basic",
  },
  {
    icon: <Crown className="h-10 w-10 text-yellow-600" />,
    title: "Scale",
    description: "Enterprise-grade solutions with unlimited deployments, custom integrations, and dedicated support.",
    color: "from-yellow-500 to-orange-500",
    tier: "pro",
  },
  {
    icon: <Globe className="h-10 w-10 text-indigo-600" />,
    title: "Global Impact",
    description: "Connect with worldwide AI community and contribute to open-source projects with enterprise tools.",
    color: "from-indigo-500 to-purple-500",
    tier: "pro",
  },
];

const additionalFeatures = [
  {
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    title: "Lightning Fast",
    description: "Deploy AI models in seconds, not hours",
    tier: "freemium",
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: "Collaborative",
    description: "Work with global teams seamlessly",
    tier: "basic",
  },
  {
    icon: <Shield className="h-6 w-6 text-red-600" />,
    title: "Enterprise Ready",
    description: "Bank-grade security and compliance",
    tier: "pro",
  },
];

const Features = () => {
  const { subscription, loading } = useSubscription();
  
  const userTier = subscription?.planName?.toLowerCase() || "freemium";

  const getVisibleFeatures = () => {
    if (loading) return allFeatures.filter(f => f.tier === "freemium");
    
    if (userTier === "freemium") {
      return allFeatures.filter(f => f.tier === "freemium");
    } else if (userTier === "basic") {
      return allFeatures.filter(f => f.tier === "freemium" || f.tier === "basic");
    } else {
      return allFeatures; // Pro users see everything
    }
  };

  const getVisibleAdditionalFeatures = () => {
    if (loading) return additionalFeatures.filter(f => f.tier === "freemium");
    
    if (userTier === "freemium") {
      return additionalFeatures.filter(f => f.tier === "freemium");
    } else if (userTier === "basic") {
      return additionalFeatures.filter(f => f.tier === "freemium" || f.tier === "basic");
    } else {
      return additionalFeatures; // Pro users see everything
    }
  };

  const visibleFeatures = getVisibleFeatures();
  const visibleAdditionalFeatures = getVisibleAdditionalFeatures();

  const getTierTitle = () => {
    if (userTier === "freemium") return "Essential AI Features";
    if (userTier === "basic") return "Professional AI Toolkit";
    return "Complete AI Platform";
  };

  const getTierDescription = () => {
    if (userTier === "freemium") return "Everything you need to start your AI journey with confidence.";
    if (userTier === "basic") return "Advanced tools and collaboration features for growing AI teams.";
    return "The ultimate AI platform for enterprise innovation and scale.";
  };

  return (
    <section id="features" className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            {getTierTitle()}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Available Now</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {getTierDescription()}
          </p>
        </div>

        {/* Main Features */}
        <div className={`grid grid-cols-1 ${visibleFeatures.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : visibleFeatures.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'} gap-8 mb-16`}>
          {visibleFeatures.map((feature, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardHeader className="items-center text-center pb-4">
                <div className="mb-4 p-3 rounded-full bg-background shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        {visibleAdditionalFeatures.length > 0 && (
          <div className={`grid grid-cols-1 ${visibleAdditionalFeatures.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : visibleAdditionalFeatures.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'} gap-6 max-w-4xl mx-auto`}>
            {visibleAdditionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background/80 backdrop-blur-sm border hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{feature.title}</div>
                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
