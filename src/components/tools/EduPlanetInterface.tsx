
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Users, Coins, Star, BookOpen, Trophy, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const EduPlanetInterface = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [coins, setCoins] = useState(150);
  const [level, setLevel] = useState(5);

  const learningOpportunities = [
    { subject: 'JavaScript Basics', teacher: 'Sarah M.', rating: 4.9, coins: 20, duration: '45 min' },
    { subject: 'Spanish Conversation', teacher: 'Carlos R.', rating: 4.8, coins: 15, duration: '30 min' },
    { subject: 'Digital Marketing', teacher: 'Emma L.', rating: 4.7, coins: 25, duration: '60 min' },
  ];

  const teachingOpportunities = [
    { subject: 'Mathematics', students: 12, coinsPerHour: 30, nextSession: '2:00 PM' },
    { subject: 'English Writing', students: 8, coinsPerHour: 25, nextSession: '3:00 PM' },
    { subject: 'Photography', students: 15, coinsPerHour: 35, nextSession: '4:00 PM' },
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Globe className="h-8 w-8 text-primary" />
          EduPlanet: Peer Learning Platform
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn something, then earn by teaching it back - democratizes education and income globally
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Coins className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{coins}</p>
            <p className="text-sm text-muted-foreground">EduCoins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">Level {level}</p>
            <p className="text-sm text-muted-foreground">Learner</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Courses Taken</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Students Taught</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Find Tutors
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Start Teaching
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Coins className="h-4 w-4 mr-2" />
              Withdraw Earnings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Trophy className="h-4 w-4 mr-2" />
              View Achievements
            </Button>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Learning & Earning Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="learn">Learn</TabsTrigger>
                <TabsTrigger value="teach">Teach</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Available Sessions</h3>
                  <Input placeholder="Search topics..." className="max-w-xs" />
                </div>
                
                <div className="space-y-3">
                  {learningOpportunities.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{session.teacher.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{session.subject}</p>
                          <p className="text-sm text-muted-foreground">by {session.teacher}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{session.rating}</span>
                            </div>
                            <Badge variant="outline">{session.duration}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          {session.coins}
                        </p>
                        <Button size="sm" className="mt-2">Join Session</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teach" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Teaching Sessions</h3>
                  <Button>Create New Session</Button>
                </div>
                
                <div className="space-y-3">
                  {teachingOpportunities.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{session.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.students} students enrolled
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Next: {session.nextSession}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          {session.coinsPerHour}/hour
                        </p>
                        <Button size="sm" className="mt-2">Start Session</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">$245</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">$1,230</p>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">32</p>
                    <p className="text-sm text-muted-foreground">Hours Taught</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600">4.8</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Earnings</h4>
                  {[
                    { subject: 'JavaScript Basics', amount: '$45', date: 'Today' },
                    { subject: 'Spanish Conversation', amount: '$30', date: 'Yesterday' },
                    { subject: 'Digital Marketing', amount: '$60', date: '2 days ago' }
                  ].map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{earning.subject}</p>
                        <p className="text-sm text-muted-foreground">{earning.date}</p>
                      </div>
                      <p className="font-semibold text-green-600">{earning.amount}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Top Learners</h4>
                    <div className="space-y-2">
                      {['Alice Chen', 'Bob Rodriguez', 'Carol Kim'].map((name, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{name}</span>
                          </div>
                          <Badge variant="outline">Level {7 - index}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Top Teachers</h4>
                    <div className="space-y-2">
                      {['Sarah Martinez', 'David Lee', 'Emma Johnson'].map((name, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{(4.9 - index * 0.1).toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full">Join Community Discord</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EduPlanetInterface;
