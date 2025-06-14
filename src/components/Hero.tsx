
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative text-center py-20 sm:py-32 lg:py-40">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] -z-10"></div>
      <div className="container mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
          The World's First
          <br />
          <span className="text-primary">Learn-Build-Earn</span> AI Ecosystem
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join a thriving community of innovators. Get the tools, knowledge, and opportunities to shape the future of artificial intelligence.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">Start for Free</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
