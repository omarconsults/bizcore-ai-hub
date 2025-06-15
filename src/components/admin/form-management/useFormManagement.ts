
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormSubmission, FormFilters, FormReviewAction } from './types';

export const useFormManagement = () => {
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for demonstration since we don't have actual form submissions table yet
  const fetchForms = async (filters?: FormFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be replaced with actual Supabase queries when the tables exist
      const mockForms: FormSubmission[] = [
        {
          id: '1',
          user_id: 'user-1',
          user_email: 'john@example.com',
          business_name: 'Tech Solutions Ltd',
          form_type: 'business-registration',
          status: 'pending',
          submitted_at: '2024-01-15T10:30:00Z',
          form_data: {
            entityType: 'LLC',
            businessName: 'Tech Solutions Ltd',
            address: '123 Business Street, Lagos',
            directors: [
              { name: 'John Doe', email: 'john@example.com' }
            ]
          },
          documents: [
            {
              id: 'doc-1',
              name: 'Memorandum of Association',
              type: 'application/pdf',
              url: '/documents/memo.pdf',
              uploaded_at: '2024-01-15T10:30:00Z',
              file_size: 1024000,
              status: 'uploaded'
            }
          ],
          entity_type: 'LLC',
          registration_step: 'cac-registration'
        },
        {
          id: '2',
          user_id: 'user-2',
          user_email: 'sarah@example.com',
          business_name: 'Creative Agency Ltd',
          form_type: 'cac-registration',
          status: 'under-review',
          submitted_at: '2024-01-14T14:20:00Z',
          reviewed_at: '2024-01-15T09:00:00Z',
          reviewed_by: 'admin@example.com',
          form_data: {
            entityType: 'LTD',
            businessName: 'Creative Agency Ltd',
            address: '456 Creative Avenue, Abuja',
          },
          documents: [
            {
              id: 'doc-2',
              name: 'Articles of Association',
              type: 'application/pdf',
              url: '/documents/articles.pdf',
              uploaded_at: '2024-01-14T14:20:00Z',
              file_size: 856000,
              status: 'uploaded'
            }
          ],
          entity_type: 'LTD'
        }
      ];

      // Apply filters if provided
      let filteredForms = mockForms;
      if (filters?.status) {
        filteredForms = filteredForms.filter(form => form.status === filters.status);
      }
      if (filters?.form_type) {
        filteredForms = filteredForms.filter(form => form.form_type === filters.form_type);
      }
      if (filters?.search_term) {
        const term = filters.search_term.toLowerCase();
        filteredForms = filteredForms.filter(form => 
          form.business_name.toLowerCase().includes(term) ||
          form.user_email.toLowerCase().includes(term)
        );
      }

      setForms(filteredForms);
    } catch (err: any) {
      console.error('Error fetching forms:', err);
      setError(err.message || 'Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const reviewForm = async (formId: string, action: FormReviewAction) => {
    try {
      console.log('Reviewing form:', formId, action);
      
      // Update the local state for demo purposes
      setForms(prevForms => 
        prevForms.map(form => 
          form.id === formId 
            ? {
                ...form,
                status: action.type === 'approve' ? 'approved' : 
                       action.type === 'reject' ? 'rejected' : 'needs-clarification',
                reviewed_at: new Date().toISOString(),
                reviewed_by: 'current-admin-id',
                reviewer_notes: action.notes
              }
            : form
        )
      );

      toast({
        title: "Form Updated",
        description: `Form has been ${action.type === 'approve' ? 'approved' : 
                     action.type === 'reject' ? 'rejected' : 'marked for clarification'}.`,
      });
    } catch (err: any) {
      console.error('Error reviewing form:', err);
      toast({
        title: "Error",
        description: err.message || 'Failed to update form status',
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return {
    forms,
    loading,
    error,
    fetchForms,
    reviewForm
  };
};
