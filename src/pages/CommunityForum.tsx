import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, Video, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { communityService } from "@/services/communityService";
import DiscussionThreads from "@/components/community/DiscussionThreads";
import LiveChat from "@/components/community/LiveChat";
import CommunityStats from "@/components/community/CommunityStats";
import ChatRoomList from "@/components/community/ChatRoomList";
import VideoRoomCard from "@/components/community/VideoRoomCard";

const CommunityForum = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [videoRooms, setVideoRooms] = useState([]);
  const { user } = useAuth();

  // Mock participants for video chat
  const participants = [
    { id: '1', name: 'Alex Chen' },
    { id: '2', name: 'Sarah Kim' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Emma Wilson' },
    { id: '5', name: 'David Lee' }
  ];

  useEffect(() => {
    loadChatRooms();
    loadVideoRooms();
  }, []);

  const loadChatRooms = async () => {
    try {
      const rooms = await communityService.getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error('Failed to load chat rooms:', error);
    }
  };

  const loadVideoRooms = async () => {
    try {
      const rooms = await communityService.getVideoRooms();
      setVideoRooms(rooms);
    } catch (error) {
      console.error('Failed to load video rooms:', error);
    }
  };

  const handleJoinVideoRoom = (roomId: string) => {
    console.log('Joining video room:', roomId);
    // Implement video room joining logic
  };
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
              <CommunityStats
                totalMembers={24500}
                onlineMembers={1200}
                activeRooms={156}
                dailyMessages={8900}
              />

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mb-8">
                <Button size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" size="lg">
                  <Video className="h-4 w-4 mr-2" />
                  Join Live Room
                </Button>
              </div>
            </div>

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
                    <LiveChat roomId={activeRoom} />
                  </div>
                  <div className="space-y-4">
                    <ChatRoomList
                      rooms={chatRooms}
                      activeRoom={activeRoom}
                      onRoomSelect={setActiveRoom}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video-rooms">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VideoChat roomId="ai-research-room" participants={participants} />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Rooms</h3>
                    <div className="grid gap-3">
                      {videoRooms.map((room) => (
                        <VideoRoomCard
                          key={room.id}
                          room={room}
                          onJoin={handleJoinVideoRoom}
                        />
                      ))}
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