
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="container mx-auto text-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-secondary" />
              <span className="text-sm font-medium text-secondary bg-secondary-light px-3 py-1 rounded-full">
                Welcome to the Future of AI
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Learn, Build, and Earn with{" "}
              <span className="text-gradient-primary">AI Technology</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the world's most comprehensive AI ecosystem. Master cutting-edge skills, 
              create innovative solutions, and monetize your expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/ai-tools">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white shadow-medium px-8 py-3 text-lg">
                  Explore AI Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/learning-hub">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-light px-8 py-3 text-lg">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">50,000+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">200+</div>
              <div className="text-muted-foreground">AI Tools Available</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">$2M+</div>
              <div className="text-muted-foreground">Creator Earnings</div>
            </div>
          </div>
        </div>
      </section>

      <Features />

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-primary text-white">
        <div className="container mx-auto text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of innovators building the next generation of AI solutions.
            </p>
            <Link to="/ai-tools">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-medium px-8 py-3 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
