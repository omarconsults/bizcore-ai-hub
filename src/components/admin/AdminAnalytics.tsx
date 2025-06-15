
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Platform performance and user insights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Analytics dashboard coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">Integration with charts and metrics will be added here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
