import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, Video, Users, Plus, TrendingUp, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiscussionThreads from "@/components/community/DiscussionThreads";
import LiveChat from "@/components/community/LiveChat";
import VideoChat from "@/components/community/VideoChat";
import CreatePost from "@/components/community/CreatePost";
const CommunityForum = () => {
  const [activeRoom, setActiveRoom] = useState("general");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const participants = [{
    id: '1',
    name: 'Alex Chen'
  }, {
    id: '2',
    name: 'Sarah Kim'
  }, {
    id: '3',
    name: 'Mike Johnson'
  }, {
    id: '4',
    name: 'Emma Wilson'
  }, {
    id: '5',
    name: 'David Lee'
  }];
  return <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Community Forum
              </h1>
              <p className="text-lg max-w-3xl mx-auto mb-6 text-slate-950">
                Join thousands of AI enthusiasts, researchers, and developers. Share knowledge, collaborate on projects, 
                and engage in live discussions about the future of artificial intelligence.
              </p>
              
              {/* Quick Stats */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24.5K</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1.2K</div>
                  <div className="text-sm text-muted-foreground">Online Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Live Rooms</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mb-8">
                <Button onClick={() => setShowCreatePost(!showCreatePost)} size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" size="lg">
                  <Video className="h-4 w-4 mr-2" />
                  Join Live Room
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex justify-center gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search discussions, topics, or users..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Create Post Section */}
            {showCreatePost && <div className="mb-8">
                <CreatePost />
              </div>}

            {/* Main Content */}
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="discussions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="live-chat" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Live Chat
                </TabsTrigger>
                <TabsTrigger value="video-rooms" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Rooms
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions">
                <DiscussionThreads />
              </TabsContent>

              <TabsContent value="live-chat">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <LiveChat roomId={activeRoom} currentUser="You" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold mb-2">Active Rooms</h3>
                      <div className="space-y-2">
                        {['general', 'ai-research', 'ml-help', 'career-advice'].map(room => <button key={room} onClick={() => setActiveRoom(room)} className={`w-full text-left p-2 rounded text-sm hover:bg-muted transition-colors ${activeRoom === room ? 'bg-primary text-primary-foreground' : ''}`}>
                            #{room}
                          </button>)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video-rooms">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VideoChat roomId="ai-research-room" participants={participants} />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Rooms</h3>
                    <div className="space-y-3">
                      {[{
                      name: 'AI Research Discussion',
                      participants: 12,
                      topic: 'Latest papers review'
                    }, {
                      name: 'ML Career Advice',
                      participants: 8,
                      topic: 'Breaking into AI jobs'
                    }, {
                      name: 'Open Source Projects',
                      participants: 15,
                      topic: 'Collaboration opportunities'
                    }, {
                      name: 'Beginner Friendly',
                      participants: 23,
                      topic: 'AI fundamentals Q&A'
                    }].map((room, index) => <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{room.name}</h4>
                            <span className="text-sm text-muted-foreground">{room.participants} online</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{room.topic}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            Join Room
                          </Button>
                        </div>)}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default CommunityForum;