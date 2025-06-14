
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const navigationItems = [
  { id: "ai-tools", label: "AI Tools Directory", active: true },
  { id: "learning-hub", label: "Learning Hub", active: false },
  { id: "ai-streams", label: "AI Streams", active: false },
  { id: "marketplace", label: "Marketplace", active: false },
  { id: "community", label: "Community Forum", active: false },
  { id: "collaboration", label: "Collaboration Hub", active: false },
  { id: "dashboard", label: "Team Dashboard", active: false },
  { id: "workflow", label: "Workflow", active: false },
  { id: "ai-studio", label: "AI Studio", active: false },
  { id: "insights", label: "Business Insights", active: false },
  { id: "pipeline", label: "Pipeline Designer", active: false },
  { id: "compliance", label: "Compliance Centre", active: false },
  { id: "academy", label: "Learning Academy", active: false },
  { id: "assistant", label: "AI Assistant", active: false },
];

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="py-4 px-4 sm:px-6 lg:px-8">
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
      </div>
      
      {/* AI marketplace features scrollable navigation */}
      <div className="border-t bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex items-center space-x-1 py-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`
                    inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                    ${item.active 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </header>
  );
};

export default Header;
