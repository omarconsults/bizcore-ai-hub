
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  Building, 
  Calendar,
  TrendingUp,
  Download
} from 'lucide-react';

const ComplianceOverview = () => {
  const complianceStats = [
    { title: 'Overall Compliance Rate', value: '87%', change: '+5%', icon: Shield, color: 'emerald' },
    { title: 'Active Violations', value: '23', change: '-8', icon: AlertTriangle, color: 'red' },
    { title: 'Completed This Month', value: '156', change: '+12', icon: CheckCircle, color: 'blue' },
    { title: 'Pending Reviews', value: '34', change: '+3', icon: Clock, color: 'orange' },
  ];

  const complianceCategories = [
    {
      category: 'Corporate Registration',
      totalUsers: 1247,
      compliant: 1189,
      pending: 34,
      overdue: 24,
      percentage: 95.3
    },
    {
      category: 'Tax Compliance',
      totalUsers: 1247,
      compliant: 1098,
      pending: 89,
      overdue: 60,
      percentage: 88.1
    },
    {
      category: 'Data Protection',
      totalUsers: 1247,
      compliant: 1034,
      pending: 156,
      overdue: 57,
      percentage: 82.9
    },
    {
      category: 'Industry Licenses',
      totalUsers: 892,
      compliant: 745,
      pending: 98,
      overdue: 49,
      percentage: 83.5
    }
  ];

  const recentViolations = [
    {
      user: 'TechStart Nigeria Ltd',
      violation: 'NDPR Data Audit Overdue',
      severity: 'High',
      dueDate: '2024-06-10',
      daysOverdue: 5
    },
    {
      user: 'Green Energy Solutions',
      violation: 'Annual Returns Not Filed',
      severity: 'Critical',
      dueDate: '2024-06-08',
      daysOverdue: 7
    },
    {
      user: 'Lagos Food Services',
      violation: 'NAFDAC Permit Renewal',
      severity: 'Medium',
      dueDate: '2024-06-12',
      daysOverdue: 3
    },
    {
      user: 'Digital Marketing Hub',
      violation: 'Withholding Tax Return',
      severity: 'High',
      dueDate: '2024-06-09',
      daysOverdue: 6
    }
  ];

  const upcomingDeadlines = [
    { task: 'VAT Returns Submission', count: 45, dueDate: '2024-06-20' },
    { task: 'Fire Safety Certificate Renewal', count: 23, dueDate: '2024-06-25' },
    { task: 'PAYE Returns Filing', count: 67, dueDate: '2024-06-30' },
    { task: 'Data Processing Agreement Review', count: 34, dueDate: '2024-07-05' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Overview</h1>
        <p className="text-gray-600">Monitor compliance status across all users and business categories</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {complianceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs flex items-center mt-1 ${
                      stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      <TrendingUp size={12} className="mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Compliance by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building size={20} />
            Compliance by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complianceCategories.map((category, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{category.category}</h4>
                  <Badge variant="outline">{category.percentage.toFixed(1)}% Compliant</Badge>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-emerald-600 font-semibold">{category.compliant}</p>
                    <p className="text-gray-500">Compliant</p>
                  </div>
                  <div className="text-center">
                    <p className="text-yellow-600 font-semibold">{category.pending}</p>
                    <p className="text-gray-500">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-600 font-semibold">{category.overdue}</p>
                    <p className="text-gray-500">Overdue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-600 font-semibold">{category.totalUsers}</p>
                    <p className="text-gray-500">Total Users</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Violations and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" />
              Recent Violations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentViolations.map((violation, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{violation.user}</h5>
                    <p className="text-sm text-gray-600">{violation.violation}</p>
                    <p className="text-xs text-red-600 mt-1">
                      {violation.daysOverdue} days overdue (Due: {violation.dueDate})
                    </p>
                  </div>
                  <Badge className={getSeverityColor(violation.severity)}>
                    {violation.severity}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Violations
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <h5 className="font-medium text-gray-900">{deadline.task}</h5>
                    <p className="text-sm text-gray-600">{deadline.count} companies affected</p>
                    <p className="text-xs text-blue-600">Due: {deadline.dueDate}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Send Reminder
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Quick Actions & Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex-col gap-2">
              <Users size={20} />
              Send Compliance Reminders
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Download size={20} />
              Export Compliance Report
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar size={20} />
              Schedule Audit Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceOverview;
