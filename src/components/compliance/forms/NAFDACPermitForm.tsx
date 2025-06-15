
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface NAFDACPermitFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  productCategory: string;
  productName: string;
  productDescription: string;
  manufacturerName: string;
  manufacturerAddress: string;
  ingredients: string;
  packagingDetails: string;
  shelfLife: string;
  qualityAssurance: boolean;
  gmpCompliance: boolean;
}

const NAFDACPermitForm: React.FC<NAFDACPermitFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('NAFDAC Permit submission:', data);
    toast({
      title: "NAFDAC Permit Application Submitted",
      description: "Your NAFDAC permit application has been submitted successfully.",
    });
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>NAFDAC Permit Application</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="food">Food Products</SelectItem>
                      <SelectItem value="cosmetics">Cosmetics</SelectItem>
                      <SelectItem value="drugs">Drugs/Pharmaceuticals</SelectItem>
                      <SelectItem value="medical-devices">Medical Devices</SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of product to be registered" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Detailed description of the product" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manufacturerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of manufacturing company" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manufacturerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Address *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Complete address of manufacturing facility" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients/Composition *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="List all ingredients and their percentages" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="packagingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packaging Details *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Packaging materials, sizes, and labeling information" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shelfLife"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shelf Life *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shelf life" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                      <SelectItem value="3-years">3 Years</SelectItem>
                      <SelectItem value="5-years">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Compliance Certifications *</FormLabel>
              
              <FormField
                control={form.control}
                name="qualityAssurance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Quality assurance system in place</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gmpCompliance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Good Manufacturing Practice (GMP) compliance</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

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

export default NAFDACPermitForm;
