import { Bot } from "lucide-react";
const Footer = () => {
  return <footer className="border-t">
      <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">&copy; 2025 Digital Intelligence Marketplace. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>;
};
export default Footer;