import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Building,
  MapPin,
  Phone,
  Mail,
  ListChecks,
  Clock,
  FileText,
  Shield,
  Plus,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [applications, setApplications] = useState<{[key: string]: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected'}>({});
  
  const businessName = user?.user_metadata?.business_name || 'Your Business';
  const isNewUser = !user?.user_metadata?.onboarding_completed;

  const cacForm = useForm({
    defaultValues: {
      // Business Information
      businessName: '',
      businessType: '',
      businessClassification: '',
      businessDescription: '',
      businessObjectives: '',
      businessAddress: '',
      businessState: '',
      businessLGA: '',
      businessPostalCode: '',
      businessEmail: '',
      businessPhone: '',
      businessWebsite: '',
      
      // Directors/Shareholders Information
      directorName1: '',
      directorNIN1: '',
      directorBVN1: '',
      directorEmail1: '',
      directorPhone1: '',
      directorAddress1: '',
      directorNationality1: '',
      directorOccupation1: '',
      directorShares1: '',
      
      directorName2: '',
      directorNIN2: '',
      directorBVN2: '',
      directorEmail2: '',
      directorPhone2: '',
      directorAddress2: '',
      directorNationality2: '',
      directorOccupation2: '',
      directorShares2: '',
      
      // Company Secretary
      secretaryName: '',
      secretaryAddress: '',
      secretaryPhone: '',
      secretaryEmail: '',
      
      // Share Capital
      authorizedShareCapital: '',
      numberOfShares: '',
      nominalValue: '',
      
      // Registered Office
      registeredOfficeAddress: '',
      registeredOfficeState: '',
      registeredOfficeLGA: '',
      registeredOfficePostalCode: '',
      
      // Additional Information
      commencementDate: '',
      financialYearEnd: '',
      specialResolutions: '',
      
      // Declarations
      agreeToTerms: false,
      declarationTruth: false,
      declarationCompliance: false
    }
  });

  const form = useForm({
    defaultValues: {
      businessName: '',
      businessType: '',
      address: '',
      phone: '',
      email: '',
      ownerName: '',
      ownerNin: '',
      agreeToTerms: false
    }
  });

  // Application forms for different services
  const availableServices = [
    {
      id: 'cac-registration',
      title: 'CAC Business Registration',
      description: 'Register your business with the Corporate Affairs Commission',
      requirements: ['Business name', 'Business address', 'Owner details', 'NIN'],
      cost: '₦10,000',
      processingTime: '5-10 business days',
      status: applications['cac-registration'] || null
    },
    {
      id: 'tin-registration',
      title: 'Tax Identification Number (TIN)',
      description: 'Get your TIN from Federal Inland Revenue Service',
      requirements: ['CAC certificate', 'Business address', 'Bank details'],
      cost: 'Free',
      processingTime: '3-5 business days',
      status: applications['tin-registration'] || null
    },
    {
      id: 'business-permits',
      title: 'Business Permits & Licenses',
      description: 'Industry-specific permits and operational licenses',
      requirements: ['CAC certificate', 'TIN', 'Industry documents'],
      cost: '₦15,000 - ₦50,000',
      processingTime: '2-4 weeks',
      status: applications['business-permits'] || null
    },
    {
      id: 'bank-account',
      title: 'Corporate Bank Account',
      description: 'Open a business bank account with partner banks',
      requirements: ['CAC certificate', 'TIN', 'Board resolution'],
      cost: '₦5,000 - ₦20,000',
      processingTime: '1-3 business days',
      status: applications['bank-account'] || null
    }
  ];

  const handleApplicationSubmit = (serviceId: string, data: any) => {
    console.log('Submitting application for:', serviceId, data);
    setApplications(prev => ({
      ...prev,
      [serviceId]: 'submitted'
    }));
  };

  const CACRegistrationForm = () => {
    return (
      <Form {...cacForm}>
        <form onSubmit={cacForm.handleSubmit((data) => handleApplicationSubmit('cac-registration', data))} className="space-y-6">
          {/* Business Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={cacForm.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposed Business Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter proposed business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={cacForm.control}
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
                        <SelectItem value="private-limited">Private Limited Company (Ltd)</SelectItem>
                        <SelectItem value="public-limited">Public Limited Company (Plc)</SelectItem>
                        <SelectItem value="limited-by-guarantee">Company Limited by Guarantee</SelectItem>
                        <SelectItem value="unlimited">Unlimited Liability Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={cacForm.control}
              name="businessClassification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Classification *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business classification" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Small Company</SelectItem>
                      <SelectItem value="medium">Medium Company</SelectItem>
                      <SelectItem value="large">Large Company</SelectItem>
                      <SelectItem value="non-profit">Non-Profit Organization</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={cacForm.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nature of Business *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the nature and activities of your business"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={cacForm.control}
              name="businessObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Objects of the Company *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="State the main objectives and purposes of the company"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Business Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Address</h3>
            
            <FormField
              control={cacForm.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter complete business address"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={cacForm.control}
                name="businessState"
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
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">FCT Abuja</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem>
                        <SelectItem value="ogun">Ogun</SelectItem>
                        <SelectItem value="kaduna">Kaduna</SelectItem>
                        {/* Add more states */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="businessLGA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Government Area *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter LGA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="businessPostalCode"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={cacForm.control}
                name="businessEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="business@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="businessPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="080..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="businessWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="www.yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Directors Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Directors/Shareholders Information</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Director/Shareholder 1 *</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={cacForm.control}
                  name="directorName1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name as on ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorNIN1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIN *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678901" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorBVN1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BVN *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678901" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorEmail1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="director@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorPhone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="080..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorNationality1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nigerian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorOccupation1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Entrepreneur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorShares1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Shares *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50000" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={cacForm.control}
                name="directorAddress1"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Residential Address *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter complete residential address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Director/Shareholder 2 (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={cacForm.control}
                  name="directorName2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name as on ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cacForm.control}
                  name="directorNIN2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIN</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678901" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ... keep existing code (similar fields for director 2) */}
              </div>
            </div>
          </div>

          {/* Share Capital Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Share Capital Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={cacForm.control}
                name="authorizedShareCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authorized Share Capital *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., ₦100,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="numberOfShares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Shares *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 100000" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="nominalValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominal Value per Share *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., ₦1.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Registered Office Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Registered Office Address</h3>
            
            <FormField
              control={cacForm.control}
              name="registeredOfficeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registered Office Address *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter complete registered office address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={cacForm.control}
                name="registeredOfficeState"
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
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">FCT Abuja</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem>
                        {/* Add more states */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="registeredOfficeLGA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Government Area *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter LGA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="registeredOfficePostalCode"
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
            </div>
          </div>

          {/* Company Secretary Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Secretary (Optional)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={cacForm.control}
                name="secretaryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secretary Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="secretaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secretary Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="080..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="secretaryEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secretary Email</FormLabel>
                    <FormControl>
                      <Input placeholder="secretary@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={cacForm.control}
              name="secretaryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secretary Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter secretary address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={cacForm.control}
                name="commencementDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commencement Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="financialYearEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Year End *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="december">December</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={cacForm.control}
              name="specialResolutions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Resolutions (if any)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any special resolutions or restrictions"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Declarations Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Declarations</h3>
            
            <div className="space-y-3">
              <FormField
                control={cacForm.control}
                name="agreeToTerms"
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
                        I agree to the terms and conditions and authorize BizCore to process my application with CAC
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="declarationTruth"
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
                        I declare that the information provided in this application is true and accurate to the best of my knowledge
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={cacForm.control}
                name="declarationCompliance"
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
                        I understand and agree to comply with all CAC regulations and requirements for company registration
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="text-sm text-gray-600">
              <p>Processing time: 5-10 business days</p>
              <p className="font-semibold">Cost: ₦10,000</p>
              <p className="text-xs text-gray-500 mt-1">All information will be verified with relevant authorities</p>
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-8">
              Submit CAC Application
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  const ServiceApplicationForm = ({ service }: { service: any }) => {
    if (service.id === 'cac-registration') {
      return <CACRegistrationForm />;
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => handleApplicationSubmit(service.id, data))} className="space-y-4">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
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
                <FormLabel>Business Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Limited Liability Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter complete business address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="080..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="business@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner/Director Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name as on ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerNin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIN (National Identification Number)</FormLabel>
                <FormControl>
                  <Input placeholder="12345678901" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreeToTerms"
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
                    I agree to the terms and conditions and authorize BizCore to process my application
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-600">
              <p>Processing time: {service.processingTime}</p>
              <p className="font-semibold">Cost: {service.cost}</p>
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  // Onboarding questions component
  const OnboardingFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
      businessType: '',
      industry: '',
      location: '',
      phone: '',
      goals: []
    });

    const steps = [
      {
        title: "Welcome to BizCore!",
        subtitle: `Let's set up ${businessName} for success`,
        content: (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Building className="w-10 h-10 text-emerald-600" />
            </div>
            <p className="text-gray-600 text-lg">
              We'll ask you a few quick questions to personalize your experience and help you get started.
            </p>
            <p className="text-sm text-gray-500">This will take about 2 minutes</p>
          </div>
        )
      },
      {
        title: "What type of business are you running?",
        subtitle: "This helps us customize your experience",
        content: (
          <div className="space-y-4">
            {[
              'Limited Liability Company (LLC)',
              'Private Limited Company (Ltd)',
              'Partnership',
              'Sole Proprietorship',
              'NGO/Non-Profit',
              'Other'
            ].map((type) => (
              <button
                key={type}
                onClick={() => setFormData({...formData, businessType: type})}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  formData.businessType === type 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )
      },
      {
        title: "What industry are you in?",
        subtitle: "We'll provide relevant compliance and growth guidance",
        content: (
          <div className="space-y-4">
            {[
              'Technology & Software',
              'E-commerce & Retail',
              'Fashion & Lifestyle',
              'Food & Beverage',
              'Healthcare',
              'Education',
              'Professional Services',
              'Manufacturing',
              'Other'
            ].map((industry) => (
              <button
                key={industry}
                onClick={() => setFormData({...formData, industry})}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  formData.industry === industry 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        )
      },
      {
        title: "What are your main goals?",
        subtitle: "Select all that apply - we'll prioritize these areas",
        content: (
          <div className="space-y-4">
            {[
              'Register my business with CAC',
              'Get proper licenses and permits',
              'Set up accounting and bookkeeping',
              'Hire and manage employees',
              'Create marketing campaigns',
              'Ensure compliance with regulations',
              'Scale and grow revenue',
              'Manage cash flow'
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  const goals = formData.goals.includes(goal)
                    ? formData.goals.filter(g => g !== goal)
                    : [...formData.goals, goal];
                  setFormData({...formData, goals});
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  formData.goals.includes(goal)
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  {goal}
                  {formData.goals.includes(goal) && (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )
      }
    ];

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding
        console.log('Onboarding completed with data:', formData);
        setShowOnboarding(false);
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const canProceed = () => {
      switch (currentStep) {
        case 0: return true;
        case 1: return formData.businessType !== '';
        case 2: return formData.industry !== '';
        case 3: return formData.goals.length > 0;
        default: return true;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index <= currentStep ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <CardTitle className="text-2xl text-gray-900">
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-gray-600 mt-2">{steps[currentStep].subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                {steps[currentStep].content}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-6"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-6 bg-emerald-600 hover:bg-emerald-700"
                >
                  {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Show onboarding for new users
  if (showOnboarding && isNewUser) {
    return <OnboardingFlow />;
  }

  const toggleChecklistItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Business Setup Checklist
  const setupChecklist = [
    {
      id: 'cac-registration',
      title: 'CAC Business Registration',
      description: 'Complete your business registration with CAC',
      status: 'completed',
      category: 'Legal',
      priority: 'high'
    },
    {
      id: 'tin-registration',
      title: 'Tax Identification Number',
      description: 'Register for TIN with FIRS',
      status: 'completed',
      category: 'Tax',
      priority: 'high'
    },
    {
      id: 'bank-account',
      title: 'Corporate Bank Account',
      description: 'Open a business bank account',
      status: 'in-progress',
      category: 'Banking',
      priority: 'high'
    },
    {
      id: 'business-permits',
      title: 'Business Permits & Licenses',
      description: 'Obtain industry-specific permits',
      status: 'pending',
      category: 'Legal',
      priority: 'medium'
    }
  ];

  // Ongoing Compliance Checklist
  const complianceChecklist = [
    {
      id: 'monthly-tax',
      title: 'Monthly Tax Returns',
      description: 'Submit VAT and WHT returns',
      dueDate: 'Next: Jan 21, 2024',
      frequency: 'Monthly',
      category: 'Tax',
      priority: 'high'
    },
    {
      id: 'annual-returns',
      title: 'Annual Returns Filing',
      description: 'File annual returns with CAC',
      dueDate: 'Due: Mar 31, 2024',
      frequency: 'Annually',
      category: 'Legal',
      priority: 'medium'
    },
    {
      id: 'ndpr-renewal',
      title: 'NDPR Compliance Review',
      description: 'Review and update data protection policies',
      dueDate: 'Due: Feb 15, 2024',
      frequency: 'Annually',
      category: 'Privacy',
      priority: 'medium'
    },
    {
      id: 'financial-audit',
      title: 'Financial Audit Preparation',
      description: 'Prepare documents for annual audit',
      dueDate: 'Due: Apr 30, 2024',
      frequency: 'Annually',
      category: 'Finance',
      priority: 'low'
    }
  ];

  // Growth & Operations Checklist
  const growthChecklist = [
    {
      id: 'marketing-plan',
      title: 'Q1 Marketing Plan',
      description: 'Develop marketing strategy for next quarter',
      isChecked: checkedItems.includes('marketing-plan'),
      category: 'Marketing'
    },
    {
      id: 'inventory-review',
      title: 'Inventory Management Review',
      description: 'Optimize inventory levels and processes',
      isChecked: checkedItems.includes('inventory-review'),
      category: 'Operations'
    },
    {
      id: 'team-hiring',
      title: 'Hire Customer Service Rep',
      description: 'Recruit and onboard new team member',
      isChecked: checkedItems.includes('team-hiring'),
      category: 'HR'
    },
    {
      id: 'financial-planning',
      title: 'Q2 Budget Planning',
      description: 'Create budget and financial projections',
      isChecked: checkedItems.includes('financial-planning'),
      category: 'Finance'
    }
  ];

  // Quick Stats
  const quickStats = [
    { title: 'Monthly Revenue', value: '₦2.4M', change: '+12%', icon: DollarSign, positive: true },
    { title: 'Active Customers', value: '156', change: '+8%', icon: Users, positive: true },
    { title: 'Compliance Score', value: '92%', change: '+5%', icon: CheckCircle, positive: true },
    { title: 'Growth Target', value: '76%', change: 'On track', icon: Target, positive: true },
  ];

  // Recent Tasks
  const recentTasks = [
    { task: 'Submit monthly tax returns', due: 'Tomorrow', priority: 'high', status: 'pending' },
    { task: 'Renew NDPR compliance certificate', due: '3 days', priority: 'medium', status: 'pending' },
    { task: 'Update employee contracts', due: '1 week', priority: 'low', status: 'pending' },
    { task: 'Review quarterly financials', due: '2 weeks', priority: 'medium', status: 'pending' },
  ];

  // AI Insights
  const aiSuggestions = [
    "Your cash flow looks strong this month. Consider investing in inventory for the peak season.",
    "NDPR renewal is due soon. I can help prepare the required documents.",
    "You're hiring fast! Let's set up proper onboarding workflows."
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with {businessName} today</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">March 15, 2024</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Monthly Revenue', value: '₦2.4M', change: '+12%', icon: DollarSign, positive: true },
          { title: 'Active Customers', value: '156', change: '+8%', icon: Users, positive: true },
          { title: 'Compliance Score', value: '92%', change: '+5%', icon: CheckCircle, positive: true },
          { title: 'Growth Target', value: '76%', change: 'On track', icon: Target, positive: true },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.positive ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  <stat.icon className={stat.positive ? 'text-emerald-600' : 'text-red-600'} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available Services & Applications */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-blue-900" size={20} />
                Business Registration & Services
              </CardTitle>
              <p className="text-gray-600">Apply for business registration and other essential services</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableServices.map((service, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        {service.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            service.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                            service.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                            service.status === 'submitted' ? 'bg-yellow-100 text-yellow-600' :
                            service.status === 'rejected' ? 'bg-red-100 text-red-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {service.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                          <ul className="text-sm text-gray-600">
                            {service.requirements.map((req, i) => (
                              <li key={i}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Cost:</span> {service.cost}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Processing:</span> {service.processingTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {!service.status ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-blue-900 hover:bg-blue-800">
                            <Plus className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Apply for {service.title}</DialogTitle>
                          </DialogHeader>
                          <ServiceApplicationForm service={service} />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" disabled>
                        Application {service.status}
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Business Setup Progress */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="text-blue-900" size={20} />
                Business Setup Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {setupChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'completed' ? 'bg-emerald-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.category === 'Legal' ? 'bg-purple-100 text-purple-600' :
                          item.category === 'Tax' ? 'bg-red-100 text-red-600' :
                          item.category === 'Banking' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-600' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {item.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  {item.status === 'completed' ? (
                    <CheckCircle className="text-emerald-600" size={20} />
                  ) : (
                    <Button size="sm" variant="outline">
                      {item.status === 'in-progress' ? 'Continue' : 'Start'}
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Checklist */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-emerald-600" size={20} />
                Compliance & Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="text-gray-400" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{item.dueDate}</span>
                        <span className="text-xs text-gray-500">• {item.frequency}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.category === 'Tax' ? 'bg-red-100 text-red-600' :
                          item.category === 'Legal' ? 'bg-purple-100 text-purple-600' :
                          item.category === 'Privacy' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Growth & Operations Checklist */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="text-blue-600" size={20} />
                Growth & Operations Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {growthChecklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${item.isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.title}
                    </p>
                    <p className={`text-sm ${item.isChecked ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.category === 'Marketing' ? 'bg-pink-100 text-pink-600' :
                    item.category === 'Operations' ? 'bg-orange-100 text-orange-600' :
                    item.category === 'HR' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.category}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights & Compliance Status */}
        <div>
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-emerald-600" size={20} />
                AI Business Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Your cash flow looks strong this month. Consider investing in inventory for the peak season.",
                "NDPR renewal is due soon. I can help prepare the required documents.",
                "You're hiring fast! Let's set up proper onboarding workflows."
              ].map((suggestion, index) => (
                <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-gray-700">{suggestion}</p>
                  <Button size="sm" variant="ghost" className="mt-2 text-emerald-600 hover:text-emerald-700">
                    Learn more
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-emerald-600" size={20} />
                Compliance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Overall Score</span>
                    <span className="text-sm font-medium text-emerald-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">CAC Registration</span>
                    <CheckCircle className="text-emerald-600" size={16} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Tax Compliance</span>
                    <CheckCircle className="text-emerald-600" size={16} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">NDPR Status</span>
                    <AlertCircle className="text-yellow-500" size={16} />
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                  Fix Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
