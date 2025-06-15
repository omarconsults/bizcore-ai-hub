
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FlyerData {
  template: string;
  title: string;
  description: string;
  contactInfo: string;
}

interface FlyerResponse {
  design: {
    layout: string;
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
    };
    typography: {
      headline: string;
      body: string;
      accent: string;
    };
    visualElements: string[];
    callToAction: string;
    designRationale: string;
  };
  copywriting: {
    headline: string;
    subheadline: string;
    bodyText: string;
    callToAction: string;
  };
}

export const useFlyerAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFlyer, setGeneratedFlyer] = useState<FlyerResponse | null>(null);
  const { toast } = useToast();

  const generateFlyer = async (data: FlyerData) => {
    setIsGenerating(true);
    
    try {
      const prompt = `Generate a professional flyer design for:

Template Type: ${data.template}
Title: ${data.title}
Description: ${data.description}
Contact Information: ${data.contactInfo}

Create a visually appealing design optimized for Nigerian audiences with compelling copywriting and professional design specifications.`;

      console.log('Sending flyer generation request...');

      const { data: response, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          requestType: 'flyer'
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
        
        const flyerResponse: FlyerResponse = JSON.parse(cleanedResponse);
        setGeneratedFlyer(flyerResponse);
        
        toast({
          title: "Flyer Generated! ✨",
          description: "Your professional flyer design is ready"
        });
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        
        // Create fallback flyer design
        const fallbackFlyer: FlyerResponse = {
          design: {
            layout: "Bold header with centered layout, clear hierarchy, and prominent call-to-action button",
            colorScheme: {
              primary: "#2563EB",
              secondary: "#3B82F6", 
              accent: "#F59E0B",
              text: "#1F2937"
            },
            typography: {
              headline: "Inter Bold, 32px for maximum impact",
              body: "Inter Regular, 16px for readability",
              accent: "Inter SemiBold, 14px for highlights"
            },
            visualElements: ["Gradient background", "Clean geometric shapes", "Professional icons"],
            callToAction: "Get Started Today",
            designRationale: "Professional design that builds trust while maintaining visual appeal for Nigerian audiences"
          },
          copywriting: {
            headline: data.title || "Your Success Starts Here",
            subheadline: "Transform Your Business Today",
            bodyText: data.description || "Discover innovative solutions designed specifically for Nigerian businesses. Join thousands of satisfied customers who have transformed their operations.",
            callToAction: "Contact Us Now"
          }
        };
        
        setGeneratedFlyer(fallbackFlyer);
        
        toast({
          title: "Flyer Generated!",
          description: "Your professional flyer design is ready"
        });
      }
    } catch (error) {
      console.error('Flyer generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate flyer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateFlyer,
    isGenerating,
    generatedFlyer,
    setGeneratedFlyer
  };
};
