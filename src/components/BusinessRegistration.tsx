
import React, { useState } from 'react';
import { Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EntityTypeSelector from '@/components/business-launch/EntityTypeSelector';
import RegistrationForm from '@/components/business-launch/RegistrationForm';
import QuickActions from '@/components/business-launch/QuickActions';
import LaunchSteps from '@/components/business-launch/LaunchSteps';

const BusinessRegistration = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'registration'>('overview');
  const [selectedEntityType, setSelectedEntityType] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartRegistration = () => {
    if (selectedEntityType) {
      setCurrentView('registration');
    }
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
  };

  const handleNameSearch = () => {
    // This is handled within QuickActions component
    console.log('Name search initiated');
  };

  const handleDownloadForms = () => {
    console.log('Downloading forms...');
    // In a real app, this would trigger a download
  };

  const handleStepContinue = (stepIndex: number) => {
    console.log('Continuing step:', stepIndex);
    setCurrentStep(stepIndex + 1);
  };

  if (currentView === 'registration') {
    return (
      <RegistrationForm
        selectedEntityType={selectedEntityType}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="text-blue-900" size={28} />
              Business Registration
            </h1>
            <p className="text-gray-600 mt-1">Register your business with CAC and get compliant</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Entity Type Selection - Takes 2 columns */}
        <div className="lg:col-span-2">
          <EntityTypeSelector
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            onContinue={handleStartRegistration}
          />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="space-y-6">
          <QuickActions
            selectedEntityType={selectedEntityType}
            onStartRegistration={handleStartRegistration}
            onNameSearch={handleNameSearch}
            onDownloadForms={handleDownloadForms}
          />
          
          <LaunchSteps
            currentStep={currentStep}
            onStepContinue={handleStepContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration;
