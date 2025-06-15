
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, AlertCircle, CheckCircle } from 'lucide-react';

const SubscriptionManagement = () => {
  const subscriptions = [
    {
      id: 1,
      businessName: "TechStart Nigeria Ltd",
      plan: "Professional",
      status: "Active",
      amount: "₦35,000",
      nextBilling: "2024-07-15",
      features: ["Compliance Management", "HR Suite", "Unlimited Invoicing"]
    },
    {
      id: 2,
      businessName: "Green Valley Farms",
      plan: "Starter",
      status: "Active",
      amount: "₦15,000",
      nextBilling: "2024-07-20",
      features: ["Basic Compliance", "Simple Invoicing"]
    },
    {
      id: 3,
      businessName: "Digital Solutions Inc",
      plan: "Enterprise",
      status: "Cancelled",
      amount: "₦75,000",
      nextBilling: "-",
      features: ["All Features", "Dedicated Support", "Custom Integrations"]
    }
  ];

  const planStats = [
    { plan: "Starter", count: 342, revenue: "₦5,130,000" },
    { plan: "Professional", count: 456, revenue: "₦15,960,000" },
    { plan: "Enterprise", count: 58, revenue: "₦4,350,000" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600">Monitor and manage user subscriptions</p>
      </div>

      {/* Plan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{stat.plan} Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                <p className="text-sm text-gray-600">Active subscribers</p>
                <div className="text-lg font-semibold text-emerald-600">{stat.revenue}</div>
                <p className="text-sm text-gray-600">Monthly revenue</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.businessName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{subscription.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {subscription.status === 'Active' ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={subscription.status === 'Active' ? 'default' : 'destructive'}>
                        {subscription.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{subscription.amount}</TableCell>
                  <TableCell>{subscription.nextBilling}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;
