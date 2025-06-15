
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
      gradient: "from-violet-600/20 to-cyan-600/20",
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
      gradient: "from-emerald-600/20 to-teal-600/20",
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
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-violet-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 px-4 sm:px-6 py-2 sm:py-3 border border-violet-500/30 backdrop-blur-sm">
            <Coins className="mr-2" size={16} />
            🎯 Token-Based Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            Pay for What 
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              You Actually Use
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-300 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Choose flexible token packages for AI features or subscription plans with monthly allowances. 
            Transparent pricing that scales with your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative group bg-gradient-to-br ${plan.gradient} backdrop-blur-md border border-white/20 hover:border-white/30 transition-all duration-500 hover:scale-105 ${plan.popular ? 'scale-105 border-violet-500/50 shadow-2xl shadow-violet-500/20' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-4 sm:px-6 py-1 sm:py-2 shadow-lg">
                    <Sparkles className="mr-1" size={12} />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4 sm:pb-6 relative z-10">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{plan.name}</CardTitle>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-slate-400 text-base sm:text-lg">{plan.period}</span>
                </div>
                <div className="mb-3 sm:mb-4">
                  <Badge variant="outline" className="text-violet-400 border-violet-400/50 bg-violet-500/10 backdrop-blur-sm">
                    <Coins className="mr-1" size={12} />
                    {plan.tokenPackage}
                  </Badge>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6 sm:space-y-8 relative z-10">
                <ul className="space-y-3 sm:space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-cyan-400 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-300 leading-relaxed text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 shadow-lg hover:shadow-violet-500/25' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                  }`}
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
            className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300"
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
