
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  FileText, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  ArrowRight,
  Bell,
  Plus
} from 'lucide-react';
import TokenBalance from '@/components/tokens/TokenBalance';

const Dashboard = () => {
  const quickActions = [
    { title: 'Register New Business', icon: Building2, color: 'bg-blue-900 hover:bg-blue-800' },
    { title: 'Generate Invoice', icon: FileText, color: 'bg-emerald-600 hover:bg-emerald-700' },
    { title: 'Add Employee', icon: Users, color: 'bg-purple-600 hover:bg-purple-700' },
    { title: 'File Tax Return', icon: TrendingUp, color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  const recentActivity = [
    { action: 'CAC Registration', status: 'completed', date: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { action: 'Invoice #1034', status: 'pending', date: '5 hours ago', icon: AlertCircle, color: 'text-yellow-600' },
    { action: 'Employee Onboarding', status: 'completed', date: '1 day ago', icon: CheckCircle, color: 'text-green-600' },
    { action: 'Compliance Check', status: 'pending', date: '2 days ago', icon: AlertCircle, color: 'text-yellow-600' },
  ];

  const upcomingTasks = [
    { task: 'Monthly VAT Return', due: 'Due in 3 days', priority: 'high' },
    { task: 'Payroll Processing', due: 'Due in 5 days', priority: 'medium' },
    { task: 'Board Meeting Prep', due: 'Due in 1 week', priority: 'low' },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your business today</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              All systems operational
            </Badge>
            <Button size="sm">
              <Bell size={16} className="mr-2" />
              View Notifications
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics & Token Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Registrations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                <p className="text-sm text-emerald-600 mt-1">+1 this month</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Building2 className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
                <p className="text-sm text-orange-600 mt-1">2 due soon</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Calendar className="text-orange-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                <p className="text-sm text-emerald-600 mt-1">+2 this month</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-100">
                <Users className="text-emerald-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Balance Widget */}
        <TokenBalance />
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="text-blue-900" size={20} />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} className={`${action.color} h-auto p-4 flex flex-col items-center gap-2`}>
                <action.icon size={24} />
                <span className="text-sm font-medium text-center">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <item.icon size={20} className={item.color} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.action}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              View all activity <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-600">{task.due}</p>
                </div>
                <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'}>
                  {task.priority}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              View all tasks <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">CAC Registration</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tax Registration</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">VAT Registration</span>
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">NDPR Compliance</span>
                <AlertCircle className="text-red-600" size={20} />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Run Full Compliance Check
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
