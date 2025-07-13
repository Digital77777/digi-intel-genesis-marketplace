
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TextGeneratorInterface from './TextGeneratorInterface';
import ImageAnalyzerInterface from './ImageAnalyzerInterface';
import CodeAssistantInterface from './CodeAssistantInterface';
import DataAnalyzerInterface from './DataAnalyzerInterface';
import ChatBotInterface from './ChatBotInterface';
import TranslationToolInterface from './TranslationToolInterface';
import AIKnowledgeSynthesizerInterface from './AIKnowledgeSynthesizerInterface';
import AutoCurriculumBuilderInterface from './AutoCurriculumBuilderInterface';
import OnePersonAIAgencyInterface from './OnePersonAIAgencyInterface';
import ContentDNAEngineInterface from './ContentDNAEngineInterface';
import AIAcademicAllyInterface from './AIAcademicAllyInterface';

interface ToolInterfaceProps {
  toolId: string;
  onBack: () => void;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ toolId, onBack }) => {
  const renderToolInterface = () => {
    switch (toolId) {
      // Original 17 tools with dedicated interfaces
      case 'aks':
        return <AIKnowledgeSynthesizerInterface />;
      case 'acb':
        return <AutoCurriculumBuilderInterface />;
      case 'opaia':
        return <OnePersonAIAgencyInterface />;
      case 'cde':
        return <ContentDNAEngineInterface />;
      case 'aaa':
        return <AIAcademicAllyInterface />;
      case 'lcta':
        return <TextGeneratorInterface />; // Placeholder for now
      case 'awbe':
        return <TextGeneratorInterface />; // Placeholder for now
      case 'vts':
        return <CodeAssistantInterface />;
      case 'scc':
        return <TextGeneratorInterface />; // Placeholder for now
      case 'eduplanet':
        return <TextGeneratorInterface />; // Placeholder for now
      case 'r2t':
        return <TextGeneratorInterface />; // Placeholder for now
      case 'emobot':
        return <ChatBotInterface />;
      case 'aego':
        return <DataAnalyzerInterface />;
      case 'mam':
        return <TextGeneratorInterface />; // Placeholder for now
      case 'aictsa':
        return <TranslationToolInterface />;
      case 'sdps':
        return <TextGeneratorInterface />; // Placeholder for now
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
