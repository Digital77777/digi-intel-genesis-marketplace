
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
}

const categories = ['All', 'Content', 'Vision', 'Development', 'Analytics', 'Communication', 'Language'];
const ratings = ['All', '4.0', '4.5', '4.8'];

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating
}: SearchAndFilterProps) => {
  const hasActiveFilters = selectedCategory !== 'All' || selectedRating !== 'All' || searchTerm !== '';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedRating('All');
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus:border-primary"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40 bg-white border-slate-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-32 bg-white border-slate-200">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating === 'All' ? 'All Ratings' : `${rating}+ Stars`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchTerm && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Search: "{searchTerm}"
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchTerm('')} />
            </Badge>
          )}
          
          {selectedCategory !== 'All' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {selectedCategory}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory('All')} />
            </Badge>
          )}
          
          {selectedRating !== 'All' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {selectedRating}+ Stars
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedRating('All')} />
            </Badge>
          )}
          
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-primary underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
