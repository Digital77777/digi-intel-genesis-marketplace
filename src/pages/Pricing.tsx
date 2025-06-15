
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Check, Star, Zap } from "lucide-react";
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
  },
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedTier, setSelectedTier] = useState("Basic");
  
  const currentTiers = billingPeriod === "monthly" ? monthlyTiers : yearlyTiers;
  const selectedTierData = currentTiers.find(tier => tier.name === selectedTier);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 sm:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                Choose Your
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Growth Plan</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Scale your AI journey with flexible pricing that grows with your ambitions.
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

            <div className={cn(
              "grid gap-8",
              selectedTier === "Freemium" 
                ? "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto" 
                : "grid-cols-1 lg:grid-cols-4"
            )}>
              <div className={cn(
                "grid gap-8",
                selectedTier === "Freemium" 
                  ? "col-span-full grid-cols-1 md:grid-cols-3"
                  : "lg:col-span-3 grid-cols-1 md:grid-cols-3"
              )}>
                {currentTiers.map((tier) => (
                  <Card
                    key={tier.name}
                    className={cn(
                      "relative flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl",
                      selectedTier === tier.name && "border-primary ring-2 ring-primary shadow-xl shadow-primary/20 transform scale-105",
                      tier.isFeatured && "border-primary/50"
                    )}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          {tier.badge === "Most Popular" && <Star className="h-3 w-3" />}
                          {tier.badge === "Best Value" && <Zap className="h-3 w-3" />}
                          {tier.badge}
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className={cn(
                        "text-xl transition-colors",
                        selectedTier === tier.name && "text-primary"
                      )}>
                        {tier.name}
                      </CardTitle>
                      <CardDescription className="text-sm">{tier.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow text-center">
                      <div className="mb-6">
                        <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
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
                          "w-full transition-all duration-300",
                          selectedTier === tier.name 
                            ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" 
                            : ""
                        )}
                        variant={selectedTier === tier.name ? "default" : "outline"}
                      >
                        {selectedTier === tier.name ? "Selected Plan" : "Choose Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Enhanced Features Panel - Only show for paid tiers */}
              {selectedTier !== "Freemium" && (
                <div className="lg:col-span-1">
                  <Card className="sticky top-8 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-600/5 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <CardTitle className="text-primary flex items-center justify-center gap-2">
                        <Zap className="h-5 w-5" />
                        {selectedTierData?.name} Plan
                      </CardTitle>
                      <CardDescription>
                        Everything you get with this plan
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="text-center mb-6 p-4 bg-background/80 rounded-lg">
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
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
                      <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" size="lg">
                        Start with {selectedTierData?.name}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
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
