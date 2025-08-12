import { API_CONFIG } from '@/lib/apiConfig';

interface ContentAnalysis {
  mainTopics: string[];
  sentiment: string;
  keyPoints: string[];
  tone: string;
  wordCount: number;
}

interface GeneratedContent {
  platform: string;
  content: string;
  hashtags?: string[];
  format: string;
}

export class ContentDnaService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = API_CONFIG.HUGGING_FACE.API_KEY || '';
    this.baseUrl = API_CONFIG.HUGGING_FACE.BASE_URL;
  }

  private async makeHuggingFaceRequest(model: string, inputs: any, parameters?: any) {
    if (!this.apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    const response = await fetch(`${this.baseUrl}/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs,
        parameters: {
          wait_for_model: true,
          ...parameters
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hugging Face API error: ${error}`);
    }

    return response.json();
  }

  async analyzeContent(content: string): Promise<ContentAnalysis> {
    try {
      // Analyze sentiment
      const sentimentResult = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.SENTIMENT_ANALYSIS,
        content
      );

      // Summarize to extract key points
      const summaryResult = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.SUMMARIZATION,
        content,
        { max_length: 150, min_length: 50 }
      );

      // Extract topics using text classification
      const topicsResult = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_CLASSIFICATION,
        content
      );

      return {
        mainTopics: this.extractTopics(topicsResult),
        sentiment: sentimentResult[0]?.label || 'NEUTRAL',
        keyPoints: this.extractKeyPoints(summaryResult[0]?.summary_text || content),
        tone: this.determineTone(sentimentResult[0]?.label),
        wordCount: content.split(' ').length
      };
    } catch (error) {
      console.error('Content analysis error:', error);
      // Fallback analysis
      return {
        mainTopics: ['General'],
        sentiment: 'NEUTRAL',
        keyPoints: content.split('.').slice(0, 3).map(s => s.trim()).filter(Boolean),
        tone: 'Professional',
        wordCount: content.split(' ').length
      };
    }
  }

  async generateContentVariations(originalContent: string, analysis: ContentAnalysis): Promise<GeneratedContent[]> {
    const variations: GeneratedContent[] = [];

    try {
      // Generate Twitter threads
      const twitterContent = await this.generateTwitterThread(originalContent, analysis);
      variations.push(...twitterContent);

      // Generate LinkedIn posts
      const linkedinContent = await this.generateLinkedInPost(originalContent, analysis);
      variations.push(linkedinContent);

      // Generate Instagram captions
      const instagramContent = await this.generateInstagramCaption(originalContent, analysis);
      variations.push(instagramContent);

      // Generate blog post
      const blogContent = await this.generateBlogPost(originalContent, analysis);
      variations.push(blogContent);

      // Generate email newsletter
      const emailContent = await this.generateEmailNewsletter(originalContent, analysis);
      variations.push(emailContent);

      // Generate YouTube description
      const youtubeContent = await this.generateYouTubeDescription(originalContent, analysis);
      variations.push(youtubeContent);

    } catch (error) {
      console.error('Content generation error:', error);
      // Return fallback content
      return this.generateFallbackContent(originalContent, analysis);
    }

    return variations;
  }

  private async generateTwitterThread(content: string, analysis: ContentAnalysis): Promise<GeneratedContent[]> {
    const prompt = `Convert this content into a Twitter thread (5 tweets max, 280 chars each):

Content: ${content.substring(0, 500)}...
Key points: ${analysis.keyPoints.join(', ')}
Tone: ${analysis.tone}

Make it engaging and include relevant hashtags.`;

    try {
      const result = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_GENERATION,
        prompt,
        { max_new_tokens: 400, temperature: 0.7 }
      );

      const generatedText = result[0]?.generated_text || '';
      const tweets = this.splitIntoTweets(generatedText);
      
      return tweets.map((tweet, index) => ({
        platform: 'Twitter',
        content: tweet,
        hashtags: this.generateHashtags(analysis.mainTopics),
        format: `Thread ${index + 1}/5`
      }));
    } catch (error) {
      return this.generateFallbackTwitterThread(content, analysis);
    }
  }

  private async generateLinkedInPost(content: string, analysis: ContentAnalysis): Promise<GeneratedContent> {
    const prompt = `Convert this into a professional LinkedIn post:

Content: ${content.substring(0, 600)}...
Tone: Professional and engaging
Key points: ${analysis.keyPoints.join(', ')}

Make it thought-provoking and include a call-to-action.`;

    try {
      const result = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_GENERATION,
        prompt,
        { max_new_tokens: 300, temperature: 0.6 }
      );

      return {
        platform: 'LinkedIn',
        content: result[0]?.generated_text || this.createFallbackLinkedInPost(content),
        hashtags: this.generateProfessionalHashtags(analysis.mainTopics),
        format: 'Professional Post'
      };
    } catch (error) {
      return {
        platform: 'LinkedIn',
        content: this.createFallbackLinkedInPost(content),
        hashtags: this.generateProfessionalHashtags(analysis.mainTopics),
        format: 'Professional Post'
      };
    }
  }

  private async generateInstagramCaption(content: string, analysis: ContentAnalysis): Promise<GeneratedContent> {
    const prompt = `Create an engaging Instagram caption from this content:

Content: ${content.substring(0, 400)}...
Tone: ${analysis.tone}
Make it visual, engaging, and include emojis.`;

    try {
      const result = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_GENERATION,
        prompt,
        { max_new_tokens: 200, temperature: 0.8 }
      );

      return {
        platform: 'Instagram',
        content: result[0]?.generated_text || this.createFallbackInstagramCaption(content),
        hashtags: this.generateInstagramHashtags(analysis.mainTopics),
        format: 'Visual Caption'
      };
    } catch (error) {
      return {
        platform: 'Instagram',
        content: this.createFallbackInstagramCaption(content),
        hashtags: this.generateInstagramHashtags(analysis.mainTopics),
        format: 'Visual Caption'
      };
    }
  }

  private async generateBlogPost(content: string, analysis: ContentAnalysis): Promise<GeneratedContent> {
    const prompt = `Expand this into a blog post outline:

Original content: ${content.substring(0, 800)}...
Key points: ${analysis.keyPoints.join(', ')}
Tone: ${analysis.tone}

Create an engaging introduction and structure.`;

    try {
      const result = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_GENERATION,
        prompt,
        { max_new_tokens: 500, temperature: 0.6 }
      );

      return {
        platform: 'Blog',
        content: result[0]?.generated_text || this.createFallbackBlogPost(content),
        format: 'Long-form Article'
      };
    } catch (error) {
      return {
        platform: 'Blog',
        content: this.createFallbackBlogPost(content),
        format: 'Long-form Article'
      };
    }
  }

  private async generateEmailNewsletter(content: string, analysis: ContentAnalysis): Promise<GeneratedContent> {
    const prompt = `Convert this into an email newsletter format:

Content: ${content.substring(0, 600)}...
Key points: ${analysis.keyPoints.join(', ')}
Tone: Friendly and informative

Include subject line and clear sections.`;

    try {
      const result = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_GENERATION,
        prompt,
        { max_new_tokens: 400, temperature: 0.6 }
      );

      return {
        platform: 'Email',
        content: result[0]?.generated_text || this.createFallbackEmailNewsletter(content),
        format: 'Newsletter'
      };
    } catch (error) {
      return {
        platform: 'Email',
        content: this.createFallbackEmailNewsletter(content),
        format: 'Newsletter'
      };
    }
  }

  private async generateYouTubeDescription(content: string, analysis: ContentAnalysis): Promise<GeneratedContent> {
    const prompt = `Create a YouTube video description from this content:

Content: ${content.substring(0, 500)}...
Key points: ${analysis.keyPoints.join(', ')}

Include timestamps, links, and call-to-action.`;

    try {
      const result = await this.makeHuggingFaceRequest(
        API_CONFIG.HUGGING_FACE.MODELS.TEXT_GENERATION,
        prompt,
        { max_new_tokens: 300, temperature: 0.7 }
      );

      return {
        platform: 'YouTube',
        content: result[0]?.generated_text || this.createFallbackYouTubeDescription(content),
        hashtags: this.generateHashtags(analysis.mainTopics),
        format: 'Video Description'
      };
    } catch (error) {
      return {
        platform: 'YouTube',
        content: this.createFallbackYouTubeDescription(content),
        hashtags: this.generateHashtags(analysis.mainTopics),
        format: 'Video Description'
      };
    }
  }

  // Helper methods
  private extractTopics(topicsResult: any[]): string[] {
    if (!Array.isArray(topicsResult)) return ['General'];
    return topicsResult.slice(0, 3).map(topic => topic.label || 'General');
  }

  private extractKeyPoints(text: string): string[] {
    return text.split('.').slice(0, 5).map(s => s.trim()).filter(Boolean);
  }

  private determineTone(sentiment: string): string {
    switch (sentiment?.toUpperCase()) {
      case 'POSITIVE': return 'Enthusi astic';
      case 'NEGATIVE': return 'Serious';
      default: return 'Professional';
    }
  }

  private splitIntoTweets(text: string): string[] {
    const sentences = text.split('.').filter(s => s.trim());
    const tweets: string[] = [];
    let currentTweet = '';

    for (const sentence of sentences) {
      if ((currentTweet + sentence).length <= 250) {
        currentTweet += sentence + '.';
      } else {
        if (currentTweet) tweets.push(currentTweet.trim());
        currentTweet = sentence + '.';
      }
    }
    
    if (currentTweet) tweets.push(currentTweet.trim());
    return tweets.slice(0, 5);
  }

  private generateHashtags(topics: string[]): string[] {
    return topics.map(topic => `#${topic.replace(/\s+/g, '')}`);
  }

  private generateProfessionalHashtags(topics: string[]): string[] {
    const professional = ['#Leadership', '#Innovation', '#Business', '#Growth'];
    return [...this.generateHashtags(topics), ...professional].slice(0, 5);
  }

  private generateInstagramHashtags(topics: string[]): string[] {
    const instagram = ['#Inspiration', '#Motivation', '#Success', '#Goals'];
    return [...this.generateHashtags(topics), ...instagram].slice(0, 10);
  }

  // Fallback content generators
  private generateFallbackContent(content: string, analysis: ContentAnalysis): GeneratedContent[] {
    return [
      {
        platform: 'Twitter',
        content: `${content.substring(0, 200)}... ${this.generateHashtags(analysis.mainTopics).join(' ')}`,
        hashtags: this.generateHashtags(analysis.mainTopics),
        format: 'Tweet'
      },
      {
        platform: 'LinkedIn',
        content: this.createFallbackLinkedInPost(content),
        hashtags: this.generateProfessionalHashtags(analysis.mainTopics),
        format: 'Professional Post'
      }
    ];
  }

  private generateFallbackTwitterThread(content: string, analysis: ContentAnalysis): GeneratedContent[] {
    const chunks = this.chunkText(content, 200);
    return chunks.slice(0, 5).map((chunk, index) => ({
      platform: 'Twitter',
      content: `${index + 1}/${chunks.length} ${chunk}`,
      hashtags: this.generateHashtags(analysis.mainTopics),
      format: `Thread ${index + 1}/5`
    }));
  }

  private createFallbackLinkedInPost(content: string): string {
    return `${content.substring(0, 400)}...\n\nWhat are your thoughts on this? Share your experience in the comments below.\n\n#Professional #Innovation #Growth`;
  }

  private createFallbackInstagramCaption(content: string): string {
    return `✨ ${content.substring(0, 300)}... ✨\n\nDouble tap if you agree! 👆\n\n#Inspiration #Motivation`;
  }

  private createFallbackBlogPost(content: string): string {
    return `# Blog Post\n\n## Introduction\n\n${content.substring(0, 200)}...\n\n## Key Points\n\n- Point 1\n- Point 2\n- Point 3\n\n## Conclusion\n\nIn summary, this topic offers valuable insights for readers.`;
  }

  private createFallbackEmailNewsletter(content: string): string {
    return `Subject: Weekly Update\n\nHi there!\n\n${content.substring(0, 300)}...\n\nBest regards,\nYour Team`;
  }

  private createFallbackYouTubeDescription(content: string): string {
    return `${content.substring(0, 400)}...\n\n🔔 Subscribe for more content!\n👍 Like if this was helpful\n💬 Comment your thoughts below\n\n#YouTube #Content`;
  }

  private chunkText(text: string, maxLength: number): string[] {
    const words = text.split(' ');
    const chunks: string[] = [];
    let currentChunk = '';

    for (const word of words) {
      if ((currentChunk + ' ' + word).length <= maxLength) {
        currentChunk += (currentChunk ? ' ' : '') + word;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = word;
      }
    }
    
    if (currentChunk) chunks.push(currentChunk);
    return chunks;
  }
}