
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CodeAssistant = () => {
  const [codeInput, setCodeInput] = useState('');
  const [assistance, setAssistance] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [assistanceType, setAssistanceType] = useState('review');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const getAssistance = () => {
    if (!codeInput.trim()) {
      toast({
        title: "Please enter some code",
        description: "You need to provide code for assistance.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      let result = '';
      switch (assistanceType) {
        case 'review':
          result = `Code Review for ${language}:\n\n✅ Strengths:\n• Code structure looks good\n• Variable naming is clear\n\n⚠️ Suggestions:\n• Consider adding error handling\n• Add comments for complex logic\n• Consider using more descriptive variable names\n\nThis is a sample review. In a real implementation, this would provide detailed code analysis.`;
          break;
        case 'optimize':
          result = `Code Optimization Suggestions:\n\n🚀 Performance improvements:\n• Use more efficient algorithms\n• Reduce unnecessary iterations\n• Consider caching expensive operations\n\n💡 Best practices:\n• Follow ${language} conventions\n• Improve readability\n\nOptimized version would be provided here.`;
          break;
        case 'debug':
          result = `Debug Analysis:\n\n🐛 Potential issues found:\n• Check for null/undefined values\n• Verify variable scope\n• Look for async/await usage\n\n🔧 Debugging steps:\n1. Add console.log statements\n2. Use browser debugger\n3. Check network requests\n\nSpecific fixes would be suggested here.`;
          break;
        default:
          result = 'Assistance provided based on your code input.';
      }
      setAssistance(result);
      setIsProcessing(false);
      toast({
        title: "Analysis complete!",
        description: "Code assistance is ready."
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(assistance);
    toast({
      title: "Copied to clipboard",
      description: "The assistance has been copied."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
              <Code className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Code Assistant</h1>
            <p className="text-slate-600">Get help with coding and development tasks</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Code Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Language
                    </label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Assistance Type
                    </label>
                    <Select value={assistanceType} onValueChange={setAssistanceType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="review">Code Review</SelectItem>
                        <SelectItem value="optimize">Optimization</SelectItem>
                        <SelectItem value="debug">Debug Help</SelectItem>
                        <SelectItem value="explain">Explanation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Code
                  </label>
                  <Textarea
                    placeholder="Paste your code here..."
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    rows={10}
                    className="resize-none font-mono text-sm"
                  />
                </div>
                
                <Button 
                  onClick={getAssistance} 
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isProcessing ? 'Analyzing...' : 'Get Assistance'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center justify-between">
                  Code Assistance
                  {assistance && (
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-4 min-h-64">
                  {assistance ? (
                    <pre className="whitespace-pre-wrap text-sm text-slate-700">{assistance}</pre>
                  ) : (
                    <p className="text-slate-500 italic">Code assistance will appear here...</p>
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

export default CodeAssistant;
