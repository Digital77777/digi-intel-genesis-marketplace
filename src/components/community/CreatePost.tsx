
import { useState } from 'react';
import { Plus, Image, Video, Link, Hash, Users, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [postType, setPostType] = useState('discussion');
  const [privacy, setPrivacy] = useState('public');

  const categories = [
    'General Discussion',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'AI Ethics',
    'Show & Tell',
    'Help & Support',
    'News & Updates',
    'Research Papers'
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (postTitle.trim() && postContent.trim() && selectedCategory) {
      // Handle post submission
      console.log({
        title: postTitle,
        content: postContent,
        category: selectedCategory,
        tags,
        type: postType,
        privacy
      });
      
      // Reset form
      setPostTitle('');
      setPostContent('');
      setSelectedCategory('');
      setTags([]);
      setPostType('discussion');
      setPrivacy('public');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Post
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={postType} onValueChange={setPostType}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="question">Question</TabsTrigger>
            <TabsTrigger value="showcase">Showcase</TabsTrigger>
            <TabsTrigger value="poll">Poll</TabsTrigger>
          </TabsList>

          <TabsContent value="discussion" className="space-y-4 mt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="What would you like to discuss?"
                className="text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Privacy</label>
                <Select value={privacy} onValueChange={setPrivacy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Public
                      </div>
                    </SelectItem>
                    <SelectItem value="members">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Members Only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Private
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts, insights, or questions..."
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tags..."
                    className="pl-10"
                  />
                </div>
                <Button onClick={addTag} variant="outline">
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
                      onClick={() => removeTag(tag)}
                    >
                      #{tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Image className="h-4 w-4 mr-2" />
                Image
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button variant="outline" size="sm">
                <Link className="h-4 w-4 mr-2" />
                Link
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">
                Save Draft
              </Button>
              <Button onClick={handleSubmit}>
                Publish Post
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="question" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              Question format coming soon...
            </div>
          </TabsContent>

          <TabsContent value="showcase" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              Showcase format coming soon...
            </div>
          </TabsContent>

          <TabsContent value="poll" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              Poll format coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
