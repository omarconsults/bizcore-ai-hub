
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Building, TrendingUp, Users, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EntityTypeSelector from './business-launch/EntityTypeSelector';
import LaunchSteps from './business-launch/LaunchSteps';
import QuickActions from './business-launch/QuickActions';
import CostBreakdown from './business-launch/CostBreakdown';
import ComplianceReminder from './business-launch/ComplianceReminder';
import RegistrationForm from './business-launch/RegistrationForm';
import { createLaunchSteps } from './business-launch/constants';

const Dashboard = () => {
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
              Business Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Manage your business registration and growth in one place</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Registration Progress</div>
            <div className="text-lg font-semibold text-emerald-600">{Math.round(progressPercentage)}%</div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Registration Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="text-blue-900" size={20} />
          Business Registration Center
        </h2>
        
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
    </div>
  );
};

export default Dashboard;
