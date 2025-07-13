
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Twitter, Instagram, Linkedin, Youtube, FileText, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentDNAEngineInterface = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setGenerated({
        tweets: 10,
        posts: 8,
        articles: 3,
        reels: 5
      });
      setLoading(false);
    }, 2500);
  };

  const platforms = [
    { name: 'Twitter', icon: Twitter, count: 10, color: 'text-blue-500' },
    { name: 'Instagram', icon: Instagram, count: 8, color: 'text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, count: 6, color: 'text-blue-600' },
    { name: 'YouTube', icon: Youtube, count: 5, color: 'text-red-500' },
    { name: 'Blog', icon: FileText, count: 3, color: 'text-green-500' }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Camera className="h-8 w-8 text-primary" />
          Content DNA Engine
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform one idea into 50+ content formats across all platforms with your unique style
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Content Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Original Content</label>
              <Textarea
                placeholder="Paste your article, video script, or any content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={!content || loading}
              className="w-full"
            >
              {loading ? 'Generating Content DNA...' : 'Generate 50+ Formats'}
            </Button>
            
            {generated && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-600">✅ Generation Complete!</p>
                <p className="text-xs text-muted-foreground">
                  {generated.tweets + generated.posts + generated.articles + generated.reels} pieces of content ready
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {generated ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="long-form">Long-form</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {platforms.map((platform) => (
                      <div key={platform.name} className="flex items-center gap-3 p-4 border rounded-lg">
                        <platform.icon className={`h-6 w-6 ${platform.color}`} />
                        <div className="flex-1">
                          <p className="font-medium">{platform.name}</p>
                          <p className="text-sm text-muted-foreground">{platform.count} pieces ready</p>
                        </div>
                        <Badge variant="secondary">{platform.count}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <div className="space-y-3">
                    {['Tweet thread (5 parts)', 'Instagram carousel', 'LinkedIn post', 'Facebook post', 'Twitter quotes'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{item}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Preview</Button>
                          <Button size="sm" variant="outline">Export</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="long-form" className="space-y-4">
                  <div className="space-y-3">
                    {['Blog article', 'Newsletter content', 'LinkedIn article', 'Medium post'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-500" />
                          <span>{item}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">~800 words</Badge>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="video" className="space-y-4">
                  <div className="space-y-3">
                    {['YouTube script', 'Instagram Reel script', 'TikTok content', 'Video thumbnails'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Youtube className="h-5 w-5 text-red-500" />
                          <span>{item}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">60s format</Badge>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Upload your content to generate 50+ format variations</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDNAEngineInterface;
