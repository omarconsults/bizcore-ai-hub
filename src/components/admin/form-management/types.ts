
export interface FormSubmission {
  id: string;
  user_id: string;
  user_email: string;
  business_name: string;
  form_type: 'business-registration' | 'cac-registration' | 'tax-registration' | 'other';
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'needs-clarification';
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  form_data: Record<string, any>;
  documents: FormDocument[];
  entity_type?: string;
  registration_step?: string;
}

export interface FormDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
  file_size: number;
  status: 'uploaded' | 'verified' | 'rejected';
}

export interface FormReviewAction {
  type: 'approve' | 'reject' | 'request-clarification';
  notes: string;
  reviewer_id: string;
}

export interface FormFilters {
  status?: string;
  form_type?: string;
  date_from?: string;
  date_to?: string;
  search_term?: string;
}
