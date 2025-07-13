
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Award, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const LearningAcademy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Learning Academy</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advance your AI expertise with structured learning paths, certifications, and hands-on projects designed by industry experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Courses</h3>
                  <p className="text-2xl font-bold">120+</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <p className="text-2xl font-bold">25</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Learning Paths</h3>
                  <p className="text-2xl font-bold">15</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Students</h3>
                  <p className="text-2xl font-bold">50k+</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Beginner Path</CardTitle>
                  <CardDescription>Start your AI journey from the basics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Introduction to AI</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Python for AI</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">In Progress</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Machine Learning Basics</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">First ML Project</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Continue Learning</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Intermediate Path</CardTitle>
                  <CardDescription>Deepen your AI knowledge and skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deep Learning Fundamentals</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Neural Networks</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">In Progress</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Computer Vision</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">NLP Applications</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Start Path</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Path</CardTitle>
                  <CardDescription>Master advanced AI concepts and techniques</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Advanced Deep Learning</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reinforcement Learning</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI System Design</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Production Deployment</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Unlock Path</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Available Certifications</CardTitle>
                <CardDescription>Industry-recognized certifications to validate your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Award className="h-8 w-8 text-yellow-600 mb-3" />
                    <h4 className="font-medium mb-2">AI Developer Certified</h4>
                    <p className="text-sm text-muted-foreground mb-3">Fundamental AI development skills</p>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Award className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-medium mb-2">ML Engineer Certified</h4>
                    <p className="text-sm text-muted-foreground mb-3">Advanced machine learning engineering</p>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Award className="h-8 w-8 text-purple-600 mb-3" />
                    <h4 className="font-medium mb-2">AI Architect Certified</h4>
                    <p className="text-sm text-muted-foreground mb-3">Enterprise AI system architecture</p>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearningAcademy;
