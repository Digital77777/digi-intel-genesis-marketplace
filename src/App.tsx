
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import AIToolsDirectory from "./pages/AIToolsDirectory";
import LearningHub from "./pages/LearningHub";
import AIStreams from "./pages/AIStreams";
import Marketplace from "./pages/Marketplace";
import CommunityForum from "./pages/CommunityForum";
import CollaborationHub from "./pages/CollaborationHub";
import TeamDashboard from "./pages/TeamDashboard";
import Workflow from "./pages/Workflow";
import AIStudio from "./pages/AIStudio";
import BusinessInsights from "./pages/BusinessInsights";
import PipelineDesigner from "./pages/PipelineDesigner";
import ComplianceCentre from "./pages/ComplianceCentre";
import LearningAcademy from "./pages/LearningAcademy";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/ai-tools" element={<AIToolsDirectory />} />
            <Route path="/learning-hub" element={<LearningHub />} />
            <Route path="/ai-streams" element={<AIStreams />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/collaboration" element={<CollaborationHub />} />
            <Route path="/dashboard" element={<TeamDashboard />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/ai-studio" element={<AIStudio />} />
            <Route path="/insights" element={<BusinessInsights />} />
            <Route path="/pipeline" element={<PipelineDesigner />} />
            <Route path="/compliance" element={<ComplianceCentre />} />
            <Route path="/academy" element={<LearningAcademy />} />
            <Route path="/assistant" element={<AIAssistant />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
