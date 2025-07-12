import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileFooter from "@/components/MobileFooter";
import HomePage from "./pages/HomePage";
import AIToolsPage from "./pages/AIToolsPage";
import NotFound from "./pages/NotFound";
import TextGenerator from "./pages/tools/TextGenerator";
import ImageAnalyzer from "./pages/tools/ImageAnalyzer";
import CodeAssistant from "./pages/tools/CodeAssistant";
import DataAnalyzer from "./pages/tools/DataAnalyzer";
import ChatBot from "./pages/tools/ChatBot";
import TranslationTool from "./pages/tools/TranslationTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-tools" element={<AIToolsPage />} />
          <Route path="/ai-tools/text-generator" element={<TextGenerator />} />
          <Route path="/ai-tools/image-analyzer" element={<ImageAnalyzer />} />
          <Route path="/ai-tools/code-assistant" element={<CodeAssistant />} />
          <Route path="/ai-tools/data-analyzer" element={<DataAnalyzer />} />
          <Route path="/ai-tools/chatbot" element={<ChatBot />} />
          <Route path="/ai-tools/translation" element={<TranslationTool />} />
          <Route path="/learning-hub" element={<HomePage />} />
          <Route path="/ai-streams" element={<HomePage />} />
          <Route path="/marketplace" element={<HomePage />} />
          <Route path="/community" element={<HomePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileFooter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;