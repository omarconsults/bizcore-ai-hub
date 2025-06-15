
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, FileText, TrendingUp, Mail, Activity, Monitor, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Active Subscriptions",
      value: "856",
      change: "+8%",
      changeType: "positive",
      icon: CreditCard
    },
    {
      title: "Monthly Revenue",
      value: "₦2,450,000",
      change: "+15%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-5%",
      changeType: "negative",
      icon: FileText
    }
  ];

  const systemHealth = [
    { service: 'Web Server', status: 'online', uptime: '99.9%' },
    { service: 'Database', status: 'online', uptime: '99.8%' },
    { service: 'API Gateway', status: 'online', uptime: '99.9%' },
    { service: 'Email Service', status: 'degraded', uptime: '98.5%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of BizCore platform metrics and system health</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <Badge 
                variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                className="mt-2"
              >
                {stat.change} from last month
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor size={20} />
            System Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemHealth.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{system.service}</p>
                  <p className="text-sm text-gray-600">Uptime: {system.uptime}</p>
                </div>
                <Badge variant={system.status === 'online' ? 'default' : 'secondary'}>
                  {system.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "New user registration", user: "tech@startup.ng", time: "2 min ago" },
                { action: "Payment processed", user: "admin@bizcore.ng", time: "5 min ago" },
                { action: "Document generated", user: "user@company.ng", time: "8 min ago" },
                { action: "Token purchase", user: "owner@business.ng", time: "12 min ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Email Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { campaign: "Welcome Series", sent: 245, opens: "68%" },
                { campaign: "Feature Update", sent: 892, opens: "72%" },
                { campaign: "Security Alert", sent: 156, opens: "89%" }
              ].map((email, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{email.campaign}</p>
                    <p className="text-xs text-gray-600">{email.sent} recipients</p>
                  </div>
                  <Badge variant="secondary">{email.opens} opens</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={20} />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Email Service Degraded</p>
                  <p className="text-xs text-yellow-600">Slight delays in email delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                <TrendingUp size={16} className="text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">High User Activity</p>
                  <p className="text-xs text-green-600">234 active users currently online</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Detailed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "TechStart Nigeria Ltd", email: "admin@techstart.ng", time: "2 hours ago" },
                { name: "Green Valley Farms", email: "info@greenvalley.com", time: "5 hours ago" },
                { name: "Digital Solutions Inc", email: "contact@digitalsolutions.ng", time: "1 day ago" }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">{user.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { amount: "₦35,000", plan: "Professional Plan", status: "Completed", time: "1 hour ago" },
                { amount: "₦15,000", plan: "Starter Plan", status: "Completed", time: "3 hours ago" },
                { amount: "₦75,000", plan: "Enterprise Plan", status: "Pending", time: "6 hours ago" }
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{payment.amount}</p>
                    <p className="text-sm text-gray-600">{payment.plan}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={payment.status === 'Completed' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{payment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
