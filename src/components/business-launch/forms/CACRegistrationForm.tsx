
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Building, Users, FileText } from 'lucide-react';

interface CACRegistrationFormProps {
  selectedEntityType: string;
  onBack: () => void;
  onNext: () => void;
}

interface FormData {
  companyName: string;
  alternativeName: string;
  businessType: string;
  shareCapital: string;
  numberOfShares: string;
  parValue: string;
  businessAddress: string;
  city: string;
  state: string;
  postalCode: string;
  businessDescription: string;
  principalBusinessActivity: string;
  agreeToTerms: boolean;
}

const CACRegistrationForm: React.FC<CACRegistrationFormProps> = ({
  selectedEntityType,
  onBack,
  onNext
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      companyName: '',
      alternativeName: '',
      businessType: selectedEntityType,
      shareCapital: '',
      numberOfShares: '',
      parValue: '',
      businessAddress: '',
      city: '',
      state: '',
      postalCode: '',
      businessDescription: '',
      principalBusinessActivity: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('CAC Registration Form Data:', data);
    toast({
      title: "Registration Submitted",
      description: "Your CAC business registration has been submitted successfully.",
    });
    onNext();
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Building className="text-blue-900" size={20} />
        <h3 className="text-lg font-semibold">Company Information</h3>
      </div>
      
      <FormField
        control={form.control}
        name="companyName"
        rules={{ required: "Company name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Proposed Company Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your proposed company name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="alternativeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alternative Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter an alternative name (optional)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Business Name">Business Name</SelectItem>
                <SelectItem value="Limited Liability Company (LLC)">Limited Liability Company (LLC)</SelectItem>
                <SelectItem value="Private Limited Company (LTD)">Private Limited Company (LTD)</SelectItem>
                <SelectItem value="Partnership">Partnership</SelectItem>
                <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {(selectedEntityType === 'Limited Liability Company (LLC)' || selectedEntityType === 'Private Limited Company (LTD)') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="shareCapital"
            rules={{ required: "Share capital is required for LLC/LTD" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authorized Share Capital (₦) *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 100000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfShares"
            rules={{ required: "Number of shares is required for LLC/LTD" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Shares *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parValue"
            rules={{ required: "Par value is required for LLC/LTD" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Par Value per Share (₦) *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-blue-900" size={20} />
        <h3 className="text-lg font-semibold">Business Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="businessAddress"
          rules={{ required: "Business address is required" }}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Business Address *</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your business address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          rules={{ required: "State is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Kano">Kano</SelectItem>
                  <SelectItem value="Rivers">Rivers</SelectItem>
                  <SelectItem value="Oyo">Oyo</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter postal code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessDescription"
        rules={{ required: "Business description is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Description *</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe what your business does" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="principalBusinessActivity"
        rules={{ required: "Principal business activity is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Principal Business Activity *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your main business activity" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Trading">Trading</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-900" size={20} />
        <h3 className="text-lg font-semibold">Review & Submit</h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Registration Summary:</h4>
        <div className="space-y-2 text-sm">
          <p><strong>Company Name:</strong> {form.watch('companyName')}</p>
          <p><strong>Business Type:</strong> {form.watch('businessType')}</p>
          <p><strong>Location:</strong> {form.watch('city')}, {form.watch('state')}</p>
          <p><strong>Business Activity:</strong> {form.watch('principalBusinessActivity')}</p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="agreeToTerms"
        rules={{ required: "You must agree to the terms and conditions" }}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I agree to the terms and conditions and confirm that all information provided is accurate *
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building className="text-blue-900" size={28} />
            CAC Business Registration
          </h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-8 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-900' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Company Information' :
              currentStep === 2 ? 'Business Details' :
              'Review & Submit'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && renderStepOne()}
              {currentStep === 2 && renderStepTwo()}
              {currentStep === 3 && renderStepThree()}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto bg-emerald-600 hover:bg-emerald-700">
                    Submit Registration
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CACRegistrationForm;
