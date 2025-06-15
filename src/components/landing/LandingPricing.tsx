
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';
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
      name: "Starter",
      price: "₦15,000",
      description: "Perfect for new entrepreneurs",
      features: [
        "CAC Business Registration",
        "Basic compliance monitoring",
        "Simple invoicing (20/month)",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "₦35,000",
      description: "Ideal for growing businesses",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced compliance automation",
        "Unlimited invoicing",
        "HR management suite",
        "24/7 priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "₦75,000",
      description: "Comprehensive business solution",
      features: [
        "Everything in Professional",
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
          <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
            💰 Transparent Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your 
            <span className="text-blue-900 block">Growth Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From startup to enterprise, we have the right plan to accelerate your Nigerian business growth.
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
                  <span className="text-gray-600">/month</span>
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
                  Choose {plan.name}
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
            View Detailed Pricing & Services
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
