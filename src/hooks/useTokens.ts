
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TokenBalance {
  totalTokens: number;
  usedTokens: number;
  availableTokens: number;
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
    availableTokens: 0
  });
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTokenBalance = async () => {
    if (!user?.email || !session) return;

    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('total_tokens, used_tokens, available_tokens')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setTokenBalance({
          totalTokens: data.total_tokens,
          usedTokens: data.used_tokens,
          availableTokens: data.available_tokens
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
      const { error } = await supabase
        .from('user_tokens')
        .insert({
          user_id: user.id,
          email: user.email,
          total_tokens: 10, // New users get 10 free tokens
          used_tokens: 0
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
          description: 'Welcome! 10 free tokens to get you started'
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

    // Sanitize feature and description
    const sanitizedFeature = sanitizeInput(feature);
    const sanitizedDescription = description ? sanitizeInput(description) : undefined;

    if (tokenBalance.availableTokens < amount) {
      toast({
        title: "Insufficient tokens",
        description: `You need ${amount} tokens but only have ${tokenBalance.availableTokens} available. Purchase more tokens to continue.`,
        variant: "destructive"
      });
      return false;
    }

    try {
      // Update token balance with proper user validation
      const { error: updateError } = await supabase
        .from('user_tokens')
        .update({ 
          used_tokens: tokenBalance.usedTokens + amount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('email', user.email); // Additional validation

      if (updateError) throw updateError;

      // Log transaction with proper user validation
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
        availableTokens: prev.availableTokens - amount
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
