
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, BarChart, PieChart, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const BusinessInsights = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Business Insights</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform your data into actionable business intelligence with AI-powered analytics and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
                      <p className="text-2xl font-bold">+23.4%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BarChart className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Model Accuracy</p>
                      <p className="text-2xl font-bold">94.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <PieChart className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Cost Reduction</p>
                      <p className="text-2xl font-bold">-18.7%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Efficiency Gain</p>
                      <p className="text-2xl font-bold">+41.3%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Model Performance</CardTitle>
                  <CardDescription>Model accuracy and prediction confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Image Classification</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-20 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">94%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Text Analysis</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-22 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">91%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Predictive Analytics</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-18 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">87%</span>
                      </div>
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

export default BusinessInsights;
