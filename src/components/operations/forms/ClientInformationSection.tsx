
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ClientInformationSectionProps {
  clientName: string;
  clientEmail: string;
  onInputChange: (field: string, value: string) => void;
}

const ClientInformationSection: React.FC<ClientInformationSectionProps> = ({
  clientName,
  clientEmail,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Client Information</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientName">Client Name *</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => onInputChange('clientName', e.target.value)}
            placeholder="Enter client name"
            required
          />
        </div>
        <div>
          <Label htmlFor="clientEmail">Client Email *</Label>
          <Input
            id="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(e) => onInputChange('clientEmail', e.target.value)}
            placeholder="client@example.com"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInformationSection;
