
export interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  business_name?: string;
  email_confirmed_at: string;
  total_tokens?: number;
  used_tokens?: number;
  source: 'business_profile' | 'tokens' | 'auth' | 'onboarding';
}
