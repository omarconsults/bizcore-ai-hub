
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Heart, Package, FileCheck, Shield } from 'lucide-react';

interface NAFDACRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAFDACRegistrationForm: React.FC<NAFDACRegistrationFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    cacNumber: '',
    productName: '',
    productCategory: '',
    productType: '',
    productDescription: '',
    ingredientsList: '',
    manufacturingAddress: '',
    storageConditions: '',
    shelfLife: '',
    packagingMaterials: '',
    labelingInfo: '',
    targetMarket: '',
    contactPerson: '',
    phoneNumber: '',
    emailAddress: '',
    qualifiedPerson: '',
    qpQualifications: '',
    hasGMP: false,
    hasLaboratoryTest: false,
    hasProductSamples: false,
    registrationType: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "NAFDAC Registration Submitted",
      description: "Your NAFDAC registration application has been submitted successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="text-red-600" size={24} />
            National Agency for Food and Drug Administration and Control (NAFDAC) Registration
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registration Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Registration Type</h3>
            <div>
              <Label htmlFor="registrationType">Type of Registration *</Label>
              <Select onValueChange={(value) => handleInputChange('registrationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select registration type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food Products</SelectItem>
                  <SelectItem value="drugs">Pharmaceutical Drugs</SelectItem>
                  <SelectItem value="cosmetics">Cosmetics</SelectItem>
                  <SelectItem value="medical-devices">Medical Devices</SelectItem>
                  <SelectItem value="chemicals">Chemicals</SelectItem>
                  <SelectItem value="water">Packaged Water</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="processed-food">Processed Food</SelectItem>
                    <SelectItem value="dietary-supplements">Dietary Supplements</SelectItem>
                    <SelectItem value="infant-food">Infant Food</SelectItem>
                    <SelectItem value="skin-care">Skin Care</SelectItem>
                    <SelectItem value="oral-care">Oral Care</SelectItem>
                    <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                    <SelectItem value="medical-devices">Medical Devices</SelectItem>
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
              <Label htmlFor="ingredientsList">Ingredients/Composition *</Label>
              <Textarea
                id="ingredientsList"
                value={formData.ingredientsList}
                onChange={(e) => handleInputChange('ingredientsList', e.target.value)}
                placeholder="List all ingredients with percentages"
                required
              />
            </div>
          </div>

          {/* Product Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Specifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shelfLife">Shelf Life *</Label>
                <Input
                  id="shelfLife"
                  value={formData.shelfLife}
                  onChange={(e) => handleInputChange('shelfLife', e.target.value)}
                  placeholder="e.g., 24 months"
                  required
                />
              </div>
              <div>
                <Label htmlFor="storageConditions">Storage Conditions *</Label>
                <Input
                  id="storageConditions"
                  value={formData.storageConditions}
                  onChange={(e) => handleInputChange('storageConditions', e.target.value)}
                  placeholder="e.g., Store in cool, dry place"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="packagingMaterials">Packaging Materials *</Label>
                <Textarea
                  id="packagingMaterials"
                  value={formData.packagingMaterials}
                  onChange={(e) => handleInputChange('packagingMaterials', e.target.value)}
                  placeholder="Describe packaging materials used"
                  required
                />
              </div>
              <div>
                <Label htmlFor="labelingInfo">Labeling Information *</Label>
                <Textarea
                  id="labelingInfo"
                  value={formData.labelingInfo}
                  onChange={(e) => handleInputChange('labelingInfo', e.target.value)}
                  placeholder="Product label details"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="targetMarket">Target Market *</Label>
              <Select onValueChange={(value) => handleInputChange('targetMarket', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic Market Only</SelectItem>
                  <SelectItem value="export">Export Only</SelectItem>
                  <SelectItem value="both">Domestic and Export</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Qualified Person */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield size={20} />
              Qualified Person Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qualifiedPerson">Qualified Person Name *</Label>
                <Input
                  id="qualifiedPerson"
                  value={formData.qualifiedPerson}
                  onChange={(e) => handleInputChange('qualifiedPerson', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="qpQualifications">Qualifications *</Label>
                <Input
                  id="qpQualifications"
                  value={formData.qpQualifications}
                  onChange={(e) => handleInputChange('qpQualifications', e.target.value)}
                  placeholder="e.g., Pharmacist, Food Scientist"
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
              <FileCheck size={20} />
              Requirements Checklist
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gmp"
                  checked={formData.hasGMP}
                  onCheckedChange={(checked) => handleInputChange('hasGMP', checked as boolean)}
                />
                <Label htmlFor="gmp">Good Manufacturing Practice (GMP) certificate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="laboratoryTest"
                  checked={formData.hasLaboratoryTest}
                  onCheckedChange={(checked) => handleInputChange('hasLaboratoryTest', checked as boolean)}
                />
                <Label htmlFor="laboratoryTest">Laboratory test results available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="productSamples"
                  checked={formData.hasProductSamples}
                  onCheckedChange={(checked) => handleInputChange('hasProductSamples', checked as boolean)}
                />
                <Label htmlFor="productSamples">Product samples ready for submission</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              Submit NAFDAC Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NAFDACRegistrationForm;
