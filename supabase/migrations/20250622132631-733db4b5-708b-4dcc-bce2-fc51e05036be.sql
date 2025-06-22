
-- Add trial period tracking to user_tokens table
ALTER TABLE public.user_tokens 
ADD COLUMN trial_start_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN trial_end_date DATE DEFAULT (CURRENT_DATE + INTERVAL '100 days'),
ADD COLUMN daily_token_limit INTEGER DEFAULT 25,
ADD COLUMN daily_tokens_used INTEGER DEFAULT 0,
ADD COLUMN last_daily_reset DATE DEFAULT CURRENT_DATE;

-- Update the reset_monthly_tokens function to handle daily limits during trial
CREATE OR REPLACE FUNCTION reset_daily_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Reset daily tokens for trial users
  UPDATE public.user_tokens 
  SET 
    daily_tokens_used = 0,
    last_daily_reset = CURRENT_DATE
  WHERE last_daily_reset < CURRENT_DATE
    AND CURRENT_DATE <= trial_end_date;
END;
$$;

-- Update existing user_tokens initialization to include trial settings
UPDATE public.user_tokens 
SET 
  trial_start_date = CURRENT_DATE,
  trial_end_date = CURRENT_DATE + INTERVAL '100 days',
  daily_token_limit = 25,
  daily_tokens_used = 0,
  last_daily_reset = CURRENT_DATE
WHERE trial_start_date IS NULL;
