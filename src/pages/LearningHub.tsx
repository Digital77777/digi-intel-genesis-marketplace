
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const courses = [
  {
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML algorithms and applications",
    duration: "8 weeks",
    students: "2.5k",
    rating: 4.9,
    level: "Beginner"
  },
  {
    title: "Deep Learning with Neural Networks",
    description: "Master deep learning concepts and build neural networks",
    duration: "12 weeks",
    students: "1.8k",
    rating: 4.8,
    level: "Advanced"
  },
  {
    title: "Natural Language Processing",
    description: "Understand how machines interpret human language",
    duration: "10 weeks",
    students: "1.2k",
    rating: 4.7,
    level: "Intermediate"
  }
];

const LearningHub = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Learning Hub</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Master AI development with our comprehensive courses and tutorials. Learn from industry experts and build real-world projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>
                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
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

export default LearningHub;
