
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, FileText, Download, Play, Pause, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Reality2TextInterface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([
    { id: 1, title: 'Morning Meeting', duration: '15:30', status: 'Processed', type: 'Meeting Notes' },
    { id: 2, title: 'Client Call', duration: '32:45', status: 'Processing', type: 'Interview' },
  ]);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Mic className="h-8 w-8 text-primary" />
          Reality2Text
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Wearable AI that documents real-world situations into structured reports and stories
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recording Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Live Recording
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : ''}`}
                size="lg"
              >
                {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                {isRecording ? 'Recording...' : 'Start Recording'}
              </p>
            </div>

            {isRecording && (
              <div className="space-y-2">
                <div className="text-center">
                  <span className="text-2xl font-mono">05:34</span>
                </div>
                <Progress value={67} />
                <div className="text-center text-sm text-muted-foreground">
                  Real-time transcription active
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Recording Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recorded Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recordings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recordings">Recordings</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>

              <TabsContent value="recordings" className="space-y-4">
                <div className="space-y-3">
                  {recordings.map((recording) => (
                    <div key={recording.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{recording.title}</p>
                          <p className="text-sm text-muted-foreground">{recording.duration}</p>
                          <Badge 
                            variant={recording.status === 'Processed' ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {recording.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-3">
                  {['Meeting Summary.pdf', 'Interview Transcript.docx', 'Research Notes.txt'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-green-500" />
                        <span>{doc}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stories" className="space-y-4">
                <div className="space-y-3">
                  {['Client Meeting Narrative', 'Project Discussion Story', 'Interview Summary'].map((story, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{story}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI-generated narrative based on recorded conversation...
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm">Read Full Story</Button>
                        <Button size="sm" variant="outline">Export</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reality2TextInterface;
