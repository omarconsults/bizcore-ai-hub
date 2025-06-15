
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
