
export interface UserToken {
  id: string;
  user_id: string;
  email: string;
  total_tokens: number;
  used_tokens: number;
  available_tokens: number;
  last_reset_date: string;
  created_at: string;
  daily_token_limit: number;
  daily_tokens_used: number;
  trial_start_date: string | null;
  trial_end_date: string | null;
  last_daily_reset: string | null;
}

export interface TokenTransaction {
  id: string;
  user_id: string;
  email: string;
  transaction_type: string;
  amount: number;
  feature_used: string;
  description: string;
  created_at: string;
}

export interface TokenStats {
  totalUsers: number;
  totalTokensIssued: number;
  totalTokensConsumed: number;
  averageUsage: number;
  activeTrialUsers: number;
  totalDailyTokensUsed: number;
}
