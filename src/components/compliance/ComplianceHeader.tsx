
import React from 'react';
import { Shield } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ComplianceHeaderProps {
  overallCompliance: number;
}

const ComplianceHeader: React.FC<ComplianceHeaderProps> = ({ overallCompliance }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-blue-900" size={28} />
            Compliance Hub
          </h1>
          <p className="text-gray-600 mt-1">Stay compliant with Nigerian business regulations and requirements</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Compliance Score</div>
          <div className="text-2xl font-bold text-emerald-600">{overallCompliance}%</div>
        </div>
      </div>
      <div className="mt-4">
        <Progress value={overallCompliance} className="h-3" />
      </div>
    </div>
  );
};

export default ComplianceHeader;
