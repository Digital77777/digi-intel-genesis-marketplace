
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, BookOpen, Presentation, FileCheck, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AutoCurriculumBuilderInterface = () => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [curriculum, setCurriculum] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setCurriculum({
        modules: 8,
        lessons: 24,
        assignments: 12,
        duration: duration || '8 weeks'
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          AutoCurriculum Builder
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Automatically create full curriculums with lesson plans, slides, and real-world projects
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Curriculum Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject/Topic</label>
              <Input 
                placeholder="e.g., Web Development, Data Science..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Duration</label>
              <Input 
                placeholder="e.g., 8 weeks, 3 months..."
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Target Level</label>
              <Input 
                placeholder="Beginner, Intermediate, Advanced"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Learning Goals</label>
              <Textarea 
                placeholder="Describe what students should achieve..."
                rows={3}
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={!topic || loading}
              className="w-full"
            >
              {loading ? 'Building Curriculum...' : 'Generate Curriculum'}
            </Button>
          </CardContent>
        </Card>

        {/* Curriculum Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Curriculum Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {curriculum ? (
              <Tabs defaultValue="structure" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="structure">Structure</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="slides">Slides</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                
                <TabsContent value="structure" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="font-semibold">{curriculum.modules} Modules</p>
                        <p className="text-sm text-muted-foreground">Core topics covered</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <FileCheck className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-semibold">{curriculum.lessons} Lessons</p>
                        <p className="text-sm text-muted-foreground">Detailed content</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <Presentation className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="font-semibold">Slide Decks</p>
                        <p className="text-sm text-muted-foreground">Ready presentations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <Clock className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="font-semibold">{curriculum.duration}</p>
                        <p className="text-sm text-muted-foreground">Total duration</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lessons" className="space-y-3">
                  {[1, 2, 3, 4].map((lesson) => (
                    <div key={lesson} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Lesson {lesson}</Badge>
                        <span>Introduction to {topic}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">45 min</Badge>
                        <Badge variant="secondary">Slides Ready</Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="slides">
                  <div className="text-center py-8">
                    <Presentation className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Presentation slides are being generated...</p>
                  </div>
                </TabsContent>

                <TabsContent value="projects">
                  <div className="space-y-3">
                    {[1, 2, 3].map((project) => (
                      <div key={project} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Project {project}: Real-world Application</h4>
                          <Badge>Week {project * 2}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Hands-on project to apply learned concepts in a practical scenario
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Configure your curriculum parameters to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoCurriculumBuilderInterface;
