
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Building } from 'lucide-react';
import EntityTypeSelector from './business-launch/EntityTypeSelector';
import LaunchSteps from './business-launch/LaunchSteps';
import QuickActions from './business-launch/QuickActions';
import CostBreakdown from './business-launch/CostBreakdown';
import ComplianceReminder from './business-launch/ComplianceReminder';
import RegistrationForm from './business-launch/RegistrationForm';
import { createLaunchSteps } from './business-launch/constants';

const BusinessLaunch = () => {
  const [selectedEntityType, setSelectedEntityType] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { toast } = useToast();

  const launchSteps = createLaunchSteps(currentStep);
  const completedSteps = launchSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / launchSteps.length) * 100;

  const handleContinueWithEntityType = () => {
    if (!selectedEntityType) return;
    
    toast({
      title: "Entity Type Selected",
      description: `You've chosen ${selectedEntityType}. Let's start the registration process!`,
    });
    
    setCurrentStep(1);
  };

  const handleStepContinue = (stepIndex: number) => {
    setCurrentStep(stepIndex + 1);
    toast({
      title: "Step Completed",
      description: `${launchSteps[stepIndex].step} has been marked as complete.`,
    });
  };

  const handleStartRegistration = () => {
    setShowRegistrationForm(true);
    toast({
      title: "Starting Registration",
      description: "Opening the in-house CAC registration form...",
    });
  };

  const handleNameSearch = () => {
    toast({
      title: "Name Search",
      description: "Use our in-house name search feature to check availability...",
    });
  };

  const handleDownloadForms = () => {
    toast({
      title: "Downloading Forms",
      description: "Preparing registration documents for download...",
    });
  };

  const handleComplianceAlerts = () => {
    toast({
      title: "Compliance Alerts",
      description: "Setting up compliance reminders for your business...",
    });
  };

  if (showRegistrationForm) {
    return (
      <RegistrationForm 
        selectedEntityType={selectedEntityType}
        onBack={() => setShowRegistrationForm(false)}
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
              <Building className="text-blue-900" size={28} />
              Business Launch Toolkit
            </h1>
            <p className="text-gray-600 mt-1">Get your business legally registered and compliant in Nigeria</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-lg font-semibold text-emerald-600">{Math.round(progressPercentage)}%</div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Entity Type Advisor & Launch Steps */}
        <div className="lg:col-span-2">
          <EntityTypeSelector
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            onContinue={handleContinueWithEntityType}
          />

          <LaunchSteps
            currentStep={currentStep}
            onStepContinue={handleStepContinue}
          />
        </div>

        {/* Quick Actions & Resources */}
        <div className="space-y-6">
          <QuickActions
            selectedEntityType={selectedEntityType}
            onStartRegistration={handleStartRegistration}
            onNameSearch={handleNameSearch}
            onDownloadForms={handleDownloadForms}
          />

          <CostBreakdown />

          <ComplianceReminder onComplianceAlerts={handleComplianceAlerts} />
        </div>
      </div>
    </div>
  );
};

export default BusinessLaunch;
