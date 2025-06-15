
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createUserSchema, CreateUserFormData } from './types';

export const useCreateUser = (onUserCreated: () => void) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      businessName: '',
      businessType: 'LLC',
      hasExistingBusiness: false,
      totalTokens: 50,
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    setLoading(true);
    
    try {
      console.log('Creating user with data:', data);

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          business_name: data.businessName,
        },
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('User creation failed - no user data returned');
      }

      console.log('User created in auth:', authData.user);

      // Create business profile
      const { error: profileError } = await supabase
        .from('business_profiles')
        .insert({
          user_id: authData.user.id,
          business_name: data.businessName,
          business_type: data.businessType,
          has_existing_business: data.hasExistingBusiness,
          registration_status: 'pending',
        });

      if (profileError) {
        console.error('Business profile creation error:', profileError);
        throw profileError;
      }

      // Create user tokens record
      const { error: tokensError } = await supabase
        .from('user_tokens')
        .insert({
          user_id: authData.user.id,
          email: data.email,
          total_tokens: data.totalTokens,
          used_tokens: 0,
        });

      if (tokensError) {
        console.error('User tokens creation error:', tokensError);
        throw tokensError;
      }

      toast({
        title: "Success",
        description: `User ${data.email} created successfully with ${data.totalTokens} tokens`,
      });

      form.reset();
      onUserCreated();
      return true;
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: error.message || 'Failed to create user',
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    onSubmit,
  };
};
