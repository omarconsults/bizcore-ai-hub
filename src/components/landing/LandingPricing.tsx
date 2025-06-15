
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Coins, Sparkles } from 'lucide-react';
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
      gradient: "from-slate-800/50 to-slate-700/50",
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
      gradient: "from-blue-600/20 to-emerald-600/20",
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
      gradient: "from-purple-600/20 to-pink-600/20",
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
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <Badge className="mb-8 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 px-6 py-3 border border-emerald-500/30 backdrop-blur-sm">
            <Coins className="mr-2" size={16} />
            🎯 Token-Based Pricing
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Pay for What 
            <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              You Actually Use
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Choose flexible token packages for AI features or subscription plans with monthly allowances. 
            Transparent pricing that scales with your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative group bg-gradient-to-br ${plan.gradient} backdrop-blur-md border border-white/20 hover:border-white/30 transition-all duration-500 hover:scale-105 ${plan.popular ? 'scale-105 border-blue-500/50 shadow-2xl shadow-blue-500/20' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 shadow-lg">
                    <Sparkles className="mr-1" size={12} />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 relative z-10">
                <CardTitle className="text-2xl font-bold text-white mb-4">{plan.name}</CardTitle>
                <div className="mb-6">
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-slate-400 text-lg">{plan.period}</span>
                </div>
                <div className="mb-4">
                  <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 bg-emerald-500/10 backdrop-blur-sm">
                    <Coins className="mr-1" size={12} />
                    {plan.tokenPackage}
                  </Badge>
                </div>
                <p className="text-slate-300 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-8 relative z-10">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-blue-500/25' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                  }`}
                  onClick={() => handleChoosePlan(plan.name.toLowerCase())}
                >
                  {plan.name === "Pay-as-You-Go" ? "Buy Tokens" : `Choose ${plan.name}`}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-10 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300"
            onClick={handleViewPricing}
          >
            View Detailed Token Pricing
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
