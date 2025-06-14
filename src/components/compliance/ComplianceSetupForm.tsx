
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Bell, Calendar, Mail } from 'lucide-react';

interface ComplianceSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  phone: string;
  reminderDays: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  selectedCompliances: string[];
}

const ComplianceSetupForm: React.FC<ComplianceSetupFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      phone: '',
      reminderDays: '30',
      emailNotifications: true,
      smsNotifications: false,
      selectedCompliances: [],
    },
  });

  const complianceTypes = [
    'CAC Annual Returns',
    'Company Income Tax',
    'VAT Returns',
    'PAYE Returns',
    'NDPR Compliance',
    'Fire Safety Certificate',
    'Business Premises Registration'
  ];

  const onSubmit = (data: FormData) => {
    console.log('Compliance Setup Data:', data);
    toast({
      title: "Compliance Alerts Configured",
      description: "You'll receive reminders for your selected compliance requirements.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="text-blue-900" size={20} />
            Set Up Compliance Alerts
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reminderDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reminder Timeline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How many days before deadline?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="7">7 days before</SelectItem>
                      <SelectItem value="14">14 days before</SelectItem>
                      <SelectItem value="30">30 days before</SelectItem>
                      <SelectItem value="60">60 days before</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="font-medium">Notification Preferences</h3>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Email Notifications</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>SMS Notifications</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Select Compliance Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {complianceTypes.map((compliance) => (
                  <FormField
                    key={compliance}
                    control={form.control}
                    name="selectedCompliances"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(compliance)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, compliance])
                                : field.onChange(field.value?.filter((value) => value !== compliance))
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">{compliance}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                Set Up Alerts
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceSetupForm;
