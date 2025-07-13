
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, GitBranch, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const projects = [
  {
    name: "Medical Image Analysis",
    description: "Collaborative project for developing AI models to analyze medical images",
    members: 12,
    status: "Active",
    deadline: "2 weeks",
    skills: ["Computer Vision", "Python", "TensorFlow"]
  },
  {
    name: "Climate Change Prediction",
    description: "Using machine learning to predict climate patterns and environmental changes",
    members: 8,
    status: "Recruiting",
    deadline: "1 month",
    skills: ["Data Science", "R", "Time Series"]
  },
  {
    name: "NLP Chatbot Framework",
    description: "Building an open-source framework for creating intelligent chatbots",
    members: 15,
    status: "Active",
    deadline: "3 weeks",
    skills: ["NLP", "Python", "React"]
  }
];

const CollaborationHub = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Collaboration Hub</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find team members, join exciting AI projects, and collaborate on innovative solutions that make a difference.
              </p>
            </div>

            <div className="mb-8">
              <Button>Create New Project</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {project.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{project.deadline}</span>
                      </div>
                    </div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.members} members</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full">
                      <GitBranch className="h-4 w-4 mr-2" />
                      {project.status === 'Recruiting' ? 'Join Project' : 'View Details'}
                    </Button>
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

export default CollaborationHub;
