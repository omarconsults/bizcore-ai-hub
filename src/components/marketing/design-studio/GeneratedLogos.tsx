
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GeneratedLogo {
  id: number;
  style: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  typography: string;
  svgCode: string;
  rationale: string;
}

interface BrandGuidelines {
  colorPalette: string[];
  typography: string;
  usage: string;
}

interface GeneratedLogosProps {
  generatedLogos: GeneratedLogo[];
  brandGuidelines: BrandGuidelines | null;
  businessName: string;
}

const GeneratedLogos: React.FC<GeneratedLogosProps> = ({ 
  generatedLogos, 
  brandGuidelines, 
  businessName 
}) => {
  const { toast } = useToast();

  const downloadLogo = (logoId: number, format: string) => {
    const logo = generatedLogos.find(l => l.id === logoId);
    if (!logo) return;

    if (format === 'SVG') {
      const blob = new Blob([logo.svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${businessName}-logo-${logo.style.toLowerCase().replace(/\s+/g, '-')}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'PNG') {
      // Convert SVG to PNG using canvas
      const svg = new Blob([logo.svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svg);
      const img = document.createElement('img') as HTMLImageElement;
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
            a.download = `${businessName}-logo-${logo.style.toLowerCase().replace(/\s+/g, '-')}.png`;
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
  );
};

export default GeneratedLogos;
