
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Brain, Volume2, Clock, Target, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const AIAcademicAllyInterface = () => {
  const [subject, setSubject] = useState('');
  const [learningStyle, setLearningStyle] = useState('visual');
  const [difficulty, setDifficulty] = useState([3]);
  const [session, setSession] = useState<any>(null);

  const handleStartSession = () => {
    setSession({
      adaptiveFormat: true,
      progress: 0,
      materials: 5
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          AI Academic Ally
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Personalized study companion for students with ADHD, dyslexia, and learning differences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Learning Profile Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Learning Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input 
                placeholder="Math, Science, History..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Learning Style</label>
              <div className="grid grid-cols-2 gap-2">
                {['Visual', 'Auditory', 'Kinesthetic', 'Reading'].map((style) => (
                  <Button
                    key={style}
                    variant={learningStyle === style.toLowerCase() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLearningStyle(style.toLowerCase())}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
              <Slider
                value={difficulty}
                onValueChange={setDifficulty}
                max={5}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <Button 
              onClick={handleStartSession}
              disabled={!subject}
              className="w-full"
            >
              Start Study Session
            </Button>
          </CardContent>
        </Card>

        {/* Study Session */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Adaptive Study Session</CardTitle>
          </CardHeader>
          <CardContent>
            {session ? (
              <Tabs defaultValue="materials" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="reminders">Reminders</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="materials" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Brain className="h-6 w-6 text-blue-500" />
                        <h3 className="font-semibold">Visual Format</h3>
                        <Badge variant="secondary">Optimized</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Mind maps, diagrams, and color-coded notes adapted for your learning style
                      </p>
                      <Button size="sm" className="w-full">View Materials</Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Volume2 className="h-6 w-6 text-green-500" />
                        <h3 className="font-semibold">Audio Format</h3>
                        <Badge variant="secondary">15 min</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Spoken explanations with emphasis on key concepts
                      </p>
                      <Button size="sm" className="w-full">Play Audio</Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="h-6 w-6 text-purple-500" />
                        <h3 className="font-semibold">Practice Quiz</h3>
                        <Badge variant="secondary">5 questions</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Adaptive questions that adjust to your understanding level
                      </p>
                      <Button size="sm" className="w-full">Start Quiz</Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="h-6 w-6 text-orange-500" />
                        <h3 className="font-semibold">Study Timer</h3>
                        <Badge variant="secondary">Pomodoro</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        ADHD-friendly timing with regular breaks
                      </p>
                      <Button size="sm" className="w-full">Start Timer</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Today's Progress</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-green-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-blue-500">12</p>
                        <p className="text-sm text-muted-foreground">Concepts Learned</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-green-500">45</p>
                        <p className="text-sm text-muted-foreground">Minutes Studied</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-purple-500">8/10</p>
                        <p className="text-sm text-muted-foreground">Quiz Score</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reminders">
                  <div className="space-y-3">
                    {['Study break in 5 minutes', 'Review yesterday\'s material', 'Practice quiz available'].map((reminder, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <span>{reminder}</span>
                        </div>
                        <Button size="sm" variant="outline">Dismiss</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">Retention Rate</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Study Streak</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">Visual</p>
                      <p className="text-sm text-muted-foreground">Best Format</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg text-center">
                      <p className="text-2xl font-bold">3.2h</p>
                      <p className="text-sm text-muted-foreground">Avg. Session</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Set up your learning profile to start your personalized study session</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAcademicAllyInterface;
