
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Freemium",
    price: "$0",
    period: "/ month",
    description: "Get started and explore the ecosystem.",
    features: [
      "AI Tools Directory access",
      "Learning Hub access", 
      "AI Streams access",
      "Marketplace browsing",
      "Community Forum access",
      "Pricing page access"
    ],
    isFeatured: false,
  },
  {
    name: "Basic",
    price: "$29",
    period: "/ month",
    description: "For individuals ready to build and grow.",
    features: [
      "AI Tools Directory access",
      "Learning Hub access", 
      "AI Streams access",
      "Marketplace browsing",
      "Community Forum access",
      "Pricing page access",
      "Collaboration Hub",
      "Team Dashboard",
      "Workflow"
    ],
    isFeatured: true,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/ month",
    description: "For professionals and teams scaling their AI solutions.",
    features: [
      "AI Tools Directory access",
      "Learning Hub access", 
      "AI Streams access",
      "Marketplace browsing",
      "Community Forum access",
      "Pricing page access",
      "Collaboration Hub",
      "Team Dashboard",
      "Workflow",
      "AI Studio",
      "Business Insights",
      "Pipeline Designer",
      "Compliance Centre",
      "Learning Academy",
      "AI Assistant"
    ],
    isFeatured: false,
  },
];

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState("Basic");
  const selectedTierData = tiers.find(tier => tier.name === selectedTier);

  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Pricing for Every Stage</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Choose the plan that's right for you and unlock your AI potential.
        </p>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "flex flex-col cursor-pointer transition-all duration-200",
                  selectedTier === tier.name && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20 transform scale-105"
                )}
                onClick={() => setSelectedTier(tier.name)}
              >
                <CardHeader>
                  <CardTitle className={cn(
                    "transition-colors",
                    selectedTier === tier.name && "text-primary"
                  )}>
                    {tier.name}
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                    <span className="ml-1 text-sm font-semibold text-muted-foreground">{tier.period}</span>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="text-sm text-muted-foreground">
                      {tier.features.length} features included
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={selectedTier === tier.name ? "default" : "outline"}
                  >
                    {selectedTier === tier.name ? "Selected Plan" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Selected Tier Features Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary text-center">
                  {selectedTierData?.name} Features
                </CardTitle>
                <CardDescription className="text-center">
                  Everything included in your selected plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold">{selectedTierData?.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{selectedTierData?.period}</span>
                </div>
                <ul className="space-y-3">
                  {selectedTierData?.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Get Started with {selectedTierData?.name}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
