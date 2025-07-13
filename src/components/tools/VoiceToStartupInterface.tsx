
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Code, Palette, Database, Globe, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VoiceToStartupInterface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [building, setBuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mvp, setMvp] = useState<any>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setTranscript("I want to create a food delivery app that connects local restaurants with customers. It should have user registration, restaurant listings, menu browsing, order placement, and real-time tracking.");
      setIsRecording(false);
    }, 3000);
  };

  const handleBuildMVP = () => {
    setBuilding(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBuilding(false);
          setMvp({
            name: "FoodieConnect",
            frontend: "React App",
            backend: "Node.js API",
            database: "PostgreSQL",
            features: 8
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Code className="h-8 w-8 text-primary" />
          Voice-to-Startup
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Speak your startup idea and get a fully functional MVP with backend, frontend, and branding
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Voice Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button
                onClick={handleStartRecording}
                disabled={isRecording || building}
                className={`w-24 h-24 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : ''}`}
                size="lg"
              >
                {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                {isRecording ? 'Recording...' : 'Click to record your idea'}
              </p>
            </div>

            {transcript && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Transcript:</p>
                <p className="text-sm">{transcript}</p>
              </div>
            )}

            {transcript && !building && !mvp && (
              <Button onClick={handleBuildMVP} className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Build MVP
              </Button>
            )}

            {building && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Building MVP...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* MVP Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated MVP</CardTitle>
          </CardHeader>
          <CardContent>
            {mvp ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="deploy">Deploy</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{mvp.name}</h3>
                    <p className="text-muted-foreground">Food Delivery Platform</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <Badge variant="outline">{mvp.features} Features</Badge>
                      <Badge variant="outline">Full Stack</Badge>
                      <Badge variant="outline">Mobile Ready</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Code className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="font-semibold">Frontend</p>
                      <p className="text-sm text-muted-foreground">{mvp.frontend}</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Database className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="font-semibold">Backend</p>
                      <p className="text-sm text-muted-foreground">{mvp.backend}</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Palette className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <p className="font-semibold">Branding</p>
                      <p className="text-sm text-muted-foreground">Complete Kit</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="frontend" className="space-y-4">
                  <div className="space-y-3">
                    {['User Registration & Login', 'Restaurant Listings', 'Menu Browser', 'Shopping Cart', 'Order Checkout'].map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                        <Badge variant="secondary">React</Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">View Frontend Code</Button>
                </TabsContent>

                <TabsContent value="backend" className="space-y-4">
                  <div className="space-y-3">
                    {['User Authentication API', 'Restaurant Management', 'Order Processing', 'Payment Integration', 'Real-time Tracking'].map((api, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Database className="h-5 w-5 text-blue-500" />
                          <span>{api}</span>
                        </div>
                        <Badge variant="outline">API Ready</Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">View API Documentation</Button>
                </TabsContent>

                <TabsContent value="deploy" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex-col">
                      <Globe className="h-6 w-6 mb-2" />
                      Deploy to Web
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <Code className="h-6 w-6 mb-2" />
                      Download Code
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Deployment Options</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Vercel/Netlify for frontend</li>
                      <li>• Railway/Heroku for backend</li>
                      <li>• PostgreSQL database included</li>
                      <li>• Custom domain ready</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Code className="h-20 w-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Ready to Build Your Startup</p>
                <p>Record your startup idea to generate a complete MVP with frontend, backend, and branding</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceToStartupInterface;
