
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GitBranch, Play, Settings, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const PipelineDesigner = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Pipeline Designer</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Design and orchestrate complex AI data pipelines with our visual interface. Connect data sources, processing steps, and outputs seamlessly.
              </p>
            </div>

            <div className="mb-8">
              <Button>
                <GitBranch className="h-4 w-4 mr-2" />
                Create New Pipeline
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline Canvas</CardTitle>
                    <CardDescription>Drag and drop components to build your pipeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Drag components here to start building your pipeline</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Components</CardTitle>
                    <CardDescription>Available pipeline components</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Data Source</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Connect to databases, APIs, files</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Data Transform</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Clean, filter, and process data</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">ML Model</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Apply machine learning models</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Data Output</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Store results in databases, files</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Properties</CardTitle>
                    <CardDescription>Configure selected component</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Select a component to configure its properties</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Pipelines</CardTitle>
                  <CardDescription>Your recently created and modified pipelines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Customer Analytics Pipeline</h4>
                      <p className="text-sm text-muted-foreground mb-3">Data processing for customer behavior analysis</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Run</Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Fraud Detection Pipeline</h4>
                      <p className="text-sm text-muted-foreground mb-3">Real-time fraud detection and alerting</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Run</Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Recommendation Engine</h4>
                      <p className="text-sm text-muted-foreground mb-3">Product recommendation data pipeline</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Run</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PipelineDesigner;
