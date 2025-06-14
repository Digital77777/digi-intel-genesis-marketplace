
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Digital Intelligence Marketplace</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</a>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  );
};

export default Header;
