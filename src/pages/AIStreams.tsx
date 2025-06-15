
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, Users, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const streams = [
  {
    title: "Live: Building AI Chatbots",
    presenter: "Dr. Sarah Chen",
    viewers: "1.2k",
    status: "live",
    duration: "2h 30m",
    scheduled: "Now"
  },
  {
    title: "Computer Vision Workshop",
    presenter: "Mark Rodriguez",
    viewers: "856",
    status: "upcoming",
    duration: "1h 45m",
    scheduled: "Tomorrow 2PM"
  },
  {
    title: "AI Ethics Discussion",
    presenter: "Prof. Emily Johnson",
    viewers: "2.1k",
    status: "recorded",
    duration: "1h 15m",
    scheduled: "Last week"
  }
];

const AIStreams = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Streams</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join live AI development sessions, workshops, and discussions. Learn from experts and interact with the community in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streams.map((stream, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        stream.status === 'live' ? 'bg-red-100 text-red-600' :
                        stream.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {stream.status === 'live' ? '🔴 LIVE' : 
                         stream.status === 'upcoming' ? '⏰ Upcoming' : '📹 Recorded'}
                      </span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{stream.viewers}</span>
                      </div>
                    </div>
                    <CardTitle>{stream.title}</CardTitle>
                    <CardDescription>by {stream.presenter}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        {stream.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {stream.scheduled}
                      </div>
                    </div>
                    <Button className="w-full" variant={stream.status === 'live' ? 'default' : 'outline'}>
                      {stream.status === 'live' ? 'Join Live' :
                       stream.status === 'upcoming' ? 'Set Reminder' : 'Watch Recording'}
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

export default AIStreams;
