
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mic, MicOff, Video, VideoOff, MessageSquare, BarChart3, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LiveAICoTeachingAssistantInterface = () => {
  const [isLive, setIsLive] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleStartSession = () => {
    setIsLive(true);
    setStudentCount(Math.floor(Math.random() * 50) + 10);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          Live AI Co-Teaching Assistant
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time classroom co-pilot that handles questions and engages students dynamically
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Session Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Session Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={isLive ? "default" : "secondary"}>
                  {isLive ? "Live" : "Offline"}
                </Badge>
              </div>
              
              {isLive && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <Badge variant="outline">{studentCount} online</Badge>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleStartSession}
                disabled={isLive}
                className="flex-1"
              >
                {isLive ? 'Session Active' : 'Start Session'}
              </Button>
              {isLive && (
                <Button
                  variant="outline"
                  onClick={() => setIsLive(false)}
                >
                  End
                </Button>
              )}
            </div>

            {isLive && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4 mr-2" />
                  Mute
                </Button>
                <Button variant="outline" size="sm">
                  <VideoOff className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Features */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Features</CardTitle>
          </CardHeader>
          <CardContent>
            {isLive ? (
              <Tabs defaultValue="questions" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="questions">Q&A</TabsTrigger>
                  <TabsTrigger value="poll">Live Poll</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Student Questions</h4>
                      <Badge variant="secondary">{questions.length} pending</Badge>
                    </div>
                    
                    {['How do we calculate derivatives?', 'Can you explain the chain rule again?', 'What about the product rule?'].map((question, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm">{question}</p>
                            <p className="text-xs text-muted-foreground mt-1">Student {index + 1}</p>
                          </div>
                          <Button size="sm" variant="outline">Answer</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="poll" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Input placeholder="Enter poll question..." />
                      <Button className="w-full mt-2">Create Live Poll</Button>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-3">Active Poll</h4>
                      <p className="text-sm mb-3">Which topic needs more explanation?</p>
                      <div className="space-y-2">
                        {['Derivatives (45%)', 'Integration (30%)', 'Limits (25%)'].map((option, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{option}</span>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: option.match(/\((\d+)%\)/)?.[1] + '%' }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">85%</p>
                      <p className="text-sm text-muted-foreground">Engagement Rate</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-sm text-muted-foreground">Active Participants</p>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Generate Pop Quiz
                  </Button>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-xl font-bold">24min</p>
                      <p className="text-xs text-muted-foreground">Session Time</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-xl font-bold">18</p>
                      <p className="text-xs text-muted-foreground">Questions</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-xl font-bold">3</p>
                      <p className="text-xs text-muted-foreground">Polls Created</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Start a live session to begin co-teaching with AI assistance</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveAICoTeachingAssistantInterface;
