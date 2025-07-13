
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Palette, Code, Zap, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const AIStudio = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Studio</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create, experiment, and deploy AI models with our powerful visual development environment. No coding required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Palette className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Visual Builder</h3>
                  <p className="text-sm text-muted-foreground">Drag and drop components to build AI models</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Code Generation</h3>
                  <p className="text-sm text-muted-foreground">Automatically generate production-ready code</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quick Deploy</h3>
                  <p className="text-sm text-muted-foreground">Deploy models with one-click deployment</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Cpu className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">GPU Acceleration</h3>
                  <p className="text-sm text-muted-foreground">High-performance computing resources</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your latest AI Studio projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Image Classifier</h4>
                        <p className="text-sm text-muted-foreground">Last modified 2 hours ago</p>
                      </div>
                      <Button size="sm" variant="outline">Open</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Text Summarizer</h4>
                        <p className="text-sm text-muted-foreground">Last modified 1 day ago</p>
                      </div>
                      <Button size="sm" variant="outline">Open</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Sentiment Analysis</h4>
                        <p className="text-sm text-muted-foreground">Last modified 3 days ago</p>
                      </div>
                      <Button size="sm" variant="outline">Open</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Templates</CardTitle>
                  <CardDescription>Start with pre-built AI model templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Computer Vision</h4>
                        <p className="text-sm text-muted-foreground">Image classification and object detection</p>
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Natural Language Processing</h4>
                        <p className="text-sm text-muted-foreground">Text analysis and language models</p>
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Time Series Forecasting</h4>
                        <p className="text-sm text-muted-foreground">Predict future trends and patterns</p>
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg">
                <Palette className="h-5 w-5 mr-2" />
                Start Building
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIStudio;
