
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CompanyIncomeTaxFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  taxYear: string;
  grossIncome: string;
  allowableDeductions: string;
  taxableIncome: string;
  accountantName: string;
  accountantLicense: string;
  supportingDocuments: string;
}

const CompanyIncomeTaxForm: React.FC<CompanyIncomeTaxFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Company Income Tax submission:', data);
    toast({
      title: "Company Income Tax Filed",
      description: "Your annual tax returns have been submitted successfully.",
    });
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Company Income Tax Returns</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="taxYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Year *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grossIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gross Income (₦) *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowableDeductions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowable Deductions (₦)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxableIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taxable Income (₦) *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accountant/Auditor Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name of chartered accountant" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountantLicense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accountant License Number *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ICAN/ANAN license number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supportingDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supporting Documents</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="List of attached documents (Audited accounts, receipts, etc.)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit Tax Returns</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyIncomeTaxForm;
