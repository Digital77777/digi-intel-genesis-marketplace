
import { Bot, Sparkles, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left side - Branding and features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <Bot className="h-8 w-8" />
            <span className="text-2xl font-bold">Digital Intelligence</span>
          </Link>
          
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Join the AI Revolution
              </h1>
              <p className="text-xl text-blue-100">
                Connect, collaborate, and innovate with the world's leading AI marketplace community.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI-Powered Tools</h3>
                  <p className="text-blue-100">Access cutting-edge AI tools and solutions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community Forum</h3>
                  <p className="text-blue-100">Connect with experts and enthusiasts</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure & Private</h3>
                  <p className="text-blue-100">Your data is protected with enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <blockquote className="border-l-4 border-white/30 pl-4">
            <p className="text-lg italic mb-2">
              "This platform has transformed how we approach AI integration in our business."
            </p>
            <cite className="text-blue-200">- Tech Industry Leader</cite>
          </blockquote>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 bg-purple-400/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-300/20 rounded-full blur-md"></div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
