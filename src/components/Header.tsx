
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const navigationItems = [
  { id: "stays", label: "Stays", active: true },
  { id: "flights", label: "Flights", active: false },
  { id: "car-rentals", label: "Car rentals", active: false },
  { id: "attractions", label: "Attractions", active: false },
  { id: "airport-taxis", label: "Airport taxis", active: false },
  { id: "cruises", label: "Cruises", active: false },
  { id: "packages", label: "Packages", active: false },
  { id: "tours", label: "Tours", active: false },
  { id: "experiences", label: "Experiences", active: false },
  { id: "restaurants", label: "Restaurants", active: false },
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
      
      {/* Booking.com style scrollable navigation */}
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
