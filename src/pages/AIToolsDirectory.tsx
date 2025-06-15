
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const tools = [
  {
    name: "GPT-4 Integration",
    description: "Advanced language model integration for your applications",
    rating: 4.8,
    users: "10k+",
    category: "Language Models"
  },
  {
    name: "Computer Vision API",
    description: "Powerful image recognition and analysis tools",
    rating: 4.6,
    users: "5k+",
    category: "Computer Vision"
  },
  {
    name: "Speech-to-Text Pro",
    description: "High-accuracy speech recognition service",
    rating: 4.7,
    users: "8k+",
    category: "Audio Processing"
  }
];

const AIToolsDirectory = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Tools Directory</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover and integrate the best AI tools for your projects. From language models to computer vision, find everything you need.
              </p>
            </div>
            
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg" 
                  placeholder="Search AI tools..."
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {tool.name}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{tool.rating}</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{tool.category}</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{tool.users}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIToolsDirectory;
