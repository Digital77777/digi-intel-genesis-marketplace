
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Upload, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) {
      toast({
        title: "Please select an image",
        description: "You need to upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis("This image appears to contain:\n\n• A landscape scene\n• Natural lighting conditions\n• Colors: Predominantly blue and green tones\n• Objects detected: Trees, sky, grass\n• Image quality: High resolution\n• Composition: Rule of thirds applied\n\nThis is a sample analysis. In a real implementation, this would use computer vision AI to analyze the image content.");
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Image has been analyzed successfully."
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
              <Eye className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Image Analyzer</h1>
            <p className="text-slate-600">Analyze and extract insights from images using AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Upload Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="max-w-full h-48 object-contain mx-auto rounded"
                    />
                  ) : (
                    <div className="text-slate-500">
                      <Image className="w-12 h-12 mx-auto mb-4" />
                      <p>Drop an image here or click to browse</p>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
                
                <Button 
                  onClick={analyzeImage} 
                  disabled={isAnalyzing || !selectedImage}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Analysis Results</CardTitle>
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

export default ImageAnalyzer;
