
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EmailData {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const useEmailService = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendEmail = async (emailData: EmailData) => {
    setLoading(true);
    console.log('Sending email:', emailData);

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: emailData,
      });

      if (error) {
        throw error;
      }

      console.log('Email sent successfully:', data);
      toast({
        title: "Email sent successfully!",
        description: `Email sent to ${emailData.to}`,
      });

      return { success: true, data };
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send email",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendEmail,
    loading,
  };
};
