
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
    features: ["Access to beginner courses", "Limited build environment", "Community forum access"],
    isFeatured: false,
  },
  {
    name: "Basic",
    price: "$29",
    period: "/ month",
    description: "For individuals ready to build and grow.",
    features: ["All Freemium features", "Unlimited course access", "Standard build environment", "Marketplace listing (10%)"],
    isFeatured: true,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/ month",
    description: "For professionals and teams scaling their AI solutions.",
    features: ["All Basic features", "Advanced build environment", "Priority support", "Marketplace listing (5%)"],
    isFeatured: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Pricing for Every Stage</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Choose the plan that's right for you and unlock your AI potential.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className={cn("flex flex-col", tier.isFeatured && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20")}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  <span className="ml-1 text-sm font-semibold text-muted-foreground">{tier.period}</span>
                </div>
                <ul className="mt-6 space-y-4 text-left">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.isFeatured ? "default" : "outline"}>Choose Plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
