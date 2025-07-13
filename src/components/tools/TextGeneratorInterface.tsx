
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, RefreshCw, Wand2, FileText, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextGeneratorInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(250);
  const [tone, setTone] = useState('Professional');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate text.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedText(`Generated text based on your prompt: "${prompt}"\n\nThis is a professional ${wordCount}-word response that demonstrates the capabilities of our AI text generation system. The content is tailored to match the ${tone.toLowerCase()} tone you selected.`);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard."
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Wand2 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Text Generator</h1>
        </div>
        <p className="text-muted-foreground">Create compelling content with AI assistance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Input & Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Prompt</label>
              <Textarea
                placeholder="Describe what you want to generate... (e.g., 'Write a blog post about renewable energy')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Word Count</label>
                <select 
                  value={wordCount} 
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                >
                  <option value={100}>100 words</option>
                  <option value={250}>250 words</option>
                  <option value={500}>500 words</option>
                  <option value={1000}>1000 words</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tone</label>
                <select 
                  value={tone} 
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                >
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Creative">Creative</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Text
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                Generated Content
              </CardTitle>
              {generatedText && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedText ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary">{wordCount} words</Badge>
                  <Badge variant="outline">{tone}</Badge>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{generatedText}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your generated text will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextGeneratorInterface;
