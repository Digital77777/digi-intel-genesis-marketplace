
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages, Copy, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TranslationTool = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  const translateText = () => {
    if (!sourceText.trim()) {
      toast({
        title: "Please enter text to translate",
        description: "You need to provide text for translation.",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    // Simulate API call
    setTimeout(() => {
      const sourceLanguage = languages.find(l => l.code === sourceLang)?.name || 'Unknown';
      const targetLanguage = languages.find(l => l.code === targetLang)?.name || 'Unknown';
      
      setTranslatedText(`[Translated from ${sourceLanguage} to ${targetLanguage}]\n\n${sourceText}\n\nThis is a sample translation. In a real implementation, this would be translated using advanced AI language models that provide accurate, contextual translations between multiple languages.`);
      setIsTranslating(false);
      toast({
        title: "Translation complete!",
        description: "Your text has been translated successfully."
      });
    }, 1500);
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: "Copied to clipboard",
      description: "The translation has been copied."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-4">
              <Languages className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Translation Tool</h1>
            <p className="text-slate-600">Translate text between multiple languages</p>
          </div>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-slate-900">Language Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    From
                  </label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={swapLanguages}
                  className="mt-6"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    To
                  </label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Source Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to translate..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                
                <Button 
                  onClick={translateText} 
                  disabled={isTranslating}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center justify-between">
                  Translation
                  {translatedText && (
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={translatedText}
                  placeholder="Translation will appear here..."
                  readOnly
                  rows={8}
                  className="resize-none bg-slate-50"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TranslationTool;
