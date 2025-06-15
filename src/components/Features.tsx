
import { GraduationCap, Code, DollarSign, Zap, Users, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
    title: "Learn",
    description: "Master AI with curated courses, expert tutorials, and hands-on projects designed for every skill level.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Code className="h-10 w-10 text-purple-600" />,
    title: "Build",
    description: "Create powerful AI solutions with our intuitive tools, pre-built models, and collaborative workspace.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-green-600" />,
    title: "Earn",
    description: "Monetize your expertise through our marketplace, freelance projects, and revenue-sharing programs.",
    color: "from-green-500 to-emerald-500",
  },
];

const additionalFeatures = [
  {
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    title: "Lightning Fast",
    description: "Deploy AI models in seconds, not hours",
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: "Collaborative",
    description: "Work with global teams seamlessly",
  },
  {
    icon: <Shield className="h-6 w-6 text-red-600" />,
    title: "Enterprise Ready",
    description: "Bank-grade security and compliance",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Your Complete
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From learning fundamentals to building production-ready AI systems and earning from your expertise.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {additionalFeatures.map((feature, index) => (
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
      </div>
    </section>
  );
};

export default Features;
