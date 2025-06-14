
import { GraduationCap, Code, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Learn",
    description: "Access curated courses, tutorials, and resources to master AI development, from fundamentals to advanced techniques.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Build",
    description: "Utilize our powerful, cloud-based development environment and pre-built models to bring your AI projects to life.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-primary" />,
    title: "Earn",
    description: "Monetize your skills and creations. Sell your models on our marketplace or collaborate on paid projects.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">A Complete AI Development Lifecycle</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Everything you need in one integrated platform.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-secondary/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
