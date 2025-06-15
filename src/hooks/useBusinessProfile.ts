
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface BusinessProfile {
  id: string;
  business_name: string;
  cac_registration_number: string | null;
  business_type: string;
  registration_status: string;
  registration_date: string | null;
  has_existing_business: boolean;
}

interface OnboardingStep {
  id: string;
  step_key: string;
  is_completed: boolean;
  completed_at: string | null;
  is_skipped: boolean;
}

export const useBusinessProfile = () => {
  const { user } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
      setBusinessProfile(null);
      setOnboardingSteps([]);
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both business profile and onboarding steps in parallel
      const [profileResult, stepsResult] = await Promise.allSettled([
        fetchBusinessProfile(),
        fetchOnboardingSteps()
      ]);

      // Handle business profile result
      if (profileResult.status === 'rejected') {
        console.error('Error fetching business profile:', profileResult.reason);
        setError('Failed to load business profile');
      }

      // Handle onboarding steps result
      if (stepsResult.status === 'rejected') {
        console.error('Error fetching onboarding steps:', stepsResult.reason);
        setError('Failed to load onboarding progress');
      }
    } catch (error) {
      console.error('Unexpected error in loadData:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    setBusinessProfile(data);
    return data;
  };

  const fetchOnboardingSteps = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('onboarding_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    setOnboardingSteps(data || []);
    return data;
  };

  const updateStepProgress = async (stepKey: string, isCompleted: boolean) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .update({
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('step_key', stepKey);

      if (error) {
        throw error;
      }

      // Update local state
      setOnboardingSteps(prev =>
        prev.map(step =>
          step.step_key === stepKey
            ? { ...step, is_completed: isCompleted, completed_at: isCompleted ? new Date().toISOString() : null }
            : step
        )
      );
    } catch (err) {
      console.error('Error updating step progress:', err);
      throw err;
    }
  };

  const getCompletionPercentage = () => {
    if (onboardingSteps.length === 0) return 0;
    const completedSteps = onboardingSteps.filter(step => step.is_completed || step.is_skipped).length;
    return Math.round((completedSteps / onboardingSteps.length) * 100);
  };

  return {
    businessProfile,
    onboardingSteps,
    loading,
    error,
    updateStepProgress,
    getCompletionPercentage,
    refetch: loadData
  };
};
