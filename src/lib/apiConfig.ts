// API Configuration and utilities for open source AI services

export const API_CONFIG = {
  // Hugging Face - Primary free AI API
  HUGGING_FACE: {
    BASE_URL: 'https://api-inference.huggingface.co',
    API_KEY: import.meta.env.VITE_HUGGING_FACE_API_KEY,
    MODELS: {
      TEXT_GENERATION: 'microsoft/DialoGPT-medium',
      TEXT_CLASSIFICATION: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
      TRANSLATION: 'Helsinki-NLP/opus-mt-en-es',
      SUMMARIZATION: 'facebook/bart-large-cnn',
      QUESTION_ANSWERING: 'deepset/roberta-base-squad2',
      IMAGE_CLASSIFICATION: 'google/vit-base-patch16-224',
      OBJECT_DETECTION: 'facebook/detr-resnet-50',
      TEXT_TO_IMAGE: 'runwayml/stable-diffusion-v1-5',
      SPEECH_TO_TEXT: 'facebook/wav2vec2-base-960h',
      SENTIMENT_ANALYSIS: 'cardiffnlp/twitter-roberta-base-sentiment-latest'
    }
  },
  
  // LibreTranslate - Free translation API
  LIBRE_TRANSLATE: {
    BASE_URL: import.meta.env.VITE_LIBRE_TRANSLATE_URL || 'https://libretranslate.de',
    API_KEY: import.meta.env.VITE_LIBRE_TRANSLATE_API_KEY || null
  },
  
  // MyMemory Translation API (free tier)
  MYMEMORY: {
    BASE_URL: 'https://api.mymemory.translated.net',
    API_KEY: import.meta.env.VITE_MYMEMORY_API_KEY || null
  },
  
  // OpenAI (optional, for enhanced features)
  OPENAI: {
    BASE_URL: 'https://api.openai.com/v1',
    API_KEY: import.meta.env.VITE_OPENAI_API_KEY || null
  },
  
  // Cohere (free tier available)
  COHERE: {
    BASE_URL: 'https://api.cohere.ai/v1',
    API_KEY: import.meta.env.VITE_COHERE_API_KEY || null
  }
};

export const isApiConfigured = (service: keyof typeof API_CONFIG): boolean => {
  const config = API_CONFIG[service];
  return !!(config && (config.API_KEY || service === 'LIBRE_TRANSLATE'));
};

export const getAvailableServices = (): string[] => {
  return Object.keys(API_CONFIG).filter(service => 
    isApiConfigured(service as keyof typeof API_CONFIG)
  );
};