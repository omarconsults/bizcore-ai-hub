
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LandingPricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewPricing = () => {
    navigate('/pricing');
  };

  const handleChoosePlan = (planType: string) => {
    if (user) {
      navigate('/', { state: { selectedPlan: planType } });
    } else {
      navigate('/auth');
    }
  };

  const plans = [
    {
      name: "Pay-as-You-Go",
      price: "₦50",
      period: "/token",
      description: "Perfect flexibility - buy tokens when you need them",
      tokenPackage: "Start with 100 tokens for ₦5,000",
      features: [
        "No monthly commitment",
        "Tokens never expire",
        "All AI features included",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "₦35,000",
      period: "/month",
      description: "Complete business platform + 1,000 monthly tokens",
      popular: true,
      tokenPackage: "1,000 AI tokens monthly + business tools",
      features: [
        "1,000 AI tokens monthly",
        "Advanced compliance automation",
        "Unlimited invoicing",
        "HR management suite",
        "24/7 priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "₦75,000",
      period: "/month",
      description: "Full platform + 5,000 monthly tokens",
      tokenPackage: "5,000 AI tokens monthly + premium features",
      features: [
        "5,000 AI tokens monthly",
        "Unlimited employees",
        "Dedicated account manager",
        "Custom integrations",
        "Business growth consulting"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 px-4 py-2">
            🎯 Token-Based Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pay for What 
            <span className="text-blue-900 block">You Actually Use</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose flexible token packages for AI features or subscription plans with monthly allowances. 
            Transparent pricing that scales with your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-900 shadow-xl scale-105' : 'border border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-900 text-white px-6 py-2">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-blue-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                    <Coins className="mr-1" size={12} />
                    {plan.tokenPackage}
                  </Badge>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 ${plan.popular ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-900 hover:bg-gray-800'}`}
                  onClick={() => handleChoosePlan(plan.name.toLowerCase())}
                >
                  {plan.name === "Pay-as-You-Go" ? "Buy Tokens" : `Choose ${plan.name}`}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-3"
            onClick={handleViewPricing}
          >
            View Detailed Token Pricing
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
