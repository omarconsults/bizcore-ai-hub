
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface DigitalPresenceHeaderProps {
  businessName: string;
  setBusinessName: (name: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  hasAnalyzed: boolean;
}

const DigitalPresenceHeader = ({
  businessName,
  setBusinessName,
  websiteUrl,
  setWebsiteUrl,
  onRunAnalysis,
  isAnalyzing,
  hasAnalyzed
}: DigitalPresenceHeaderProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="text-blue-900" size={28} />
            Digital Presence Analyzer
          </h1>
          <p className="text-gray-600 mt-1">Discover how visible and credible your business appears online</p>
        </div>
      </div>

      {!hasAnalyzed && (
        <div className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <Label htmlFor="website-url">Website URL (Optional)</Label>
              <Input
                id="website-url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourbusiness.com"
              />
            </div>
          </div>
          <Button 
            onClick={onRunAnalysis} 
            disabled={!businessName || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Your Digital Presence...' : 'Start Analysis'}
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-8 mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Scanning social media, websites, and business listings...</p>
        </div>
      )}
    </div>
  );
};

export default DigitalPresenceHeader;
