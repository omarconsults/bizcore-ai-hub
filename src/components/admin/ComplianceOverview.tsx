
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComplianceOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Overview</h1>
        <p className="text-gray-600">Monitor compliance status across all users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Compliance overview coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">Compliance monitoring and reporting will be added here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceOverview;
