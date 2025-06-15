
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, RefreshCw } from 'lucide-react';

interface SocialMediaFormProps {
  topic: string;
  setTopic: (value: string) => void;
  postType: string;
  setPostType: (value: string) => void;
  brandTone: string;
  setBrandTone: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

const postTypes = [
  'Product Promotion',
  'Event Announcement',
  'Customer Testimonial',
  'Business Tip',
  'Motivational Post',
  'Behind the Scenes',
  'Industry News',
  'Sale/Discount Announcement'
];

const brandTones = [
  'Professional',
  'Casual & Friendly',
  'Playful & Fun',
  'Inspirational',
  'Educational',
  'Conversational'
];

const nigerianAudiences = [
  'Young professionals in Lagos',
  'Small business owners',
  'University students',
  'Working mothers',
  'Tech enthusiasts',
  'Fashion lovers',
  'Food enthusiasts',
  'Entrepreneurs'
];

const SocialMediaForm = ({
  topic,
  setTopic,
  postType,
  setPostType,
  brandTone,
  setBrandTone,
  targetAudience,
  setTargetAudience,
  isGenerating,
  onGenerate
}: SocialMediaFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-emerald-600" size={20} />
          AI Social Media Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic/Focus</Label>
            <Input
              id="topic"
              placeholder="e.g., Promote new Ankara collection"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="postType">Post Type</Label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandTone">Brand Tone</Label>
            <Select value={brandTone} onValueChange={setBrandTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand tone" />
              </SelectTrigger>
              <SelectContent>
                {brandTones.map((tone) => (
                  <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Select value={targetAudience} onValueChange={setTargetAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                {nigerianAudiences.map((audience) => (
                  <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={onGenerate} 
          disabled={isGenerating}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Generate AI Content
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialMediaForm;
