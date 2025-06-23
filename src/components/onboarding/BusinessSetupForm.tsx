
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    if (!businessName.trim()) {
      setError('Business name is required');
      return false;
    }
    if (!businessType) {
      setError('Business type is required');
      return false;
    }
    if (!hasExistingBusiness) {
      setError('Please select whether you have an existing business');
      return false;
    }
    if (hasExistingBusiness === 'yes') {
      if (!cacNumber.trim()) {
        setError('CAC registration number is required for existing businesses');
        return false;
      }
      if (!registrationDate) {
        setError('Registration date is required for existing businesses');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!user) {
      setError('User not authenticated. Please try logging in again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      console.log('Creating business profile for user:', user.id);
      
      const businessProfile = {
        user_id: user.id,
        business_name: businessName.trim(),
        business_type: businessType,
        has_existing_business: hasExistingBusiness === 'yes',
        cac_registration_number: hasExistingBusiness === 'yes' ? cacNumber.trim() : null,
        registration_date: hasExistingBusiness === 'yes' ? registrationDate : null,
        registration_status: hasExistingBusiness === 'yes' ? 'registered' : 'pending'
      };

      console.log('Inserting business profile:', businessProfile);

      const { data, error } = await supabase
        .from('business_profiles')
        .insert([businessProfile])
        .select()
        .single();

      if (error) {
        console.error('Error creating business profile:', error);
        throw error;
      }

      console.log('Business profile created successfully:', data);

      toast({
        title: "Business profile created!",
        description: hasExistingBusiness === 'yes' 
          ? "Your existing business has been registered. Your dashboard is ready!"
          : "Your business setup guide is ready. We'll help you register your business step by step.",
      });

      // Call completion handler
      onComplete(hasExistingBusiness === 'yes');
      
    } catch (error: any) {
      console.error('Error in business setup:', error);
      setError(error.message || 'Failed to create business profile. Please try again.');
      toast({
        title: "Setup Error",
        description: error.message || "Failed to create business profile. Please try again.",
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
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="text-red-600 mt-0.5" size={16} />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
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
                  <SelectItem value="Business Name">Business Name</SelectItem>
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
              {loading ? 'Setting up your business profile...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessSetupForm;
