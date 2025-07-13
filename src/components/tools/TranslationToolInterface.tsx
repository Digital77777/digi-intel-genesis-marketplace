
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, RefreshCw, Languages, Volume2, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TranslationToolInterface = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [detectedLang, setDetectedLang] = useState('');
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text to translate.",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    setDetectedLang('');
    
    // Simulate API call
    setTimeout(() => {
      const sourceLangName = languages.find(l => l.code === sourceLang)?.name || 'Unknown';
      const targetLangName = languages.find(l => l.code === targetLang)?.name || 'Unknown';
      
      setTranslatedText(`[Translated from ${sourceLangName} to ${targetLangName}]\n\n${sourceText.split('').reverse().join('')} - This is a simulated translation for demo purposes.`);
      setDetectedLang(sourceLangName);
      setIsTranslating(false);
      
      toast({
        title: "Translation Complete",
        description: `Text translated to ${targetLangName}`
      });
    }, 2000);
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    
    // Swap texts if both exist
    if (sourceText && translatedText) {
      const tempText = sourceText;
      setSourceText(translatedText);
      setTranslatedText(tempText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard."
    });
  };

  const speakText = (text: string, langCode: string) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      speechSynthesis.speak(utterance);
    }
  };

  const getLanguageInfo = (code: string) => {
    return languages.find(l => l.code === code) || { name: 'Unknown', flag: '🌐' };
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Languages className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Translation Tool</h1>
        </div>
        <p className="text-muted-foreground">Translate text between multiple languages with AI precision</p>
      </div>

      {/* Language Selection */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getLanguageInfo(sourceLang).flag}</span>
              <select 
                value={sourceLang} 
                onChange={(e) => setSourceLang(e.target.value)}
                className="p-2 rounded-lg border border-border bg-background min-w-[140px]"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={swapLanguages}
              className="rounded-full p-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getLanguageInfo(targetLang).flag}</span>
              <select 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value)}
                className="p-2 rounded-lg border border-border bg-background min-w-[140px]"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Source Text */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{getLanguageInfo(sourceLang).flag}</span>
                {getLanguageInfo(sourceLang).name}
              </CardTitle>
              <div className="flex gap-2">
                {sourceText && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => speakText(sourceText, sourceLang)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(sourceText)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {sourceText.length} characters
              </div>
              
              <Button 
                onClick={handleTranslate} 
                disabled={isTranslating || !sourceText.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {isTranslating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Languages className="h-4 w-4 mr-2" />
                    Translate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Translated Text */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{getLanguageInfo(targetLang).flag}</span>
                {getLanguageInfo(targetLang).name}
              </CardTitle>
              <div className="flex gap-2">
                {translatedText && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => speakText(translatedText, targetLang)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(translatedText)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {translatedText ? (
              <div className="space-y-4">
                {detectedLang && (
                  <Badge variant="outline" className="mb-2">
                    Detected: {detectedLang}
                  </Badge>
                )}
                <div className="p-4 bg-muted/30 rounded-lg min-h-[200px]">
                  <p className="whitespace-pre-wrap leading-relaxed">{translatedText}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {translatedText.length} characters
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <div className="p-4 bg-muted/30 rounded-lg min-h-[200px] flex items-center justify-center">
                  <div>
                    <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your translation will appear here</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-center">Quick Translations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Hello, how are you?', 'Thank you very much', 'Where is the bathroom?', 'I need help', 'How much does it cost?'].map((phrase, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setSourceText(phrase)}
                className="text-xs"
              >
                {phrase}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationToolInterface;
