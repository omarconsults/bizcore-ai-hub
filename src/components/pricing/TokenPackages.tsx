
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface TokenPackagesProps {
  onBuyTokens: (packageName: string) => void;
}

const TokenPackages = ({ onBuyTokens }: TokenPackagesProps) => {
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

  return (
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
                  onClick={() => onBuyTokens(pkg.name.toLowerCase())}
                >
                  Buy {pkg.name}
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

export default TokenPackages;
