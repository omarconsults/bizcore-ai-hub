
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Eye, RefreshCw } from 'lucide-react';

const PaymentTracking = () => {
  const payments = [
    {
      id: "PAY001",
      businessName: "TechStart Nigeria Ltd",
      amount: "₦35,000",
      type: "Subscription",
      method: "Card",
      status: "Completed",
      date: "2024-06-14",
      reference: "REF123456789"
    },
    {
      id: "PAY002",
      businessName: "Green Valley Farms",
      amount: "₦45,000",
      type: "CAC Registration",
      method: "Bank Transfer",
      status: "Pending",
      date: "2024-06-14",
      reference: "REF123456790"
    },
    {
      id: "PAY003",
      businessName: "Digital Solutions Inc",
      amount: "₦15,000",
      type: "Compliance Service",
      method: "Card",
      status: "Failed",
      date: "2024-06-13",
      reference: "REF123456791"
    }
  ];

  const paymentStats = [
    { title: "Total Revenue", value: "₦2,450,000", period: "This month" },
    { title: "Successful Payments", value: "1,234", period: "This month" },
    { title: "Failed Payments", value: "23", period: "This month" },
    { title: "Pending Payments", value: "45", period: "This month" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Tracking</h1>
          <p className="text-gray-600">Monitor all platform payments and transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-500">{stat.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.businessName}</TableCell>
                  <TableCell className="font-medium">{payment.amount}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        payment.status === 'Completed' ? 'default' :
                        payment.status === 'Pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
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

export default PaymentTracking;
