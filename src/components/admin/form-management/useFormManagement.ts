
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FormSubmission, FormFilters } from './types';

export const useFormManagement = () => {
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = async (filters?: FormFilters) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('form_submissions')
        .select(`
          *,
          user_profiles!inner(full_name, role),
          document_submissions(*)
        `)
        .order('submitted_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.form_type) {
        query = query.eq('form_type', filters.form_type);
      }

      if (filters?.date_from) {
        query = query.gte('submitted_at', filters.date_from);
      }

      if (filters?.date_to) {
        query = query.lte('submitted_at', filters.date_to);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our FormSubmission interface
      const transformedForms: FormSubmission[] = (data || []).map((form: any) => ({
        id: form.id,
        type: form.form_type,
        businessName: form.form_data?.business_name || 'N/A',
        applicantName: form.user_profiles?.full_name || 'Unknown',
        submittedAt: form.submitted_at,
        status: form.status,
        priority: form.form_data?.priority || 'medium',
        documentsCount: form.document_submissions?.length || 0,
        rawData: form.form_data,
        reviewedAt: form.reviewed_at,
        reviewerNotes: form.reviewer_notes
      }));

      setForms(transformedForms);
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const reviewForm = async (formId: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      const { error: updateError } = await supabase
        .from('form_submissions')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewer_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', formId);

      if (updateError) {
        throw updateError;
      }

      // Refresh the forms list
      await fetchForms();
      
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
