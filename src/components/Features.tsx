
import { GraduationCap, Code, DollarSign, Zap, Users, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Learn",
    description: "Master AI with curated courses, expert tutorials, and hands-on projects designed for every skill level.",
    color: "from-primary to-primary-dark",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-success" />,
    title: "Marketplace",
    description: "Buy and sell AI models, datasets, and tools. Access a vast library of AI solutions and monetize your creations.",
    color: "from-success to-success-dark",
  },
  {
    icon: <Code className="h-10 w-10 text-secondary" />,
    title: "Build",
    description: "Create powerful AI solutions with our intuitive tools, pre-built models, and collaborative workspace.",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: <Zap className="h-6 w-6 text-warning" />,
    title: "Lightning Fast",
    description: "Deploy AI models in seconds, not hours",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Collaborative",
    description: "Work with global teams seamlessly",
  },
  {
    icon: <Shield className="h-6 w-6 text-success" />,
    title: "Enterprise Ready",
    description: "Bank-grade security and compliance",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-gradient-subtle">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Essential AI Features
            <span className="text-gradient-primary"> Available Now</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to start your AI journey with confidence.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.slice(0, 3).map((feature, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 card-gradient hover:shadow-medium transition-all duration-500 hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <CardHeader className="items-center text-center pb-4 relative z-10">
                <div className="mb-4 p-3 rounded-full bg-gradient-accent shadow-soft group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg card-gradient border hover:shadow-soft transition-all duration-300">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-accent">
                {feature.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-foreground">{feature.title}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
