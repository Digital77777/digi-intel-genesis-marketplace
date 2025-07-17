import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter, TrendingUp, Clock, Star, Users } from "lucide-react";

interface DiscussionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  categories: string[];
}

const DiscussionFilters: React.FC<DiscussionFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories
}) => {
  const sortOptions = [
    { value: 'hot', label: 'Hot', icon: TrendingUp },
    { value: 'new', label: 'New', icon: Clock },
    { value: 'trending', label: 'Trending', icon: Star },
    { value: 'followed', label: 'Following', icon: Users }
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search discussions, topics, or users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <div className="flex gap-1">
          {sortOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.value}
                variant={sortBy === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onSortChange(option.value)}
                className="flex items-center gap-1"
              >
                <IconComponent className="h-3 w-3" />
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || searchQuery) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== 'all' && (
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onCategoryChange('all')}
            >
              Category: {selectedCategory} ×
            </Badge>
          )}
          {searchQuery && (
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onSearchChange('')}
            >
              Search: "{searchQuery}" ×
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscussionFilters;