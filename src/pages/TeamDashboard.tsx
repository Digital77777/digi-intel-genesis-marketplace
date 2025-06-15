
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart, Users, TrendingUp, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const TeamDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Team Dashboard</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Monitor your team's progress, track project milestones, and analyze performance metrics in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BarChart className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Due This Week</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Sarah completed ML model training</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">New team member joined</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Project milestone reached</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Computer Vision Model</p>
                        <p className="text-xs text-muted-foreground">Due in 3 days</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">High Priority</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Data Pipeline Setup</p>
                        <p className="text-xs text-muted-foreground">Due in 1 week</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Medium Priority</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">API Documentation</p>
                        <p className="text-xs text-muted-foreground">Due in 2 weeks</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Low Priority</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeamDashboard;
