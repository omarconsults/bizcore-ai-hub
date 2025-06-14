
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface ComplianceStatsProps {
  overdueItems: number;
  dueSoonItems: number;
  completedItems: number;
}

const ComplianceStats: React.FC<ComplianceStatsProps> = ({ 
  overdueItems, 
  dueSoonItems, 
  completedItems 
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue Items</p>
              <p className="text-2xl font-bold text-red-600">{overdueItems}</p>
            </div>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Due Soon</p>
              <p className="text-2xl font-bold text-yellow-600">{dueSoonItems}</p>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">{completedItems}</p>
            </div>
            <CheckCircle className="text-emerald-600" size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceStats;
