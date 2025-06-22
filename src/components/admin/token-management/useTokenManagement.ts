
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserToken, TokenTransaction, TokenStats } from './types';

export const useTokenManagement = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tokenStats, setTokenStats] = useState<TokenStats>({
    totalUsers: 0,
    totalTokensIssued: 0,
    totalTokensConsumed: 0,
    averageUsage: 0,
    activeTrialUsers: 0,
    totalDailyTokensUsed: 0
  });
  const [userTokens, setUserTokens] = useState<UserToken[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<TokenTransaction[]>([]);

  const fetchTokenStats = async () => {
    try {
      setLoading(true);
      
      // Get all user tokens
      const { data: usersData, error: usersError } = await supabase
        .from('user_tokens')
        .select('*');

      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      // Get recent transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('token_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (transactionsError) {
        console.error('Error fetching transactions:', transactionsError);
        throw transactionsError;
      }

      // Calculate stats
      const totalUsers = usersData?.length || 0;
      const totalTokensIssued = usersData?.reduce((sum, user) => sum + (user.total_tokens || 0), 0) || 0;
      const totalTokensConsumed = usersData?.reduce((sum, user) => sum + (user.used_tokens || 0), 0) || 0;
      const averageUsage = totalUsers > 0 ? totalTokensConsumed / totalUsers : 0;

      // Calculate trial users and daily token usage
      const currentDate = new Date();
      const activeTrialUsers = usersData?.filter(user => {
        if (!user.trial_end_date) return false;
        const trialEndDate = new Date(user.trial_end_date);
        return currentDate <= trialEndDate;
      }).length || 0;

      const totalDailyTokensUsed = usersData?.reduce((sum, user) => sum + (user.daily_tokens_used || 0), 0) || 0;

      setTokenStats({
        totalUsers,
        totalTokensIssued,
        totalTokensConsumed,
        averageUsage: Math.round(averageUsage),
        activeTrialUsers,
        totalDailyTokensUsed
      });

      // Calculate available tokens for each user
      const processedUserTokens = (usersData || []).map(user => ({
        ...user,
        available_tokens: Math.max(0, (user.total_tokens || 0) - (user.used_tokens || 0))
      }));

      setUserTokens(processedUserTokens);
      setRecentTransactions(transactionsData || []);
      
      toast({
        title: "Success",
        description: "Token statistics updated successfully",
      });
    } catch (error) {
      console.error('Error fetching token stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch token statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const adjustUserTokens = async (userEmail: string, adjustment: number, reason: string) => {
    if (!userEmail || adjustment === 0) {
      toast({
        title: "Error",
        description: "Invalid parameters for token adjustment",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Adjusting tokens for:', userEmail, 'by:', adjustment);
      
      // First, find the user by email
      const { data: userData, error: fetchError } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('email', userEmail)
        .limit(1);

      if (fetchError) {
        console.error('Error fetching user data:', fetchError);
        throw fetchError;
      }

      if (!userData || userData.length === 0) {
        toast({
          title: "Error",
          description: `User with email ${userEmail} not found`,
          variant: "destructive"
        });
        return;
      }

      const currentUser = userData[0];
      const newTotal = Math.max(0, (currentUser.total_tokens || 0) + adjustment);
      console.log('Updating total tokens from', currentUser.total_tokens, 'to', newTotal);

      // Update the user's total tokens
      const { error: updateError } = await supabase
        .from('user_tokens')
        .update({ 
          total_tokens: newTotal,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);

      if (updateError) {
        console.error('Error updating tokens:', updateError);
        throw updateError;
      }

      // Log the transaction
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          user_id: currentUser.user_id,
          email: userEmail,
          transaction_type: adjustment > 0 ? 'purchase' : 'refund',
          amount: adjustment,
          feature_used: 'admin_adjustment',
          description: reason
        });

      if (transactionError) {
        console.error('Error logging transaction:', transactionError);
        throw transactionError;
      }

      toast({
        title: "Success",
        description: `Token balance updated for ${userEmail}. Added ${adjustment} tokens.`,
      });

      // Refresh the data
      await fetchTokenStats();
    } catch (error) {
      console.error('Error adjusting tokens:', error);
      toast({
        title: "Error",
        description: "Failed to adjust token balance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetDailyTokens = async () => {
    try {
      // Call the reset function for daily tokens
      const { error } = await supabase.rpc('reset_daily_tokens');
      
      if (error) {
        console.error('Error resetting daily tokens:', error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Daily tokens reset successfully for trial users",
      });
      
      await fetchTokenStats();
    } catch (error) {
      console.error('Error resetting daily tokens:', error);
      toast({
        title: "Error",
        description: "Failed to reset daily tokens",
        variant: "destructive"
      });
    }
  };

  const resetMonthlyTokens = async () => {
    try {
      // Call the reset function
      const { error } = await supabase.rpc('reset_monthly_tokens');
      
      if (error) {
        console.error('Error resetting monthly tokens:', error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Monthly tokens reset successfully for all users",
      });
      
      await fetchTokenStats();
    } catch (error) {
      console.error('Error resetting monthly tokens:', error);
      toast({
        title: "Error",
        description: "Failed to reset monthly tokens",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTokenStats();
  }, []);

  return {
    loading,
    searchTerm,
    setSearchTerm,
    tokenStats,
    userTokens,
    recentTransactions,
    fetchTokenStats,
    adjustUserTokens,
    resetDailyTokens,
    resetMonthlyTokens
  };
};
