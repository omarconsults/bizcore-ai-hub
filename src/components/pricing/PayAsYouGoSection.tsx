
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PayAsYouGoSectionProps {
  onBuyTokens: (packageName: string) => void;
  onViewAuth: () => void;
}

const PayAsYouGoSection = ({ onBuyTokens, onViewAuth }: PayAsYouGoSectionProps) => {
  return (
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
                onClick={() => onBuyTokens('starter')}
              >
                Start with 100 Tokens
              </Button>
              <Button 
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                onClick={onViewAuth}
              >
                View All Packages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PayAsYouGoSection;
