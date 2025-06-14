
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const CostBreakdown: React.FC = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="text-blue-900" size={20} />
          Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Name search</span>
          <span className="text-sm font-medium">₦500</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">CAC registration</span>
          <span className="text-sm font-medium">₦10,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Legal documents</span>
          <span className="text-sm font-medium">₦25,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Stamp duties</span>
          <span className="text-sm font-medium">₦15,000</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <span>Total Estimated</span>
          <span className="text-blue-900">₦50,500</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
