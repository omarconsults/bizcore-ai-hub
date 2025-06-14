
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Calculator, FileText, Users, CreditCard, Download } from 'lucide-react';

interface ReportsTabProps {
  handleGenerateReport: (reportName: string) => void;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ handleGenerateReport }) => {
  const reports = [
    { name: 'Profit & Loss Statement', description: 'Monthly P&L report', icon: TrendingUp },
    { name: 'Cash Flow Statement', description: 'Cash inflows and outflows', icon: DollarSign },
    { name: 'Balance Sheet', description: 'Assets, liabilities, equity', icon: Calculator },
    { name: 'Tax Report', description: 'Quarterly tax summary', icon: FileText },
    { name: 'Payroll Report', description: 'Employee compensation report', icon: Users },
    { name: 'Expense Analysis', description: 'Spending breakdown by category', icon: CreditCard }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, index) => (
          <Card key={index} className="border border-gray-200 hover:border-blue-900 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <report.icon className="text-blue-900" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-blue-900 hover:bg-blue-800"
                    onClick={() => handleGenerateReport(report.name)}
                  >
                    <Download className="mr-1" size={14} />
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsTab;
