import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { FileText, Download, Zap, Coins } from 'lucide-react';

interface DocumentGeneratorFormProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: string;
}

interface FormData {
  companyName: string;
  businessType: string;
  industry: string;
  address: string;
  contactEmail: string;
  specificRequirements: string;
}

const DocumentGeneratorForm: React.FC<DocumentGeneratorFormProps> = ({ 
  isOpen, 
  onClose, 
  documentType 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { tokenBalance, consumeTokens } = useTokens();
  
  const form = useForm<FormData>({
    defaultValues: {
      companyName: '',
      businessType: '',
      industry: '',
      address: '',
      contactEmail: '',
      specificRequirements: '',
    },
  });

  const generateDocumentWithAI = async (formData: FormData) => {
    const documentPrompts = {
      'Privacy Policy Generator': `Generate a comprehensive, NDPR-compliant privacy policy for ${formData.companyName}, a ${formData.businessType} company operating in the ${formData.industry} industry in Nigeria. 

Company Details:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Address: ${formData.address}
- Contact Email: ${formData.contactEmail}
- Specific Requirements: ${formData.specificRequirements}

Please include:
1. Comprehensive data collection practices
2. Data usage and processing purposes
3. User rights under NDPR
4. Data sharing and third-party policies
5. Security measures and data protection
6. Cookie policies and tracking
7. Contact information for data protection queries
8. Procedures for data subject requests
9. Data retention policies
10. Breach notification procedures

Make this a complete, professional privacy policy that meets Nigerian Data Protection Regulation (NDPR) requirements.`,

      'Employment Contract Template': `Generate a comprehensive employment contract template for ${formData.companyName}, compliant with Nigerian Labor Act and employment laws.

Company Details:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Address: ${formData.address}
- Contact Email: ${formData.contactEmail}
- Specific Requirements: ${formData.specificRequirements}

Please include:
1. Complete employee and employer information sections
2. Job description and responsibilities
3. Compensation and benefits structure
4. Working hours and overtime policies
5. Leave entitlements (annual, sick, maternity/paternity)
6. Termination procedures and notice periods
7. Confidentiality and non-disclosure clauses
8. Intellectual property rights
9. Disciplinary procedures
10. Dispute resolution mechanisms
11. Compliance with Nigerian labor laws

Make this a legally sound, comprehensive employment contract.`,

      'Non-Disclosure Agreement': `Generate a comprehensive Non-Disclosure Agreement (NDA) template for ${formData.companyName}.

Company Details:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Address: ${formData.address}
- Contact Email: ${formData.contactEmail}
- Specific Requirements: ${formData.specificRequirements}

Please include:
1. Clear definition of confidential information
2. Obligations of receiving party
3. Permitted uses and restrictions
4. Duration of confidentiality obligations
5. Return or destruction of information
6. Remedies for breach
7. Governing law (Nigerian law)
8. Dispute resolution procedures
9. Exceptions to confidentiality
10. Signature blocks and witness requirements

Create a legally binding, comprehensive NDA suitable for business use in Nigeria.`,

      'Terms of Service Template': `Generate comprehensive Terms of Service for ${formData.companyName}'s website/application.

Company Details:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Address: ${formData.address}
- Contact Email: ${formData.contactEmail}
- Specific Requirements: ${formData.specificRequirements}

Please include:
1. Service description and scope
2. User responsibilities and prohibited uses
3. Account registration and security
4. Payment terms and refund policies
5. Intellectual property rights
6. Privacy policy integration
7. Limitation of liability
8. Indemnification clauses
9. Termination procedures
10. Governing law and jurisdiction (Nigeria)
11. Contact information and dispute resolution

Create comprehensive, legally compliant terms of service.`,

      'Vendor Agreement Template': `Generate a comprehensive vendor/supplier agreement template for ${formData.companyName}.

Company Details:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Address: ${formData.address}
- Contact Email: ${formData.contactEmail}
- Specific Requirements: ${formData.specificRequirements}

Please include:
1. Scope of services/products
2. Payment terms and conditions
3. Quality standards and specifications
4. Delivery schedules and timelines
5. Performance metrics and KPIs
6. Intellectual property provisions
7. Confidentiality requirements
8. Insurance and liability coverage
9. Termination and default procedures
10. Compliance with Nigerian business laws
11. Dispute resolution mechanisms

Create a comprehensive vendor agreement suitable for Nigerian business environment.`,

      'Data Processing Agreement': `Generate an NDPR-compliant Data Processing Agreement (DPA) for ${formData.companyName}.

Company Details:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Address: ${formData.address}
- Contact Email: ${formData.contactEmail}
- Specific Requirements: ${formData.specificRequirements}

Please include:
1. Data controller and processor definitions
2. Categories of personal data processed
3. Purposes and legal basis for processing
4. Data subject categories
5. Processing locations and restrictions
6. Security measures and safeguards
7. Data breach notification procedures
8. Data subject rights procedures
9. Sub-processor arrangements
10. International data transfers
11. Audit rights and compliance monitoring
12. Termination and data return procedures

Create a comprehensive DPA that meets NDPR requirements and international standards.`
    };

    const prompt = documentPrompts[documentType as keyof typeof documentPrompts] || 
      `Generate a comprehensive ${documentType} document for ${formData.companyName} based on the provided information.`;

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          conversationHistory: [],
          systemPrompt: `You are an expert legal document generator specializing in Nigerian business law and compliance. Generate complete, professional, legally-compliant documents that are immediately usable. Include all necessary sections, clauses, and legal provisions. Format the document professionally with clear headings, numbered sections, and proper legal language.`
        }
      });

      if (error) {
        console.error('AI service error:', error);
        throw new Error('Failed to generate document');
      }

      return data.response;
    } catch (error) {
      console.error('Document generation error:', error);
      throw error;
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate documents.",
        variant: "destructive"
      });
      return;
    }

    const canConsume = await consumeTokens(10, 'document_generation', `Generated ${documentType} for ${data.companyName}`);
    
    if (!canConsume) {
      return;
    }

    setIsGenerating(true);
    
    try {
      const aiGeneratedDocument = await generateDocumentWithAI(data);
      setGeneratedDocument(aiGeneratedDocument);
      
      toast({
        title: "Document Generated Successfully",
        description: `Your ${documentType} has been generated using AI.`,
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedDocument) {
      const blob = new Blob([generatedDocument], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${documentType.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Document Downloaded",
        description: "Your document has been downloaded successfully.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="text-blue-900" size={20} />
            AI-Powered {documentType} Generator
            {user && (
              <div className="flex items-center gap-1 text-xs bg-blue-100 px-2 py-1 rounded ml-auto">
                <Coins size={12} />
                {tokenBalance.availableTokens} tokens (10 required)
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {!generatedDocument ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  rules={{ required: "Company name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessType"
                  rules={{ required: "Business type is required" }}
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
                          <SelectItem value="Limited Liability Company">Limited Liability Company</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Business Name">Business Name</SelectItem>
                          <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  rules={{ required: "Industry is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Services">Services</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address *</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter your complete business address..."
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specificRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Requirements & Customizations</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter any specific clauses, requirements, or customizations for this document..."
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!user && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">Please log in to generate AI-powered documents</p>
                </div>
              )}

              {user && tokenBalance.availableTokens < 10 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">You need 10 tokens to generate documents. Please purchase more tokens.</p>
                </div>
              )}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isGenerating || !user || tokenBalance.availableTokens < 10} 
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="mr-2" />
                      Generate with AI (10 tokens)
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <FileText size={16} />
                AI-Generated Document Preview:
              </h3>
              <div className="text-sm bg-white p-4 rounded border max-h-96 overflow-y-auto whitespace-pre-wrap font-mono">
                {generatedDocument}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => {
                setGeneratedDocument(null);
                form.reset();
              }}>
                Generate Another Document
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleDownload}>
                  <Download size={16} className="mr-2" />
                  Download Document
                </Button>
                <Button onClick={onClose} className="bg-blue-900 hover:bg-blue-800">
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentGeneratorForm;
