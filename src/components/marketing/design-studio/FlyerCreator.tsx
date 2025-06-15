
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Eye, Upload, Download, Sparkles, RefreshCw } from 'lucide-react';
import { useFlyerAI } from '@/hooks/useFlyerAI';
import { useToast } from '@/hooks/use-toast';

const FlyerCreator = () => {
  const { toast } = useToast();
  const [flyerData, setFlyerData] = useState({
    template: '',
    title: '',
    description: '',
    contactInfo: ''
  });

  const { generateFlyer, isGenerating, generatedFlyer } = useFlyerAI();

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

  const handleGenerateFlyer = async () => {
    if (!flyerData.template || !flyerData.title) {
      toast({
        title: "Missing Information",
        description: "Please select a template and enter a title",
        variant: "destructive"
      });
      return;
    }

    await generateFlyer(flyerData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            AI-Powered Flyer Creator
            <span className="text-sm font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded">
              LLaMA AI
            </span>
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
            <Button 
              onClick={handleGenerateFlyer}
              disabled={isGenerating}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  AI Generating Flyer...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Flyer
                </>
              )}
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI-Generated Flyer Preview */}
      {generatedFlyer && (
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Flyer Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="text-white p-8 rounded-lg text-center space-y-4"
              style={{
                background: `linear-gradient(135deg, ${generatedFlyer.design.colorScheme.primary}, ${generatedFlyer.design.colorScheme.secondary})`,
                color: generatedFlyer.design.colorScheme.text
              }}
            >
              <h1 className="text-3xl font-bold text-white">
                {generatedFlyer.copywriting.headline}
              </h1>
              {generatedFlyer.copywriting.subheadline && (
                <h2 className="text-xl text-white opacity-90">
                  {generatedFlyer.copywriting.subheadline}
                </h2>
              )}
              <p className="text-lg text-white opacity-80">
                {generatedFlyer.copywriting.bodyText}
              </p>
              <div className="mt-6">
                <p className="text-sm text-white opacity-75">
                  {flyerData.contactInfo || 'Contact information'}
                </p>
              </div>
              <div 
                className="inline-block px-6 py-2 rounded-lg font-semibold mt-4"
                style={{ 
                  backgroundColor: generatedFlyer.design.colorScheme.accent,
                  color: '#FFFFFF'
                }}
              >
                {generatedFlyer.copywriting.callToAction}
              </div>
            </div>
            
            {/* Design Specifications */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">AI Design Specifications</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><strong>Layout:</strong> {generatedFlyer.design.layout}</p>
                  <p><strong>Typography:</strong> {generatedFlyer.design.typography.headline}</p>
                </div>
                <div>
                  <p><strong>Color Scheme:</strong> {generatedFlyer.design.colorScheme.primary}</p>
                  <p><strong>Visual Elements:</strong> {generatedFlyer.design.visualElements.join(', ')}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Design Rationale:</strong> {generatedFlyer.design.designRationale}
              </p>
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
      )}
    </div>
  );
};

export default FlyerCreator;
