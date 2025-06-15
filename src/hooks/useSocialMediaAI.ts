
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaData {
  topic: string;
  postType: string;
  brandTone: string;
  targetAudience: string;
}

interface SocialMediaResponse {
  content: {
    instagram: string;
    twitter: string;
    linkedin: string;
    facebook: string;
  };
  hashtags: string[];
  imagePrompt: string;
  bestTimes: string[];
  engagementTips: string[];
}

export const useSocialMediaAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<SocialMediaResponse | null>(null);
  const { toast } = useToast();

  const generateContent = async (data: SocialMediaData) => {
    setIsGenerating(true);
    
    try {
      const prompt = `Generate social media content for:

Topic: ${data.topic}
Post Type: ${data.postType}
Brand Tone: ${data.brandTone}
Target Audience: ${data.targetAudience}

Create engaging, platform-specific content that resonates with Nigerian audiences. Include relevant hashtags and cultural context.`;

      console.log('Sending social media generation request...');

      const { data: response, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          requestType: 'social'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI response received:', response.response);

      try {
        let cleanedResponse = response.response;
        cleanedResponse = cleanedResponse.replace(/```json\n?|\n?```/g, '').trim();
        
        const jsonStart = cleanedResponse.indexOf('{');
        const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
        
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
        }
        
        const contentResponse: SocialMediaResponse = JSON.parse(cleanedResponse);
        setGeneratedContent(contentResponse);
        
        toast({
          title: "Content Generated! ✨",
          description: "Your social media posts are ready to use"
        });
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        
        // Fallback content
        const fallbackContent: SocialMediaResponse = {
          content: {
            instagram: `🚀 ${data.topic}\n\nPerfect for ${data.targetAudience.toLowerCase()}! ${data.brandTone.toLowerCase() === 'professional' ? '💼' : '✨'}\n\nWhat do you think? Drop your thoughts below! 👇`,
            twitter: `${data.topic} - Perfect for ${data.targetAudience.toLowerCase()}! 🔥`,
            linkedin: `${data.topic}\n\nThis ${data.postType.toLowerCase()} approach resonates well with ${data.targetAudience.toLowerCase()}.\n\nWhat's your experience with this? Share your thoughts in the comments.`,
            facebook: `🌟 ${data.topic}\n\nWe're excited to share this ${data.postType.toLowerCase()} content with our ${data.targetAudience.toLowerCase()} community!\n\nLet us know what you think in the comments below! 👇`
          },
          hashtags: ['#Nigeria', '#Business', '#Innovation', '#Growth', '#Success'],
          imagePrompt: `${data.topic} - ${data.postType.toLowerCase()} visual with ${data.brandTone.toLowerCase()} style, Nigerian context, professional quality`,
          bestTimes: ['Monday 9AM', 'Wednesday 2PM', 'Friday 7PM'],
          engagementTips: ['Ask questions to encourage comments', 'Use local Nigerian references', 'Post during peak hours']
        };
        
        setGeneratedContent(fallbackContent);
        
        toast({
          title: "Content Generated!",
          description: "Your social media posts are ready to use"
        });
      }
    } catch (error) {
      console.error('Social media generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    isGenerating,
    generatedContent,
    setGeneratedContent
  };
};
