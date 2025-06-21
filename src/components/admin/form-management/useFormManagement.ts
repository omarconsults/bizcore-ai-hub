
import { useState, useEffect } from 'react';
import { FormSubmission, FormFilters, FormReviewAction } from './types';

// Mock data until Supabase types are regenerated
const mockFormSubmissions: FormSubmission[] = [
  {
    id: '1',
    user_id: 'user-1',
    user_email: 'john@example.com',
    business_name: 'Tech Innovations Ltd',
    form_type: 'business-registration',
    status: 'pending',
    submitted_at: new Date().toISOString(),
    form_data: {
      business_type: 'Limited Company',
      directors: ['John Doe'],
      address: '123 Lagos Street'
    },
    documents: [
      {
        id: 'doc-1',
        name: 'Certificate of Incorporation.pdf',
        type: 'certificate',
        url: '/documents/cert.pdf',
        uploaded_at: new Date().toISOString(),
        file_size: 1024000,
        status: 'uploaded'
      }
    ]
  },
  {
    id: '2',
    user_id: 'user-2',
    user_email: 'sarah@example.com',
    business_name: 'Green Solutions',
    form_type: 'tax-registration',
    status: 'approved',
    submitted_at: new Date(Date.now() - 86400000).toISOString(),
    reviewed_at: new Date().toISOString(),
    reviewer_notes: 'All documents verified and approved.',
    form_data: {
      tin_number: '12345678',
      business_address: '456 Abuja Road'
    },
    documents: []
  }
];

export const useFormManagement = () => {
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = async (filters?: FormFilters) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let filteredForms = [...mockFormSubmissions];

      // Apply filters
      if (filters?.status && filters.status !== 'all') {
        filteredForms = filteredForms.filter(form => form.status === filters.status);
      }
      
      if (filters?.form_type && filters.form_type !== 'all') {
        filteredForms = filteredForms.filter(form => form.form_type === filters.form_type);
      }

      if (filters?.search_term) {
        const searchLower = filters.search_term.toLowerCase();
        filteredForms = filteredForms.filter(form => 
          form.business_name.toLowerCase().includes(searchLower) ||
          form.user_email.toLowerCase().includes(searchLower)
        );
      }

      if (filters?.date_from) {
        filteredForms = filteredForms.filter(form => 
          new Date(form.submitted_at) >= new Date(filters.date_from!)
        );
      }

      if (filters?.date_to) {
        filteredForms = filteredForms.filter(form => 
          new Date(form.submitted_at) <= new Date(filters.date_to!)
        );
      }

      setForms(filteredForms);
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const reviewForm = async (formId: string, action: FormReviewAction) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update the form status based on action type
      const status = action.type === 'approve' ? 'approved' : 
                    action.type === 'reject' ? 'rejected' : 'needs-clarification';

      setForms(prevForms => 
        prevForms.map(form => 
          form.id === formId 
            ? { 
                ...form, 
                status: status as FormSubmission['status'],
                reviewed_at: new Date().toISOString(),
                reviewer_notes: action.notes
              }
            : form
        )
      );
      
      return { success: true };
    } catch (err) {
      console.error('Error reviewing form:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'An error occurred' 
      };
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
