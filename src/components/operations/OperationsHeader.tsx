
import React from 'react';
import { Calculator } from 'lucide-react';

interface OperationsHeaderProps {
  monthlyFinancials: {
    profit: number;
    growth: number;
  };
  formatCurrency: (amount: number) => string;
}

const OperationsHeader: React.FC<OperationsHeaderProps> = ({ monthlyFinancials, formatCurrency }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calculator className="text-blue-900" size={28} />
            Operations Manager
          </h1>
          <p className="text-gray-600 mt-1">Manage your finances, invoicing, and payroll</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">This Month</div>
          <div className="text-2xl font-bold text-emerald-600">{formatCurrency(monthlyFinancials.profit)}</div>
          <div className="text-sm text-emerald-600">+{monthlyFinancials.growth}% growth</div>
        </div>
      </div>
    </div>
  );
};

export default OperationsHeader;
