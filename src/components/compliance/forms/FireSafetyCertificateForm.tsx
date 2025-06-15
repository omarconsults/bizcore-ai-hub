
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FireSafetyCertificateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  businessAddress: string;
  buildingType: string;
  occupancyLoad: string;
  fireExtinguishers: string;
  smokeDetectors: string;
  emergencyExits: string;
  inspectionDate: string;
  additionalSafety: string;
}

const FireSafetyCertificateForm: React.FC<FireSafetyCertificateFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Fire Safety Certificate submission:', data);
    toast({
      title: "Fire Safety Application Submitted",
      description: "Your fire safety certificate renewal application has been submitted.",
    });
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fire Safety Certificate Renewal</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Premises Address *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Complete address of business premises" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buildingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select building type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="office">Office Building</SelectItem>
                      <SelectItem value="retail">Retail Space</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="factory">Factory/Manufacturing</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupancyLoad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Occupancy Load *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Number of people" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fireExtinguishers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Fire Extinguishers *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Total fire extinguishers" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smokeDetectors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Smoke Detectors *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Total smoke detectors" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyExits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Emergency Exits *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Total emergency exits" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inspectionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Inspection Date *</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalSafety"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Safety Equipment</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Fire alarms, sprinkler systems, emergency lighting, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FireSafetyCertificateForm;
