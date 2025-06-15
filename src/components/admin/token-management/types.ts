
export interface UserToken {
  id: string;
  user_id: string;
  email: string;
  total_tokens: number;
  used_tokens: number;
  available_tokens: number;
  last_reset_date: string;
  created_at: string;
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
}
