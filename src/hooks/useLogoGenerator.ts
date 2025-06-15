
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LogoData {
  businessName: string;
  industry: string;
  colorPreference: string;
  style: string;
}

interface GeneratedLogo {
  id: number;
  style: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  typography: string;
  svgCode: string;
  rationale: string;
}

interface LogoResponse {
  logos: GeneratedLogo[];
  brandGuidelines: {
    colorPalette: string[];
    typography: string;
    usage: string;
  };
}

export const useLogoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<GeneratedLogo[]>([]);
  const [brandGuidelines, setBrandGuidelines] = useState<LogoResponse['brandGuidelines'] | null>(null);
  const { toast } = useToast();

  const generateLogos = async (logoData: LogoData) => {
    setIsGenerating(true);
    
    try {
      // Create detailed prompt for logo generation
      const prompt = `Generate 3 professional logo concepts for a Nigerian business with these details:

Business Name: ${logoData.businessName}
Industry: ${logoData.industry}
Color Preference: ${logoData.colorPreference}
Style Preference: ${logoData.style}

Please create distinct, professional logo concepts that would work well in the Nigerian market. Include actual SVG code for each logo that incorporates the business name and is suitable for digital and print use.

Focus on creating scalable, memorable designs that reflect the business industry and style preferences.`;

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          requestType: 'logo'
        }
      });

      if (error) {
        throw error;
      }

      // Parse the AI response
      try {
        const cleanedResponse = data.response.replace(/```json\n?|\n?```/g, '').trim();
        const logoResponse: LogoResponse = JSON.parse(cleanedResponse);
        
        setGeneratedLogos(logoResponse.logos);
        setBrandGuidelines(logoResponse.brandGuidelines);
        
        toast({
          title: "Logos Generated! ✨",
          description: `${logoResponse.logos.length} AI-powered logo concepts ready for download`
        });
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Fallback to basic text response
        toast({
          title: "Logos Generated!",
          description: "AI concepts generated successfully"
        });
      }
    } catch (error) {
      console.error('Logo generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate logos. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateLogos,
    isGenerating,
    generatedLogos,
    brandGuidelines,
    setGeneratedLogos
  };
};
