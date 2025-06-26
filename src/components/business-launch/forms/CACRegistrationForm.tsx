import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Building, FileText, AlertCircle } from 'lucide-react';
import { validateCACForm } from '@/utils/formValidation';

interface CACRegistrationFormProps {
  selectedEntityType: string;
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
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

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
  'Taraba', 'Yobe', 'Zamfara'
];

const businessActivities = [
  'Accounting & Professional Services',
  'Advertising & Marketing',
  'Agriculture & Farming',
  'Art & Entertainment',
  'Automotive & Transportation',
  'Banking & Financial Services',
  'Beauty & Personal Care',
  'Building & Construction',
  'Cleaning Services',
  'Computer & IT Services',
  'Consulting Services',
  'E-commerce & Online Sales',
  'Education & Training',
  'Engineering Services',
  'Event Planning & Management',
  'Fashion & Textiles',
  'Food & Beverage',
  'General Trading',
  'Healthcare & Medical Services',
  'Hospitality & Tourism',
  'Import & Export',
  'Insurance Services',
  'Legal Services',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Media & Broadcasting',
  'Mining & Oil Services',
  'Non-Profit & NGO',
  'Photography & Videography',
  'Printing & Publishing',
  'Real Estate & Property',
  'Research & Development',
  'Retail & Wholesale',
  'Security Services',
  'Telecommunications',
  'Waste Management',
  'Other'
];

const CACRegistrationForm: React.FC<CACRegistrationFormProps> = ({
  selectedEntityType,
  onBack,
  onNext,
  initialData
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: initialData || {
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

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = (data: FormData) => {
    const validation = validateCACForm(data, 2); // Final validation
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    console.log('CAC Registration Form Data:', data);
    toast({
      title: "Form Completed",
      description: "Proceeding to director details.",
    });
    onNext(data);
  };

  const nextStep = () => {
    const currentData = form.getValues();
    const validation = validateCACForm(currentData, currentStep);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Required Fields Missing",
        description: "Please complete all required fields in this step.",
        variant: "destructive",
      });
      return;
    }

    setValidationErrors([]);
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
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
                <SelectItem value="Private Limited Company (LTD)">Private Limited Company (LTD)</SelectItem>
                <SelectItem value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</SelectItem>
                <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {(selectedEntityType === 'Private Limited Company (LTD)') && (
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
                <SelectContent className="max-h-60 overflow-y-auto">
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
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
              <SelectContent className="max-h-60 overflow-y-auto">
                {businessActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
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
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 2 && (
                <div className={`w-8 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-900' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {validationErrors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-red-600 mt-0.5" size={16} />
              <div>
                <p className="font-medium text-red-800">Please correct the following errors:</p>
                <ul className="text-sm text-red-700 mt-1 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>
            Step {currentStep} of 2: {
              currentStep === 1 ? 'Company Information' : 'Business Details'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && renderStepOne()}
              {currentStep === 2 && renderStepTwo()}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {currentStep < 2 ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto bg-blue-900 hover:bg-blue-800">
                    Continue to Directors
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
