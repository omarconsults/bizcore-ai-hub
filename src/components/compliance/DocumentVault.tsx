
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download } from 'lucide-react';

interface DocumentVaultProps {
  onUploadFiles: () => void;
}

const DocumentVault: React.FC<DocumentVaultProps> = ({ onUploadFiles }) => {
  const { toast } = useToast();

  const documents = [
    'Certificate of Incorporation',
    'Memorandum of Association',
    'Tax Clearance Certificate',
    'NDPR Compliance Certificate'
  ];

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Document Vault</h3>
        <p className="text-gray-600">Safely store and manage all your business documents</p>
      </div>
      
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-900" size={20} />
              <div>
                <h4 className="font-medium text-gray-900">{doc}</h4>
                <p className="text-sm text-gray-600">Uploaded March {15 + index}, 2024</p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
              <Download className="mr-1" size={14} />
              Download
            </Button>
          </div>
        ))}
        
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={onUploadFiles}
        >
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h4>
          <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
          <Button variant="outline">
            Choose Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVault;
