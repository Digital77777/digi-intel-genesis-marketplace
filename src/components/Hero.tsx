
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative text-center py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-background dark:to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] -z-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-25 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-800">
          <Sparkles className="h-4 w-4" />
          <span>Revolutionary AI Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
          Where Intelligence
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meets Opportunity
          </span>
        </h1>
        
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Join the revolution where cutting-edge AI meets human creativity. 
          <span className="font-medium text-foreground"> Learn from the best, build the future, and earn while you grow.</span>
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="hover:bg-muted/50 transition-all duration-300">
            Explore Platform
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10,000+</div>
            <div className="text-sm text-muted-foreground">Active Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">$2M+</div>
            <div className="text-sm text-muted-foreground">Creator Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">AI Models</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
