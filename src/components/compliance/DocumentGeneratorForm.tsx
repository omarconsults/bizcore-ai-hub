
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Zap } from 'lucide-react';

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

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    
    // Simulate document generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockDocument = `
${documentType}

Company: ${data.companyName}
Business Type: ${data.businessType}
Industry: ${data.industry}

[Generated document content would appear here based on the selected template and provided information...]

This document has been generated using AI and should be reviewed by a legal professional before use.
    `;
    
    setGeneratedDocument(mockDocument);
    setIsGenerating(false);
    
    toast({
      title: "Document Generated",
      description: `Your ${documentType} has been generated successfully.`,
    });
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="text-blue-900" size={20} />
            Generate {documentType}
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
                          <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
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
                      <Textarea placeholder="Enter business address" {...field} />
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
                    <FormLabel>Specific Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific clauses or requirements for this document..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isGenerating} className="bg-blue-900 hover:bg-blue-800">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Generated Document Preview:</h3>
              <pre className="text-sm bg-white p-3 rounded border max-h-64 overflow-y-auto whitespace-pre-wrap">
                {generatedDocument}
              </pre>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => {
                setGeneratedDocument(null);
                form.reset();
              }}>
                Generate Another
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleDownload}>
                  <Download size={16} className="mr-2" />
                  Download
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
