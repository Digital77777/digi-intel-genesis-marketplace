
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TextGeneratorInterface from './TextGeneratorInterface';
import ImageAnalyzerInterface from './ImageAnalyzerInterface';
import CodeAssistantInterface from './CodeAssistantInterface';
import DataAnalyzerInterface from './DataAnalyzerInterface';
import ChatBotInterface from './ChatBotInterface';
import TranslationToolInterface from './TranslationToolInterface';

interface ToolInterfaceProps {
  toolId: string;
  onBack: () => void;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ toolId, onBack }) => {
  const renderToolInterface = () => {
    switch (toolId) {
      // Original 17 tools - using TextGeneratorInterface as a base for now
      case 'aks':
        return <TextGeneratorInterface />;
      case 'acb':
        return <TextGeneratorInterface />;
      case 'opaia':
        return <TextGeneratorInterface />;
      case 'cde':
        return <TextGeneratorInterface />;
      case 'aaa':
        return <TextGeneratorInterface />;
      case 'lcta':
        return <TextGeneratorInterface />;
      case 'awbe':
        return <TextGeneratorInterface />;
      case 'vts':
        return <CodeAssistantInterface />;
      case 'scc':
        return <TextGeneratorInterface />;
      case 'eduplanet':
        return <TextGeneratorInterface />;
      case 'r2t':
        return <TextGeneratorInterface />;
      case 'emobot':
        return <ChatBotInterface />;
      case 'aego':
        return <DataAnalyzerInterface />;
      case 'mam':
        return <TextGeneratorInterface />;
      case 'aictsa':
        return <TranslationToolInterface />;
      case 'sdps':
        return <TextGeneratorInterface />;
      case 'cropsense':
        return <ImageAnalyzerInterface />;
      
      // New 6 tools with their specific interfaces
      case 'text-generator':
        return <TextGeneratorInterface />;
      case 'image-analyzer':
        return <ImageAnalyzerInterface />;
      case 'code-assistant':
        return <CodeAssistantInterface />;
      case 'data-analyzer':
        return <DataAnalyzerInterface />;
      case 'chatbot':
        return <ChatBotInterface />;
      case 'translation-tool':
        return <TranslationToolInterface />;
      
      default:
        return <TextGeneratorInterface />; // Default fallback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </div>
      </div>

      {/* Tool Interface */}
      <div className="py-6">
        {renderToolInterface()}
      </div>
    </div>
  );
};

export default ToolInterface;
