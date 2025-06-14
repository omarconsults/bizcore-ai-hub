
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, FileText } from 'lucide-react';

interface DocumentTemplate {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface DocumentGeneratorProps {
  onDocumentGenerate: (templateName: string) => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ onDocumentGenerate }) => {
  const documentTemplates: DocumentTemplate[] = [
    { name: 'Privacy Policy Generator', description: 'NDPR-compliant privacy policy', icon: FileText },
    { name: 'Employment Contract Template', description: 'Standard employment agreement', icon: FileText },
    { name: 'Non-Disclosure Agreement', description: 'Protect confidential information', icon: FileText },
    { name: 'Terms of Service Template', description: 'Website/app terms and conditions', icon: FileText },
    { name: 'Vendor Agreement Template', description: 'Supplier/contractor agreement', icon: FileText },
    { name: 'Data Processing Agreement', description: 'NDPR-compliant DPA template', icon: FileText }
  ];

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Document Generator</h3>
        <p className="text-gray-600">Generate legally compliant documents for your business</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTemplates.map((template, index) => (
          <Card key={index} className="border border-gray-200 hover:border-blue-900 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <template.icon className="text-blue-900" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-blue-900 hover:bg-blue-800"
                    onClick={() => onDocumentGenerate(template.name)}
                  >
                    <Zap className="mr-1" size={14} />
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentGenerator;
