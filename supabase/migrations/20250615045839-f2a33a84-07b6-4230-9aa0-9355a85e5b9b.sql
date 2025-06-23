
-- Create business_profiles table to store business information
CREATE TABLE public.business_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  business_name TEXT NOT NULL,
  cac_registration_number TEXT,
  business_type TEXT NOT NULL, -- 'LLC', 'LTD', 'Partnership', 'Business Name'
  registration_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'registered', 'verified'
  registration_date DATE,
  has_existing_business BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create onboarding_progress table to track completion status
CREATE TABLE public.onboarding_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  business_profile_id UUID REFERENCES public.business_profiles(id) NOT NULL,
  step_key TEXT NOT NULL, -- 'cac-registration', 'tax-registration', etc.
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_skipped BOOLEAN NOT NULL DEFAULT false, -- for existing business users
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, step_key)
);

-- Add RLS policies for business_profiles
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own business profile" 
  ON public.business_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own business profile" 
  ON public.business_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business profile" 
  ON public.business_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add RLS policies for onboarding_progress
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own onboarding progress" 
  ON public.onboarding_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own onboarding progress" 
  ON public.onboarding_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress" 
  ON public.onboarding_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to initialize onboarding steps when business profile is created
CREATE OR REPLACE FUNCTION public.initialize_onboarding_steps()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  step_keys TEXT[] := ARRAY[
    'cac-registration',
    'tax-registration', 
    'bank-account',
    'insurance',
    'vat-registration',
    'business-permit',
    'website-setup',
    'social-media'
  ];
  step_key TEXT;
BEGIN
  -- Insert onboarding steps for the new business profile
  FOREACH step_key IN ARRAY step_keys
  LOOP
    INSERT INTO public.onboarding_progress (
      user_id, 
      business_profile_id, 
      step_key,
      is_completed,
      is_skipped
    ) VALUES (
      NEW.user_id,
      NEW.id,
      step_key,
      CASE 
        WHEN NEW.has_existing_business AND step_key IN ('cac-registration', 'tax-registration') THEN true
        ELSE false
      END,
      CASE 
        WHEN NEW.has_existing_business AND step_key IN ('cac-registration', 'tax-registration') THEN true
        ELSE false
      END
    );
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically initialize onboarding steps
CREATE TRIGGER initialize_onboarding_steps_trigger
  AFTER INSERT ON public.business_profiles
  FOR EACH ROW EXECUTE FUNCTION public.initialize_onboarding_steps();
