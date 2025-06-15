
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Coins, CreditCard, Zap } from 'lucide-react';
import { usePaystack } from '@/hooks/usePaystack';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TokenPurchaseModalProps {
  onClose: () => void;
}

const TokenPurchaseModal = ({ onClose }: TokenPurchaseModalProps) => {
  const { toast } = useToast();
  const { initiatePayment, loading } = usePaystack();
  const { user } = useAuth();

  const tokenPackages = [
    {
      name: "Starter Pack",
      tokens: 100,
      price: 5000,
      displayPrice: "₦5,000",
      pricePerToken: "₦50",
      popular: false,
      description: "Perfect for trying out AI features",
      features: ["100 AI tokens", "No expiration", "Instant activation"]
    },
    {
      name: "Professional Pack",
      tokens: 500,
      price: 20000,
      displayPrice: "₦20,000",
      pricePerToken: "₦40",
      popular: true,
      description: "Great for regular business operations",
      features: ["500 AI tokens", "20% savings", "No expiration", "Priority support"]
    },
    {
      name: "Enterprise Pack",
      tokens: 1500,
      price: 50000,
      displayPrice: "₦50,000",
      pricePerToken: "₦33",
      popular: false,
      description: "For heavy users and large businesses",
      features: ["1,500 AI tokens", "34% savings", "No expiration", "Priority support"]
    },
    {
      name: "Premium Pack",
      tokens: 3000,
      price: 90000,
      displayPrice: "₦90,000",
      pricePerToken: "₦30",
      popular: false,
      description: "Maximum value for power users",
      features: ["3,000 AI tokens", "40% savings", "No expiration", "Premium support"]
    }
  ];

  const handlePurchase = async (packageData: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase tokens",
        variant: "destructive"
      });
      return;
    }

    const paymentData = {
      amount: packageData.price,
      email: user.email || '',
      invoiceId: `token_purchase_${Date.now()}`,
      metadata: {
        userId: user.id,
        businessName: user.user_metadata?.business_name || 'Token Purchase',
        packageName: packageData.name,
        tokens: packageData.tokens,
        type: 'token_purchase'
      }
    };

    try {
      await initiatePayment(paymentData);
      // Payment window will open, close the modal
      onClose();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="packages">Token Packages</TabsTrigger>
          <TabsTrigger value="subscription">Monthly Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tokenPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-2 border-emerald-600 shadow-lg' : 'border border-gray-200'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-emerald-600 text-white px-4 py-1">Best Value</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-emerald-600">{pkg.displayPrice}</span>
                    <div className="text-lg font-bold text-gray-900">{pkg.tokens.toLocaleString()} Tokens</div>
                    <div className="text-sm text-gray-600">{pkg.pricePerToken} per token</div>
                  </div>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-emerald-600 flex-shrink-0" size={14} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => handlePurchase(pkg)}
                    disabled={loading}
                  >
                    <CreditCard className="mr-2" size={16} />
                    {loading ? 'Processing...' : 'Purchase Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <div className="text-center p-8 bg-blue-50 rounded-lg">
            <Zap className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Subscription Plans</h3>
            <p className="text-gray-600 mb-4">
              Get monthly token allowances plus full business management features
            </p>
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => {
                onClose();
                window.location.href = '/pricing';
              }}
            >
              View Subscription Plans
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Coins className="text-emerald-600" size={16} />
          <span className="font-medium text-gray-900">Token Usage Guide</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>• AI Chat: 1 token/message</div>
          <div>• Document Gen: 5-25 tokens</div>
          <div>• Business Plan: 50 tokens</div>
          <div>• Marketing Content: 10-20 tokens</div>
        </div>
      </div>
    </div>
  );
};

export default TokenPurchaseModal;
