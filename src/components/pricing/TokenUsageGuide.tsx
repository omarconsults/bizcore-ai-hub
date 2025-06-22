
import React from 'react';
import { Badge } from '@/components/ui/badge';

const TokenUsageGuide = () => {
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
    <div className="bg-blue-50 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Token Usage Guide</h3>
      <div className="mb-6 text-center">
        <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-4 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-emerald-800 mb-2">🎁 Your Trial Includes:</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-bold text-emerald-700">10</div>
              <div className="text-emerald-600">Welcome Tokens</div>
            </div>
            <div>
              <div className="font-bold text-emerald-700">25/day</div>
              <div className="text-emerald-600">Daily Tokens</div>
            </div>
            <div>
              <div className="font-bold text-emerald-700">100 days</div>
              <div className="text-emerald-600">Trial Period</div>
            </div>
          </div>
          <p className="text-emerald-700 text-sm mt-2">Total: 2,500+ tokens to explore everything!</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokenCosts.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
            <span className="font-medium text-gray-700">{item.feature}</span>
            <Badge variant="outline" className="text-blue-600">{item.cost}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenUsageGuide;
