
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface NDPRComplianceFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  dpoName: string;
  dpoEmail: string;
  dataAuditDate: string;
  privacyPolicyUpdated: boolean;
  consentMechanisms: boolean;
  dataBreachProcedures: boolean;
  auditFindings: string;
}

const NDPRComplianceForm: React.FC<NDPRComplianceFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('NDPR Compliance submission:', data);
    toast({
      title: "NDPR Compliance Updated",
      description: "Your data protection compliance has been updated successfully.",
    });
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>NDPR Compliance Update</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dpoName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Protection Officer Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name of DPO" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dpoEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DPO Email Address *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="dpo@company.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataAuditDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Data Audit Date *</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Compliance Checklist *</FormLabel>
              
              <FormField
                control={form.control}
                name="privacyPolicyUpdated"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Privacy policy updated and published</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consentMechanisms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Data consent mechanisms implemented</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataBreachProcedures"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Data breach response procedures established</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="auditFindings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audit Findings & Actions</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Summary of audit findings and corrective actions taken" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Compliance</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NDPRComplianceForm;
