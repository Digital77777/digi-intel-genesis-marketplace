
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Play, Copy, Download, RefreshCw, Bug, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodeAssistantInterface = () => {
  const [inputCode, setInputCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [task, setTask] = useState('explain');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!inputCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter some code to process.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      let output = '';
      switch (task) {
        case 'explain':
          output = `Code Explanation:\n\nThis ${language} code appears to be a function that demonstrates basic programming concepts. Here's what it does:\n\n1. Variable declaration and initialization\n2. Conditional logic implementation\n3. Loop structure for iteration\n4. Return statement with computed value\n\nThe code follows good practices for ${language} development and includes proper error handling.`;
          break;
        case 'optimize':
          output = `Optimized Code:\n\n// Original code has been optimized for better performance\n// Improvements made:\n// - Reduced time complexity from O(n²) to O(n)\n// - Eliminated redundant operations\n// - Added early returns for edge cases\n\nfunction optimizedVersion() {\n  // Your optimized code here\n  return result;\n}`;
          break;
        case 'debug':
          output = `Debug Analysis:\n\n🐛 Issues Found:\n1. Potential null pointer exception on line 5\n2. Missing error handling for edge cases\n3. Variable 'x' declared but never used\n\n✅ Suggestions:\n1. Add null checks before object access\n2. Implement try-catch blocks\n3. Remove unused variables\n\n🔧 Fixed Code:\n// Your debugged code would appear here`;
          break;
        case 'convert':
          output = `Converted Code (Python):\n\n# Converted from ${language} to Python\n\ndef converted_function():\n    # Your converted code here\n    return result\n\n# Note: Some language-specific features may need manual adjustment`;
          break;
      }
      setResult(output);
      setIsProcessing(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard."
    });
  };

  const taskIcons = {
    explain: Lightbulb,
    optimize: RefreshCw,
    debug: Bug,
    convert: Code
  };

  const TaskIcon = taskIcons[task as keyof typeof taskIcons];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Code className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Code Assistant</h1>
        </div>
        <p className="text-muted-foreground">Analyze, optimize, and debug your code with AI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Code Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Language</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="typescript">TypeScript</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Task</label>
                <select 
                  value={task} 
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background"
                >
                  <option value="explain">Explain Code</option>
                  <option value="optimize">Optimize</option>
                  <option value="debug">Debug</option>
                  <option value="convert">Convert Language</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Your Code</label>
              <Textarea
                placeholder="Paste your code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </div>

            <Button 
              onClick={handleProcess} 
              disabled={isProcessing || !inputCode.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <TaskIcon className="h-4 w-4 mr-2" />
                  {task === 'explain' && 'Explain Code'}
                  {task === 'optimize' && 'Optimize Code'}
                  {task === 'debug' && 'Debug Code'}
                  {task === 'convert' && 'Convert Language'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TaskIcon className="h-5 w-5 text-secondary" />
                Result
              </CardTitle>
              {result && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary">{language}</Badge>
                  <Badge variant="outline">{task}</Badge>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {result}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your processed code will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeAssistantInterface;
