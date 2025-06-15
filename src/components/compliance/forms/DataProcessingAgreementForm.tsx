
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DataProcessingAgreementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  processorName: string;
  processingPurpose: string;
  dataCategories: string;
  retentionPeriod: string;
  securityMeasures: string;
  subProcessors: string;
  agreementStatus: string;
}

const DataProcessingAgreementForm: React.FC<DataProcessingAgreementFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Data Processing Agreement submission:', data);
    toast({
      title: "DPA Updated",
      description: "Your data processing agreement has been updated successfully.",
    });
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Data Processing Agreement</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="processorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Processor Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of third-party processor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="processingPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of Processing *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe the purpose for data processing" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories of Personal Data *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="List categories of personal data being processed" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retentionPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Retention Period *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                      <SelectItem value="5-years">5 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="securityMeasures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Measures *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe technical and organizational security measures" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subProcessors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-processors</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="List any sub-processors (if applicable)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreementStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agreement Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="signed">Signed</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Agreement</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DataProcessingAgreementForm;
