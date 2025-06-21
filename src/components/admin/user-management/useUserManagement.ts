
import { useState, useEffect } from 'react';
import { User } from './types';

// Mock data until Supabase types are regenerated
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john@techinnov.com',
    business_name: 'Tech Innovations Ltd',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    last_sign_in_at: new Date(Date.now() - 3600000).toISOString(),
    email_confirmed_at: new Date(Date.now() - 86400000 * 29).toISOString(),
    source: 'business_profile'
  },
  {
    id: 'user-2',
    email: 'sarah@greensol.com',
    business_name: 'Green Solutions',
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    last_sign_in_at: new Date(Date.now() - 7200000).toISOString(),
    email_confirmed_at: new Date(Date.now() - 86400000 * 14).toISOString(),
    total_tokens: 500,
    used_tokens: 150,
    source: 'tokens'
  },
  {
    id: 'user-3',
    email: 'mike@startup.ng',
    business_name: 'StartupNG',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    last_sign_in_at: new Date(Date.now() - 86400000).toISOString(),
    email_confirmed_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    total_tokens: 200,
    used_tokens: 50,
    source: 'onboarding'
  }
];

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUsers(mockUsers);
      setTotalUsers(mockUsers.length);
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
