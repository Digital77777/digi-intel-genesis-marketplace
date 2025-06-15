
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const ComplianceCentre = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Compliance Centre</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ensure your AI systems meet regulatory requirements and ethical standards. Monitor compliance, manage audits, and maintain documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Compliant Models</h3>
                  <p className="text-2xl font-bold text-green-600">87%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pending Reviews</h3>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Security Score</h3>
                  <p className="text-2xl font-bold text-blue-600">94/100</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Frameworks</CardTitle>
                  <CardDescription>Track adherence to regulatory standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">GDPR</h4>
                        <p className="text-sm text-muted-foreground">General Data Protection Regulation</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Compliant</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">HIPAA</h4>
                        <p className="text-sm text-muted-foreground">Health Insurance Portability Act</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Compliant</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">SOX</h4>
                        <p className="text-sm text-muted-foreground">Sarbanes-Oxley Act</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Review Needed</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">EU AI Act</h4>
                        <p className="text-sm text-muted-foreground">European Union AI Regulation</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">In Progress</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Audits</CardTitle>
                  <CardDescription>Compliance audit history and results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Q4 2024 Security Audit</h4>
                        <p className="text-sm text-muted-foreground">Completed 2 weeks ago</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">GDPR Compliance Check</h4>
                        <p className="text-sm text-muted-foreground">Completed 1 month ago</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Bias Testing Review</h4>
                        <p className="text-sm text-muted-foreground">Scheduled for next week</p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Documentation & Reports</CardTitle>
                <CardDescription>Access compliance documentation and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-medium mb-2">Model Documentation</h4>
                    <p className="text-sm text-muted-foreground mb-3">Comprehensive model documentation and lineage</p>
                    <Button size="sm" variant="outline">View Docs</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-green-600 mb-3" />
                    <h4 className="font-medium mb-2">Compliance Reports</h4>
                    <p className="text-sm text-muted-foreground mb-3">Generate detailed compliance reports</p>
                    <Button size="sm" variant="outline">Generate Report</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-purple-600 mb-3" />
                    <h4 className="font-medium mb-2">Audit Trails</h4>
                    <p className="text-sm text-muted-foreground mb-3">Complete audit trails and access logs</p>
                    <Button size="sm" variant="outline">View Trails</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComplianceCentre;
