import { ShoppingBag, GraduationCap, Play, Store, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileFooter = () => {
  const location = useLocation();

  const navigationItems = [
    {
      id: "ai-tools",
      label: "AI Tools",
      path: "/ai-tools",
      icon: ShoppingBag,
    },
    {
      id: "learning",
      label: "Learning",
      path: "/learning-hub",
      icon: GraduationCap,
    },
    {
      id: "streams",
      label: "Streams",
      path: "/ai-streams",
      icon: Play,
    },
    {
      id: "market",
      label: "Market",
      path: "/marketplace",
      icon: Store,
    },
    {
      id: "community",
      label: "Community",
      path: "/community",
      icon: Users,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-blue-600 border-t border-blue-500 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors",
                isActive 
                  ? "text-white bg-blue-500/30" 
                  : "text-blue-100 hover:text-white hover:bg-blue-500/20"
              )}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFooter;