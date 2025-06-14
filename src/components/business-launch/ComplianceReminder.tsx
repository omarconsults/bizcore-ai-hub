
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface ComplianceReminderProps {
  onComplianceAlerts: () => void;
}

const ComplianceReminder: React.FC<ComplianceReminderProps> = ({ onComplianceAlerts }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-emerald-600" size={20} />
          Next Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          After registration, you'll need to maintain compliance with annual filings and tax obligations.
        </p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onComplianceAlerts}
        >
          Set Up Compliance Alerts
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComplianceReminder;
