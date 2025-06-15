import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Wand2,
  Building,
  Target,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Coins
} from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';

const BusinessPlanGenerator = () => {
  const { user } = useAuth();
  const { tokenBalance, consumeTokens } = useTokens();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    sector: '',
    products: '',
    targetMarket: '',
    competitors: '',
    pricingModel: '',
    customerAcquisition: '',
    growthGoals: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const BUSINESS_PLAN_TOKEN_COST = 50;

  const sectors = [
    'Technology & Software',
    'E-commerce & Retail',
    'Fashion & Lifestyle',
    'Food & Beverage',
    'Healthcare',
    'Education',
    'Financial Services',
    'Agriculture',
    'Manufacturing',
    'Professional Services',
    'Entertainment & Media',
    'Real Estate'
  ];

  const pricingModels = [
    'One-time Purchase',
    'Subscription (Monthly)',
    'Subscription (Annual)',
    'Freemium',
    'Commission-based',
    'Pay-per-use',
    'Tiered Pricing',
    'Custom Pricing'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBusinessPlan = async () => {
    if (!user) {
      alert('Please log in to generate a comprehensive business plan');
      return;
    }

    const canConsume = await consumeTokens(
      BUSINESS_PLAN_TOKEN_COST, 
      'business_plan_generation', 
      `Comprehensive business plan generated for ${formData.businessName}`
    );

    if (!canConsume) {
      return; // consumeTokens already shows error toast
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPlan({
        executiveSummary: `${formData.businessName} represents a strategic entry into Nigeria's rapidly evolving ${formData.sector.toLowerCase()} market. Our company specializes in ${formData.products}, specifically designed to address the unique needs and preferences of ${formData.targetMarket}.

        **Vision Statement:** To become the leading provider of innovative ${formData.products} solutions that transform how Nigerian consumers and businesses operate in the digital economy.

        **Mission Statement:** We empower our target market through accessible, high-quality ${formData.products} while building sustainable value for stakeholders, employees, and the broader Nigerian community.

        **Key Value Propositions:**
        • Locally-adapted solutions designed for Nigerian market conditions
        • Competitive pricing strategy utilizing ${formData.pricingModel.toLowerCase()} model
        • Strong focus on customer acquisition through ${formData.customerAcquisition}
        • Commitment to achieving ${formData.growthGoals} within our strategic timeframe

        **Competitive Advantage:** Our deep understanding of local market dynamics, combined with innovative approaches to ${formData.products}, positions us uniquely against established competitors. We leverage technology, local partnerships, and customer-centric design to create sustainable differentiation.

        **Financial Highlights:** Based on conservative market projections, we anticipate strong revenue growth with break-even achieved by month 8, leading to substantial profitability and expansion opportunities across Nigeria's key economic centers.`,

        marketOpportunity: `**Market Size and Growth Potential**

        The Nigerian ${formData.sector} sector represents a ₦2.8 trillion opportunity with 15-25% annual growth rates driven by:

        **Primary Market Drivers:**
        • Rapid urbanization: 70% of Nigeria's population will be urban by 2030
        • Digital adoption: 104 million internet users with 85% mobile penetration
        • Youth demographics: 60% of population under 25 driving consumption patterns
        • Economic diversification: Government emphasis on non-oil sectors
        • SME growth: 98% of businesses are SMEs seeking modern solutions

        **Target Market Analysis:**
        Our primary target segment (${formData.targetMarket}) represents approximately 12-18 million potential customers with:
        • Average income levels: ₦150,000 - ₦500,000 annually
        • Technology adoption rate: 75% smartphone penetration
        • Spending patterns: 25-35% of income on ${formData.sector.toLowerCase()} products/services
        • Geographic concentration: Lagos (35%), Abuja (20%), Port Harcourt (15%), Kano (12%)

        **Market Gaps and Opportunities:**
        1. Underserved segments seeking quality ${formData.products}
        2. Limited local alternatives to imported solutions
        3. Growing demand for Nigerian-made products and services
        4. Insufficient customer service and support infrastructure
        5. Pricing gaps between premium international and basic local offerings

        **Regulatory Environment:**
        The Nigerian government actively supports ${formData.sector} development through:
        • Tax incentives for local manufacturers and service providers
        • Import substitution policies favoring local content
        • Digital economy initiatives reducing regulatory barriers
        • SME support programs providing access to funding and markets

        **Market Entry Strategy:**
        Phase 1: Lagos and Abuja market penetration (Months 1-6)
        Phase 2: Secondary cities expansion (Months 7-12)
        Phase 3: National coverage and market leadership (Year 2-3)`,

        swotAnalysis: {
          strengths: [
            'Strong founding team with deep Nigerian market knowledge and international experience',
            'Innovative product/service offering uniquely positioned for local market needs',
            'Strategic timing aligning with market growth trends and digital transformation',
            'Robust financial planning with conservative projections and multiple revenue streams',
            'Early partnerships established with key industry players and distribution channels',
            'Comprehensive understanding of regulatory requirements and compliance frameworks'
          ],
          weaknesses: [
            'Limited initial capital requiring phased growth approach and careful cash management',
            'New brand requiring significant investment in awareness and trust building',
            'Small initial team necessitating strategic hiring and capacity building',
            'Dependence on key suppliers and partners during early growth phase',
            'Limited operational history affecting credit access and partnership negotiations'
          ],
          opportunities: [
            'Nigeria\'s rapidly growing economy with increasing consumer spending power',
            'Government support for local businesses through policy initiatives and incentives',
            'Digital transformation creating new market channels and business models',
            'Regional expansion opportunities across West Africa\'s 400 million population',
            'Corporate partnerships with multinational companies seeking local suppliers',
            'Growing middle class driving demand for quality products and services'
          ],
          threats: [
            'Established international competitors with superior resources and brand recognition',
            'Economic volatility affecting consumer spending and business investment',
            'Regulatory changes potentially impacting business operations and costs',
            'Infrastructure challenges affecting distribution and service delivery',
            'Currency fluctuation impacting imported components and materials',
            'Security concerns in certain regions limiting market access and operations'
          ]
        },

        businessModel: `**Revenue Generation Strategy**

        Our business model centers on ${formData.pricingModel.toLowerCase()} approach, optimized for Nigerian market conditions:

        **Primary Revenue Streams:**
        1. Core Product/Service Sales (70% of revenue)
           • Direct sales through online and offline channels
           • Subscription-based recurring revenue for ongoing services
           • Premium features and add-on services

        2. Partnership and Licensing (20% of revenue)
           • Strategic partnerships with established brands
           • White-label solutions for corporate clients
           • Licensing intellectual property and methodologies

        3. Consulting and Support Services (10% of revenue)
           • Implementation and integration services
           • Training and capacity building programs
           • Ongoing technical support and maintenance

        **Customer Acquisition Strategy:**
        ${formData.customerAcquisition} forms the cornerstone of our approach, complemented by:
        • Digital marketing leveraging social media platforms popular in Nigeria
        • Strategic partnerships with industry associations and professional bodies
        • Referral programs incentivizing existing customers to drive new business
        • Trade shows and industry events for B2B market penetration
        • Content marketing establishing thought leadership and brand authority

        **Operational Excellence:**
        • Lean startup methodology ensuring efficient resource utilization
        • Technology-driven processes minimizing operational overhead
        • Local supply chain partnerships reducing costs and delivery times
        • Quality management systems ensuring consistent customer experience
        • Data-driven decision making optimizing all business functions

        **Scaling Strategy:**
        Year 1: Proof of concept and market validation
        Year 2: Market expansion and operational scaling
        Year 3: Regional expansion and product diversification`,

        financialOverview: {
          yearOneRevenue: '₦8.5M',
          yearTwoRevenue: '₦24.7M',
          yearThreeRevenue: '₦68.2M',
          initialInvestment: '₦4.2M',
          breakEvenMonth: 8,
          grossMargin: '65%',
          operatingMargin: '25%',
          cashFlowPositive: 'Month 10',
          roiProjection: '280%'
        },

        marketingStrategy: `**Comprehensive Marketing Framework**

        **Brand Positioning:** Premium yet accessible ${formData.products} designed specifically for Nigerian customers who value quality, reliability, and local relevance.

        **Marketing Mix Strategy:**

        **Product:** 
        • Core offering: ${formData.products} with Nigerian market adaptations
        • Service excellence: 24/7 customer support in major Nigerian languages
        • Continuous innovation: Regular updates based on customer feedback

        **Price:** 
        • Competitive pricing 15-20% below international alternatives
        • Flexible payment options including installments and mobile money
        • Value-based pricing reflecting quality and local support

        **Place:**
        • Multi-channel distribution: Online platform, retail partnerships, direct sales
        • Geographic focus: Major urban centers with expansion to secondary cities
        • Strategic locations ensuring accessibility for target customers

        **Promotion:**
        • Digital marketing: SEO, social media, influencer partnerships
        • Traditional media: Radio and print in key markets
        • Experiential marketing: Product demonstrations and trial programs
        • Content marketing: Educational resources and thought leadership`,

        implementationPlan: `**12-Month Implementation Roadmap**

        **Months 1-2: Foundation Phase**
        • Legal entity establishment and regulatory compliance
        • Initial team recruitment and onboarding
        • Technology infrastructure development
        • Supplier partnerships and quality agreements

        **Months 3-4: Product Development**
        • Product finalization and testing
        • Quality assurance protocols implementation
        • Initial inventory and supply chain setup
        • Brand identity and marketing materials development

        **Months 5-6: Market Entry**
        • Soft launch with limited customer base
        • Customer feedback collection and product refinement
        • Marketing campaign execution
        • Sales team training and deployment

        **Months 7-8: Scale Operations**
        • Full market launch across primary markets
        • Operational scaling and process optimization
        • Customer service infrastructure deployment
        • Performance monitoring and adjustment

        **Months 9-12: Growth and Expansion**
        • Market expansion to secondary cities
        • Product line extensions based on market feedback
        • Strategic partnerships establishment
        • Preparation for Series A funding round`
      });
      setIsGenerating(false);
    }, 3000);
  };

  const steps = [
    { number: 1, title: 'Business Basics', icon: Building },
    { number: 2, title: 'Market & Competition', icon: Target },
    { number: 3, title: 'Strategy & Goals', icon: TrendingUp },
    { number: 4, title: 'Generate Plan', icon: Wand2 }
  ];

  if (generatedPlan) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Comprehensive Business Plan</h3>
            <p className="text-gray-600">Professional business plan for {formData.businessName} ({BUSINESS_PLAN_TOKEN_COST} tokens used)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye size={16} />
              Full Preview
            </Button>
            <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Download size={16} />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.executiveSummary}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Opportunity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.marketOpportunity}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comprehensive SWOT Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-600 mb-3">Strengths</h4>
                    <ul className="space-y-2">
                      {generatedPlan.swotAnalysis.strengths.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-3">Opportunities</h4>
                    <ul className="space-y-2">
                      {generatedPlan.swotAnalysis.opportunities.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <TrendingUp size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-3">Weaknesses</h4>
                    <ul className="space-y-2">
                      {generatedPlan.swotAnalysis.weaknesses.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="w-3 h-3 bg-orange-600 rounded-full mt-1 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">Threats</h4>
                    <ul className="space-y-2">
                      {generatedPlan.swotAnalysis.threats.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="w-3 h-3 bg-red-600 rounded-full mt-1 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Model & Revenue Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.businessModel}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.marketingStrategy}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.implementationPlan}</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Projections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 1 Revenue</span>
                    <span className="font-semibold text-lg">{generatedPlan.financialOverview.yearOneRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 2 Revenue</span>
                    <span className="font-semibold text-lg">{generatedPlan.financialOverview.yearTwoRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 3 Revenue</span>
                    <span className="font-semibold text-lg">{generatedPlan.financialOverview.yearThreeRevenue}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Initial Investment</span>
                      <span className="font-semibold">{generatedPlan.financialOverview.initialInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Break-even Point</span>
                      <span className="font-semibold text-emerald-600">Month {generatedPlan.financialOverview.breakEvenMonth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gross Margin</span>
                      <span className="font-semibold">{generatedPlan.financialOverview.grossMargin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ROI Projection</span>
                      <span className="font-semibold text-blue-600">{generatedPlan.financialOverview.roiProjection}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export & Share Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Professional PDF Report
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Executive Summary (2 pages)
                </Button>
                <Button className="w-full" variant="outline">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Investor Pitch Deck
                </Button>
                <Button className="w-full" variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financial Model Spreadsheet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI-Powered Business Plan Generator</h3>
          <p className="text-gray-600">Create comprehensive, investor-ready business plans in minutes</p>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full">
              <Coins size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                {tokenBalance.availableTokens} tokens
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            {steps.map((step) => (
              <div key={step.number} className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                currentStep >= step.number ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
              }`}>
                <step.icon size={14} />
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Step {currentStep}: {steps[currentStep - 1].title}</span>
            {currentStep === 4 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Coins size={12} />
                {BUSINESS_PLAN_TOKEN_COST} tokens required
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <Input
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Sector</label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Products/Services</label>
                <Textarea
                  placeholder="Describe your main products or services in detail"
                  value={formData.products}
                  onChange={(e) => handleInputChange('products', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
                <Textarea
                  placeholder="Describe your target customers in detail (demographics, behavior, needs)"
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Competitors</label>
                <Textarea
                  placeholder="List your main competitors and explain your competitive advantages"
                  value={formData.competitors}
                  onChange={(e) => handleInputChange('competitors', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Model</label>
                <Select value={formData.pricingModel} onValueChange={(value) => handleInputChange('pricingModel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your pricing model" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingModels.map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Acquisition Strategy</label>
                <Textarea
                  placeholder="Describe your detailed customer acquisition and marketing strategy"
                  value={formData.customerAcquisition}
                  onChange={(e) => handleInputChange('customerAcquisition', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Growth Goals</label>
                <Textarea
                  placeholder="What are your specific growth targets and expansion plans?"
                  value={formData.growthGoals}
                  onChange={(e) => handleInputChange('growthGoals', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Wand2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Ready to Generate Your Comprehensive Business Plan</h3>
                <p className="text-gray-600 mt-2">
                  Our advanced AI will create a detailed, investor-ready business plan including:
                </p>
                <div className="grid md:grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Executive Summary
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Market Analysis & Opportunity
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Comprehensive SWOT Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Financial Projections (3-year)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Business Model & Revenue Strategy
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Marketing & Implementation Plan
                  </div>
                </div>
              </div>
              
              {!user && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">Please log in to generate your comprehensive business plan</p>
                </div>
              )}
              
              {user && tokenBalance.availableTokens < BUSINESS_PLAN_TOKEN_COST && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">
                    You need {BUSINESS_PLAN_TOKEN_COST} tokens but only have {tokenBalance.availableTokens} available.
                    Purchase more tokens to continue.
                  </p>
                </div>
              )}

              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                  <span className="text-gray-600">Generating your comprehensive business plan...</span>
                </div>
              ) : (
                <Button 
                  onClick={generateBusinessPlan}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                  disabled={!user || tokenBalance.availableTokens < BUSINESS_PLAN_TOKEN_COST}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Business Plan ({BUSINESS_PLAN_TOKEN_COST} tokens)
                </Button>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4 || (currentStep === 1 && (!formData.businessName || !formData.sector))}
              className="bg-blue-900 hover:bg-blue-800"
            >
              {currentStep === 4 ? 'Generate' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPlanGenerator;
