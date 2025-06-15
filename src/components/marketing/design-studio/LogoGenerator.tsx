
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLogoGenerator } from '@/hooks/useLogoGenerator';
import GeneratedLogos from './GeneratedLogos';

const LogoGenerator = () => {
  const { toast } = useToast();
  const [logoData, setLogoData] = useState({
    businessName: '',
    industry: '',
    colorPreference: '',
    style: ''
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

  return (
    <div className="space-y-6">
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

      {generatedLogos.length > 0 && (
        <GeneratedLogos 
          generatedLogos={generatedLogos}
          brandGuidelines={brandGuidelines}
          businessName={logoData.businessName}
        />
      )}
    </div>
  );
};

export default LogoGenerator;
