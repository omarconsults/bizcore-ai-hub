
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

interface RegistrationFormProps {
  selectedEntityType: string;
  onBack: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ selectedEntityType, onBack }) => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building className="text-blue-900" size={28} />
            CAC Business Registration
          </h1>
          <Button 
            variant="outline" 
            onClick={onBack}
          >
            Back to Launch Toolkit
          </Button>
        </div>
        <p className="text-gray-600">Complete your business registration with our in-house CAC form</p>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Registration Form Integration</h2>
          <p className="text-gray-600 mb-4">
            The existing CAC business registration form from your dashboard will be integrated here.
          </p>
          <p className="text-sm text-gray-500">
            Selected Entity Type: <span className="font-medium text-blue-900">{selectedEntityType}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
