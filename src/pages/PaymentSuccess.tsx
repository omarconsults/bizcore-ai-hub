
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePaystack } from '@/hooks/usePaystack';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { verifyPayment, loading } = usePaystack();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  const reference = searchParams.get('reference');

  useEffect(() => {
    if (reference && !verified) {
      verifyPayment(reference)
        .then((data) => {
          setPaymentData(data.data);
          setVerified(true);
        })
        .catch((error) => {
          console.error('Payment verification failed:', error);
        });
    }
  }, [reference, verified, verifyPayment]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {paymentData && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">₦{(paymentData.amount / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-mono text-sm">{paymentData.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date(paymentData.paid_at).toLocaleDateString()}</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
