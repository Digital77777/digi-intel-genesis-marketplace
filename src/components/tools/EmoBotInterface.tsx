
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Heart, Brain, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmoBotInterface = () => {
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        tone: 'Professional',
        empathy: 85,
        clarity: 92,
        suggestions: [
          'Consider using more inclusive language',
          'Add a personal touch to sound warmer',
          'Your message is clear and well-structured'
        ]
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          EmoBot: Emotional Intelligence AI
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time communication coaching with tone, empathy, and clarity feedback
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Your Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your message here for emotional intelligence analysis..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
            />
            
            <Button 
              onClick={handleAnalyze}
              disabled={!message || analyzing}
              className="w-full"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Communication'}
            </Button>

            {analysis && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Detected Tone:</span>
                  <Badge variant="outline">{analysis.tone}</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Communication Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <Tabs defaultValue="scores" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="scores">Scores</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural</TabsTrigger>
                  <TabsTrigger value="improvement">Improve</TabsTrigger>
                </TabsList>

                <TabsContent value="scores" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-3">
                        <div className="w-full h-full rounded-full border-8 border-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-red-500">{analysis.empathy}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Heart className="h-6 w-6 mx-auto text-red-500" />
                        <p className="font-semibold">Empathy Score</p>
                        <Progress value={analysis.empathy} className="w-full" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-3">
                        <div className="w-full h-full rounded-full border-8 border-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-500">{analysis.clarity}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Brain className="h-6 w-6 mx-auto text-blue-500" />
                        <p className="font-semibold">Clarity Score</p>
                        <Progress value={analysis.clarity} className="w-full" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-3">
                        <div className="w-full h-full rounded-full border-8 border-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-green-500">88</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <TrendingUp className="h-6 w-6 mx-auto text-green-500" />
                        <p className="font-semibold">Overall Score</p>
                        <Progress value={88} className="w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                      <p className="font-semibold text-green-700">Strengths</p>
                      <ul className="text-sm text-green-600 mt-2 space-y-1">
                        <li>• Clear structure</li>
                        <li>• Professional tone</li>
                        <li>• Good grammar</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-orange-500 mb-2" />
                      <p className="font-semibold text-orange-700">Areas to Improve</p>
                      <ul className="text-sm text-orange-600 mt-2 space-y-1">
                        <li>• Add more warmth</li>
                        <li>• Consider recipient's perspective</li>
                        <li>• Include personal touch</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="suggestions" className="space-y-4">
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Rewrite Suggestion</h4>
                    <p className="text-sm text-gray-700 italic">
                      "I hope this message finds you well. I wanted to reach out regarding our upcoming project discussion. Would you be available for a brief call this week to align on our approach? I value your input and believe your perspective would be invaluable for our success."
                    </p>
                    <Button size="sm" className="mt-3">Use This Version</Button>
                  </div>
                </TabsContent>

                <TabsContent value="cultural" className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Cultural Sensitivity Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Directness Level</span>
                        <Badge variant="outline">Western Style</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Formality Level</span>
                        <Badge variant="outline">Professional</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Power Distance</span>
                        <Badge variant="outline">Moderate</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Regional Adaptations</h4>
                    {['North American', 'European', 'Asian', 'Middle Eastern'].map((region) => (
                      <Button key={region} variant="outline" className="w-full justify-start">
                        Adapt for {region} Context
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="improvement" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Practice Exercises</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Practice active listening phrases</li>
                        <li>• Learn empathetic response patterns</li>
                        <li>• Master cultural communication styles</li>
                      </ul>
                      <Button size="sm" className="mt-3">Start Practice Session</Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Learning Resources</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          📚 Emotional Intelligence Course
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          🎯 Communication Skills Workshop
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          🌍 Cross-Cultural Communication Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <MessageSquare className="h-20 w-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Analyze Your Communication</p>
                <p>Enter your message to get emotional intelligence feedback and improvement suggestions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmoBotInterface;
