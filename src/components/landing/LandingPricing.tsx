
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
      gradient: "from-slate-900/90 to-slate-800/90",
      borderColor: "border-slate-700/50",
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
      gradient: "from-indigo-900/90 to-purple-900/90",
      borderColor: "border-indigo-500/50",
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
      gradient: "from-emerald-900/90 to-teal-900/90",
      borderColor: "border-emerald-500/50",
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-8 bg-indigo-500/20 text-indigo-300 px-6 py-3 border border-indigo-500/30">
            <Coins className="mr-2" size={16} />
            🎯 Free 100-Day Trial + Token-Based Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
            Start with 100 Days Free
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Then Pay for What You Use
            </span>
          </h2>
          <p className="text-lg lg:text-xl xl:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Begin with 10 welcome bonus tokens + 100-day trial with 25 daily tokens. 
            Choose flexible packages or subscription plans that scale with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group bg-gradient-to-br ${plan.gradient} border ${plan.borderColor} hover:border-opacity-70 transition-all duration-300 hover:scale-105 ${plan.popular ? 'scale-105 border-indigo-400/60 shadow-2xl shadow-indigo-500/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2">
                    <Sparkles className="mr-1" size={12} />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white mb-4">{plan.name}</CardTitle>
                <div className="mb-6">
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-slate-400 text-lg">{plan.period}</span>
                </div>
                <div className="mb-4">
                  <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 bg-emerald-500/10">
                    <Coins className="mr-1" size={12} />
                    {plan.tokenPackage}
                  </Badge>
                </div>
                <p className="text-slate-300 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25 text-white' 
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600/50 hover:border-slate-500/50'
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
            className="border-2 border-slate-600/60 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-500/60 px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
            onClick={handleViewPricing}
          >
            View Detailed Token Pricing
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>

        {/* Simplified Trial Information */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">🎉 Get Started with Our Free Trial</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">10</div>
                <div className="text-slate-300">Welcome Bonus Tokens</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">100</div>
                <div className="text-slate-300">Days Free Trial</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">25</div>
                <div className="text-slate-300">Daily Tokens During Trial</div>
              </div>
            </div>
            <p className="text-slate-300 mt-6">
              Start your business journey with 10 bonus tokens plus 25 tokens daily for 100 days - that's over 2,500 tokens to explore all our AI features!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
