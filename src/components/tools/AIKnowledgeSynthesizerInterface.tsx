import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, FileText, Headphones, HelpCircle, TreePine, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SynthesisResult {
  mindMap: { nodes: { id: string; label: string }[]; edges: { from: string; to: string }[] };
  audioSummaryUrl: string;
  quiz: { question: string; options: string[]; answer: string }[];
  citations: { title: string; url: string }[];
}

const AIKnowledgeSynthesizerInterface = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [synthesis, setSynthesis] = useState<SynthesisResult | null>(null);

  const handleSynthesize = async () => {
    setLoading(true);
    setSynthesis(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const wordCount = inputText.split(/\s+/).length;
      const nodeCount = Math.max(2, Math.min(10, Math.floor(wordCount / 5)));
      const quizCount = Math.max(1, Math.min(5, Math.floor(wordCount / 10)));
      const citationCount = Math.max(1, Math.min(5, Math.floor(wordCount / 15)));

      const nodes = [{ id: '1', label: inputText.substring(0, 20) }];
      for (let i = 2; i <= nodeCount; i++) {
        nodes.push({ id: `${i}`, label: `Sub-topic ${i - 1}` });
      }
      const edges = nodes.slice(1).map((node, i) => ({ from: '1', to: node.id }));

      const quiz = [];
      for (let i = 0; i < quizCount; i++) {
        quiz.push({
          question: `What is a key aspect of "${inputText.substring(0, 15)}..."?`,
          options: ['Option A', 'Option B', 'Option C'],
          answer: 'Option A',
        });
      }

      const citations = [];
      for (let i = 0; i < citationCount; i++) {
        citations.push({
          title: `Source Article ${i + 1}`,
          url: `https://example.com/source${i + 1}`,
        });
      }

      const mockApiResponse: SynthesisResult = {
        mindMap: { nodes, edges },
        audioSummaryUrl: '/api/mock-audio-summary.mp3',
        quiz,
        citations,
      };
      setSynthesis(mockApiResponse);
    } catch (error) {
      console.error("Synthesis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          AI Knowledge Synthesizer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform scattered data into interactive knowledge trees with mind maps, audio summaries, and quizzes
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Input Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Topic or URL</label>
              <Input 
                placeholder="Enter topic or paste URL to synthesize..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Additional Context</label>
              <Textarea 
                placeholder="Add any additional context or specific requirements..."
                rows={4}
              />
            </div>
            <Button 
              onClick={handleSynthesize}
              disabled={!inputText || loading}
              className="w-full"
            >
              {loading ? 'Synthesizing...' : 'Generate Knowledge Tree'}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>Synthesis Results</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
                  <p className="text-muted-foreground">Synthesizing knowledge...</p>
                </div>
              </div>
            )}
            {synthesis ? (
              <div className="space-y-6">
                {/* Mind Map */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><TreePine className="h-5 w-5 text-green-500" /> Mind Map</h3>
                  <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                    <p className="text-sm text-muted-foreground">Interactive mind map visualization would be rendered here.</p>
                    <p className="text-sm font-mono bg-background p-2 rounded mt-2">
                      Nodes: {synthesis.mindMap.nodes.length}, Edges: {synthesis.mindMap.edges.length}
                    </p>
                  </div>
                </div>
                {/* Audio Summary */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><Headphones className="h-5 w-5 text-blue-500" /> Audio Summary</h3>
                  <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-4">
                    <audio controls src={synthesis.audioSummaryUrl} className="w-full">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
                {/* Quiz */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><HelpCircle className="h-5 w-5 text-purple-500" /> Knowledge Quiz</h3>
                  <div className="space-y-4">
                    {synthesis.quiz.map((q, i) => (
                      <div key={i} className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">{i + 1}. {q.question}</p>
                        <div className="flex flex-wrap gap-2">
                          {q.options.map(opt => <Badge key={opt} variant="outline">{opt}</Badge>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Citations */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><FileText className="h-5 w-5 text-orange-500" /> Citations</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    {synthesis.citations.map((cite, i) => (
                      <li key={i}>
                        <a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {cite.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              !loading && (
                <div className="text-center py-8 text-muted-foreground h-full flex flex-col justify-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter content above to generate your knowledge synthesis</p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIKnowledgeSynthesizerInterface;
