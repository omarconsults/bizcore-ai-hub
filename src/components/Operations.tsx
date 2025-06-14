
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Users, 
  DollarSign,
  CreditCard,
  Receipt,
  Plus,
  Download,
  Eye
} from 'lucide-react';

const Operations = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const monthlyFinancials = {
    revenue: 2400000,
    expenses: 1650000,
    profit: 750000,
    growth: 12
  };

  const recentTransactions = [
    { date: '2024-03-15', type: 'income', description: 'Client Payment - Fashion Consultation', amount: 150000, category: 'Services' },
    { date: '2024-03-14', type: 'expense', description: 'Office Rent', amount: -200000, category: 'Overhead' },
    { date: '2024-03-13', type: 'income', description: 'Product Sales - Online Store', amount: 85000, category: 'Products' },
    { date: '2024-03-12', type: 'expense', description: 'Marketing Campaign', amount: -50000, category: 'Marketing' },
    { date: '2024-03-11', type: 'income', description: 'Wholesale Order', amount: 300000, category: 'Products' }
  ];

  const pendingInvoices = [
    { id: 'INV-001', client: 'Lagos Fashion Week', amount: 500000, dueDate: '2024-03-20', status: 'pending' },
    { id: 'INV-002', client: 'Bella Stores', amount: 250000, dueDate: '2024-03-25', status: 'overdue' },
    { id: 'INV-003', client: 'Style Central', amount: 180000, dueDate: '2024-04-01', status: 'pending' }
  ];

  const payrollSummary = [
    { name: 'Adaora Okafor', role: 'Founder/CEO', salary: 400000, status: 'paid' },
    { name: 'Emeka Johnson', role: 'Designer', salary: 250000, status: 'paid' },
    { name: 'Funmi Adebayo', role: 'Sales Manager', salary: 180000, status: 'pending' },
    { name: 'David Okwu', role: 'Operations Assistant', salary: 120000, status: 'pending' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
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

      {/* Financial Overview */}
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

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Financial Overview' },
              { id: 'invoicing', name: 'Invoicing' },
              { id: 'payroll', name: 'Payroll' },
              { id: 'reports', name: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
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
          )}

          {activeTab === 'invoicing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Invoice Management</h3>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="mr-2" size={16} />
                  Create Invoice
                </Button>
              </div>

              {/* Pending Invoices */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Pending Invoices</h4>
                <div className="space-y-3">
                  {pendingInvoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-900" size={20} />
                        <div>
                          <h4 className="font-medium text-gray-900">{invoice.id}</h4>
                          <p className="text-sm text-gray-600">{invoice.client} • Due: {invoice.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</div>
                          <Badge className={invoice.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-1" size={14} />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice Templates */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Receipt className="mb-2" size={20} />
                    Service Invoice
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="mb-2" size={20} />
                    Product Invoice
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="mb-2" size={20} />
                    Recurring Invoice
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Payroll Management</h3>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Process Payroll
                </Button>
              </div>

              {/* Payroll Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>This Month's Payroll</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Salaries</span>
                        <span className="font-semibold">₦950,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PAYE Tax</span>
                        <span className="font-semibold">₦95,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pension (7.5%)</span>
                        <span className="font-semibold">₦71,250</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Net Payroll</span>
                        <span>₦783,750</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Payroll Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Next payroll run</span>
                        <Badge className="bg-blue-100 text-blue-800">March 30</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax filing due</span>
                        <Badge className="bg-yellow-100 text-yellow-800">April 10</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pension remittance</span>
                        <Badge className="bg-emerald-100 text-emerald-800">April 15</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Employee Payroll */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Employee Payroll</h4>
                <div className="space-y-3">
                  {payrollSummary.map((employee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{formatCurrency(employee.salary)}</div>
                          <Badge className={employee.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}>
                            {employee.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          View Payslip
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Profit & Loss Statement', description: 'Monthly P&L report', icon: TrendingUp },
                  { name: 'Cash Flow Statement', description: 'Cash inflows and outflows', icon: DollarSign },
                  { name: 'Balance Sheet', description: 'Assets, liabilities, equity', icon: Calculator },
                  { name: 'Tax Report', description: 'Quarterly tax summary', icon: FileText },
                  { name: 'Payroll Report', description: 'Employee compensation report', icon: Users },
                  { name: 'Expense Analysis', description: 'Spending breakdown by category', icon: CreditCard }
                ].map((report, index) => (
                  <Card key={index} className="border border-gray-200 hover:border-blue-900 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <report.icon className="text-blue-900" size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          <Button size="sm" className="mt-3 bg-blue-900 hover:bg-blue-800">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Operations;
