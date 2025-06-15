
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Download,
  Eye,
  RefreshCw,
  Image,
  FileText,
  Wand2,
  Upload,
  Settings,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLogoGenerator } from '@/hooks/useLogoGenerator';

const DesignStudio = () => {
  const { toast } = useToast();
  const [activeDesignTab, setActiveDesignTab] = useState('logo');
  const [logoData, setLogoData] = useState({
    businessName: '',
    industry: '',
    colorPreference: '',
    style: ''
  });
  const [flyerData, setFlyerData] = useState({
    template: '',
    title: '',
    description: '',
    contactInfo: ''
  });
  const [brandKit, setBrandKit] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    font: 'Inter',
    logo: null
  });

  const { generateLogos, isGenerating, generatedLogos, brandGuidelines } = useLogoGenerator();

  const industries = [
    'Technology & Software',
    'Fashion & Retail',
    'Food & Restaurant',
    'Healthcare',
    'Education',
    'Professional Services',
    'E-commerce',
    'Beauty & Wellness',
    'Real Estate',
    'Transportation'
  ];

  const colorPreferences = [
    'Blue & Professional',
    'Green & Growth',
    'Red & Bold',
    'Purple & Creative',
    'Orange & Energetic',
    'Black & Elegant',
    'Colorful & Vibrant',
    'Minimalist & Clean'
  ];

  const logoStyles = [
    'Modern & Minimalist',
    'Professional & Corporate',
    'Creative & Artistic',
    'Bold & Strong',
    'Elegant & Sophisticated',
    'Playful & Fun'
  ];

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

  const handleGenerateLogo = async () => {
    if (!logoData.businessName || !logoData.industry) {
      toast({
        title: "Missing Information",
        description: "Please enter business name and industry",
        variant: "destructive"
      });
      return;
    }

    await generateLogos(logoData);
  };

  const downloadLogo = (logoId: number, format: string) => {
    const logo = generatedLogos.find(l => l.id === logoId);
    if (!logo) return;

    if (format === 'SVG') {
      const blob = new Blob([logo.svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${logoData.businessName}-logo-${logo.style.toLowerCase().replace(/\s+/g, '-')}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'PNG') {
      // Convert SVG to PNG using canvas
      const svg = new Blob([logo.svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svg);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, 800, 240);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `${logoData.businessName}-logo-${logo.style.toLowerCase().replace(/\s+/g, '-')}.png`;
            a.click();
            URL.revokeObjectURL(pngUrl);
          }
        });
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }

    toast({
      title: "Download Started",
      description: `Logo downloading in ${format} format`
    });
  };

  const saveToBrandKit = (item: string) => {
    toast({
      title: "Saved to Brand Kit",
      description: `${item} added to your brand assets`
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeDesignTab} onValueChange={setActiveDesignTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logo">AI Logo Generator</TabsTrigger>
          <TabsTrigger value="flyer">Flyer Creator</TabsTrigger>
          <TabsTrigger value="brand">Brand Kit</TabsTrigger>
        </TabsList>

        {/* Logo Generator */}
        <TabsContent value="logo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                AI-Powered Logo Generator
                <span className="text-sm font-normal text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  LLaMA AI
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={logoData.businessName}
                    onChange={(e) => setLogoData({...logoData, businessName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={logoData.industry} onValueChange={(value) => setLogoData({...logoData, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="colorPref">Color Preference</Label>
                  <Select value={logoData.colorPreference} onValueChange={(value) => setLogoData({...logoData, colorPreference: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorPreferences.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Logo Style</Label>
                  <Select value={logoData.style} onValueChange={(value) => setLogoData({...logoData, style: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoStyles.map((style) => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerateLogo} 
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    AI Generating Logos...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Logo Concepts
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Logos */}
          {generatedLogos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Logo Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {generatedLogos.map((logo) => (
                    <div key={logo.id} className="border rounded-lg p-4 space-y-3">
                      <div className="h-20 flex items-center justify-center bg-gray-50 rounded">
                        <div 
                          dangerouslySetInnerHTML={{ __html: logo.svgCode }} 
                          className="max-w-full max-h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{logo.style}</h3>
                        <p className="text-sm text-gray-600">{logo.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{logo.rationale}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadLogo(logo.id, 'PNG')}
                          >
                            <Download size={14} className="mr-1" />
                            PNG
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadLogo(logo.id, 'SVG')}
                          >
                            <Download size={14} className="mr-1" />
                            SVG
                          </Button>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => saveToBrandKit('Logo')}
                        >
                          Save to Brand Kit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Brand Guidelines */}
                {brandGuidelines && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">AI Brand Guidelines</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <p><strong>Typography:</strong> {brandGuidelines.typography}</p>
                      <p><strong>Color Palette:</strong> {brandGuidelines.colorPalette.join(', ')}</p>
                      <p><strong>Usage:</strong> {brandGuidelines.usage}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Flyer Creator */}
        <TabsContent value="flyer" className="space-y-6">
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
        </TabsContent>

        {/* Brand Kit */}
        <TabsContent value="brand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="text-green-600" size={20} />
                Brand Kit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Brand Colors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg border"
                        style={{ backgroundColor: brandKit.primaryColor }}
                      ></div>
                      <div>
                        <p className="font-medium">Primary Color</p>
                        <p className="text-sm text-gray-600">{brandKit.primaryColor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg border"
                        style={{ backgroundColor: brandKit.secondaryColor }}
                      ></div>
                      <div>
                        <p className="font-medium">Secondary Color</p>
                        <p className="text-sm text-gray-600">{brandKit.secondaryColor}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Typography</h3>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium" style={{ fontFamily: brandKit.font }}>
                      {brandKit.font}
                    </p>
                    <p className="text-sm text-gray-600">Primary font family</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Saved Assets</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <p className="text-sm">Logo v1</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-sm">Flyer Template</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
                    <div className="text-4xl mb-2">+</div>
                    <p className="text-sm">Add Asset</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Customize Brand Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignStudio;
