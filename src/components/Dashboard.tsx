
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  DollarSign,
  Users,
  Target,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const quickStats = [
    { title: 'Monthly Revenue', value: '₦2.4M', change: '+12%', icon: DollarSign, positive: true },
    { title: 'Active Customers', value: '156', change: '+8%', icon: Users, positive: true },
    { title: 'Compliance Score', value: '92%', change: '+5%', icon: CheckCircle, positive: true },
    { title: 'Growth Target', value: '76%', change: 'On track', icon: Target, positive: true },
  ];

  const recentTasks = [
    { task: 'Submit monthly tax returns', due: 'Tomorrow', priority: 'high', status: 'pending' },
    { task: 'Renew NDPR compliance certificate', due: '3 days', priority: 'medium', status: 'pending' },
    { task: 'Update employee contracts', due: '1 week', priority: 'low', status: 'pending' },
    { task: 'Review quarterly financials', due: '2 weeks', priority: 'medium', status: 'pending' },
  ];

  const aiSuggestions = [
    "Your cash flow looks strong this month. Consider investing in inventory for the peak season.",
    "NDPR renewal is due soon. I can help prepare the required documents.",
    "You're hiring fast! Let's set up proper onboarding workflows."
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning, Adaora! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with Adaora's Fashion House today</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">March 15, 2024</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.positive ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  <stat.icon className={stat.positive ? 'text-emerald-600' : 'text-red-600'} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Priority Tasks */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-blue-900" size={20} />
                Priority Tasks & Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {task.due}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
              ))}
              <Button className="w-full bg-blue-900 hover:bg-blue-800">
                View All Tasks
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-emerald-600" size={20} />
                AI Business Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-gray-700">{suggestion}</p>
                  <Button size="sm" variant="ghost" className="mt-2 text-emerald-600 hover:text-emerald-700">
                    Learn more
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-emerald-600" size={20} />
                Compliance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Overall Score</span>
                    <span className="text-sm font-medium text-emerald-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">CAC Registration</span>
                    <CheckCircle className="text-emerald-600" size={16} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Tax Compliance</span>
                    <CheckCircle className="text-emerald-600" size={16} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">NDPR Status</span>
                    <AlertCircle className="text-yellow-500" size={16} />
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                  Fix Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
