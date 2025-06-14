
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, CreditCard } from 'lucide-react';

interface Transaction {
  date: string;
  type: string;
  description: string;
  amount: number;
  category: string;
}

interface FinancialOverviewTabProps {
  recentTransactions: Transaction[];
  formatCurrency: (amount: number) => string;
}

const FinancialOverviewTab: React.FC<FinancialOverviewTabProps> = ({ recentTransactions, formatCurrency }) => {
  return (
    <div className="space-y-6">
      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  {transaction.type === 'income' ? 
                    <TrendingUp className="text-emerald-600" size={16} /> :
                    <CreditCard className="text-red-600" size={16} />
                  }
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                  <p className="text-sm text-gray-600">{transaction.date} • {transaction.category}</p>
                </div>
              </div>
              <div className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(transaction.amount))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cash Flow Chart Placeholder */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Cash Flow Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-600">Cash flow visualization coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverviewTab;
