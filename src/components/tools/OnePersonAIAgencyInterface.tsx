
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Palette, Globe, Mail, MessageSquare, BarChart3, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OnePersonAIAgencyInterface = () => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [agency, setAgency] = useState<any>(null);

  const handleCreateAgency = async () => {
    setLoading(true);
    setTimeout(() => {
      setAgency({
        logo: 'Generated',
        website: 'Built',
        campaigns: 3,
        emails: 5
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Briefcase className="h-8 w-8 text-primary" />
          One-Person AI Agency
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete business toolkit: logo, website, ads, emails, and chatbot for solopreneurs
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Setup Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Business Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Business Name</label>
              <Input 
                placeholder="Your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Industry</label>
              <Input 
                placeholder="e.g., Consulting, E-commerce"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateAgency}
              disabled={!businessName || loading}
              className="w-full"
            >
              {loading ? 'Creating Agency...' : 'Launch Agency'}
            </Button>
            
            {agency && (
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Logo Generated</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Website Live</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Campaigns Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Chatbot Active</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Agency Dashboard */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Agency Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            {agency ? (
              <Tabs defaultValue="branding" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="branding">Brand</TabsTrigger>
                  <TabsTrigger value="website">Website</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                  <TabsTrigger value="emails">Emails</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="branding" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <Palette className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">Logo Design</h3>
                        <p className="text-sm text-muted-foreground">AI-generated brand logo</p>
                        <Badge variant="secondary" className="mt-1">Ready</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <Zap className="h-8 w-8 text-green-500" />
                      <div>
                        <h3 className="font-semibold">Brand Guidelines</h3>
                        <p className="text-sm text-muted-foreground">Colors, fonts, style guide</p>
                        <Badge variant="secondary" className="mt-1">Generated</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="website" className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="h-6 w-6 text-blue-500" />
                      <h3 className="font-semibold">Website Status</h3>
                      <Badge variant="default">Live</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your professional website is live with SEO optimization and mobile responsiveness.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Preview</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Analytics</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="marketing" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3].map((campaign) => (
                      <div key={campaign} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Campaign {campaign}</h4>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Targeted ads for {industry.toLowerCase()} industry
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>Impressions: 1.2K</span>
                          <span>CTR: 3.4%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="emails" className="space-y-4">
                  <div className="space-y-3">
                    {['Welcome Series', 'Product Launch', 'Customer Retention', 'Newsletter', 'Re-engagement'].map((email, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{email}</p>
                            <p className="text-sm text-muted-foreground">Automated email sequence</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">Ready</Badge>
                          <Button size="sm" variant="ghost">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <BarChart3 className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-muted-foreground">Website Visits</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <MessageSquare className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-muted-foreground">Leads Generated</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <Mail className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">45%</p>
                      <p className="text-sm text-muted-foreground">Email Open Rate</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg text-center">
                      <Zap className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">$2,340</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Set up your business details to launch your AI agency</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnePersonAIAgencyInterface;
