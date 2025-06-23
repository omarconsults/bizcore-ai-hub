
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Building2, FileText, Globe, Package } from 'lucide-react';

interface NEPCRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NEPCRegistrationForm: React.FC<NEPCRegistrationFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    cacNumber: '',
    tinNumber: '',
    businessAddress: '',
    exportProducts: '',
    exportDestinations: '',
    annualExportVolume: '',
    exportExperience: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    contactPerson: '',
    phoneNumber: '',
    emailAddress: '',
    hasExportLicense: false,
    hasQualityCertificate: false,
    hasInsurance: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "NEPC Registration Submitted",
      description: "Your NEPC registration application has been submitted successfully. You'll receive updates via email.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="text-blue-600" size={24} />
            Nigerian Export Promotion Council (NEPC) Registration
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 size={20} />
              Company Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cacNumber">CAC Registration Number *</Label>
                <Input
                  id="cacNumber"
                  value={formData.cacNumber}
                  onChange={(e) => handleInputChange('cacNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tinNumber">Tax Identification Number *</Label>
                <Input
                  id="tinNumber"
                  value={formData.tinNumber}
                  onChange={(e) => handleInputChange('tinNumber', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Textarea
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Export Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package size={20} />
              Export Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exportProducts">Products for Export *</Label>
                <Textarea
                  id="exportProducts"
                  value={formData.exportProducts}
                  onChange={(e) => handleInputChange('exportProducts', e.target.value)}
                  placeholder="List the products you intend to export"
                  required
                />
              </div>
              <div>
                <Label htmlFor="exportDestinations">Target Export Destinations *</Label>
                <Textarea
                  id="exportDestinations"
                  value={formData.exportDestinations}
                  onChange={(e) => handleInputChange('exportDestinations', e.target.value)}
                  placeholder="Countries/regions you plan to export to"
                  required
                />
              </div>
              <div>
                <Label htmlFor="annualExportVolume">Estimated Annual Export Volume</Label>
                <Select onValueChange={(value) => handleInputChange('annualExportVolume', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select volume range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under $1 Million</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="over-10m">Over $10 Million</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="exportExperience">Export Experience</Label>
                <Select onValueChange={(value) => handleInputChange('exportExperience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New to Export</SelectItem>
                    <SelectItem value="1-3years">1-3 Years</SelectItem>
                    <SelectItem value="3-5years">3-5 Years</SelectItem>
                    <SelectItem value="over-5years">Over 5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Banking Information</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange('accountName', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emailAddress">Email Address *</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} />
              Requirements Checklist
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exportLicense"
                  checked={formData.hasExportLicense}
                  onCheckedChange={(checked) => handleInputChange('hasExportLicense', checked as boolean)}
                />
                <Label htmlFor="exportLicense">I have/will obtain necessary export licenses</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="qualityCertificate"
                  checked={formData.hasQualityCertificate}
                  onCheckedChange={(checked) => handleInputChange('hasQualityCertificate', checked as boolean)}
                />
                <Label htmlFor="qualityCertificate">I have quality certificates for my products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={formData.hasInsurance}
                  onCheckedChange={(checked) => handleInputChange('hasInsurance', checked as boolean)}
                />
                <Label htmlFor="insurance">I have/will obtain export credit insurance</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Submit NEPC Registration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NEPCRegistrationForm;
