import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Hash, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateDiscussionFormProps {
  onSubmit: (discussion: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => Promise<void>;
  onCancel: () => void;
  categories: string[];
}

const CreateDiscussionForm: React.FC<CreateDiscussionFormProps> = ({
  onSubmit,
  onCancel,
  categories
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        category,
        tags
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setTags([]);
      setNewTag('');
      
      toast({
        title: "Discussion Created",
        description: "Your discussion has been posted successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create discussion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Discussion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                maxLength={200}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat !== 'all').map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content *</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, insights, or questions..."
              className="min-h-[120px] resize-none"
              maxLength={5000}
            />
            <div className="text-xs text-muted-foreground text-right">
              {content.length}/5000
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Tags (optional)</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tags..."
                  className="pl-10"
                  maxLength={20}
                />
              </div>
              <Button 
                type="button" 
                onClick={addTag} 
                variant="outline"
                disabled={!newTag.trim() || tags.length >= 5}
              >
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  >
                    #{tag}
                    <X 
                      className="h-3 w-3 ml-1" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              {tags.length}/5 tags
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim() || !category}
            >
              {isSubmitting ? 'Creating...' : 'Create Discussion'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateDiscussionForm;