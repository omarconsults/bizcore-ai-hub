
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FormFilters as FormFiltersType } from './types';

interface FormFiltersProps {
  filters: FormFiltersType;
  onFiltersChange: (filters: FormFiltersType) => void;
  onReset: () => void;
}

const FormFilters = ({ filters, onFiltersChange, onReset }: FormFiltersProps) => {
  const handleFilterChange = (key: keyof FormFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Search
            </label>
            <Input
              placeholder="Business name or email..."
              value={filters.search_term || ''}
              onChange={(e) => handleFilterChange('search_term', e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Status
            </label>
            <Select 
              value={filters.status || 'all'} 
              onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="needs-clarification">Needs Clarification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Form Type
            </label>
            <Select 
              value={filters.form_type || 'all'} 
              onValueChange={(value) => handleFilterChange('form_type', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="business-registration">Business Registration</SelectItem>
                <SelectItem value="cac-registration">CAC Registration</SelectItem>
                <SelectItem value="tax-registration">Tax Registration</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" onClick={onReset} className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormFilters;
