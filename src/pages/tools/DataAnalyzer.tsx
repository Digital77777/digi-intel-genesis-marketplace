
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Upload, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DataAnalyzer = () => {
  const [dataInput, setDataInput] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeData = () => {
    if (!dataInput.trim()) {
      toast({
        title: "Please enter some data",
        description: "You need to provide data for analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis(`Data Analysis Results:

📊 Dataset Overview:
• Total records: 150
• Variables: 5
• Data types: Mixed (numeric, categorical)

📈 Statistical Summary:
• Mean: 45.2
• Median: 42.0
• Standard deviation: 12.8
• Range: 25-75

🔍 Key Insights:
• Strong positive correlation between variables A and B (r=0.82)
• Outliers detected in column C (3 values)
• Missing values: 2% of dataset
• Distribution: Normal with slight right skew

💡 Recommendations:
• Consider removing outliers for better model performance
• Handle missing values using imputation
• Variable B shows predictive potential

This is a sample analysis. In a real implementation, this would provide comprehensive statistical analysis of your data.`);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your data has been analyzed successfully."
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDataInput(e.target?.result as string);
        toast({
          title: "File uploaded",
          description: "Your data file has been loaded."
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
              <BarChart className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Data Analyzer</h1>
            <p className="text-slate-600">Analyze and visualize your data with AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Data Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".csv,.json,.txt"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Or paste your data here (CSV, JSON, or text format)
                  </label>
                  <Textarea
                    placeholder="Enter your data here..."
                    value={dataInput}
                    onChange={(e) => setDataInput(e.target.value)}
                    rows={8}
                    className="resize-none font-mono text-sm"
                  />
                </div>
                
                <Button 
                  onClick={analyzeData} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Data'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center justify-between">
                  Analysis Results
                  {analysis && (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-4 min-h-64">
                  {analysis ? (
                    <pre className="whitespace-pre-wrap text-sm text-slate-700">{analysis}</pre>
                  ) : (
                    <p className="text-slate-500 italic">Analysis results will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataAnalyzer;
