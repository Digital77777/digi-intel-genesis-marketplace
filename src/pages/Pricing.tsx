import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Check, Star, Zap, Crown, Shield, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const monthlyTiers = [
  {
    name: "Freemium",
    price: "$0",
    period: "/ month",
    description: "Perfect for exploring and learning",
    features: [
      "AI Tools Directory access",
      "Learning Hub with basic courses", 
      "Community Forum access",
      "Basic AI model templates",
      "5 model deployments/month",
      "Community support"
    ],
    isFeatured: false,
    badge: null,
    originalPrice: undefined,
    icon: Shield,
    theme: "from-gray-100 to-gray-200",
    accentColor: "text-gray-600",
    buttonColor: "bg-gray-600 hover:bg-gray-700"
  },
  {
    name: "Basic", 
    price: "$21",
    period: "/ month",
    description: "For builders ready to monetize",
    features: [
      "AI Tools Directory access",
      "Learning Hub with basic courses", 
      "Community Forum access",
      "Basic AI model templates",
      "5 model deployments/month",
      "Community support",
      "Advanced learning content", 
      "Collaboration tools",
      "Custom model training",
      "50 model deployments/month",
      "Marketplace selling privileges",
      "Priority support",
      "Revenue analytics",
      "Team workspace (5 members)"
    ],
    isFeatured: true,
    badge: "Most Popular",
    originalPrice: undefined,
    icon: Rocket,
    theme: "from-blue-100 to-purple-100",
    accentColor: "text-blue-600",
    buttonColor: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
  },
  {
    name: "Pro",
    price: "$46",
    period: "/ month",
    description: "For teams scaling AI solutions",
    features: [
      "AI Tools Directory access",
      "Learning Hub with basic courses", 
      "Community Forum access",
      "Basic AI model templates",
      "5 model deployments/month",
      "Community support",
      "Advanced learning content", 
      "Collaboration tools",
      "Custom model training",
      "50 model deployments/month",
      "Marketplace selling privileges",
      "Priority support",
      "Revenue analytics",
      "Team workspace (5 members)",
      "Unlimited deployments",
      "Advanced AI Studio",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees",
      "Custom compliance tools",
      "Advanced analytics",
      "Unlimited team members",
      "White-label options"
    ],
    isFeatured: false,
    badge: "Best Value",
    originalPrice: undefined,
    icon: Crown,
    theme: "from-gold-100 to-yellow-100",
    accentColor: "text-yellow-600",
    buttonColor: "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
  },
];

const yearlyTiers = [
  {
    name: "Freemium",
    price: "$0",
    period: "/ year",
    description: "Perfect for exploring and learning",
    features: [
      "AI Tools Directory access",
      "Learning Hub with basic courses", 
      "Community Forum access",
      "Basic AI model templates",
      "5 model deployments/month",
      "Community support"
    ],
    isFeatured: false,
    badge: null,
    originalPrice: undefined,
    icon: Shield,
    theme: "from-gray-100 to-gray-200",
    accentColor: "text-gray-600",
    buttonColor: "bg-gray-600 hover:bg-gray-700"
  },
  {
    name: "Basic",
    price: "$210",
    period: "/ year",
    originalPrice: "$252",
    description: "For builders ready to monetize",
    features: [
      "AI Tools Directory access",
      "Learning Hub with basic courses", 
      "Community Forum access",
      "Basic AI model templates",
      "5 model deployments/month",
      "Community support",
      "Advanced learning content", 
      "Collaboration tools",
      "Custom model training",
      "50 model deployments/month",
      "Marketplace selling privileges",
      "Priority support",
      "Revenue analytics",
      "Team workspace (5 members)"
    ],
    isFeatured: true,
    badge: "Save 17%",
    icon: Rocket,
    theme: "from-blue-100 to-purple-100",
    accentColor: "text-blue-600",
    buttonColor: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
  },
  {
    name: "Pro",
    price: "$460",
    period: "/ year",
    originalPrice: "$552",
    description: "For teams scaling AI solutions",
    features: [
      "AI Tools Directory access",
      "Learning Hub with basic courses", 
      "Community Forum access",
      "Basic AI model templates",
      "5 model deployments/month",
      "Community support",
      "Advanced learning content", 
      "Collaboration tools",
      "Custom model training",
      "50 model deployments/month",
      "Marketplace selling privileges",
      "Priority support",
      "Revenue analytics",
      "Team workspace (5 members)",
      "Unlimited deployments",
      "Advanced AI Studio",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees",
      "Custom compliance tools",
      "Advanced analytics",
      "Unlimited team members",
      "White-label options"
    ],
    isFeatured: false,
    badge: "Save 17%",
    icon: Crown,
    theme: "from-gold-100 to-yellow-100",
    accentColor: "text-yellow-600",
    buttonColor: "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
  },
];

const tierContent = {
  Freemium: {
    title: "Start Your AI Journey",
    subtitle: "Explore and learn with our free tier",
    description: "Perfect for beginners who want to understand AI capabilities without any commitment.",
    features: ["Basic AI tools", "Community support", "Learning resources"],
    cta: "Get Started Free"
  },
  Basic: {
    title: "Scale Your AI Business",
    subtitle: "Everything you need to monetize AI",
    description: "Built for creators and small teams ready to build and sell AI solutions.",
    features: ["Advanced tools", "Priority support", "Revenue tracking"],
    cta: "Start Building"
  },
  Pro: {
    title: "Enterprise AI Solutions",
    subtitle: "Advanced tools for scaling teams",
    description: "Comprehensive AI platform for enterprises with dedicated support and custom solutions.",
    features: ["Unlimited deployments", "Dedicated manager", "Custom integrations"],
    cta: "Go Enterprise"
  }
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedTier, setSelectedTier] = useState("Basic");
  const { subscription, loading, createCheckout, changeTierFree } = useSubscription();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const currentTiers = billingPeriod === "monthly" ? monthlyTiers : yearlyTiers;
  const selectedTierData = currentTiers.find(tier => tier.name === selectedTier);
  const selectedContent = tierContent[selectedTier];
  const SelectedIcon = selectedTierData?.icon || Rocket;

  // Check for success/cancel URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const plan = urlParams.get('plan');

    if (success === 'true') {
      toast({
        title: "Subscription Successful!",
        description: `Welcome to the ${plan} plan!`,
      });
      // Clean up URL
      window.history.replaceState({}, '', '/pricing');
    } else if (canceled === 'true') {
      toast({
        title: "Subscription Canceled",
        description: "Your subscription was canceled. You can try again anytime.",
        variant: "destructive",
      });
      // Clean up URL
      window.history.replaceState({}, '', '/pricing');
    }
  }, [toast]);

  // Update selected tier based on current subscription
  useEffect(() => {
    if (subscription && !loading) {
      setSelectedTier(subscription.planName);
    }
  }, [subscription, loading]);

  const handleSubscribe = async (tierName: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    // Check if user is already on this plan
    if (subscription?.planName === tierName && subscription?.status === 'active') {
      toast({
        title: "Already Subscribed",
        description: `You're already on the ${tierName} plan`,
      });
      return;
    }

    // For now, all tier changes are free
    await changeTierFree(tierName);
  };

  const getButtonText = (tierName: string) => {
    if (loading) return "Loading...";
    
    if (!user) return "Sign In to Subscribe";
    
    if (subscription?.planName === tierName) {
      if (subscription.status === 'active') {
        return "Current Plan";
      } else {
        return "Reactivate Plan";
      }
    }
    
    return `Switch to ${tierName}`;
  };

  const isCurrentPlan = (tierName: string) => {
    return subscription?.planName === tierName && subscription?.status === 'active';
  };

  // Dynamic theme based on selected tier
  const getPageTheme = () => {
    if (selectedTier === "Freemium") return "bg-gradient-to-br from-gray-50 to-gray-100";
    if (selectedTier === "Basic") return "bg-gradient-to-br from-blue-50 to-purple-50";
    if (selectedTier === "Pro") return "bg-gradient-to-br from-yellow-50 to-orange-50";
    return "bg-gradient-to-b from-muted/30 to-background";
  };

  const getHeaderTheme = () => {
    if (selectedTier === "Freemium") return selectedTierData?.accentColor || "text-gray-600";
    if (selectedTier === "Basic") return selectedTierData?.accentColor || "text-blue-600";
    if (selectedTier === "Pro") return selectedTierData?.accentColor || "text-yellow-600";
    return "bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent";
  };

  return (
    <div className={cn("flex flex-col min-h-screen transition-all duration-500", getPageTheme())}>
      <Header />
      <main className="flex-grow">
        <section className="py-20 sm:py-32">
          <div className="container mx-auto text-center">
            {/* Dynamic Header Section */}
            <div className="max-w-4xl mx-auto mb-12 transform transition-all duration-500">
              <div className="flex items-center justify-center gap-4 mb-6">
                <SelectedIcon className={cn("h-12 w-12 transition-colors duration-300", getHeaderTheme())} />
                <h1 className="text-4xl sm:text-6xl font-bold">
                  {selectedContent.title}
                </h1>
              </div>
              <h2 className={cn("text-2xl sm:text-3xl font-semibold mb-4 transition-colors duration-300", getHeaderTheme())}>
                {selectedContent.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {selectedContent.description}
              </p>
              
              {/* Current Subscription Status */}
              {subscription && !loading && (
                <div className="mb-6 p-4 bg-background/80 rounded-lg border">
                  <p className="text-sm text-muted-foreground">
                    Current Plan: <span className="font-semibold text-foreground">{subscription.planName}</span>
                    {subscription.status !== 'active' && (
                      <span className="ml-2 text-orange-600">({subscription.status})</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All plans are currently free to use. Switch anytime!
                  </p>
                </div>
              )}
            </div>

            {/* Tier Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              {currentTiers.map((tier) => {
                const TierIcon = tier.icon;
                const isCurrent = isCurrentPlan(tier.name);
                
                return (
                  <Card
                    key={tier.name}
                    className={cn(
                      "relative flex flex-col cursor-pointer transition-all duration-500 hover:shadow-xl",
                      selectedTier === tier.name && "border-primary ring-2 ring-primary shadow-xl shadow-primary/20 transform scale-105",
                      isCurrent && "border-green-500 ring-2 ring-green-500 shadow-xl shadow-green-500/20",
                      tier.isFeatured && "border-primary/50",
                      selectedTier === tier.name && `bg-gradient-to-br ${tier.theme}`
                    )}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    {(tier.badge || isCurrent) && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className={cn(
                          "text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all duration-300",
                          isCurrent ? "bg-green-600" : selectedTier === tier.name ? tier.buttonColor : "bg-gradient-to-r from-primary to-purple-600"
                        )}>
                          {isCurrent ? (
                            <>
                              <Check className="h-3 w-3" />
                              Current Plan
                            </>
                          ) : (
                            <>
                              {tier.badge === "Most Popular" && <Star className="h-3 w-3" />}
                              {tier.badge === "Best Value" && <Zap className="h-3 w-3" />}
                              {tier.badge}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <TierIcon className={cn(
                          "h-6 w-6 transition-colors duration-300",
                          selectedTier === tier.name ? tier.accentColor : "text-muted-foreground"
                        )} />
                        <CardTitle className={cn(
                          "text-xl transition-colors duration-300",
                          selectedTier === tier.name ? tier.accentColor : "text-foreground"
                        )}>
                          {tier.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm">{tier.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow text-center">
                      <div className="mb-6">
                        <span className={cn(
                          "text-4xl font-bold tracking-tight transition-colors duration-300",
                          "text-green-600"
                        )}>
                          FREE
                        </span>
                        <div className="text-xs text-muted-foreground mt-1">
                          All plans currently free
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tier.features.length} features included
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={cn(
                          "w-full transition-all duration-500",
                          isCurrent ? "bg-green-600 hover:bg-green-700" : selectedTier === tier.name ? tier.buttonColor : ""
                        )}
                        variant={selectedTier === tier.name || isCurrent ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubscribe(tier.name);
                        }}
                        disabled={loading || isCurrent}
                      >
                        {getButtonText(tier.name)}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Selected Tier Features Display */}
            <div className="max-w-4xl mx-auto">
              <Card className={cn(
                "border-primary/20 backdrop-blur-sm transition-all duration-500",
                `bg-gradient-to-br ${selectedTierData?.theme}`
              )}>
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <SelectedIcon className={cn("h-8 w-8 transition-colors duration-300", selectedTierData?.accentColor)} />
                    <CardTitle className={cn("text-3xl transition-colors duration-300", selectedTierData?.accentColor)}>
                      {selectedTierData?.name} Plan Features
                    </CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Everything included in your {selectedTierData?.name} plan
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-8">
                  <div className="text-center mb-8 p-6 bg-background/80 rounded-lg">
                    <span className="text-4xl font-bold text-green-600">
                      FREE
                    </span>
                    <div className="text-sm text-muted-foreground mt-2">
                      All plans are currently free to use
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedTierData?.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="px-8 pb-8">
                  <Button 
                    className={cn("w-full transition-all duration-500", selectedTierData?.buttonColor)} 
                    size="lg"
                    onClick={() => handleSubscribe(selectedTierData?.name || "")}
                    disabled={loading || isCurrentPlan(selectedTierData?.name || "")}
                  >
                    {getButtonText(selectedTierData?.name || "")}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mt-24 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="grid gap-6 text-left">
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                  <p className="text-muted-foreground">Yes, you can switch between any plan at any time. All plans are currently free to use.</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">Are all features really free?</h3>
                  <p className="text-muted-foreground">Yes! All plans including Pro features are currently available at no cost. You can explore everything without any payment.</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">What's the difference between plans?</h3>
                  <p className="text-muted-foreground">Each plan includes different features and capabilities. Higher tiers include everything from lower tiers plus additional advanced features.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
