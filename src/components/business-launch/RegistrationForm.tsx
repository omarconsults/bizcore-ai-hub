
import React, { useState } from 'react';
import CACRegistrationForm from './forms/CACRegistrationForm';
import DirectorDetailsForm from './forms/DirectorDetailsForm';
import DocumentUploadForm from './forms/DocumentUploadForm';
import NameSearchForm from './forms/NameSearchForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, CheckCircle } from 'lucide-react';

interface RegistrationFormProps {
  selectedEntityType: string;
  onBack: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ selectedEntityType, onBack }) => {
  const [currentForm, setCurrentForm] = useState<'name-search' | 'cac' | 'directors' | 'documents' | 'complete'>('cac');
  const [showNameSearch, setShowNameSearch] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState('');

  const handleNameSelected = (name: string) => {
    setSelectedCompanyName(name);
    setShowNameSearch(false);
  };

  const handleCACFormNext = () => {
    setCurrentForm('directors');
  };

  const handleDirectorsFormNext = () => {
    setCurrentForm('documents');
  };

  const handleDocumentsFormNext = () => {
    setCurrentForm('complete');
  };

  const handleBackToCAC = () => {
    setCurrentForm('cac');
  };

  const handleBackToDirectors = () => {
    setCurrentForm('directors');
  };

  if (currentForm === 'complete') {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building className="text-blue-900" size={28} />
              Registration Complete
            </h1>
            <Button variant="outline" onClick={onBack}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto text-emerald-600 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your business registration application has been submitted to CAC. 
              You will receive updates on the status of your application via email.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• CAC will review your application within 5-10 business days</li>
                <li>• You'll receive an email notification once approved</li>
                <li>• Your Certificate of Incorporation will be available for download</li>
                <li>• You can then proceed with opening a corporate bank account</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500">
              Application Reference: <span className="font-medium text-blue-900">REG-{Date.now()}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {currentForm === 'cac' && (
        <CACRegistrationForm
          selectedEntityType={selectedEntityType}
          onBack={onBack}
          onNext={handleCACFormNext}
        />
      )}
      
      {currentForm === 'directors' && (
        <DirectorDetailsForm
          onBack={handleBackToCAC}
          onNext={handleDirectorsFormNext}
        />
      )}
      
      {currentForm === 'documents' && (
        <DocumentUploadForm
          onBack={handleBackToDirectors}
          onNext={handleDocumentsFormNext}
        />
      )}

      <NameSearchForm
        isOpen={showNameSearch}
        onClose={() => setShowNameSearch(false)}
        onNameSelected={handleNameSelected}
      />
    </>
  );
};

export default RegistrationForm;
