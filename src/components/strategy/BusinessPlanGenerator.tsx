
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
  CheckCircle
} from 'lucide-react';

const BusinessPlanGenerator = () => {
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
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPlan({
        executiveSummary: `${formData.businessName} is a ${formData.sector.toLowerCase()} company focused on ${formData.products}. Our target market consists of ${formData.targetMarket}, and we aim to achieve ${formData.growthGoals} through strategic ${formData.customerAcquisition}.`,
        marketOpportunity: `The ${formData.sector} sector in Nigeria is experiencing significant growth, with increasing digital adoption and consumer spending. Key market drivers include urbanization, mobile penetration, and government initiatives supporting SMEs.`,
        swotAnalysis: {
          strengths: ['Innovative product offering', 'Strong founding team', 'Market timing'],
          weaknesses: ['Limited initial capital', 'New brand recognition', 'Small team size'],
          opportunities: ['Growing Nigerian market', 'Digital transformation', 'Government support'],
          threats: ['Established competitors', 'Economic volatility', 'Regulatory changes']
        },
        businessModel: `Revenue generation through ${formData.pricingModel.toLowerCase()} with focus on ${formData.customerAcquisition}. Key value propositions include quality, affordability, and local market understanding.`,
        financialOverview: {
          yearOneRevenue: '₦2.5M',
          yearTwoRevenue: '₦8.2M',
          yearThreeRevenue: '₦15.7M',
          initialInvestment: '₦1.2M',
          breakEvenMonth: 8
        }
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
            <h3 className="text-xl font-bold text-gray-900">Your Business Plan</h3>
            <p className="text-gray-600">AI-generated business plan for {formData.businessName}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye size={16} />
              Preview
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
                <p className="text-gray-700">{generatedPlan.executiveSummary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{generatedPlan.marketOpportunity}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SWOT Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-600 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {generatedPlan.swotAnalysis.strengths.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                          <CheckCircle size={14} className="text-emerald-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Opportunities</h4>
                    <ul className="space-y-1">
                      {generatedPlan.swotAnalysis.opportunities.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                          <TrendingUp size={14} className="text-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 1 Revenue</span>
                    <span className="font-semibold">{generatedPlan.financialOverview.yearOneRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 2 Revenue</span>
                    <span className="font-semibold">{generatedPlan.financialOverview.yearTwoRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 3 Revenue</span>
                    <span className="font-semibold">{generatedPlan.financialOverview.yearThreeRevenue}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm text-gray-600">Break-even</span>
                    <span className="font-semibold text-emerald-600">Month {generatedPlan.financialOverview.breakEvenMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Download as PDF
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Export to Google Docs
                </Button>
                <Button className="w-full" variant="outline">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Create Investor Deck
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
          <h3 className="text-xl font-bold text-gray-900">AI Business Plan Generator</h3>
          <p className="text-gray-600">Create a professional business plan in minutes</p>
        </div>
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

      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
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
                  placeholder="Describe your main products or services"
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
                  placeholder="Describe your target customers (e.g., young professionals in Lagos, small business owners)"
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Competitors</label>
                <Textarea
                  placeholder="List your main competitors and what makes you different"
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
                  placeholder="How will you find and attract customers? (e.g., social media, referrals, partnerships)"
                  value={formData.customerAcquisition}
                  onChange={(e) => handleInputChange('customerAcquisition', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Growth Goals</label>
                <Textarea
                  placeholder="What are your growth targets for the next 2-3 years?"
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
                <h3 className="text-lg font-semibold text-gray-900">Ready to Generate Your Business Plan</h3>
                <p className="text-gray-600 mt-2">
                  Our AI will create a comprehensive business plan tailored to the Nigerian market, including:
                </p>
                <div className="grid md:grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Executive Summary
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Market Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    SWOT Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Financial Projections
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Business Model Canvas
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Go-to-Market Strategy
                  </div>
                </div>
              </div>
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                  <span className="text-gray-600">Generating your business plan...</span>
                </div>
              ) : (
                <Button 
                  onClick={generateBusinessPlan}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Business Plan
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
