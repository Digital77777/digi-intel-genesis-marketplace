
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, BarChart3, PieChart, TrendingUp, Download, RefreshCw, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataAnalyzerInterface = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
      toast({
        title: "File Uploaded",
        description: `${file.name} ready for analysis.`
      });
    }
  };

  const analyzeData = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        summary: {
          totalRows: 10847,
          totalColumns: 12,
          missingValues: 156,
          duplicates: 23
        },
        columns: [
          { name: 'Date', type: 'datetime', unique: 365, nulls: 0 },
          { name: 'Sales', type: 'numeric', min: 1250, max: 98400, avg: 15680 },
          { name: 'Region', type: 'categorical', unique: 5, nulls: 2 },
          { name: 'Product', type: 'categorical', unique: 48, nulls: 12 }
        ],
        insights: [
          'Sales show strong seasonal patterns with peaks in Q4',
          'North region consistently outperforms other regions by 23%',
          'Product category A accounts for 67% of total revenue',
          'Data quality is good with only 1.4% missing values'
        ],
        correlations: [
          { vars: ['Sales', 'Marketing_Spend'], correlation: 0.78 },
          { vars: ['Region', 'Sales'], correlation: 0.45 },
          { vars: ['Date', 'Sales'], correlation: 0.23 }
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your data has been successfully analyzed."
      });
    }, 3500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Data Analyzer</h1>
        </div>
        <p className="text-muted-foreground">Upload and analyze your datasets with AI-powered insights</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <label className="cursor-pointer">
                  <span className="text-primary font-medium">Choose a file</span>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-muted-foreground mt-2">CSV, Excel, JSON up to 50MB</p>
              </div>
            </div>

            {selectedFile && (
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <Button 
                  onClick={analyzeData} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze Data
                    </>
                  )}
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing data...</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {analysisResult ? (
            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="columns">Columns</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="correlations">Correlations</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-secondary" />
                      Data Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">Total Rows</span>
                          <Badge variant="secondary">{analysisResult.summary.totalRows.toLocaleString()}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">Total Columns</span>
                          <Badge variant="secondary">{analysisResult.summary.totalColumns}</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">Missing Values</span>
                          <Badge variant="outline">{analysisResult.summary.missingValues}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">Duplicates</span>
                          <Badge variant="outline">{analysisResult.summary.duplicates}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="columns">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-secondary" />
                      Column Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.columns.map((col: any, index: number) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{col.name}</span>
                            <Badge variant="outline">{col.type}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                            <span>Unique: {col.unique}</span>
                            <span>Nulls: {col.nulls}</span>
                            {col.avg && <span>Avg: {col.avg.toLocaleString()}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.insights.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="correlations">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-secondary" />
                      Correlations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.correlations.map((corr: any, index: number) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {corr.vars[0]} ↔ {corr.vars[1]}
                            </span>
                            <Badge 
                              variant={corr.correlation > 0.5 ? "default" : "secondary"}
                            >
                              {corr.correlation.toFixed(2)}
                            </Badge>
                          </div>
                          <Progress value={Math.abs(corr.correlation) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="py-16">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload a dataset to see analysis results</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAnalyzerInterface;
