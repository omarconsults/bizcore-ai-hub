
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Presentation, 
  Calculator,
  Bell,
  Download,
  Eye,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Lightbulb
} from 'lucide-react';
import BusinessPlanGenerator from './strategy/BusinessPlanGenerator';
import PitchDeckBuilder from './strategy/PitchDeckBuilder';
import BudgetingTool from './strategy/BudgetingTool';
import GrantAlerts from './strategy/GrantAlerts';

const Strategy = () => {
  const [activeTab, setActiveTab] = useState('business-plan');

  const strategyStats = [
    { title: 'Business Plans Created', value: '3', change: 'This month', icon: FileText },
    { title: 'Pitch Decks Built', value: '2', change: 'Ready to present', icon: Presentation },
    { title: 'Funding Opportunities', value: '8', change: 'Active matches', icon: Award },
    { title: 'Projected Revenue', value: '₦2.5M', change: 'Next 12 months', icon: TrendingUp },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Strategy Toolkit 🎯</h1>
            <p className="text-gray-600 mt-1">Plan, validate, and fund your business with AI-powered strategic tools</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Strategy Score</div>
            <div className="text-lg font-semibold text-emerald-600">85%</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strategyStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-100">
                  <stat.icon className="text-emerald-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Strategy Tools */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-blue-900" size={20} />
            Strategic Planning Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="business-plan" className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">Business Plan</span>
              </TabsTrigger>
              <TabsTrigger value="pitch-deck" className="flex items-center gap-2">
                <Presentation size={16} />
                <span className="hidden sm:inline">Pitch Deck</span>
              </TabsTrigger>
              <TabsTrigger value="budgeting" className="flex items-center gap-2">
                <Calculator size={16} />
                <span className="hidden sm:inline">Budgeting</span>
              </TabsTrigger>
              <TabsTrigger value="funding" className="flex items-center gap-2">
                <Bell size={16} />
                <span className="hidden sm:inline">Funding</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="business-plan" className="mt-6">
              <BusinessPlanGenerator />
            </TabsContent>

            <TabsContent value="pitch-deck" className="mt-6">
              <PitchDeckBuilder />
            </TabsContent>

            <TabsContent value="budgeting" className="mt-6">
              <BudgetingTool />
            </TabsContent>

            <TabsContent value="funding" className="mt-6">
              <GrantAlerts />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Strategy;
