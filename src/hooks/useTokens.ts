
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TokenBalance {
  totalTokens: number;
  usedTokens: number;
  availableTokens: number;
  dailyTokenLimit: number;
  dailyTokensUsed: number;
  dailyTokensRemaining: number;
  isTrialActive: boolean;
  trialEndDate: string | null;
  daysRemaining: number;
}

export interface TokenTransaction {
  id: string;
  transactionType: 'consume' | 'purchase' | 'refund' | 'reset' | 'monthly_bonus';
  amount: number;
  featureUsed?: string;
  description?: string;
  createdAt: string;
}

// Input sanitization helper
const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
};

export const useTokens = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    totalTokens: 0,
    usedTokens: 0,
    availableTokens: 0,
    dailyTokenLimit: 0,
    dailyTokensUsed: 0,
    dailyTokensRemaining: 0,
    isTrialActive: false,
    trialEndDate: null,
    daysRemaining: 0
  });
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTokenBalance = async () => {
    if (!user?.email || !session) return;

    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const trialEndDate = data.trial_end_date ? new Date(data.trial_end_date) : null;
        const currentDate = new Date();
        const isTrialActive = trialEndDate ? currentDate <= trialEndDate : false;
        const daysRemaining = trialEndDate ? Math.max(0, Math.ceil((trialEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;

        setTokenBalance({
          totalTokens: data.total_tokens,
          usedTokens: data.used_tokens,
          availableTokens: data.available_tokens || (data.total_tokens - data.used_tokens),
          dailyTokenLimit: data.daily_token_limit || 25,
          dailyTokensUsed: data.daily_tokens_used || 0,
          dailyTokensRemaining: Math.max(0, (data.daily_token_limit || 25) - (data.daily_tokens_used || 0)),
          isTrialActive,
          trialEndDate: data.trial_end_date,
          daysRemaining
        });
      } else {
        // Initialize user tokens if not found
        await initializeUserTokens();
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch token balance",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeUserTokens = async () => {
    if (!user?.email || !user?.id || !session) return;

    try {
      const trialStartDate = new Date().toISOString().split('T')[0];
      const trialEndDate = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const { error } = await supabase
        .from('user_tokens')
        .insert({
          user_id: user.id,
          email: user.email,
          total_tokens: 10, // Welcome bonus
          used_tokens: 0,
          daily_token_limit: 25,
          daily_tokens_used: 0,
          trial_start_date: trialStartDate,
          trial_end_date: trialEndDate,
          last_daily_reset: trialStartDate
        });

      if (error) throw error;

      // Log the welcome bonus transaction
      await supabase
        .from('token_transactions')
        .insert({
          user_id: user.id,
          email: user.email,
          transaction_type: 'monthly_bonus',
          amount: 10,
          feature_used: 'welcome_bonus',
          description: 'Welcome! 10 free tokens to get you started + 100-day trial with 25 daily tokens'
        });

      await fetchTokenBalance();
    } catch (error) {
      console.error('Error initializing user tokens:', error);
    }
  };

  const consumeTokens = async (amount: number, feature: string, description?: string): Promise<boolean> => {
    if (!user?.email || !user?.id || !session) {
      toast({
        title: "Authentication required",
        description: "Please log in to use AI features",
        variant: "destructive"
      });
      return false;
    }

    // Validate inputs
    if (amount <= 0 || amount > 1000) {
      toast({
        title: "Invalid token amount",
        description: "Token amount must be between 1 and 1000",
        variant: "destructive"
      });
      return false;
    }

    // Check daily limit during trial
    if (tokenBalance.isTrialActive && tokenBalance.dailyTokensRemaining < amount) {
      toast({
        title: "Daily limit reached",
        description: `You've reached your daily limit of ${tokenBalance.dailyTokenLimit} tokens. Try again tomorrow or upgrade your plan.`,
        variant: "destructive"
      });
      return false;
    }

    // Check available tokens
    if (tokenBalance.availableTokens < amount) {
      toast({
        title: "Insufficient tokens",
        description: `You need ${amount} tokens but only have ${tokenBalance.availableTokens} available. Purchase more tokens to continue.`,
        variant: "destructive"
      });
      return false;
    }

    // Sanitize feature and description
    const sanitizedFeature = sanitizeInput(feature);
    const sanitizedDescription = description ? sanitizeInput(description) : undefined;

    try {
      // Update token balance and daily usage
      const updateData: any = { 
        used_tokens: tokenBalance.usedTokens + amount,
        updated_at: new Date().toISOString()
      };

      if (tokenBalance.isTrialActive) {
        updateData.daily_tokens_used = tokenBalance.dailyTokensUsed + amount;
      }

      const { error: updateError } = await supabase
        .from('user_tokens')
        .update(updateData)
        .eq('user_id', user.id)
        .eq('email', user.email);

      if (updateError) throw updateError;

      // Log transaction
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          user_id: user.id,
          email: user.email,
          transaction_type: 'consume',
          amount: -amount,
          feature_used: sanitizedFeature,
          description: sanitizedDescription || `Used ${amount} tokens for ${sanitizedFeature}`
        });

      if (transactionError) throw transactionError;

      // Update local state
      setTokenBalance(prev => ({
        ...prev,
        usedTokens: prev.usedTokens + amount,
        availableTokens: prev.availableTokens - amount,
        dailyTokensUsed: prev.isTrialActive ? prev.dailyTokensUsed + amount : prev.dailyTokensUsed,
        dailyTokensRemaining: prev.isTrialActive ? Math.max(0, prev.dailyTokensRemaining - amount) : prev.dailyTokensRemaining
      }));

      return true;
    } catch (error) {
      console.error('Error consuming tokens:', error);
      toast({
        title: "Error",
        description: "Failed to consume tokens. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const fetchTransactions = async () => {
    if (!user?.email || !session) return;

    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const formattedTransactions: TokenTransaction[] = data.map(transaction => ({
        id: transaction.id,
        transactionType: transaction.transaction_type as TokenTransaction['transactionType'],
        amount: transaction.amount,
        featureUsed: transaction.feature_used,
        description: transaction.description,
        createdAt: transaction.created_at
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (user && session) {
      fetchTokenBalance();
      fetchTransactions();
    }
  }, [user, session]);

  return {
    tokenBalance,
    transactions,
    loading,
    consumeTokens,
    refreshBalance: fetchTokenBalance,
    refreshTransactions: fetchTransactions
  };
};
