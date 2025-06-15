
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Eye, Download } from 'lucide-react';
import { FormSubmission } from './types';

interface FormsListProps {
  forms: FormSubmission[];
  onViewForm: (form: FormSubmission) => void;
  onViewDocuments: (form: FormSubmission) => void;
}

const FormsList = ({ forms, onViewForm, onViewDocuments }: FormsListProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'under-review': 'bg-blue-100 text-blue-800 border-blue-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200',
      'needs-clarification': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (forms.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Forms Found</h3>
          <p className="text-gray-600">No form submissions match your current filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Form Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{form.business_name}</div>
                    {form.entity_type && (
                      <div className="text-sm text-gray-500">{form.entity_type}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{form.user_email}</TableCell>
                <TableCell>
                  <span className="capitalize">
                    {form.form_type.replace('-', ' ')}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(form.status)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDate(form.submitted_at)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {form.documents.length} file{form.documents.length !== 1 ? 's' : ''}
                    </span>
                    {form.documents.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDocuments(form)}
                        className="h-8 w-8 p-0"
                      >
                        <Download size={14} />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewForm(form)}
                    className="flex items-center gap-2"
                  >
                    <Eye size={14} />
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FormsList;
