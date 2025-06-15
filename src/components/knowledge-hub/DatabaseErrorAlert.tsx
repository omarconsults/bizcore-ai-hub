
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database } from 'lucide-react';

const DatabaseErrorAlert = () => {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Database className="text-orange-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-orange-900">Database Setup Required</h4>
            <p className="text-sm text-orange-700 mt-1">
              The knowledge resources database table needs to be created. The system will use local resources for now.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseErrorAlert;
