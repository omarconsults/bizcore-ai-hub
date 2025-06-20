
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from './types';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profiles with business profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select(`
          *,
          business_profiles(business_name, business_type, registration_status)
        `)
        .order('created_at', { ascending: false });

      if (profilesError) {
        throw profilesError;
      }

      // Transform the data to match our User interface
      const transformedUsers: User[] = (profiles || []).map((profile: any) => ({
        id: profile.user_id,
        email: profile.full_name || 'Unknown', // We'll need to get email from auth
        business_name: profile.business_profiles?.[0]?.business_name || null,
        created_at: profile.created_at,
        last_sign_in_at: profile.last_login,
        email_confirmed_at: profile.created_at, // Placeholder
        phone: profile.phone,
        role: profile.role,
        is_active: profile.is_active,
        registration_status: profile.business_profiles?.[0]?.registration_status || null
      }));

      setUsers(transformedUsers);
      setTotalUsers(transformedUsers.length);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    totalUsers,
    error,
    fetchUsers
  };
};
