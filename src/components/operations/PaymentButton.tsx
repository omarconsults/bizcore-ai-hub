
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { usePaystack } from '@/hooks/usePaystack';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentButtonProps {
  invoiceId: string;
  amount: number;
  clientEmail?: string;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  invoiceId,
  amount,
  clientEmail,
  disabled = false,
  variant = 'default',
  size = 'sm'
}) => {
  const { initiatePayment, loading } = usePaystack();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const paymentData = {
      amount,
      email: clientEmail || user.email || '',
      invoiceId,
      metadata: {
        userId: user.id,
        businessName: user.user_metadata?.business_name || 'Unknown Business'
      }
    };

    try {
      await initiatePayment(paymentData);
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      className="gap-2"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <CreditCard size={16} />
      )}
      {loading ? 'Processing...' : 'Pay Now'}
    </Button>
  );
};

export default PaymentButton;
