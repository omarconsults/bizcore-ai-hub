import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { validateDocumentsForm } from '@/utils/formValidation';

interface DocumentUploadFormProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
}

interface Document {
  name: string;
  required: boolean;
  uploaded: boolean;
  file?: File;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ 
  onBack, 
  onNext, 
  initialData 
}) => {
  const { toast } = useToast();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const [documents, setDocuments] = useState<Document[]>(initialData?.documents || [
    { name: 'Means of Identification', required: true, uploaded: false },
    { name: 'Signature of Director 1', required: true, uploaded: false },
    { name: 'Signature of Witness 1', required: true, uploaded: false },
    { name: 'Mean of Identification of Director 1)', required: true, uploaded: false },
    { name: 'Other Documents', required: true, uploaded: false },
    { name: 'Passport Photographs of Directors', required: true, uploaded: false },
    { name: 'Valid ID Cards of Directors', required: true, uploaded: false },
    { name: 'Address Verification Document', required: false, uploaded: false },
    { name: 'Letter of Consent', required: false, uploaded: false },
  ]);

  useEffect(() => {
    if (initialData?.documents) {
      setDocuments(initialData.documents);
    }
  }, [initialData]);

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
    const validation = validateDocumentsForm(documents);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Required Documents Missing",
        description: "Please upload all required documents before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setValidationErrors([]);
    const data = { documents };
    console.log('Document Upload Form Data:', data);
    toast({
      title: "Documents Validated",
      description: "Proceeding to payment.",
    });
    onNext(data);
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
        <p className="text-gray-600">Upload all required documents before proceeding to payment</p>

        {validationErrors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-red-600 mt-0.5" size={16} />
              <div>
                <p className="font-medium text-red-800">Required documents missing:</p>
                <ul className="text-sm text-red-700 mt-1 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
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
        <Button onClick={handleSubmit} className="bg-blue-900 hover:bg-blue-800">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
