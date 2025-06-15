
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceDetailsSectionProps {
  invoiceType: string;
  dueDate: string;
  onInputChange: (field: string, value: string) => void;
}

const InvoiceDetailsSection: React.FC<InvoiceDetailsSectionProps> = ({
  invoiceType,
  dueDate,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Invoice Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceType">Invoice Type *</Label>
          <Select onValueChange={(value) => onInputChange('invoiceType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="service">Service Invoice</SelectItem>
              <SelectItem value="product">Product Invoice</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="recurring">Recurring Invoice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => onInputChange('dueDate', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsSection;
