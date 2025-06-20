
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      setProfile(data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'No user found' };

    try {
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) {
        throw updateError;
      }

      await fetchProfile(); // Refresh the profile
      return { success: true };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'An error occurred' 
      };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  };
};
