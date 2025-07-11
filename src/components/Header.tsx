import { Bot } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useSubscription } from "@/hooks/useSubscription";
const allNavigationItems = [{
  id: "ai-tools",
  label: "AI Tools Directory",
  path: "/ai-tools",
  tier: "freemium"
}, {
  id: "learning-hub",
  label: "Learning Hub",
  path: "/learning-hub",
  tier: "freemium"
}, {
  id: "community",
  label: "Community Forum",
  path: "/community",
  tier: "freemium"
}, {
  id: "marketplace",
  label: "Marketplace",
  path: "/marketplace",
  tier: "freemium"
}, {
  id: "ai-streams",
  label: "AI Streams",
  path: "/ai-streams",
  tier: "freemium"
}, {
  id: "collaboration",
  label: "Collaboration Hub",
  path: "/collaboration",
  tier: "basic"
}, {
  id: "dashboard",
  label: "Team Dashboard",
  path: "/dashboard",
  tier: "basic"
}, {
  id: "workflow",
  label: "Workflow",
  path: "/workflow",
  tier: "pro"
}, {
  id: "ai-studio",
  label: "AI Studio",
  path: "/ai-studio",
  tier: "pro"
}, {
  id: "insights",
  label: "Business Insights",
  path: "/insights",
  tier: "pro"
}, {
  id: "pipeline",
  label: "Pipeline Designer",
  path: "/pipeline",
  tier: "pro"
}, {
  id: "compliance",
  label: "Compliance Centre",
  path: "/compliance",
  tier: "pro"
}, {
  id: "academy",
  label: "Learning Academy",
  path: "/academy",
  tier: "pro"
}, {
  id: "assistant",
  label: "AI Assistant",
  path: "/assistant",
  tier: "pro"
}];
const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    subscription,
    loading
  } = useSubscription();
  const getNavigationItems = () => {
    if (loading) return allNavigationItems.filter(item => item.tier === "freemium");
    const userTier = subscription?.planName?.toLowerCase() || "freemium";
    if (userTier === "freemium") {
      return allNavigationItems.filter(item => item.tier === "freemium");
    } else if (userTier === "basic") {
      return allNavigationItems.filter(item => item.tier === "freemium" || item.tier === "basic");
    } else if (userTier === "pro") {
      return allNavigationItems; // Pro users get everything
    }
    return allNavigationItems.filter(item => item.tier === "freemium");
  };
  const navigationItems = getNavigationItems();
  return <header className="border-b bg-blue-600 fixed top-0 left-0 right-0 z-50 md:relative">
      <div className="px-4 sm:px-6 lg:px-8 py-0">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-white" />
            <span className="font-bold text-white text-sm">Digital Intelligence Marketplace</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Features</a>
            <Link to="/pricing" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Pricing</Link>
          </nav>
          <UserMenu />
        </div>
      </div>
      
      {/* AI marketplace features scrollable navigation */}
      <div className="border-t border-blue-500 bg-blue-700 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex items-center space-x-1 py-2">
              {navigationItems.map(item => <Link key={item.id} to={item.path} className={`
                    inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                    ${currentPath === item.path ? 'bg-white text-blue-600 shadow-sm' : 'text-blue-100 hover:text-white hover:bg-blue-600'}
                  `}>
                  {item.label}
                </Link>)}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </header>;
};
export default Header;