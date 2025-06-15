
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, FileText, Shield, Users, Globe, FileCheck, Scale } from 'lucide-react';
import DocumentGeneratorForm from './DocumentGeneratorForm';

interface DocumentTemplate {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
}

const DocumentGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const documentTemplates: DocumentTemplate[] = [
    { 
      name: 'Privacy Policy Generator', 
      description: 'NDPR-compliant privacy policy with comprehensive data protection clauses', 
      icon: Shield,
      features: ['NDPR Compliance', 'Data Rights Management', 'Cookie Policies', 'Breach Procedures']
    },
    { 
      name: 'Employment Contract Template', 
      description: 'Complete employment agreement compliant with Nigerian Labor Act', 
      icon: Users,
      features: ['Labor Law Compliance', 'Compensation Structure', 'Leave Policies', 'Termination Procedures']
    },
    { 
      name: 'Non-Disclosure Agreement', 
      description: 'Comprehensive NDA to protect confidential business information', 
      icon: FileCheck,
      features: ['IP Protection', 'Confidentiality Clauses', 'Breach Remedies', 'Nigerian Law Governed']
    },
    { 
      name: 'Terms of Service Template', 
      description: 'Professional website/app terms and conditions', 
      icon: Globe,
      features: ['User Responsibilities', 'Payment Terms', 'Liability Limitations', 'Dispute Resolution']
    },
    { 
      name: 'Vendor Agreement Template', 
      description: 'Comprehensive supplier/contractor agreement', 
      icon: FileText,
      features: ['Service Scope', 'Performance Metrics', 'Payment Terms', 'Quality Standards']
    },
    { 
      name: 'Data Processing Agreement', 
      description: 'NDPR-compliant DPA for data processor relationships', 
      icon: Scale,
      features: ['Data Processing Terms', 'Security Measures', 'Audit Rights', 'International Transfers']
    }
  ];

  const handleGenerateDocument = (templateName: string) => {
    setSelectedTemplate(templateName);
    setIsFormOpen(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Zap className="text-blue-900" size={20} />
          AI-Powered Legal Document Generator
        </h3>
        <p className="text-gray-600">Generate professionally crafted, legally compliant documents using advanced AI technology</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTemplates.map((template, index) => (
          <Card key={index} className="border border-gray-200 hover:border-blue-900 hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <template.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                    onClick={() => handleGenerateDocument(template.name)}
                  >
                    <Zap className="mr-2" size={14} />
                    Generate with AI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Zap className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">AI-Enhanced Document Generation</h4>
            <p className="text-sm text-blue-700">
              Our advanced AI technology creates comprehensive, legally compliant documents tailored to your business needs. 
              Each document is generated with Nigerian business laws in mind and includes all necessary clauses and provisions.
            </p>
            <ul className="text-xs text-blue-600 mt-2 space-y-1">
              <li>• Professional legal language and formatting</li>
              <li>• Compliance with Nigerian business regulations</li>
              <li>• Customizable based on your specific requirements</li>
              <li>• Ready-to-use documents that save time and legal costs</li>
            </ul>
          </div>
        </div>
      </div>

      {selectedTemplate && (
        <DocumentGeneratorForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTemplate(null);
          }}
          documentType={selectedTemplate}
        />
      )}
    </div>
  );
};

export default DocumentGenerator;
