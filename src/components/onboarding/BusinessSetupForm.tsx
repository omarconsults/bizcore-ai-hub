import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BusinessSetupFormProps {
  onComplete: (hasExistingBusiness: boolean) => void;
}

const BusinessSetupForm = ({ onComplete }: BusinessSetupFormProps) => {
  const [hasExistingBusiness, setHasExistingBusiness] = useState<string>('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const businessProfile = {
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
        has_existing_business: hasExistingBusiness === 'yes',
        cac_registration_number: hasExistingBusiness === 'yes' ? cacNumber : null,
        registration_date: hasExistingBusiness === 'yes' ? registrationDate : null,
        registration_status: hasExistingBusiness === 'yes' ? 'registered' : 'pending'
      };

      const { error } = await supabase
        .from('business_profiles')
        .insert([businessProfile]);

      if (error) {
        throw error;
      }

      toast({
        title: "Business profile created!",
        description: "Your onboarding has been customized based on your business status.",
      });

      onComplete(hasExistingBusiness === 'yes');
    } catch (error) {
      console.error('Error creating business profile:', error);
      toast({
        title: "Error",
        description: "Failed to create business profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="text-blue-900" size={32} />
            <CardTitle className="text-2xl">Set Up Your Business Profile</CardTitle>
          </div>
          <p className="text-gray-600">
            Help us customize your experience by telling us about your business
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter your business name"
                required
              />
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select onValueChange={setBusinessType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="LLC">Limited Liability Company (LLC)</SelectItem>
                  <SelectItem value="LTD">Private Limited Company (LTD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Existing Business Question */}
            <div className="space-y-4">
              <Label>Do you already have a registered business? *</Label>
              <RadioGroup value={hasExistingBusiness} onValueChange={setHasExistingBusiness}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes, I have an existing registered business</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No, I need to register my business</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Existing Business Details */}
            {hasExistingBusiness === 'yes' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Existing Business Details
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cacNumber">CAC Registration Number *</Label>
                  <Input
                    id="cacNumber"
                    value={cacNumber}
                    onChange={(e) => setCacNumber(e.target.value)}
                    placeholder="e.g., RC1234567"
                    required={hasExistingBusiness === 'yes'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationDate">Registration Date *</Label>
                  <Input
                    id="registrationDate"
                    type="date"
                    value={registrationDate}
                    onChange={(e) => setRegistrationDate(e.target.value)}
                    required={hasExistingBusiness === 'yes'}
                  />
                </div>
              </div>
            )}

            {/* New Business Info */}
            {hasExistingBusiness === 'no' && (
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="font-medium text-emerald-900 mb-2">
                  Great! We'll help you register your business
                </h3>
                <p className="text-sm text-emerald-700">
                  Your dashboard will include step-by-step guidance for business registration, 
                  including CAC registration, tax setup, and compliance requirements.
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-900 hover:bg-blue-800"
              disabled={loading || !hasExistingBusiness || !businessName || !businessType}
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSetupForm;
