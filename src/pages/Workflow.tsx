
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Workflow as WorkflowIcon, Play, Settings, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Workflow = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Workflow Designer</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Design, automate, and manage your AI development workflows. Streamline your processes from data to deployment.
              </p>
            </div>

            <div className="mb-8">
              <Button>
                <WorkflowIcon className="h-4 w-4 mr-2" />
                Create New Workflow
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    ML Training Pipeline
                  </CardTitle>
                  <CardDescription>
                    Automated workflow for model training and validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Status:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Run:</span>
                      <span className="text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Success Rate:</span>
                      <span className="text-muted-foreground">94%</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Data Processing
                  </CardTitle>
                  <CardDescription>
                    Automated data cleaning and preprocessing pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Status:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">Running</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Run:</span>
                      <span className="text-muted-foreground">15 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Success Rate:</span>
                      <span className="text-muted-foreground">98%</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Model Deployment
                  </CardTitle>
                  <CardDescription>
                    Automated deployment and monitoring workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Status:</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Paused</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Run:</span>
                      <span className="text-muted-foreground">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Success Rate:</span>
                      <span className="text-muted-foreground">89%</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
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

export default Workflow;
