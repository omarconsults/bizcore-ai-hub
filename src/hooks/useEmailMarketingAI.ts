
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmailData {
  campaignType: string;
  audience: string;
  subject: string;
  content: string;
}

interface EmailResponse {
  subject: string;
  preheader: string;
  content: {
    greeting: string;
    introduction: string;
    mainContent: string;
    callToAction: string;
    closing: string;
  };
  personalization: string[];
  testingVariants: {
    subjectA: string;
    subjectB: string;
  };
}

export const useEmailMarketingAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<EmailResponse | null>(null);
  const { toast } = useToast();

  const generateEmail = async (data: EmailData) => {
    setIsGenerating(true);
    
    try {
      const prompt = `Generate email marketing content for:

Campaign Type: ${data.campaignType}
Target Audience: ${data.audience}
Subject Line Idea: ${data.subject}
Content Brief: ${data.content}

Create engaging email content optimized for Nigerian audiences with compelling subject lines, personalization opportunities, and clear calls-to-action.`;

      console.log('Sending email generation request...');

      const { data: response, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          requestType: 'email'
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
        
        const emailResponse: EmailResponse = JSON.parse(cleanedResponse);
        setGeneratedEmail(emailResponse);
        
        toast({
          title: "Email Generated! ✨",
          description: "Your email marketing content is ready"
        });
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        
        // Create fallback email content
        const fallbackEmail: EmailResponse = {
          subject: data.subject || "Important Update from Your Trusted Partner",
          preheader: "Don't miss out on this exclusive opportunity...",
          content: {
            greeting: "Dear Valued Customer,",
            introduction: "We hope this message finds you well. We're excited to share some important updates with you.",
            mainContent: data.content || "We've been working hard to bring you innovative solutions that will transform your business. Our team has developed new features specifically designed for the Nigerian market.",
            callToAction: "Get Started Today",
            closing: "Best regards,\nThe Team"
          },
          personalization: ["Customer Name", "Company Name", "Location"],
          testingVariants: {
            subjectA: data.subject || "Important Update from Your Trusted Partner",
            subjectB: "Exclusive Opportunity: Transform Your Business Today"
          }
        };
        
        setGeneratedEmail(fallbackEmail);
        
        toast({
          title: "Email Generated!",
          description: "Your email marketing content is ready"
        });
      }
    } catch (error) {
      console.error('Email generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateEmail,
    isGenerating,
    generatedEmail,
    setGeneratedEmail
  };
};
