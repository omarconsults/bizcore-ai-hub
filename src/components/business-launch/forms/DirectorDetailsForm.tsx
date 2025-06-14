
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Users } from 'lucide-react';

interface DirectorDetailsFormProps {
  onBack: () => void;
  onNext: () => void;
}

interface Director {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  occupation: string;
  dateOfBirth: string;
  shareholding: string;
}

interface FormData {
  directors: Director[];
}

const DirectorDetailsForm: React.FC<DirectorDetailsFormProps> = ({ onBack, onNext }) => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      directors: [
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          nationality: 'Nigerian',
          occupation: '',
          dateOfBirth: '',
          shareholding: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'directors',
  });

  const onSubmit = (data: FormData) => {
    console.log('Director Details Form Data:', data);
    toast({
      title: "Director Details Saved",
      description: "Director information has been saved successfully.",
    });
    onNext();
  };

  const addDirector = () => {
    append({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      nationality: 'Nigerian',
      occupation: '',
      dateOfBirth: '',
      shareholding: '',
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-900" size={28} />
            Director Details
          </h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        <p className="text-gray-600">Add details for all company directors</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Director {index + 1}</span>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`directors.${index}.firstName`}
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.lastName`}
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.email`}
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.phone`}
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.dateOfBirth`}
                    rules={{ required: "Date of birth is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.nationality`}
                    rules={{ required: "Nationality is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nationality" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nigerian">Nigerian</SelectItem>
                            <SelectItem value="American">American</SelectItem>
                            <SelectItem value="British">British</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.occupation`}
                    rules={{ required: "Occupation is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`directors.${index}.shareholding`}
                    rules={{ required: "Shareholding percentage is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shareholding (%) *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`directors.${index}.address`}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full residential address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={addDirector}>
              <Plus size={16} className="mr-2" />
              Add Another Director
            </Button>
            
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onBack}>
                Previous
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                Continue to Documents
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DirectorDetailsForm;
