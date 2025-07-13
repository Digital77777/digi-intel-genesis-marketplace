
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, FileText, Coins, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const SmartContractCoCreatorInterface = () => {
  const [contractType, setContractType] = useState('');
  const [parties, setParties] = useState(['', '']);
  const [generating, setGenerating] = useState(false);
  const [contract, setContract] = useState<any>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setContract({
        type: contractType,
        milestones: 3,
        value: '$5,000',
        timeline: '30 days',
        status: 'Draft'
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          Smart Contract Co-Creator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate and enforce contracts with AI + blockchain for automatic milestone tracking
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contract Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Contract Type</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
              >
                <option value="">Select type...</option>
                <option value="freelance">Freelance Project</option>
                <option value="service">Service Agreement</option>
                <option value="supply">Supply Contract</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Party A (Client)</label>
              <Input 
                placeholder="Enter client details..."
                value={parties[0]}
                onChange={(e) => {
                  const newParties = [...parties];
                  newParties[0] = e.target.value;
                  setParties(newParties);
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Party B (Provider)</label>
              <Input 
                placeholder="Enter provider details..."
                value={parties[1]}
                onChange={(e) => {
                  const newParties = [...parties];
                  newParties[1] = e.target.value;
                  setParties(newParties);
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Project Value</label>
              <Input placeholder="$5,000" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Project Description</label>
              <Textarea 
                placeholder="Describe the project scope and deliverables..."
                rows={4}
              />
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={!contractType || generating}
              className="w-full"
            >
              {generating ? 'Generating Contract...' : 'Generate Smart Contract'}
            </Button>
          </CardContent>
        </Card>

        {/* Contract Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Smart Contract</CardTitle>
          </CardHeader>
          <CardContent>
            {contract ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Freelance Project Contract</h3>
                      <Badge variant="outline">{contract.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{contract.value}</p>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{contract.milestones}</p>
                        <p className="text-sm text-muted-foreground">Milestones</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{contract.timeline}</p>
                        <p className="text-sm text-muted-foreground">Timeline</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Legal Review</span>
                      <Badge variant="secondary">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Blockchain Deployment</span>
                      <Badge variant="outline">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: 'Project Kickoff', amount: '$1,500', status: 'Pending', progress: 0 },
                      { name: 'Development Phase', amount: '$2,500', status: 'Locked', progress: 0 },
                      { name: 'Final Delivery', amount: '$1,000', status: 'Locked', progress: 0 }
                    ].map((milestone, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{milestone.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={milestone.status === 'Pending' ? 'default' : 'secondary'}>
                              {milestone.status}
                            </Badge>
                            <span className="font-semibold">{milestone.amount}</span>
                          </div>
                        </div>
                        <Progress value={milestone.progress} className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Automatic release upon milestone completion
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-3">Payment Schedule</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Milestone 1 (30%)</span>
                        <span className="font-semibold">$1,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Milestone 2 (50%)</span>
                        <span className="font-semibold">$2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Final Payment (20%)</span>
                        <span className="font-semibold">$1,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Coins className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <p className="font-semibold">Escrow Protected</p>
                      <p className="text-sm text-muted-foreground">Funds held securely</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="font-semibold">Auto-Release</p>
                      <p className="text-sm text-muted-foreground">On milestone completion</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="blockchain" className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Blockchain Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Network:</span>
                        <span className="font-semibold">Ethereum</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gas Fee:</span>
                        <span className="font-semibold">~$25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contract Address:</span>
                        <span className="font-mono text-xs">0x1234...abcd</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Deploy to Blockchain
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Contract will be immutable once deployed
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Shield className="h-20 w-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Create Your Smart Contract</p>
                <p>Fill in the contract details to generate a legally sound, blockchain-enforced agreement</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartContractCoCreatorInterface;
