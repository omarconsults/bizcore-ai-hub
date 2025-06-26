
import React, { useState } from 'react';
import CACRegistrationForm from './forms/CACRegistrationForm';
import DirectorDetailsForm from './forms/DirectorDetailsForm';
import DocumentUploadForm from './forms/DocumentUploadForm';
import PaymentForm from './forms/PaymentForm';
import NameSearchForm from './forms/NameSearchForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationFormProps {
  selectedEntityType: string;
  onBack: () => void;
}

interface RegistrationData {
  cacForm: any;
  directorsForm: any;
  documentsForm: any;
  paymentComplete: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ selectedEntityType, onBack }) => {
  const [currentForm, setCurrentForm] = useState<'cac' | 'directors' | 'documents' | 'payment' | 'complete'>('cac');
  const [showNameSearch, setShowNameSearch] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState('');
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    cacForm: null,
    directorsForm: null,
    documentsForm: null,
    paymentComplete: false
  });
  const { toast } = useToast();

  const handleNameSelected = (name: string) => {
    setSelectedCompanyName(name);
    setShowNameSearch(false);
  };

  const handleCACFormNext = (data: any) => {
    setRegistrationData(prev => ({ ...prev, cacForm: data }));
    setCurrentForm('directors');
  };

  const handleDirectorsFormNext = (data: any) => {
    setRegistrationData(prev => ({ ...prev, directorsForm: data }));
    setCurrentForm('documents');
  };

  const handleDocumentsFormNext = (data: any) => {
    setRegistrationData(prev => ({ ...prev, documentsForm: data }));
    setCurrentForm('payment');
  };

  const handlePaymentComplete = () => {
    setRegistrationData(prev => ({ ...prev, paymentComplete: true }));
    setCurrentForm('complete');
    toast({
      title: "Payment Successful",
      description: "Your CAC registration application has been submitted for processing.",
    });
  };

  const handleBackToCAC = () => {
    setCurrentForm('cac');
  };

  const handleBackToDirectors = () => {
    setCurrentForm('directors');
  };

  const handleBackToDocuments = () => {
    setCurrentForm('documents');
  };

  const getRegistrationFee = () => {
    switch (selectedEntityType) {
      case 'Business Name':
        return 25000;
      case 'Private Limited Company (LTD)':
        return 60000;
      case 'Limited Liability Partnership (LLP)':
        return 50000;
      default:
        return 25000;
    }
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
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto text-emerald-600 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your business registration application has been submitted to CAC after successful payment. 
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
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Payment Amount:</strong> ₦{getRegistrationFee().toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Application Reference: <span className="font-medium">REG-{Date.now()}</span>
              </p>
            </div>
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
          initialData={registrationData.cacForm}
        />
      )}
      
      {currentForm === 'directors' && (
        <DirectorDetailsForm
          onBack={handleBackToCAC}
          onNext={handleDirectorsFormNext}
          initialData={registrationData.directorsForm}
        />
      )}
      
      {currentForm === 'documents' && (
        <DocumentUploadForm
          onBack={handleBackToDirectors}
          onNext={handleDocumentsFormNext}
          initialData={registrationData.documentsForm}
        />
      )}

      {currentForm === 'payment' && (
        <PaymentForm
          onBack={handleBackToDocuments}
          onPaymentComplete={handlePaymentComplete}
          registrationData={registrationData}
          entityType={selectedEntityType}
          amount={getRegistrationFee()}
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
