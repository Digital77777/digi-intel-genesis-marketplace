
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Image, Eye, Download, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageAnalyzerInterface = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        objects: [
          { name: 'Person', confidence: 95.2 },
          { name: 'Building', confidence: 87.1 },
          { name: 'Tree', confidence: 78.9 },
          { name: 'Car', confidence: 92.3 }
        ],
        colors: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'],
        tags: ['outdoor', 'urban', 'daytime', 'architecture'],
        description: 'The image shows a person standing in front of a modern building with trees and a car visible in the scene. The lighting suggests it was taken during daytime.',
        dimensions: '1920x1080',
        fileSize: '2.3 MB'
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Image has been successfully analyzed."
      });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Eye className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Image Analyzer</h1>
        </div>
        <p className="text-muted-foreground">Upload and analyze images with AI-powered recognition</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-64 object-contain rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview('');
                        setAnalysisResult(null);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <label className="cursor-pointer">
                    <span className="text-primary font-medium">Choose an image</span>
                    <span className="text-muted-foreground"> or drag and drop</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing image...</span>
                  <span>Processing</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-secondary" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult ? (
              <div className="space-y-6">
                {/* Objects Detected */}
                <div>
                  <h3 className="font-semibold mb-3">Objects Detected</h3>
                  <div className="space-y-2">
                    {analysisResult.objects.map((obj: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="font-medium">{obj.name}</span>
                        <Badge variant="secondary">{obj.confidence}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-semibold mb-3">Dominant Colors</h3>
                  <div className="flex gap-2">
                    {analysisResult.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {analysisResult.description}
                  </p>
                </div>

                {/* Image Info */}
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="ml-2 font-medium">{analysisResult.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="ml-2 font-medium">{analysisResult.fileSize}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to see analysis results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageAnalyzerInterface;
