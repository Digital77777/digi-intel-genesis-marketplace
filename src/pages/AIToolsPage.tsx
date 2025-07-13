
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ai-tools/ToolCard';
import SearchAndFilter from '@/components/ai-tools/SearchAndFilter';
import StatsSection from '@/components/ai-tools/StatsSection';

const aiTools = [
  {
    id: 1,
    name: "Text Generator",
    description: "Generate high-quality text content using advanced AI",
    category: "Content",
    rating: 4.8,
    users: "12.5K",
    isNew: true,
    path: "/ai-tools/text-generator"
  },
  {
    id: 2,
    name: "Image Analyzer",
    description: "Analyze and extract insights from images",
    category: "Vision",
    rating: 4.6,
    users: "8.3K",
    isNew: false,
    path: "/ai-tools/image-analyzer"
  },
  {
    id: 3,
    name: "Code Assistant",
    description: "Get help with coding and development tasks",
    category: "Development",
    rating: 4.9,
    users: "15.2K",
    isNew: true,
    path: "/ai-tools/code-assistant"
  },
  {
    id: 4,
    name: "Data Analyzer",
    description: "Analyze and visualize your data with AI",
    category: "Analytics",
    rating: 4.7,
    users: "6.8K",
    isNew: false,
    path: "/ai-tools/data-analyzer"
  },
  {
    id: 5,
    name: "ChatBot",
    description: "Intelligent conversational AI assistant",
    category: "Communication",
    rating: 4.5,
    users: "20.1K",
    isNew: false,
    path: "/ai-tools/chatbot"
  },
  {
    id: 6,
    name: "Translation Tool",
    description: "Translate text between multiple languages",
    category: "Language",
    rating: 4.6,
    users: "9.7K",
    isNew: false,
    path: "/ai-tools/translation"
  }
];

const AIToolsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedRating, setSelectedRating] = React.useState('All');

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesRating = selectedRating === 'All' || tool.rating >= parseFloat(selectedRating);
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            AI Tools Directory
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover powerful AI tools to enhance your productivity and creativity
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <StatsSection />
          </div>
          
          <div className="lg:col-span-3">
            <SearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIToolsPage;
