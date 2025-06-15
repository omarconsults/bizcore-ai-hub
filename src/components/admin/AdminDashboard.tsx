
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CreditCard, FileText, TrendingUp } from 'lucide-react';

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
      title: "Pending Registrations",
      value: "23",
      change: "-5%",
      changeType: "negative",
      icon: FileText
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of BizCore platform metrics</p>
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

      {/* Recent Activity */}
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
