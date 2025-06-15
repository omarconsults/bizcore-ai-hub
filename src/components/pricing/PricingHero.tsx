
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Calculator } from 'lucide-react';

const PricingHero = () => {
  return (
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
  );
};

export default PricingHero;
