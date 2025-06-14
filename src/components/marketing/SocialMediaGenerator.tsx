
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Copy, 
  Download,
  Send,
  RefreshCw,
  Hash,
  Smile,
  Image,
  Calendar,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SocialMediaGenerator = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState('');
  const [brandTone, setBrandTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedContent, setGeneratedContent] = useState({
    instagram: '',
    twitter: '',
    linkedin: '',
    hashtags: [],
    imagePrompt: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

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

  const generateContent = async () => {
    if (!topic || !postType || !brandTone || !targetAudience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate content",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const content = {
        instagram: `🚀 ${topic}\n\n${getSampleContent(postType, brandTone)} Perfect for ${targetAudience.toLowerCase()}! 💫\n\nWhat do you think? Drop your thoughts below! 👇`,
        twitter: `${getSampleContent(postType, brandTone, true)} Perfect for ${targetAudience.toLowerCase()}! 🔥`,
        linkedin: `${topic}\n\n${getSampleContent(postType, brandTone, false, true)}\n\nWhat's your experience with this? Share your thoughts in the comments.`,
        hashtags: generateHashtags(topic, postType),
        imagePrompt: `${topic} - ${postType.toLowerCase()} visual with ${brandTone.toLowerCase()} style, Nigerian context, professional quality`
      };
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated! ✨",
        description: "Your social media posts are ready to use"
      });
    }, 2000);
  };

  const getSampleContent = (type: string, tone: string, isShort = false, isLinkedIn = false) => {
    const samples = {
      'Product Promotion': {
        'Professional': isLinkedIn ? 'We are excited to introduce our latest solution that addresses key market needs.' : 'Introducing our latest product designed for modern professionals.',
        'Casual & Friendly': 'Hey everyone! We just launched something amazing and we can\'t wait for you to try it!',
        'Playful & Fun': 'Guess what just dropped? 🎉 Our newest product is here and it\'s absolutely incredible!',
        'Inspirational': 'Every great journey starts with the right tools. Discover what could transform your path.'
      },
      'Business Tip': {
        'Professional': isLinkedIn ? 'Industry insights: Here are three key strategies that successful businesses implement consistently.' : 'Pro tip: Successful businesses focus on these key areas.',
        'Casual & Friendly': 'Quick business tip from our team: This simple strategy could change everything!',
        'Educational': 'Today\'s lesson: Understanding your customer\'s journey is crucial for business growth.'
      }
    };

    const typeContent = samples[type] || samples['Business Tip'];
    return typeContent[tone] || typeContent['Professional'] || 'Great content coming your way!';
  };

  const generateHashtags = (topic: string, type: string) => {
    const baseHashtags = ['#Nigeria', '#SmallBusiness', '#Entrepreneur'];
    const topicHashtags = topic.split(' ').slice(0, 2).map(word => `#${word.replace(/[^a-zA-Z]/g, '')}`);
    const typeHashtags = type.split(' ').map(word => `#${word}`);
    
    return [...baseHashtags, ...topicHashtags, ...typeHashtags].slice(0, 8);
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${platform} content copied to clipboard`
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
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
            onClick={generateContent} 
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

      {/* Generated Content */}
      {(generatedContent.instagram || generatedContent.twitter || generatedContent.linkedin) && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Instagram */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Instagram className="text-pink-600" size={20} />
                Instagram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generatedContent.instagram}
                onChange={(e) => setGeneratedContent({...generatedContent, instagram: e.target.value})}
                className="min-h-[120px] text-sm"
              />
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(generatedContent.instagram, 'Instagram')}
                >
                  <Copy size={14} className="mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar size={14} className="mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Twitter */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Twitter className="text-blue-500" size={20} />
                Twitter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generatedContent.twitter}
                onChange={(e) => setGeneratedContent({...generatedContent, twitter: e.target.value})}
                className="min-h-[120px] text-sm"
              />
              <div className="text-xs text-gray-500">
                Characters: {generatedContent.twitter.length}/280
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(generatedContent.twitter, 'Twitter')}
                >
                  <Copy size={14} className="mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar size={14} className="mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Linkedin className="text-blue-700" size={20} />
                LinkedIn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generatedContent.linkedin}
                onChange={(e) => setGeneratedContent({...generatedContent, linkedin: e.target.value})}
                className="min-h-[120px] text-sm"
              />
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(generatedContent.linkedin, 'LinkedIn')}
                >
                  <Copy size={14} className="mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar size={14} className="mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hashtags and Image Prompt */}
      {generatedContent.hashtags.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="text-blue-600" size={20} />
                Recommended Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {generatedContent.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                    {hashtag}
                  </Badge>
                ))}
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-4"
                onClick={() => copyToClipboard(generatedContent.hashtags.join(' '), 'Hashtags')}
              >
                <Copy size={14} className="mr-1" />
                Copy All
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Image className="text-green-600" size={20} />
                Image Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{generatedContent.imagePrompt}</p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => copyToClipboard(generatedContent.imagePrompt, 'Image Prompt')}
              >
                <Copy size={14} className="mr-1" />
                Copy Prompt
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SocialMediaGenerator;
