
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SubscriptionPlansProps {
  onChoosePlan: (planType: string) => void;
}

const SubscriptionPlans = ({ onChoosePlan }: SubscriptionPlansProps) => {
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Monthly Subscription Plans</h2>
          <p className="text-xl text-gray-600">Complete business management with monthly token allowances</p>
          <div className="mt-6 bg-emerald-100 border border-emerald-300 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-emerald-800 font-semibold">💡 Remember: You get 100 days free trial first!</p>
            <p className="text-emerald-700 text-sm">Try all features with 2,500+ tokens before choosing a plan</p>
          </div>
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
                  onClick={() => onChoosePlan(plan.name.toLowerCase())}
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
  );
};

export default SubscriptionPlans;
