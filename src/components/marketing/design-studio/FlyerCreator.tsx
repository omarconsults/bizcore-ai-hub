
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Eye, Upload, Download } from 'lucide-react';

const FlyerCreator = () => {
  const [flyerData, setFlyerData] = useState({
    template: '',
    title: '',
    description: '',
    contactInfo: ''
  });

  const flyerTemplates = [
    'Sales Promotion',
    'Event Announcement',
    'Product Launch',
    'Job Vacancy',
    'Service Promotion',
    'Grand Opening',
    'Workshop/Training',
    'Holiday Special'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            Flyer Creator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template">Template Type</Label>
              <Select value={flyerData.template} onValueChange={(value) => setFlyerData({...flyerData, template: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent>
                  {flyerTemplates.map((template) => (
                    <SelectItem key={template} value={template}>{template}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                placeholder="e.g., 50% Off All Items"
                value={flyerData.title}
                onChange={(e) => setFlyerData({...flyerData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description or details"
                value={flyerData.description}
                onChange={(e) => setFlyerData({...flyerData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input
                id="contact"
                placeholder="Phone, address, or website"
                value={flyerData.contactInfo}
                onChange={(e) => setFlyerData({...flyerData, contactInfo: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Eye className="mr-2 h-4 w-4" />
              Preview Flyer
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flyer Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Flyer Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center space-y-4">
            <h1 className="text-3xl font-bold">{flyerData.title || 'Your Title Here'}</h1>
            <p className="text-lg">{flyerData.description || 'Your description will appear here'}</p>
            <div className="mt-6">
              <p className="text-sm">{flyerData.contactInfo || 'Contact information'}</p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline">
              Share to WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlyerCreator;
