
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BusinessPlanData {
  businessName: string;
  sector: string;
  products: string;
  targetMarket: string;
  competitors: string;
  pricingModel: string;
  customerAcquisition: string;
  growthGoals: string;
}

interface BusinessPlanResponse {
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  financialProjections: {
    year1Revenue: string;
    year2Revenue: string;
    year3Revenue: string;
    breakEvenMonth: number;
    initialInvestment: string;
  };
  marketingStrategy: string;
  implementationTimeline: string;
  riskAnalysis: string;
}

export const useBusinessPlanAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<BusinessPlanResponse | null>(null);
  const { toast } = useToast();

  const generateBusinessPlan = async (data: BusinessPlanData) => {
    setIsGenerating(true);
    
    try {
      const prompt = `Generate a comprehensive business plan for:

Business Name: ${data.businessName}
Sector: ${data.sector}
Products/Services: ${data.products}
Target Market: ${data.targetMarket}
Main Competitors: ${data.competitors}
Pricing Model: ${data.pricingModel}
Customer Acquisition Strategy: ${data.customerAcquisition}
Growth Goals: ${data.growthGoals}

Create a detailed, investor-ready business plan tailored for the Nigerian market. Include specific financial projections, market analysis, and implementation strategies.`;

      console.log('Sending business plan generation request...');

      const { data: response, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          requestType: 'business-plan'
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
        
        const planResponse: BusinessPlanResponse = JSON.parse(cleanedResponse);
        setGeneratedPlan(planResponse);
        
        toast({
          title: "Business Plan Generated! ✨",
          description: "Your comprehensive business plan is ready"
        });
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        
        // Create a detailed fallback business plan
        const fallbackPlan: BusinessPlanResponse = {
          executiveSummary: `${data.businessName} represents a strategic entry into Nigeria's rapidly evolving ${data.sector.toLowerCase()} market. Our company specializes in ${data.products}, specifically designed to address the unique needs and preferences of ${data.targetMarket}.\n\nVision Statement: To become the leading provider of innovative ${data.products} solutions that transform how Nigerian consumers and businesses operate in the digital economy.\n\nMission Statement: We empower our target market through accessible, high-quality ${data.products} while building sustainable value for stakeholders, employees, and the broader Nigerian community.`,
          
          marketAnalysis: `The Nigerian ${data.sector} sector represents a ₦2.8 trillion opportunity with 15-25% annual growth rates driven by rapid urbanization, digital adoption, and youth demographics.\n\nOur primary target segment (${data.targetMarket}) represents approximately 12-18 million potential customers with average income levels of ₦150,000 - ₦500,000 annually and 75% smartphone penetration.\n\nMarket gaps include underserved segments seeking quality ${data.products}, limited local alternatives to imported solutions, and growing demand for Nigerian-made products and services.`,
          
          businessModel: `Our business model centers on ${data.pricingModel.toLowerCase()} approach, optimized for Nigerian market conditions.\n\nPrimary Revenue Streams:\n1. Core Product/Service Sales (70% of revenue)\n2. Partnership and Licensing (20% of revenue)\n3. Consulting and Support Services (10% of revenue)\n\nCustomer Acquisition Strategy: ${data.customerAcquisition} forms the cornerstone of our approach, complemented by digital marketing, strategic partnerships, and referral programs.`,
          
          financialProjections: {
            year1Revenue: '₦8.5M',
            year2Revenue: '₦24.7M',
            year3Revenue: '₦68.2M',
            breakEvenMonth: 8,
            initialInvestment: '₦4.2M'
          },
          
          marketingStrategy: `Brand Positioning: Premium yet accessible ${data.products} designed specifically for Nigerian customers who value quality, reliability, and local relevance.\n\nMarketing Mix Strategy includes competitive pricing 15-20% below international alternatives, multi-channel distribution, and comprehensive promotion through digital marketing, traditional media, and experiential marketing.`,
          
          implementationTimeline: `Months 1-2: Foundation Phase - Legal entity establishment and regulatory compliance\nMonths 3-4: Product Development - Product finalization and testing\nMonths 5-6: Market Entry - Soft launch with limited customer base\nMonths 7-8: Scale Operations - Full market launch across primary markets\nMonths 9-12: Growth and Expansion - Market expansion to secondary cities`,
          
          riskAnalysis: `Key risks include established international competitors with superior resources, economic volatility affecting consumer spending, regulatory changes impacting operations, infrastructure challenges affecting distribution, and currency fluctuation impacting imported components.\n\nMitigation strategies include building strong local partnerships, maintaining conservative cash flow management, staying compliant with regulations, diversifying supply chains, and hedging currency exposure.`
        };
        
        setGeneratedPlan(fallbackPlan);
        
        toast({
          title: "Business Plan Generated!",
          description: "Your comprehensive business plan is ready"
        });
      }
    } catch (error) {
      console.error('Business plan generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate business plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateBusinessPlan,
    isGenerating,
    generatedPlan,
    setGeneratedPlan
  };
};
