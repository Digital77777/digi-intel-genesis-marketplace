
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, ThumbsUp, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const discussions = [
  {
    title: "Best practices for training large language models",
    author: "alex_dev",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    category: "Machine Learning"
  },
  {
    title: "How to optimize inference speed for computer vision models?",
    author: "vision_expert",
    replies: 12,
    likes: 28,
    timeAgo: "5 hours ago",
    category: "Computer Vision"
  },
  {
    title: "Ethical considerations in AI development",
    author: "ai_ethicist",
    replies: 34,
    likes: 67,
    timeAgo: "1 day ago",
    category: "AI Ethics"
  }
];

const CommunityForum = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Community Forum</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with fellow AI developers, share knowledge, ask questions, and collaborate on exciting projects.
              </p>
            </div>

            <div className="mb-8">
              <Button>Start New Discussion</Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {discussion.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {discussion.timeAgo}
                      </div>
                    </div>
                    <CardTitle className="hover:text-primary cursor-pointer">
                      {discussion.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      by {discussion.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{discussion.likes} likes</span>
                      </div>
                    </div>
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

export default CommunityForum;
