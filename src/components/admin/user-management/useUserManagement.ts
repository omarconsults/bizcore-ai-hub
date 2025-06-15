
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from './types';

export const useUserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching comprehensive user data...');
      
      const userMap = new Map<string, User>();

      // 1. Get users from business_profiles
      const { data: businessProfiles, error: businessError } = await supabase
        .from('business_profiles')
        .select('user_id, business_name, created_at')
        .order('created_at', { ascending: false });

      console.log('Business profiles:', { businessProfiles, businessError });

      if (businessProfiles && !businessError) {
        businessProfiles.forEach(profile => {
          const user: User = {
            id: profile.user_id,
            email: profile.user_id, // Will be updated from other sources
            created_at: profile.created_at,
            last_sign_in_at: profile.created_at,
            business_name: profile.business_name,
            email_confirmed_at: profile.created_at,
            total_tokens: 0,
            used_tokens: 0,
            source: 'business_profile'
          };
          userMap.set(profile.user_id, user);
        });
      }

      // 2. Get users from user_tokens
      const { data: tokenData, error: tokenError } = await supabase
        .from('user_tokens')
        .select('user_id, email, created_at, total_tokens, used_tokens')
        .order('created_at', { ascending: false });

      console.log('Token data:', { tokenData, tokenError });

      if (tokenData && !tokenError) {
        tokenData.forEach(token => {
          const userId = token.user_id || token.email;
          if (userMap.has(userId)) {
            const existing = userMap.get(userId)!;
            userMap.set(userId, {
              ...existing,
              email: token.email,
              total_tokens: token.total_tokens,
              used_tokens: token.used_tokens
            });
          } else {
            const user: User = {
              id: userId,
              email: token.email,
              created_at: token.created_at,
              last_sign_in_at: token.created_at,
              business_name: token.email.split('@')[0],
              email_confirmed_at: token.created_at,
              total_tokens: token.total_tokens,
              used_tokens: token.used_tokens,
              source: 'tokens'
            };
            userMap.set(userId, user);
          }
        });
      }

      // 3. Get users from onboarding_progress
      const { data: onboardingData, error: onboardingError } = await supabase
        .from('onboarding_progress')
        .select('user_id, created_at')
        .order('created_at', { ascending: false });

      console.log('Onboarding data:', { onboardingData, onboardingError });

      if (onboardingData && !onboardingError) {
        const onboardingUsers = onboardingData.reduce((acc, step) => {
          if (!acc[step.user_id] || new Date(step.created_at) < new Date(acc[step.user_id].created_at)) {
            acc[step.user_id] = step;
          }
          return acc;
        }, {} as Record<string, any>);

        Object.values(onboardingUsers).forEach((onboarding: any) => {
          if (!userMap.has(onboarding.user_id)) {
            const user: User = {
              id: onboarding.user_id,
              email: onboarding.user_id,
              created_at: onboarding.created_at,
              last_sign_in_at: onboarding.created_at,
              business_name: 'Onboarding User',
              email_confirmed_at: onboarding.created_at,
              total_tokens: 0,
              used_tokens: 0,
              source: 'onboarding'
            };
            userMap.set(onboarding.user_id, user);
          }
        });
      }

      // 4. Try to get additional user info from token_transactions
      const { data: transactionData, error: transactionError } = await supabase
        .from('token_transactions')
        .select('user_id, email, created_at')
        .order('created_at', { ascending: false });

      console.log('Transaction data:', { transactionData, transactionError });

      if (transactionData && !transactionError) {
        transactionData.forEach(transaction => {
          const userId = transaction.user_id || transaction.email;
          if (!userMap.has(userId) && transaction.email) {
            const user: User = {
              id: userId,
              email: transaction.email,
              created_at: transaction.created_at,
              last_sign_in_at: transaction.created_at,
              business_name: transaction.email.split('@')[0],
              email_confirmed_at: transaction.created_at,
              total_tokens: 0,
              used_tokens: 0,
              source: 'tokens'
            };
            userMap.set(userId, user);
          } else if (userMap.has(userId) && transaction.email) {
            const existing = userMap.get(userId)!;
            userMap.set(userId, {
              ...existing,
              email: transaction.email
            });
          }
        });
      }

      const combinedUsers = Array.from(userMap.values());
      
      const cleanedUsers = combinedUsers.map(user => ({
        ...user,
        email: user.email.includes('@') ? user.email : `${user.email.substring(0, 8)}...@unknown`,
        business_name: user.business_name || 'Not specified'
      }));

      console.log('Final combined users:', cleanedUsers);

      if (cleanedUsers.length === 0) {
        setError('No users found. This might be due to Row Level Security policies or the users haven\'t performed any tracked actions yet.');
      } else {
        setUsers(cleanedUsers);
        setTotalUsers(cleanedUsers.length);
        
        toast({
          title: "Success",
          description: `Loaded ${cleanedUsers.length} users from multiple sources`,
        });
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const errorMessage = error.message || 'Failed to fetch users';
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
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
