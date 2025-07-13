
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Box, Zap, Eye, Play, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const AIWorldBuilderInterface = () => {
  const [worldName, setWorldName] = useState('');
  const [complexity, setComplexity] = useState([3]);
  const [building, setBuilding] = useState(false);
  const [currentWorld, setCurrentWorld] = useState<any>(null);

  const handleBuildWorld = () => {
    setBuilding(true);
    setTimeout(() => {
      setCurrentWorld({
        name: worldName,
        complexity: complexity[0],
        objects: Math.floor(Math.random() * 50) + 20,
        interactions: Math.floor(Math.random() * 20) + 10
      });
      setBuilding(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Globe className="h-8 w-8 text-primary" />
          AI World Builder for Educators
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Turn lessons into immersive 3D/VR/AR experiences without any coding required
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* World Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="h-5 w-5" />
              Create World
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">World Name</label>
              <Input 
                placeholder="Ancient Rome Tour"
                value={worldName}
                onChange={(e) => setWorldName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <select className="w-full p-2 border rounded-md">
                <option>History</option>
                <option>Science</option>
                <option>Geography</option>
                <option>Art</option>
                <option>Mathematics</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Complexity</label>
              <Slider
                value={complexity}
                onValueChange={setComplexity}
                max={5}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Simple</span>
                <span>Advanced</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea 
                placeholder="Describe your immersive world..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleBuildWorld}
              disabled={!worldName || building}
              className="w-full"
            >
              {building ? 'Building World...' : 'Build 3D World'}
            </Button>
          </CardContent>
        </Card>

        {/* World Preview & Controls */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>World Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {currentWorld ? (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="objects">Objects</TabsTrigger>
                  <TabsTrigger value="interactions">Interactions</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative">
                    <div className="text-center">
                      <Globe className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                      <p className="font-semibold text-lg">{currentWorld.name}</p>
                      <p className="text-sm text-muted-foreground">3D World Preview</p>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        VR View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        AR Mode
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-500">{currentWorld.objects}</p>
                      <p className="text-sm text-muted-foreground">3D Objects</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-500">{currentWorld.interactions}</p>
                      <p className="text-sm text-muted-foreground">Interactions</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-500">VR/AR</p>
                      <p className="text-sm text-muted-foreground">Ready</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="objects" className="space-y-4">
                  <div className="space-y-3">
                    {['Roman Colosseum', 'Ancient Forum', 'Gladiator Arena', 'Temple of Jupiter', 'Roman Villa'].map((object, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Box className="h-5 w-5 text-blue-500" />
                          <span>{object}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">Interactive</Badge>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Box className="h-4 w-4 mr-2" />
                    Add New Object
                  </Button>
                </TabsContent>

                <TabsContent value="interactions" className="space-y-4">
                  <div className="space-y-3">
                    {['Virtual Tour Guide', 'Historical Timeline', 'Interactive Quiz', 'Audio Narration'].map((interaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Play className="h-5 w-5 text-green-500" />
                          <span>{interaction}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">Active</Badge>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex-col">
                      <Eye className="h-6 w-6 mb-2" />
                      Export for VR
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <Globe className="h-6 w-6 mb-2" />
                      Export for AR
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <Settings className="h-6 w-6 mb-2" />
                      Web Version
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <Play className="h-6 w-6 mb-2" />
                      Mobile App
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Globe className="h-20 w-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Create Your First 3D World</p>
                <p>Fill in the details on the left to build an immersive educational experience</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIWorldBuilderInterface;
