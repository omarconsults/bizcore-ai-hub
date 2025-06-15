
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentData {
  amount: number;
  email: string;
  invoiceId: string;
  metadata?: Record<string, any>;
}

export const usePaystack = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async (paymentData: PaymentData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('initiate-payment', {
        body: paymentData
      });

      if (error) throw error;

      if (data.status && data.data?.authorization_url) {
        // Redirect to Paystack payment page
        window.open(data.data.authorization_url, '_blank');
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { reference }
      });

      if (error) throw error;

      return data;
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message || "Failed to verify payment",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    initiatePayment,
    verifyPayment,
    loading
  };
};
