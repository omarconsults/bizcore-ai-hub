
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface NameSearchFormProps {
  isOpen: boolean;
  onClose: () => void;
  onNameSelected: (name: string) => void;
}

interface FormData {
  companyName: string;
  alternativeName1: string;
  alternativeName2: string;
}

interface SearchResult {
  name: string;
  available: boolean;
  reason?: string;
}

const NameSearchForm: React.FC<NameSearchFormProps> = ({ isOpen, onClose, onNameSelected }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    defaultValues: {
      companyName: '',
      alternativeName1: '',
      alternativeName2: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const names = [data.companyName, data.alternativeName1, data.alternativeName2].filter(Boolean);
    const results: SearchResult[] = names.map(name => ({
      name,
      available: Math.random() > 0.3, // 70% chance of being available
      reason: Math.random() > 0.7 ? 'Similar name already exists' : undefined
    }));
    
    setSearchResults(results);
    setIsSearching(false);
    
    toast({
      title: "Name Search Complete",
      description: `Found ${results.filter(r => r.available).length} available names`,
    });
  };

  const handleSelectName = (name: string) => {
    onNameSelected(name);
    toast({
      title: "Name Selected",
      description: `${name} has been selected for your business registration.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="text-blue-900" size={20} />
            Business Name Search
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-blue-900 mb-2">Name Search Guidelines:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Names must be unique and not similar to existing companies</li>
                <li>• Avoid restricted words without proper authorization</li>
                <li>• Names should reflect your business activity</li>
                <li>• Provide alternative names in case your first choice is unavailable</li>
              </ul>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                rules={{ required: "Company name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your preferred company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alternativeName1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Name 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter alternative company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alternativeName2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Name 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter another alternative name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={16} className="mr-2" />
                    Search Names
                  </>
                )}
              </Button>
            </form>
          </Form>

          {searchResults.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {searchResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {result.available ? (
                        <CheckCircle className="text-emerald-600" size={20} />
                      ) : (
                        <XCircle className="text-red-600" size={20} />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{result.name}</h4>
                        <p className="text-sm text-gray-600">
                          {result.available ? 'Available for registration' : result.reason || 'Not available'}
                        </p>
                      </div>
                    </div>
                    
                    {result.available && (
                      <Button 
                        size="sm" 
                        onClick={() => handleSelectName(result.name)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Select
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {searchResults.length > 0 && searchResults.some(r => !r.available) && (
            <Card className="border-0 shadow-sm bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-yellow-600 mt-0.5" size={16} />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Some names are unavailable</p>
                    <p>Consider modifying your preferred names or try different variations.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NameSearchForm;
