
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, CreditCard, DollarSign } from 'lucide-react';

interface FinancialOverviewProps {
  monthlyFinancials: {
    revenue: number;
    expenses: number;
    profit: number;
    growth: number;
  };
  formatCurrency: (amount: number) => string;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ monthlyFinancials, formatCurrency }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyFinancials.revenue)}</p>
              <p className="text-sm text-emerald-600">+{monthlyFinancials.growth}% from last month</p>
            </div>
            <TrendingUp className="text-emerald-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Expenses</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyFinancials.expenses)}</p>
              <p className="text-sm text-gray-600">68% of revenue</p>
            </div>
            <CreditCard className="text-blue-900" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-emerald-600">{formatCurrency(monthlyFinancials.profit)}</p>
              <p className="text-sm text-gray-600">32% margin</p>
            </div>
            <DollarSign className="text-emerald-600" size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;
