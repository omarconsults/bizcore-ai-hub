
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, Target, Calendar } from 'lucide-react';

const AdminAnalytics = () => {
  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 45, revenue: 12000 },
    { month: 'Feb', users: 78, revenue: 18500 },
    { month: 'Mar', users: 120, revenue: 28000 },
    { month: 'Apr', users: 189, revenue: 45000 },
    { month: 'May', users: 234, revenue: 58000 },
    { month: 'Jun', users: 298, revenue: 72000 },
  ];

  const featureUsageData = [
    { feature: 'Business Registration', usage: 85, color: '#3b82f6' },
    { feature: 'Compliance Hub', usage: 68, color: '#10b981' },
    { feature: 'Token Management', usage: 92, color: '#f59e0b' },
    { feature: 'AI Assistant', usage: 76, color: '#8b5cf6' },
    { feature: 'Document Generator', usage: 54, color: '#ef4444' },
  ];

  const subscriptionData = [
    { name: 'Free', value: 45, color: '#6b7280' },
    { name: 'Starter', value: 30, color: '#3b82f6' },
    { name: 'Professional', value: 20, color: '#10b981' },
    { name: 'Enterprise', value: 5, color: '#f59e0b' },
  ];

  const chartConfig = {
    users: {
      label: "Users",
      color: "#3b82f6",
    },
    revenue: {
      label: "Revenue",
      color: "#10b981",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Platform performance and user insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₦2.4M</p>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <DollarSign className="text-emerald-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" />
                  +8.3% from last month
                </p>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">24.8%</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Target size={12} className="mr-1" />
                  +2.1% from last month
                </p>
              </div>
              <Target className="text-orange-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Uptime</p>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <Activity size={12} className="mr-1" />
                  Excellent performance
                </p>
              </div>
              <Activity className="text-emerald-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Usage Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureUsageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.feature}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ width: `${item.usage}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">{item.usage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Recent Platform Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '2 minutes ago', action: 'New user registration', user: 'john.doe@example.com', type: 'success' },
              { time: '15 minutes ago', action: 'Payment processed', user: 'jane.smith@example.com', type: 'success' },
              { time: '1 hour ago', action: 'Compliance document generated', user: 'company@business.com', type: 'info' },
              { time: '2 hours ago', action: 'Token package purchased', user: 'startup@tech.com', type: 'success' },
              { time: '3 hours ago', action: 'Failed login attempt', user: 'unknown@suspicious.com', type: 'warning' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-emerald-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
