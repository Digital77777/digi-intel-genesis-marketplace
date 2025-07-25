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

  const [error, setError] = useState<string | null>(null);

  const handleSynthesize = async () => {
    setLoading(true);
    setSynthesis(null);
    setError(null);

    try {
      const searchResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${inputText}&format=json&origin=*`);
      const searchData = await searchResponse.json();
      const pageId = searchData.query.search[0]?.pageid;

      if (!pageId) {
        setError("No results found for your query. Please try a different topic.");
        setLoading(false);
        return;
      }

      const pageResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=extracts|extlinks&exintro&explaintext&format=json&origin=*`);
      const pageData = await pageResponse.json();
      const page = pageData.query.pages[pageId];
      const extract = page.extract;
      const links = page.extlinks?.map((link: any) => ({ title: new URL(link['*']).hostname, url: link['*'] })) || [];

      const sentences = extract.split('. ').slice(0, 5);
      const nodes = [{ id: '1', label: inputText }];
      sentences.forEach((sentence: string, i: number) => {
        if (sentence.length > 10) {
          nodes.push({ id: `${i + 2}`, label: sentence.substring(0, 30) + '...' });
        }
      });
      const edges = nodes.slice(1).map(node => ({ from: '1', to: node.id }));

      const quiz = sentences.slice(0, 2).map((sentence: string) => ({
        question: `What is mentioned about "${sentence.substring(0, 20)}..."?`,
        options: ['True', 'False', 'Not mentioned'],
        answer: 'True',
      }));

      const apiKey = import.meta.env.VITE_VOICERSS_API_KEY;
      const audioSummaryUrl = apiKey
        ? `https://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${encodeURIComponent(extract.substring(0, 200))}`
        : '';

      const apiResponse: SynthesisResult = {
        mindMap: { nodes, edges },
        audioSummaryUrl,
        quiz,
        citations: links.slice(0, 5),
      };

      setSynthesis(apiResponse);
    } catch (err) {
      setError("Failed to fetch data. Please check your connection and try again.");
      console.error("Synthesis failed:", err);
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
            {error && (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
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
