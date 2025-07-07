
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap, Crown } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "react-router-dom";

const TierSpecificHero = () => {
  const { subscription, loading } = useSubscription();
  
  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const userTier = subscription?.planName?.toLowerCase() || "freemium";

  const tierContent = {
    freemium: {
      title: "Welcome to Your AI Journey",
      subtitle: "Essential AI Tools at Your Fingertips",
      description: "Start exploring the world of artificial intelligence with our curated directory, foundational learning resources, and vibrant community.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 via-white to-cyan-50",
      icon: <Sparkles className="h-4 w-4" />,
      badge: "Freemium Access",
      features: ["AI Tools Directory", "Basic Learning Hub", "Community Forum"],
      cta: "Explore AI Tools",
      ctaLink: "/ai-tools"
    },
    basic: {
      title: "Accelerate Your AI Development",
      subtitle: "Professional Tools for Growing Teams",
      description: "Unlock advanced collaboration features, marketplace access, and enhanced learning content to scale your AI projects.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 via-white to-pink-50",
      icon: <Users className="h-4 w-4" />,
      badge: "Basic Plan Active",
      features: ["Team Collaboration", "Marketplace Access", "Advanced Learning"],
      cta: "Manage Team",
      ctaLink: "/dashboard"
    },
    pro: {
      title: "Master the AI Universe",
      subtitle: "Enterprise-Grade AI Platform",
      description: "Access the complete suite of professional AI tools, unlimited deployments, and white-label solutions for enterprise success.",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      bgGradient: "from-yellow-50 via-orange-50 to-red-50",
      icon: <Crown className="h-4 w-4" />,
      badge: "Pro Plan Active",
      features: ["Unlimited Everything", "AI Studio", "Custom Solutions"],
      cta: "Launch AI Studio",
      ctaLink: "/ai-studio"
    }
  };

  const content = tierContent[userTier as keyof typeof tierContent] || tierContent.freemium;

  return (
    <section className="relative text-center py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${content.bgGradient} dark:from-gray-900 dark:via-background dark:to-purple-900/20`}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] -z-10"></div>
      
      {/* Floating elements with tier-specific colors */}
      <div className={`absolute top-20 left-10 w-20 h-20 bg-gradient-to-r ${content.gradient} rounded-full opacity-20 animate-pulse`}></div>
      <div className={`absolute top-40 right-20 w-16 h-16 bg-gradient-to-r ${content.gradient} rounded-full opacity-30 animate-bounce`}></div>
      <div className={`absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r ${content.gradient} rounded-full opacity-25 animate-pulse delay-1000`}></div>
      
      <div className="container mx-auto relative z-10">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${content.bgGradient} dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-800`}>
          {content.icon}
          <span>{content.badge}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
          {content.title}
          <br />
          <span className={`bg-gradient-to-r ${content.gradient} bg-clip-text text-transparent`}>
            {content.subtitle}
          </span>
        </h1>
        
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
          {content.description}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild className={`group bg-gradient-to-r ${content.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
            <Link to={content.ctaLink}>
              {content.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          {userTier === "freemium" && (
            <Button size="lg" variant="outline" asChild className="hover:bg-muted/50 transition-all duration-300">
              <Link to="/pricing">Upgrade Plan</Link>
            </Button>
          )}
        </div>

        {/* Tier-specific features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {content.features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${content.gradient} text-white mb-3`}>
                <Zap className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium text-foreground">{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TierSpecificHero;
