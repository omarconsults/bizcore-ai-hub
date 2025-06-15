
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Star, Shield, Zap, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChoosePlan = (planType: string) => {
    if (user) {
      // Navigate to dashboard with plan selection
      navigate('/', { state: { selectedPlan: planType } });
    } else {
      navigate('/auth');
    }
  };

  const handleBuyTokens = (packageName: string) => {
    if (user) {
      navigate('/', { state: { tokenPackage: packageName } });
    } else {
      navigate('/auth');
    }
  };

  const tokenPackages = [
    {
      name: "Starter Pack",
      tokens: 100,
      price: "₦5,000",
      pricePerToken: "₦50",
      popular: false,
      description: "Perfect for trying out AI features",
      estimatedUsage: "2-3 business plans or 20 document generations"
    },
    {
      name: "Professional Pack",
      tokens: 500,
      price: "₦20,000",
      pricePerToken: "₦40",
      popular: true,
      description: "Great for regular business operations",
      estimatedUsage: "10-15 business plans or 100+ document generations"
    },
    {
      name: "Enterprise Pack",
      tokens: 1500,
      price: "₦50,000",
      pricePerToken: "₦33",
      popular: false,
      description: "For heavy users and large businesses",
      estimatedUsage: "30+ business plans or 300+ document generations"
    },
    {
      name: "Premium Pack",
      tokens: 3000,
      price: "₦90,000",
      pricePerToken: "₦30",
      popular: false,
      description: "Maximum value for power users",
      estimatedUsage: "60+ business plans or 600+ document generations"
    }
  ];

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "₦15,000",
      monthlyTokens: 200,
      description: "Core business services + monthly token allowance",
      features: [
        "CAC Business Registration",
        "Basic compliance monitoring",
        "200 AI tokens monthly",
        "Simple invoicing (20/month)",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "₦35,000",
      monthlyTokens: 1000,
      description: "Advanced features + generous token allowance",
      popular: true,
      features: [
        "Everything in Basic",
        "1000 AI tokens monthly",
        "Advanced compliance automation",
        "Unlimited invoicing",
        "HR management suite",
        "24/7 priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "₦75,000",
      monthlyTokens: 5000,
      description: "Full platform access + unlimited tokens",
      features: [
        "Everything in Professional",
        "5000 AI tokens monthly",
        "Unlimited employees",
        "Dedicated account manager",
        "Custom integrations",
        "Business growth consulting"
      ]
    }
  ];

  const tokenCosts = [
    { feature: "AI Copilot Chat", cost: "1 token per message" },
    { feature: "Simple Document Generation", cost: "5-10 tokens" },
    { feature: "Complex Document Generation", cost: "15-25 tokens" },
    { feature: "Business Plan Generation", cost: "50 tokens" },
    { feature: "Marketing Content Creation", cost: "10-20 tokens" },
    { feature: "Compliance Document Review", cost: "15-30 tokens" },
    { feature: "HR Policy Generation", cost: "20-40 tokens" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={() => navigate('/auth')} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 px-4 py-2">
            🎯 Pay for What You Use • Token-Based Pricing
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Flexible Pricing 
            <span className="text-blue-900 block">Built for Growth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose between token packages for AI features or subscription plans with monthly allowances. 
            Pay only for what you use with transparent, token-based pricing.
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-gray-600 mb-12">
            <div className="flex items-center gap-2">
              <Shield className="text-emerald-600" size={16} />
              <span>Tokens Never Expire</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-blue-600" size={16} />
              <span>Instant Token Top-ups</span>
            </div>
            <div className="flex items-center gap-2">
              <Calculator className="text-purple-600" size={16} />
              <span>Usage Calculator</span>
            </div>
          </div>
        </div>
      </section>

      {/* Token Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Token Packages</h2>
            <p className="text-xl text-gray-600">Buy tokens to unlock powerful AI features. More tokens = better value.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {tokenPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-2 border-emerald-600 shadow-xl scale-105' : 'border border-gray-200'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-emerald-600 text-white px-6 py-2">Best Value</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900">{pkg.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-emerald-600">{pkg.price}</span>
                    <div className="text-2xl font-bold text-gray-900 mt-2">{pkg.tokens.toLocaleString()} Tokens</div>
                    <div className="text-sm text-gray-600">{pkg.pricePerToken} per token</div>
                  </div>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium">Estimated Usage:</p>
                    <p className="text-sm text-gray-600">{pkg.estimatedUsage}</p>
                  </div>

                  <Button 
                    className={`w-full py-3 ${pkg.popular ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => handleBuyTokens(pkg.name.toLowerCase())}
                  >
                    Buy {pkg.name}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Token Usage Guide */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Token Usage Guide</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokenCosts.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium text-gray-700">{item.feature}</span>
                  <Badge variant="outline" className="text-blue-600">{item.cost}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans with Token Allowances */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Monthly Subscription Plans</h2>
            <p className="text-xl text-gray-600">Complete business management with monthly token allowances</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-900 shadow-xl scale-105' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-900 text-white px-6 py-2">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-900">{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">
                      {plan.monthlyTokens} tokens/month
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-2">
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
                    Choose {plan.name}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pay-as-you-go Option */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Prefer Pay-as-You-Go?</h2>
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Monthly Commitment</h3>
              <p className="text-lg text-gray-600 mb-6">
                Skip the subscription and buy tokens only when you need them. Perfect for occasional users or businesses with variable AI usage.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleBuyTokens('starter')}
                >
                  Start with 100 Tokens
                </Button>
                <Button 
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => navigate('/auth')}
                >
                  View All Packages
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Guarantees</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tokens Never Expire</h3>
              <p className="text-gray-600">Your tokens remain available until you use them - no monthly resets</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Instant Top-ups</h3>
              <p className="text-gray-600">Buy more tokens anytime and start using them immediately</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">Know exactly what each AI feature costs before you use it</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
