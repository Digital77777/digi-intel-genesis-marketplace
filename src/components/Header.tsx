
import { Bot } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";

const navigationItems = [
  { id: "ai-tools", label: "AI Tools Directory", path: "/ai-tools" },
  { id: "learning-hub", label: "Learning Hub", path: "/learning-hub" },
  { id: "ai-streams", label: "AI Streams", path: "/ai-streams" },
  { id: "marketplace", label: "Marketplace", path: "/marketplace" },
  { id: "community", label: "Community Forum", path: "/community" },
  { id: "collaboration", label: "Collaboration Hub", path: "/collaboration" },
  { id: "dashboard", label: "Team Dashboard", path: "/dashboard" },
  { id: "workflow", label: "Workflow", path: "/workflow" },
  { id: "ai-studio", label: "AI Studio", path: "/ai-studio" },
  { id: "insights", label: "Business Insights", path: "/insights" },
  { id: "pipeline", label: "Pipeline Designer", path: "/pipeline" },
  { id: "compliance", label: "Compliance Centre", path: "/compliance" },
  { id: "academy", label: "Learning Academy", path: "/academy" },
  { id: "assistant", label: "AI Assistant", path: "/assistant" },
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="border-b bg-blue-600">
      <div className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Digital Intelligence Marketplace</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Features</a>
            <Link to="/pricing" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Pricing</Link>
          </nav>
          <UserMenu />
        </div>
      </div>
      
      {/* AI marketplace features scrollable navigation */}
      <div className="border-t border-blue-500 bg-blue-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex items-center space-x-1 py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`
                    inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                    ${currentPath === item.path 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-blue-100 hover:text-white hover:bg-blue-600'
                    }
                  `}
                >
                  {item.label}
                </Link>
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
