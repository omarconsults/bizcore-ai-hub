
-- Fix RLS policies for token_packages table
DROP POLICY IF EXISTS "manage_packages" ON public.token_packages;

-- Create proper admin-only policies for token_packages
CREATE POLICY "Anyone can view active packages" ON public.token_packages
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Service role can manage packages" ON public.token_packages
  FOR ALL
  USING (auth.role() = 'service_role');

-- Fix RLS policies for user_tokens table
DROP POLICY IF EXISTS "insert_tokens" ON public.user_tokens;
DROP POLICY IF EXISTS "update_tokens" ON public.user_tokens;

-- Create proper user-specific policies for user_tokens
CREATE POLICY "Users can insert their own tokens" ON public.user_tokens
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens" ON public.user_tokens
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Fix RLS policies for token_transactions table
DROP POLICY IF EXISTS "insert_transactions" ON public.token_transactions;

-- Create proper user-specific policy for token_transactions
CREATE POLICY "Users can insert their own transactions" ON public.token_transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add index for better performance on user queries
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON public.user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON public.token_transactions(user_id);
