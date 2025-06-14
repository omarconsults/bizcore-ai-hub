
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  Plus, 
  Minus,
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const BudgetingTool = () => {
  const [activeTab, setActiveTab] = useState('income');
  const [incomeStreams, setIncomeStreams] = useState([
    { id: 1, name: 'Product Sales', monthly: 150000, type: 'revenue' },
    { id: 2, name: 'Service Fees', monthly: 75000, type: 'revenue' }
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Office Rent', monthly: 50000, type: 'fixed' },
    { id: 2, name: 'Staff Salaries', monthly: 120000, type: 'fixed' },
    { id: 3, name: 'Marketing', monthly: 30000, type: 'variable' },
    { id: 4, name: 'Utilities', monthly: 15000, type: 'variable' }
  ]);

  const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.monthly, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.monthly, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  const addIncomeStream = () => {
    const newStream = {
      id: incomeStreams.length + 1,
      name: 'New Income Stream',
      monthly: 0,
      type: 'revenue'
    };
    setIncomeStreams([...incomeStreams, newStream]);
  };

  const addExpense = () => {
    const newExpense = {
      id: expenses.length + 1,
      name: 'New Expense',
      monthly: 0,
      type: 'variable'
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateIncomeStream = (id, field, value) => {
    setIncomeStreams(incomeStreams.map(stream => 
      stream.id === id ? { ...stream, [field]: field === 'monthly' ? Number(value) : value } : stream
    ));
  };

  const updateExpense = (id, field, value) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [field]: field === 'monthly' ? Number(value) : value } : expense
    ));
  };

  const removeIncomeStream = (id) => {
    setIncomeStreams(incomeStreams.filter(stream => stream.id !== id));
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const projectedRevenue = {
    month1: totalIncome,
    month3: totalIncome * 3 * 1.05, // 5% growth
    month6: totalIncome * 6 * 1.12, // 12% growth
    year1: totalIncome * 12 * 1.25  // 25% growth
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Budgeting & Financial Forecasting</h3>
          <p className="text-gray-600">Plan your finances and track your business performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 size={16} className="mr-2" />
            Analytics
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">₦{totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Expenses</p>
                <p className="text-2xl font-bold text-red-600">₦{totalExpenses.toLocaleString()}</p>
              </div>
              <Minus className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ₦{netProfit.toLocaleString()}
                </p>
              </div>
              <DollarSign className={netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'} size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className={`text-2xl font-bold ${profitMargin >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {profitMargin.toFixed(1)}%
                </p>
              </div>
              <PieChart className={profitMargin >= 0 ? 'text-emerald-600' : 'text-red-600'} size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Budget Builder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Budget Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="income">Income Streams</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>

                <TabsContent value="income" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Revenue Sources</h4>
                    <Button onClick={addIncomeStream} size="sm">
                      <Plus size={16} className="mr-1" />
                      Add Stream
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {incomeStreams.map((stream) => (
                      <div key={stream.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Income source name"
                            value={stream.name}
                            onChange={(e) => updateIncomeStream(stream.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="Monthly amount"
                            value={stream.monthly}
                            onChange={(e) => updateIncomeStream(stream.id, 'monthly', e.target.value)}
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeIncomeStream(stream.id)}
                        >
                          <Minus size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="expenses" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Business Expenses</h4>
                    <Button onClick={addExpense} size="sm">
                      <Plus size={16} className="mr-1" />
                      Add Expense
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Expense name"
                            value={expense.name}
                            onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="Monthly amount"
                            value={expense.monthly}
                            onChange={(e) => updateExpense(expense.id, 'monthly', e.target.value)}
                          />
                        </div>
                        <Badge variant={expense.type === 'fixed' ? 'default' : 'outline'}>
                          {expense.type}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeExpense(expense.id)}
                        >
                          <Minus size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Forecasting & Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">1 Month</span>
                  <span className="font-semibold">₦{projectedRevenue.month1.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">3 Months</span>
                  <span className="font-semibold">₦{projectedRevenue.month3.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">6 Months</span>
                  <span className="font-semibold">₦{projectedRevenue.month6.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-sm text-gray-600">Year 1</span>
                  <span className="font-semibold text-emerald-600">₦{projectedRevenue.year1.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {netProfit > 0 ? (
                    <CheckCircle size={16} className="text-emerald-600" />
                  ) : (
                    <AlertCircle size={16} className="text-red-600" />
                  )}
                  <span className="text-sm">
                    {netProfit > 0 ? 'Profitable business model' : 'Review expenses to improve profitability'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {profitMargin > 20 ? (
                    <CheckCircle size={16} className="text-emerald-600" />
                  ) : (
                    <AlertCircle size={16} className="text-yellow-600" />
                  )}
                  <span className="text-sm">
                    {profitMargin > 20 ? 'Healthy profit margin' : 'Consider optimizing costs'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span className="text-sm">Diversified income streams</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📈 Optimistic (+30% growth)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📊 Realistic (current projections)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📉 Conservative (-20% revenue)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetingTool;
