
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useCACPayment } from '@/hooks/useCACPayment';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentFormProps {
  onBack: () => void;
  onPaymentComplete: () => void;
  registrationData: any;
  entityType: string;
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onBack,
  onPaymentComplete,
  registrationData,
  entityType,
  amount
}) => {
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const { toast } = useToast();
  const { initiatePayment, loading } = useCACPayment();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user?.email) {
      toast({
        title: "Authentication Required",
        description: "Please log in to continue with payment.",
        variant: "destructive"
      });
      return;
    }

    try {
      setPaymentInitiated(true);
      await initiatePayment({
        amount,
        email: user.email,
        registrationData,
        entityType
      });
      
      // Set a timeout to check for payment completion
      // In a real implementation, you'd use webhooks or polling
      setTimeout(() => {
        toast({
          title: "Payment Processing",
          description: "If payment was successful, click 'Continue' to proceed.",
        });
      }, 5000);
      
    } catch (error) {
      setPaymentInitiated(false);
      console.error('Payment initiation failed:', error);
    }
  };

  const handleContinueAfterPayment = () => {
    // In a real implementation, you'd verify payment status here
    onPaymentComplete();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="text-blue-900" size={28} />
            Payment Required
          </h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        <p className="text-gray-600">Complete payment to submit your CAC registration application</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Registration Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Application Details:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Type:</span>
                  <span className="font-medium">{entityType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Name:</span>
                  <span className="font-medium">{registrationData.cacForm?.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">
                    {registrationData.cacForm?.city}, {registrationData.cacForm?.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Directors:</span>
                  <span className="font-medium">
                    {registrationData.directorsForm?.directors?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">Registration Fee:</span>
                <span className="text-2xl font-bold text-blue-900">₦{amount.toLocaleString()}</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                This includes all CAC processing fees and government charges
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Action */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-emerald-600" size={20} />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Your payment is secured with bank-level encryption. 
                We accept all major payment methods.
              </p>
              
              {!paymentInitiated ? (
                <Button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                  size="lg"
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="mr-2" size={20} />
                      Pay ₦{amount.toLocaleString()} Now
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <CheckCircle size={20} />
                    <span>Payment window opened</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Complete your payment in the new window, then click continue below.
                  </p>
                  <Button 
                    onClick={handleContinueAfterPayment}
                    className="w-full bg-blue-900 hover:bg-blue-800"
                  >
                    I've Completed Payment - Continue
                  </Button>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2 text-sm">Payment includes:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• CAC registration processing fee</li>
                <li>• Government statutory charges</li>
                <li>• Certificate of incorporation</li>
                <li>• Company search and name reservation</li>
                <li>• Digital copies of all certificates</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentForm;
