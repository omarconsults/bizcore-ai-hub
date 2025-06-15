
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

Focus on creating scalable, memorable designs that reflect the business industry and style preferences.

IMPORTANT: Respond ONLY with valid JSON in the exact format specified in your system prompt. Do not include any other text outside the JSON structure.`;

      console.log('Sending logo generation request...');

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          requestType: 'logo'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI response received:', data.response);

      // Parse the AI response with improved error handling
      try {
        // Clean the response to remove any markdown formatting
        let cleanedResponse = data.response;
        
        // Remove any markdown code blocks
        cleanedResponse = cleanedResponse.replace(/```json\n?|\n?```/g, '').trim();
        
        // Remove any leading/trailing text that might not be JSON
        const jsonStart = cleanedResponse.indexOf('{');
        const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
        
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
        }
        
        console.log('Cleaned response for parsing:', cleanedResponse);
        
        const logoResponse: LogoResponse = JSON.parse(cleanedResponse);
        
        if (logoResponse.logos && Array.isArray(logoResponse.logos) && logoResponse.logos.length > 0) {
          setGeneratedLogos(logoResponse.logos);
          setBrandGuidelines(logoResponse.brandGuidelines);
          
          toast({
            title: "Logos Generated! ✨",
            description: `${logoResponse.logos.length} AI-powered logo concepts ready for download`
          });
        } else {
          throw new Error('Invalid logo response structure');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        console.error('Raw response was:', data.response);
        
        // Create fallback logos if JSON parsing fails
        const fallbackLogos: GeneratedLogo[] = [
          {
            id: 1,
            style: "Modern Text Logo",
            description: `Clean and professional text-based logo for ${logoData.businessName}`,
            colors: {
              primary: "#2563EB",
              secondary: "#64748B",
              text: "#1E293B"
            },
            typography: "Modern Sans-serif",
            svgCode: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <text x="100" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#2563EB">
                ${logoData.businessName}
              </text>
            </svg>`,
            rationale: `Simple, readable design perfect for ${logoData.industry} businesses`
          },
          {
            id: 2,
            style: "Icon + Text Logo",
            description: `Combination logo with icon element for ${logoData.businessName}`,
            colors: {
              primary: "#059669",
              secondary: "#34D399",
              text: "#064E3B"
            },
            typography: "Professional Sans-serif",
            svgCode: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="12" fill="#059669"/>
              <text x="55" y="35" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#064E3B">
                ${logoData.businessName}
              </text>
            </svg>`,
            rationale: `Versatile design with icon element suitable for various applications`
          },
          {
            id: 3,
            style: "Badge Style Logo",
            description: `Badge-style logo design for ${logoData.businessName}`,
            colors: {
              primary: "#7C3AED",
              secondary: "#A78BFA",
              text: "#FFFFFF"
            },
            typography: "Bold Display Font",
            svgCode: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="180" height="30" rx="15" fill="#7C3AED"/>
              <text x="100" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#FFFFFF">
                ${logoData.businessName}
              </text>
            </svg>`,
            rationale: `Strong, memorable badge design that works well for branding`
          }
        ];
        
        setGeneratedLogos(fallbackLogos);
        setBrandGuidelines({
          colorPalette: ["#2563EB", "#059669", "#7C3AED"],
          typography: "Arial, Helvetica, sans-serif",
          usage: "Use these logos consistently across all brand materials"
        });
        
        toast({
          title: "Logos Generated!",
          description: `3 professional logo concepts created for ${logoData.businessName}`
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
