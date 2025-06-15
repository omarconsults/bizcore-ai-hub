
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useFormManagement } from './form-management/useFormManagement';
import FormFilters from './form-management/FormFilters';
import FormsList from './form-management/FormsList';
import FormReviewModal from './form-management/FormReviewModal';
import { FormSubmission, FormFilters as FormFiltersType } from './form-management/types';

const FormManagement = () => {
  const { forms, loading, error, fetchForms, reviewForm } = useFormManagement();
  const [selectedForm, setSelectedForm] = useState<FormSubmission | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [filters, setFilters] = useState<FormFiltersType>({});

  const handleViewForm = (form: FormSubmission) => {
    setSelectedForm(form);
    setIsReviewModalOpen(true);
  };

  const handleViewDocuments = (form: FormSubmission) => {
    console.log('Viewing documents for form:', form.id);
    // This would open a document viewer or download documents
  };

  const handleFiltersChange = (newFilters: FormFiltersType) => {
    setFilters(newFilters);
    fetchForms(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
    fetchForms();
  };

  const getStatusStats = () => {
    const stats = forms.reduce((acc, form) => {
      acc[form.status] = (acc[form.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: forms.length,
      pending: stats.pending || 0,
      approved: stats.approved || 0,
      rejected: stats.rejected || 0,
      underReview: stats['under-review'] || 0
    };
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Form Management</h1>
          <p className="text-gray-600">Review and manage business registration and application forms</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => fetchForms(filters)} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.underReview}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <XCircle className="text-red-600 mt-1" size={20} />
              <div>
                <h3 className="font-medium text-red-800">Error Loading Forms</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <FormFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {/* Forms List */}
      <FormsList
        forms={forms}
        onViewForm={handleViewForm}
        onViewDocuments={handleViewDocuments}
      />

      {/* Review Modal */}
      <FormReviewModal
        form={selectedForm}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedForm(null);
        }}
        onReview={reviewForm}
      />
    </div>
  );
};

export default FormManagement;
