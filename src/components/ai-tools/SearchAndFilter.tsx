import React from 'react';
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  filterCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  filterCount,
  sortBy,
  onSortChange
}) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Alphabetical' }
  ];

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-soft">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search revolutionary AI tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="border-border/50 bg-background/50 hover:bg-accent/50"
              >
                <Filter className="h-4 w-4 mr-2" />
                {selectedCategory === "All" ? "All Categories" : selectedCategory}
                {filterCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                    {filterCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-popover border-border/50">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-accent/50'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="border-border/50 bg-background/50 hover:bg-accent/50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-popover border-border/50">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`cursor-pointer ${
                    sortBy === option.value 
                      ? 'bg-secondary/10 text-secondary font-medium' 
                      : 'hover:bg-accent/50'
                  }`}
                >
                  {option.label}
                  {sortBy === option.value && (
                    <Badge variant="secondary" className="ml-auto bg-secondary/20 text-secondary">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "All" || searchQuery) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
          {selectedCategory !== "All" && (
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/30 cursor-pointer hover:bg-primary/20"
              onClick={() => onCategoryChange("All")}
            >
              Category: {selectedCategory}
              <button className="ml-1 hover:text-primary-dark">×</button>
            </Badge>
          )}
          {searchQuery && (
            <Badge 
              variant="outline" 
              className="bg-secondary/10 text-secondary border-secondary/30 cursor-pointer hover:bg-secondary/20"
              onClick={() => onSearchChange("")}
            >
              Search: "{searchQuery}"
              <button className="ml-1 hover:text-secondary-dark">×</button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;