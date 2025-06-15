
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEmailService = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (emailData: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }) => {
    setLoading(true);
    try {
      console.log('Sending email:', emailData);

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: emailData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Email service error: ${error.message}`);
      }

      if (!data.success) {
        console.error('Email sending failed:', data);
        throw new Error(data.error || 'Email sending failed');
      }

      console.log('Email sent successfully:', data);
      
      toast({
        title: "Email Sent! ✉️",
        description: "Your email has been sent successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      toast({
        title: "Email Failed",
        description: error.message || "Failed to send email. Please try again.",
        variant: "destructive"
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading };
};
