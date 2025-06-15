import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Check, Star, Zap, Crown, Shield, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
      "Everything in Freemium",
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
      "Everything in Basic",
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
      "Everything in Freemium",
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
      "Everything in Basic",
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
  
  const currentTiers = billingPeriod === "monthly" ? monthlyTiers : yearlyTiers;
  const selectedTierData = currentTiers.find(tier => tier.name === selectedTier);
  const selectedContent = tierContent[selectedTier];
  const SelectedIcon = selectedTierData?.icon || Rocket;

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
              
              {/* Billing Toggle */}
              <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="w-fit mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">
                    Yearly
                    <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Save 17%</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Dynamic Layout based on selected tier */}
            <div className={cn(
              "grid gap-8 transition-all duration-500",
              selectedTier === "Freemium" 
                ? "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto" 
                : "grid-cols-1 lg:grid-cols-4"
            )}>
              <div className={cn(
                "grid gap-8 transition-all duration-500",
                selectedTier === "Freemium" 
                  ? "col-span-full grid-cols-1 md:grid-cols-3"
                  : "lg:col-span-3 grid-cols-1 md:grid-cols-3"
              )}>
                {currentTiers.map((tier) => {
                  const TierIcon = tier.icon;
                  return (
                    <Card
                      key={tier.name}
                      className={cn(
                        "relative flex flex-col cursor-pointer transition-all duration-500 hover:shadow-xl",
                        selectedTier === tier.name && "border-primary ring-2 ring-primary shadow-xl shadow-primary/20 transform scale-105",
                        tier.isFeatured && "border-primary/50",
                        selectedTier === tier.name && `bg-gradient-to-br ${tier.theme}`
                      )}
                      onClick={() => setSelectedTier(tier.name)}
                    >
                      {tier.badge && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className={cn(
                            "text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all duration-300",
                            selectedTier === tier.name ? tier.buttonColor : "bg-gradient-to-r from-primary to-purple-600"
                          )}>
                            {tier.badge === "Most Popular" && <Star className="h-3 w-3" />}
                            {tier.badge === "Best Value" && <Zap className="h-3 w-3" />}
                            {tier.badge}
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
                            selectedTier === tier.name ? tier.accentColor : "text-foreground"
                          )}>
                            {tier.price}
                          </span>
                          <span className="ml-1 text-sm font-semibold text-muted-foreground">{tier.period}</span>
                          {tier.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {tier.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tier.features.length} features included
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className={cn(
                            "w-full transition-all duration-500",
                            selectedTier === tier.name ? tier.buttonColor : ""
                          )}
                          variant={selectedTier === tier.name ? "default" : "outline"}
                        >
                          {selectedTier === tier.name ? "Selected Plan" : "Choose Plan"}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              
              {/* Enhanced Features Panel - Only show for paid tiers */}
              {selectedTier !== "Freemium" && (
                <div className="lg:col-span-1 animate-fade-in">
                  <Card className={cn(
                    "sticky top-8 border-primary/20 backdrop-blur-sm transition-all duration-500",
                    `bg-gradient-to-br ${selectedTierData?.theme}`
                  )}>
                    <CardHeader className="text-center">
                      <CardTitle className={cn("flex items-center justify-center gap-2 transition-colors duration-300", selectedTierData?.accentColor)}>
                        <SelectedIcon className="h-5 w-5" />
                        {selectedTierData?.name} Plan
                      </CardTitle>
                      <CardDescription>
                        {selectedContent.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="text-center mb-6 p-4 bg-background/80 rounded-lg">
                        <span className={cn(
                          "text-3xl font-bold transition-colors duration-300",
                          selectedTierData?.accentColor
                        )}>
                          {selectedTierData?.price}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">{selectedTierData?.period}</span>
                        {selectedTierData?.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {selectedTierData.originalPrice}
                          </div>
                        )}
                      </div>
                      
                      <ul className="space-y-3">
                        {selectedTierData?.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className={cn("w-full transition-all duration-500", selectedTierData?.buttonColor)} size="lg">
                        {selectedContent.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </div>

            {/* Dynamic Content Section */}
            <div className="mt-24 max-w-4xl mx-auto">
              <div className={cn(
                "p-8 rounded-2xl transition-all duration-500",
                `bg-gradient-to-br ${selectedTierData?.theme || "from-muted/30 to-background"}`
              )}>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <SelectedIcon className={cn("h-8 w-8 transition-colors duration-300", selectedTierData?.accentColor)} />
                  <h3 className="text-2xl font-bold">Why Choose {selectedTier}?</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {selectedContent.features.map((feature, index) => (
                    <div key={index} className="text-center p-4 bg-background/50 rounded-lg">
                      <div className={cn("w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center transition-colors duration-300", 
                        selectedTierData?.theme?.replace('from-', 'bg-').replace(' to-gray-200', '').replace(' to-purple-100', '').replace(' to-yellow-100', '')
                      )}>
                        <Check className={cn("h-6 w-6 transition-colors duration-300", selectedTierData?.accentColor)} />
                      </div>
                      <p className="font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-24 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="grid gap-6 text-left">
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                  <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                  <p className="text-muted-foreground">Our Freemium plan is completely free forever. For paid plans, we offer a 14-day free trial to explore all features.</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.</p>
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
