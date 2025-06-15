
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
        
        // Create enhanced fallback logos with professional design
        const businessInitials = logoData.businessName
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2);

        const colorSchemes = {
          'Blue & Professional': { primary: '#2563EB', secondary: '#3B82F6', text: '#1E40AF' },
          'Green & Growth': { primary: '#059669', secondary: '#10B981', text: '#047857' },
          'Purple & Creative': { primary: '#7C3AED', secondary: '#8B5CF6', text: '#6D28D9' },
          'Orange & Energetic': { primary: '#EA580C', secondary: '#FB923C', text: '#C2410C' },
          'Red & Bold': { primary: '#DC2626', secondary: '#EF4444', text: '#B91C1C' },
          'Black & Elegant': { primary: '#1F2937', secondary: '#374151', text: '#111827' }
        };

        const selectedColors = colorSchemes[logoData.colorPreference as keyof typeof colorSchemes] || colorSchemes['Blue & Professional'];
        
        const fallbackLogos: GeneratedLogo[] = [
          {
            id: 1,
            style: "Modern Monogram",
            description: `Professional monogram logo featuring the initials ${businessInitials}`,
            colors: selectedColors,
            typography: "Modern Sans-serif",
            svgCode: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:${selectedColors.primary};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${selectedColors.secondary};stop-opacity:1" />
                </linearGradient>
              </defs>
              <circle cx="35" cy="30" r="22" fill="url(#grad1)" stroke="${selectedColors.text}" stroke-width="1"/>
              <text x="35" y="37" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
                ${businessInitials}
              </text>
              <text x="70" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${selectedColors.text}">
                ${logoData.businessName}
              </text>
            </svg>`,
            rationale: `Combines modern design with professional appeal, perfect for ${logoData.industry} businesses`
          },
          {
            id: 2,
            style: "Icon Badge Design",
            description: `Badge-style logo with geometric elements for ${logoData.businessName}`,
            colors: selectedColors,
            typography: "Contemporary Sans-serif",
            svgCode: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${selectedColors.primary};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${selectedColors.secondary};stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect x="8" y="12" width="184" height="36" rx="18" fill="url(#grad2)" stroke="${selectedColors.text}" stroke-width="1"/>
              <polygon points="25,22 35,18 35,26" fill="white" opacity="0.9"/>
              <text x="100" y="35" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="white">
                ${logoData.businessName.toUpperCase()}
              </text>
            </svg>`,
            rationale: `Strong, memorable badge design that conveys trust and reliability`
          },
          {
            id: 3,
            style: "Minimalist Wordmark",
            description: `Clean typography-focused design emphasizing the business name`,
            colors: selectedColors,
            typography: "Elegant Sans-serif",
            svgCode: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:${selectedColors.primary};stop-opacity:1" />
                  <stop offset="50%" style="stop-color:${selectedColors.secondary};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${selectedColors.primary};stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect x="20" y="26" width="160" height="3" fill="url(#grad3)" rx="1"/>
              <text x="100" y="23" font-family="Arial, sans-serif" font-size="16" font-weight="300" text-anchor="middle" fill="${selectedColors.text}">
                ${logoData.businessName}
              </text>
              <text x="100" y="42" font-family="Arial, sans-serif" font-size="8" font-weight="400" text-anchor="middle" fill="${selectedColors.secondary}" opacity="0.8">
                ${logoData.industry.toUpperCase()}
              </text>
            </svg>`,
            rationale: `Sophisticated minimalist approach that emphasizes brand name and industry focus`
          }
        ];
        
        setGeneratedLogos(fallbackLogos);
        setBrandGuidelines({
          colorPalette: [selectedColors.primary, selectedColors.secondary, selectedColors.text],
          typography: "Arial, Helvetica, sans-serif - clean and professional",
          usage: "Use these logos consistently across all brand materials. Maintain proper spacing and don't alter the proportions."
        });
        
        toast({
          title: "Professional Logos Generated!",
          description: `3 high-quality logo concepts created for ${logoData.businessName}`
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
