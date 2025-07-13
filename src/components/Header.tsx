
import { Bot } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";

const allNavigationItems = [
  {
    id: "ai-tools",
    label: "AI Tools Directory",
    path: "/ai-tools",
    tier: "freemium"
  },
  {
    id: "learning-hub",
    label: "Learning Hub",
    path: "/learning-hub",
    tier: "freemium"
  },
  {
    id: "community",
    label: "Community Forum",
    path: "/community",
    tier: "freemium"
  },
  {
    id: "marketplace",
    label: "Marketplace",
    path: "/marketplace",
    tier: "freemium"
  },
  {
    id: "ai-streams",
    label: "AI Streams",
    path: "/ai-streams",
    tier: "freemium"
  }
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = allNavigationItems;

  return (
    <header className="border-b border-border bg-gradient-primary fixed top-0 left-0 right-0 z-50 md:relative shadow-soft">
      <div className="px-4 sm:px-6 lg:px-8 py-[15px]">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-white" />
            <span className="font-bold text-white text-sm">Digital Intelligence Marketplace</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Features</a>
            <Link to="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Pricing</Link>
          </nav>
          <UserMenu />
        </div>
      </div>
      
      {/* AI marketplace features scrollable navigation - Hidden on mobile */}
      <div className="border-t border-white/20 bg-primary-dark/20 backdrop-blur-sm hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex items-center space-x-1 py-2">
              {navigationItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`
                    inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                    ${currentPath === item.path 
                      ? 'bg-white text-primary shadow-soft' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
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
