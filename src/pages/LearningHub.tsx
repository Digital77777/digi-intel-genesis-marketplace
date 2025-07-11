import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Clock, Users, Star, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
const courses = [{
  title: "Deep Learning Specialization by Andrew Ng",
  description: "Learn the fundamentals of neural networks, CNNs, RNNs, and sequence models from the pioneer of deep learning.",
  duration: "Full Course",
  students: "2.5M+",
  rating: 4.9,
  level: "Intermediate",
  channel: "DeepLearningAI",
  topics: ["Neural Networks", "CNNs", "RNNs", "Sequence Models"],
  playlistId: "PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEky0",
  videoId: "CS4cs9xVecg"
}, {
  title: "CS50's Introduction to AI with Python (Harvard)",
  description: "Harvard's comprehensive introduction to AI concepts using Python programming.",
  duration: "12 weeks",
  students: "1.8M+",
  rating: 4.8,
  level: "Beginner",
  channel: "CS50",
  topics: ["Search Algorithms", "Machine Learning", "Neural Networks", "NLP"],
  playlistId: "PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8",
  videoId: "5NgNicANyqM"
}, {
  title: "MIT 6.S191: Introduction to Deep Learning",
  description: "MIT's cutting-edge deep learning course covering theory and practical applications with TensorFlow.",
  duration: "10 weeks",
  students: "1.2M+",
  rating: 4.7,
  level: "Intermediate",
  channel: "MIT OpenCourseWare",
  topics: ["Deep Learning Theory", "TensorFlow", "Applications"],
  playlistId: "PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6",
  videoId: "njKP3FqW3Sk"
}, {
  title: "Machine Learning Full Course - Simplilearn",
  description: "Complete 10-hour machine learning course covering supervised and unsupervised learning with real-world projects.",
  duration: "10 hours",
  students: "800K+",
  rating: 4.6,
  level: "Beginner",
  channel: "Simplilearn",
  topics: ["Supervised ML", "Unsupervised ML", "Real-world Projects"],
  playlistId: "",
  videoId: "GwIo3gDZCVQ"
}, {
  title: "AI for Everyone - Andrew Ng (Non-technical)",
  description: "Perfect for business leaders and non-coders to understand AI strategy, applications, and ethics.",
  duration: "6 weeks",
  students: "950K+",
  rating: 4.8,
  level: "Beginner",
  channel: "DeepLearningAI",
  topics: ["AI Strategy", "Applications", "Ethics"],
  playlistId: "PLkDaE6sCZn6F6wUI9tvS_Gw1vaFAx6rd6",
  videoId: "O5xeyoRL95U"
}, {
  title: "Neural Networks from Scratch - Sentdex",
  description: "Learn to build neural networks from scratch using Python without any libraries.",
  duration: "15+ hours",
  students: "650K+",
  rating: 4.7,
  level: "Intermediate",
  channel: "Sentdex",
  topics: ["Python Coding", "Neural Networks", "From Scratch"],
  playlistId: "PLQVvvaa0QuDdttJXlLtAJxJetJcqmqlQq",
  videoId: "Wo5dMEP_BbI"
}, {
  title: "Fast.ai Practical Deep Learning for Coders",
  description: "Hands-on deep learning course focusing on vision, NLP, and tabular models using PyTorch.",
  duration: "14 weeks",
  students: "500K+",
  rating: 4.9,
  level: "Intermediate",
  channel: "fastai",
  topics: ["Vision", "NLP", "PyTorch", "Tabular Models"],
  playlistId: "PLfYUBJiXbdtSL3ajtG6lbiFdlIP_hjWlG",
  videoId: "8SF_h3xF3cE"
}, {
  title: "FreeCodeCamp - Artificial Intelligence Full Course",
  description: "Comprehensive 6-hour course covering AI principles, machine learning, search algorithms, and NLP.",
  duration: "6 hours",
  students: "1.1M+",
  rating: 4.6,
  level: "Beginner",
  channel: "freeCodeCamp.org",
  topics: ["AI Principles", "ML", "Search", "Logic", "NLP"],
  playlistId: "",
  videoId: "JMUxmLyrhSk"
}, {
  title: "AI for Robotics - Sebastian Thrun (Udacity)",
  description: "Learn AI concepts applied to robotics including path planning, localization, and filtering.",
  duration: "8 weeks",
  students: "400K+",
  rating: 4.5,
  level: "Intermediate",
  channel: "Udacity",
  topics: ["Path Planning", "Localization", "Filtering", "Robotics"],
  playlistId: "PLAwxTw4SYaPnMwH3z3tqsI_eVmSRk8fZb",
  videoId: "4ErEBkj_3PY"
}, {
  title: "Build an AI Startup - Latent Space",
  description: "Learn how to build AI products and start AI companies from industry experts and successful founders.",
  duration: "Ongoing",
  students: "200K+",
  rating: 4.7,
  level: "All Levels",
  channel: "Latent Space",
  topics: ["AI Tools", "Product Building", "Startup Strategy", "Business"],
  playlistId: "",
  videoId: "5xvF0jNNmT4"
}];
const LearningHub = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const getLevelColor = level => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };
  const getEmbedUrl = videoId => {
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
  };
  return <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto bg-slate-50">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-800">
                <BookOpen className="h-4 w-4" />
                <span>Premium AI Education - Free Access</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-blue-700">
                Master AI with
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  World-Class Courses
                </span>
              </h1>
              <p className="text-lg max-w-3xl mx-auto mb-8 text-neutral-950">
                Learn from industry experts and top universities. Watch high-quality AI courses directly in our platform, 
                from beginner-friendly introductions to advanced deep learning specializations.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-violet-800">10M+ Students Learning</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-violet-800">4.7 Average Rating</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-violet-800">100+ Hours Content</span>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${getLevelColor(course.level)} border-0`}>
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Course Stats */}
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

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.topics.slice(0, 3).map((topic, idx) => <Badge key={idx} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>)}
                      {course.topics.length > 3 && <Badge variant="secondary" className="text-xs">
                          +{course.topics.length - 3} more
                        </Badge>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" onClick={() => setSelectedCourse(course)}>
                            <Play className="h-4 w-4 mr-2" />
                            Watch Course
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] p-0">
                          <DialogHeader className="p-6 pb-0">
                            <DialogTitle className="text-xl">{course.title}</DialogTitle>
                          </DialogHeader>
                          <div className="p-6 pt-4">
                            <div className="aspect-video rounded-lg overflow-hidden bg-black">
                              <iframe width="100%" height="100%" src={getEmbedUrl(course.videoId)} title={course.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-lg"></iframe>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="text-sm text-muted-foreground">
                                By {course.channel}
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <a href={`https://youtube.com/playlist?list=${course.playlistId || `watch?v=${course.videoId}`}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <ExternalLink className="h-3 w-3" />
                                  Full Playlist
                                </a>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your AI Journey?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join millions of learners who are mastering AI skills with our curated collection of premium courses. 
                  All content is free and available to watch directly in our platform.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Learning Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default LearningHub;