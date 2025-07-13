import { Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Digital Intelligence</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The world's first learn-build-earn AI ecosystem.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/ai-tools" className="hover:text-foreground">AI Tools</a></li>
              <li><a href="/learning-hub" className="hover:text-foreground">Learning Hub</a></li>
              <li><a href="/marketplace" className="hover:text-foreground">Marketplace</a></li>
              <li><a href="/community" className="hover:text-foreground">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-foreground">About</a></li>
              <li><a href="/careers" className="hover:text-foreground">Careers</a></li>
              <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
              <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/help" className="hover:text-foreground">Help Center</a></li>
              <li><a href="/docs" className="hover:text-foreground">Documentation</a></li>
              <li><a href="/privacy" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Digital Intelligence Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;