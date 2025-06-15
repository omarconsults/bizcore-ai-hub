
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface WithholdingTaxFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  returnPeriod: string;
  whtType: string;
  totalWHTDeducted: string;
  totalPayments: string;
  beneficiaryDetails: string;
}

const WithholdingTaxForm: React.FC<WithholdingTaxFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Withholding Tax submission:', data);
    toast({
      title: "Withholding Tax Filed",
      description: "Your WHT returns have been submitted successfully.",
    });
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Withholding Tax Returns</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="returnPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Period *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="q1-2024">Q1 2024</SelectItem>
                      <SelectItem value="q2-2024">Q2 2024</SelectItem>
                      <SelectItem value="q3-2024">Q3 2024</SelectItem>
                      <SelectItem value="q4-2024">Q4 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whtType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WHT Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select WHT type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="services">Services (5%)</SelectItem>
                      <SelectItem value="goods">Goods (2.5%)</SelectItem>
                      <SelectItem value="rent">Rent (10%)</SelectItem>
                      <SelectItem value="interest">Interest (10%)</SelectItem>
                      <SelectItem value="dividend">Dividend (10%)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalWHTDeducted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total WHT Deducted (₦) *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPayments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Gross Payments (₦) *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="beneficiaryDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiary Details</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Details of payment beneficiaries and amounts" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit WHT Returns</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WithholdingTaxForm;
