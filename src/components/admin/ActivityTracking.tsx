
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, Eye, UserCheck, LogIn, LogOut, Settings, FileText } from 'lucide-react';

const ActivityTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');

  const userActivities = [
    {
      id: '1',
      user: 'john@techstart.ng',
      action: 'login',
      description: 'User logged in',
      timestamp: '2024-06-15 14:32:15',
      ipAddress: '197.210.85.24',
      location: 'Lagos, Nigeria',
      device: 'Chrome on Windows'
    },
    {
      id: '2',
      user: 'sarah@greenvalley.com',
      action: 'document_generated',
      description: 'Generated business plan using AI',
      timestamp: '2024-06-15 14:28:43',
      ipAddress: '102.89.32.156',
      location: 'Abuja, Nigeria',
      device: 'Safari on Mac'
    },
    {
      id: '3',
      user: 'mike@digitalsolutions.ng',
      action: 'payment',
      description: 'Purchased 500 tokens',
      timestamp: '2024-06-15 14:15:22',
      ipAddress: '105.112.45.78',
      location: 'Port Harcourt, Nigeria',
      device: 'Chrome on Android'
    },
    {
      id: '4',
      user: 'admin@bizcore.ng',
      action: 'admin_access',
      description: 'Accessed admin portal',
      timestamp: '2024-06-15 14:10:05',
      ipAddress: '192.168.1.100',
      location: 'Lagos, Nigeria',
      device: 'Chrome on Windows'
    },
    {
      id: '5',
      user: 'lucy@fashionhouse.ng',
      action: 'profile_update',
      description: 'Updated business profile information',
      timestamp: '2024-06-15 13:55:18',
      ipAddress: '197.156.89.42',
      location: 'Ibadan, Nigeria',
      device: 'Firefox on Windows'
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return <LogIn size={16} className="text-green-600" />;
      case 'logout':
        return <LogOut size={16} className="text-gray-600" />;
      case 'document_generated':
        return <FileText size={16} className="text-blue-600" />;
      case 'payment':
        return <UserCheck size={16} className="text-emerald-600" />;
      case 'admin_access':
        return <Settings size={16} className="text-red-600" />;
      case 'profile_update':
        return <Eye size={16} className="text-purple-600" />;
      default:
        return <Eye size={16} className="text-gray-600" />;
    }
  };

  const getActionBadge = (action: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      login: 'default',
      logout: 'secondary',
      document_generated: 'default',
      payment: 'default',
      admin_access: 'destructive',
      profile_update: 'secondary'
    };
    return variants[action] || 'secondary';
  };

  const filteredActivities = userActivities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activityFilter === 'all' || activity.action === activityFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Tracking</h1>
        <p className="text-gray-600">Monitor user activities and system interactions</p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <LogIn className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documents Generated</p>
                <p className="text-2xl font-bold text-gray-900">892</p>
              </div>
              <FileText className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payments Made</p>
                <p className="text-2xl font-bold text-gray-900">345</p>
              </div>
              <UserCheck className="text-emerald-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Actions</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Settings className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by user email or activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="document_generated">Document Generated</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="admin_access">Admin Access</SelectItem>
                <SelectItem value="profile_update">Profile Update</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2" size={16} />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities ({filteredActivities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(activity.action)}
                      <Badge variant={getActionBadge(activity.action)}>
                        {activity.action.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(activity.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    <div>
                      <div>{activity.location}</div>
                      <div className="text-xs text-gray-400">{activity.ipAddress}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{activity.device}</TableCell>
                </TableRow>
              ))}
              {filteredActivities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No activities found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityTracking;
