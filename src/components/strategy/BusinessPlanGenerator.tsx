
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
  Coins,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessPlanAI } from '@/hooks/useBusinessPlanAI';

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

  const { generateBusinessPlan, isGenerating, generatedPlan } = useBusinessPlanAI();

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateBusinessPlan = async () => {
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

    await generateBusinessPlan(formData);
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
            <h3 className="text-xl font-bold text-gray-900">AI-Generated Business Plan</h3>
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
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.marketAnalysis}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Model</CardTitle>
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
                <CardTitle>Implementation Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.implementationTimeline}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 whitespace-pre-line">{generatedPlan.riskAnalysis}</div>
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
                    <span className="font-semibold text-lg">{generatedPlan.financialProjections.year1Revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 2 Revenue</span>
                    <span className="font-semibold text-lg">{generatedPlan.financialProjections.year2Revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year 3 Revenue</span>
                    <span className="font-semibold text-lg">{generatedPlan.financialProjections.year3Revenue}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Initial Investment</span>
                      <span className="font-semibold">{generatedPlan.financialProjections.initialInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Break-even Point</span>
                      <span className="font-semibold text-emerald-600">Month {generatedPlan.financialProjections.breakEvenMonth}</span>
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
          <p className="text-gray-600">Create comprehensive, investor-ready business plans with LLaMA AI</p>
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
                <Sparkles className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Ready to Generate Your AI Business Plan</h3>
                <p className="text-gray-600 mt-2">
                  Our advanced LLaMA AI will create a detailed, investor-ready business plan including:
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
                    Business Model & Strategy
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Financial Projections (3-year)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Marketing & Implementation
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Risk Analysis & Mitigation
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
                  <RefreshCw className="animate-spin h-6 w-6 text-emerald-600" />
                  <span className="text-gray-600">LLaMA AI is generating your comprehensive business plan...</span>
                </div>
              ) : (
                <Button 
                  onClick={handleGenerateBusinessPlan}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                  disabled={!user || tokenBalance.availableTokens < BUSINESS_PLAN_TOKEN_COST}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Business Plan ({BUSINESS_PLAN_TOKEN_COST} tokens)
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
