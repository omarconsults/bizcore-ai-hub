
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Shield, Package, FileCheck, Award } from 'lucide-react';

interface SONCertificationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SONCertificationForm: React.FC<SONCertificationFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    cacNumber: '',
    productName: '',
    productCategory: '',
    productDescription: '',
    manufacturingAddress: '',
    testingLaboratory: '',
    standardCompliance: '',
    productSpecifications: '',
    qualityManagementSystem: '',
    contactPerson: '',
    phoneNumber: '',
    emailAddress: '',
    hasFactoryInspection: false,
    hasProductTesting: false,
    hasDocumentation: false,
    certificationPurpose: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "SON Certification Submitted",
      description: "Your Standards Organisation of Nigeria certification application has been submitted successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="text-green-600" size={24} />
            Standards Organisation of Nigeria (SON) Certification
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
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
            </div>
            <div>
              <Label htmlFor="manufacturingAddress">Manufacturing/Business Address *</Label>
              <Textarea
                id="manufacturingAddress"
                value={formData.manufacturingAddress}
                onChange={(e) => handleInputChange('manufacturingAddress', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package size={20} />
              Product Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="productCategory">Product Category *</Label>
                <Select onValueChange={(value) => handleInputChange('productCategory', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical">Electrical Products</SelectItem>
                    <SelectItem value="automotive">Automotive Parts</SelectItem>
                    <SelectItem value="construction">Construction Materials</SelectItem>
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="food">Food Products</SelectItem>
                    <SelectItem value="chemicals">Chemicals</SelectItem>
                    <SelectItem value="machinery">Machinery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="productDescription">Product Description *</Label>
              <Textarea
                id="productDescription"
                value={formData.productDescription}
                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                placeholder="Detailed description of the product"
                required
              />
            </div>
            <div>
              <Label htmlFor="productSpecifications">Product Specifications *</Label>
              <Textarea
                id="productSpecifications"
                value={formData.productSpecifications}
                onChange={(e) => handleInputChange('productSpecifications', e.target.value)}
                placeholder="Technical specifications, dimensions, materials, etc."
                required
              />
            </div>
          </div>

          {/* Standards & Quality */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award size={20} />
              Standards & Quality Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="standardCompliance">Nigerian Standard Compliance *</Label>
                <Input
                  id="standardCompliance"
                  value={formData.standardCompliance}
                  onChange={(e) => handleInputChange('standardCompliance', e.target.value)}
                  placeholder="e.g., NIS 444, NIS 116"
                  required
                />
              </div>
              <div>
                <Label htmlFor="testingLaboratory">Preferred Testing Laboratory</Label>
                <Select onValueChange={(value) => handleInputChange('testingLaboratory', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select testing laboratory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="son-lab">SON Testing Laboratory</SelectItem>
                    <SelectItem value="fiiro">FIIRO Laboratory</SelectItem>
                    <SelectItem value="rmrdc">RMRDC Laboratory</SelectItem>
                    <SelectItem value="private">Private Accredited Lab</SelectItem>
                    <SelectItem value="international">International Laboratory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="qualityManagementSystem">Quality Management System</Label>
              <Select onValueChange={(value) => handleInputChange('qualityManagementSystem', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select QMS certification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iso9001">ISO 9001</SelectItem>
                  <SelectItem value="haccp">HACCP</SelectItem>
                  <SelectItem value="iso14001">ISO 14001</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Certification Purpose */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Certification Purpose</h3>
            <div>
              <Label htmlFor="certificationPurpose">Purpose of Certification *</Label>
              <Select onValueChange={(value) => handleInputChange('certificationPurpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select certification purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mandatory">Mandatory Conformity Assessment</SelectItem>
                  <SelectItem value="voluntary">Voluntary Certification</SelectItem>
                  <SelectItem value="export">Export Certification</SelectItem>
                  <SelectItem value="import">Import Permit</SelectItem>
                  <SelectItem value="quality-mark">SON Quality Mark</SelectItem>
                </SelectContent>
              </Select>
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
              <FileCheck size={20} />
              Requirements Checklist
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="factoryInspection"
                  checked={formData.hasFactoryInspection}
                  onCheckedChange={(checked) => handleInputChange('hasFactoryInspection', checked as boolean)}
                />
                <Label htmlFor="factoryInspection">Ready for factory inspection</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="productTesting"
                  checked={formData.hasProductTesting}
                  onCheckedChange={(checked) => handleInputChange('hasProductTesting', checked as boolean)}
                />
                <Label htmlFor="productTesting">Product samples ready for testing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="documentation"
                  checked={formData.hasDocumentation}
                  onCheckedChange={(checked) => handleInputChange('hasDocumentation', checked as boolean)}
                />
                <Label htmlFor="documentation">All required documentation prepared</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Submit SON Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SONCertificationForm;
