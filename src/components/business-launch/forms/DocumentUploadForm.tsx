
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentUploadFormProps {
  onBack: () => void;
  onNext: () => void;
}

interface Document {
  name: string;
  required: boolean;
  uploaded: boolean;
  file?: File;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onBack, onNext }) => {
  const { toast } = useToast();
  
  const [documents, setDocuments] = useState<Document[]>([
    { name: 'Memorandum of Association', required: true, uploaded: false },
    { name: 'Articles of Association', required: true, uploaded: false },
    { name: 'Form CAC 2.1 (Statement of Share Capital)', required: true, uploaded: false },
    { name: 'Form CAC 7 (Particulars of Directors)', required: true, uploaded: false },
    { name: 'Evidence of Payment of Name Search', required: true, uploaded: false },
    { name: 'Passport Photographs of Directors', required: true, uploaded: false },
    { name: 'Valid ID Cards of Directors', required: true, uploaded: false },
    { name: 'Certified True Copy of Address Verification', required: false, uploaded: false },
    { name: 'Letter of Consent from Landlord', required: false, uploaded: false },
  ]);

  const handleFileUpload = (index: number, file: File) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      uploaded: true,
      file: file,
    };
    setDocuments(updatedDocuments);
    
    toast({
      title: "Document Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleSubmit = () => {
    const requiredDocuments = documents.filter(doc => doc.required);
    const uploadedRequiredDocuments = requiredDocuments.filter(doc => doc.uploaded);
    
    if (uploadedRequiredDocuments.length < requiredDocuments.length) {
      toast({
        title: "Missing Required Documents",
        description: "Please upload all required documents before proceeding.",
        variant: "destructive",
      });
      return;
    }

    console.log('Document Upload Form Data:', documents);
    toast({
      title: "Documents Submitted",
      description: "All documents have been submitted successfully.",
    });
    onNext();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-blue-900" size={28} />
            Document Upload
          </h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        <p className="text-gray-600">Upload the required documents for your business registration</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <p className="text-gray-600">All documents marked with * are mandatory</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.map((document, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                {document.uploaded ? (
                  <CheckCircle className="text-emerald-600" size={20} />
                ) : document.required ? (
                  <AlertCircle className="text-red-600" size={20} />
                ) : (
                  <FileText className="text-gray-400" size={20} />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">
                    {document.name}
                    {document.required && <span className="text-red-600 ml-1">*</span>}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {document.uploaded ? 'Uploaded successfully' : 
                     document.required ? 'Required document' : 'Optional document'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {document.uploaded && (
                  <span className="text-sm text-emerald-600 font-medium">
                    {document.file?.name}
                  </span>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(index, file);
                      }
                    }}
                  />
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload size={16} className="mr-2" />
                      {document.uploaded ? 'Replace' : 'Upload'}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-blue-900 mb-2">Document Guidelines:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All documents must be clear and legible</li>
            <li>• Accepted formats: PDF, DOC, DOCX, JPG, PNG</li>
            <li>• Maximum file size: 5MB per document</li>
            <li>• Ensure all information matches your registration details</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Previous
        </Button>
        <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
          Submit Application
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
