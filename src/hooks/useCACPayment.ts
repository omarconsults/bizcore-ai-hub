
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentData {
  amount: number;
  email: string;
  registrationData: any;
  entityType: string;
}

export const useCACPayment = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async (paymentData: PaymentData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('initiate-cac-payment', {
        body: {
          amount: paymentData.amount,
          email: paymentData.email,
          metadata: {
            entityType: paymentData.entityType,
            registrationData: paymentData.registrationData
          }
        }
      });

      if (error) throw error;

      if (data.status && data.data?.authorization_url) {
        // Open payment page in new tab
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

  return {
    initiatePayment,
    loading
  };
};
