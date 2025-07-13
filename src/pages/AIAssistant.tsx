
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const AIAssistant = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get instant help with your AI projects. Ask questions, get code suggestions, and receive expert guidance 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat with AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex-grow bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-sm">Hello! I'm your AI assistant. How can I help you with your AI project today?</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 flex-row-reverse">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div className="bg-primary text-white p-3 rounded-lg">
                            <p className="text-sm">I need help optimizing my neural network model. It's taking too long to train.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-sm">I can help you optimize your neural network! Here are some strategies:</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Use batch normalization to speed up convergence</li>
                              <li>• Implement learning rate scheduling</li>
                              <li>• Consider using a smaller, more efficient architecture</li>
                              <li>• Try mixed precision training to reduce memory usage</li>
                            </ul>
                            <p className="text-sm mt-2">Would you like me to show you code examples for any of these techniques?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input 
                          className="w-full pr-20 pl-4 py-2 border rounded-lg" 
                          placeholder="Type your message..."
                        />
                        <div className="absolute right-2 top-2 flex items-center gap-1">
                          <Button size="sm" variant="ghost">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mic className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Debug my code
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Explain a concept
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Code review
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Architecture advice
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Performance optimization
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversations</CardTitle>
                    <CardDescription>Your chat history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <p className="text-sm font-medium">Model Training Issues</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                      <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <p className="text-sm font-medium">Data Preprocessing Help</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                      <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <p className="text-sm font-medium">PyTorch vs TensorFlow</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Capabilities</CardTitle>
                    <CardDescription>What I can help you with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Code debugging & optimization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Architecture recommendations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Best practices guidance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Concept explanations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>Technology comparisons</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
