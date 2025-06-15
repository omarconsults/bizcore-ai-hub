
-- Create user_tokens table to track token balances and usage
CREATE TABLE public.user_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  used_tokens INTEGER NOT NULL DEFAULT 0,
  available_tokens INTEGER GENERATED ALWAYS AS (total_tokens - used_tokens) STORED,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create token_transactions table to log all token consumption
CREATE TABLE public.token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  transaction_type TEXT NOT NULL, -- 'consume', 'purchase', 'refund', 'reset'
  amount INTEGER NOT NULL, -- negative for consumption, positive for addition
  feature_used TEXT, -- 'ai_copilot', 'document_generation', 'business_plan', etc.
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create token_packages table for different token purchase options
CREATE TABLE public.token_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tokens INTEGER NOT NULL,
  price_naira INTEGER NOT NULL, -- price in kobo (smallest naira unit)
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_packages ENABLE ROW LEVEL SECURITY;

-- Create policies for user_tokens
CREATE POLICY "select_own_tokens" ON public.user_tokens
  FOR SELECT
  USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "insert_tokens" ON public.user_tokens
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "update_tokens" ON public.user_tokens
  FOR UPDATE
  USING (true);

-- Create policies for token_transactions
CREATE POLICY "select_own_transactions" ON public.token_transactions
  FOR SELECT
  USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "insert_transactions" ON public.token_transactions
  FOR INSERT
  WITH CHECK (true);

-- Create policies for token_packages (public read access)
CREATE POLICY "select_packages" ON public.token_packages
  FOR SELECT
  USING (true);

CREATE POLICY "manage_packages" ON public.token_packages
  FOR ALL
  USING (true);

-- Insert default token packages
INSERT INTO public.token_packages (name, tokens, price_naira, is_active) VALUES
  ('Starter Pack', 100, 5000, true), -- ₦50 for 100 tokens
  ('Professional Pack', 500, 20000, true), -- ₦200 for 500 tokens  
  ('Enterprise Pack', 1500, 50000, true), -- ₦500 for 1500 tokens
  ('Premium Pack', 3000, 90000, true); -- ₦900 for 3000 tokens

-- Create function to reset monthly tokens based on subscription
CREATE OR REPLACE FUNCTION reset_monthly_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Reset tokens for users based on their subscription tier
  UPDATE public.user_tokens 
  SET 
    used_tokens = 0,
    total_tokens = CASE 
      WHEN EXISTS (
        SELECT 1 FROM public.subscribers s 
        WHERE s.user_id = user_tokens.user_id 
        AND s.subscribed = true 
        AND s.subscription_tier = 'Starter'
      ) THEN GREATEST(total_tokens, 200)
      WHEN EXISTS (
        SELECT 1 FROM public.subscribers s 
        WHERE s.user_id = user_tokens.user_id 
        AND s.subscribed = true 
        AND s.subscription_tier = 'Professional'
      ) THEN GREATEST(total_tokens, 1000)
      WHEN EXISTS (
        SELECT 1 FROM public.subscribers s 
        WHERE s.user_id = user_tokens.user_id 
        AND s.subscribed = true 
        AND s.subscription_tier = 'Enterprise'
      ) THEN GREATEST(total_tokens, 5000)
      ELSE GREATEST(total_tokens, 50) -- Free tier gets 50 tokens
    END,
    last_reset_date = CURRENT_DATE,
    updated_at = now()
  WHERE last_reset_date < CURRENT_DATE - INTERVAL '30 days';
END;
$$;
