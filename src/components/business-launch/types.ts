
export interface EntityType {
  type: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  cost: string;
}

export interface LaunchStep {
  step: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
  timeframe: string;
}

export interface BusinessLaunchProps {
  selectedEntityType: string;
  setSelectedEntityType: (type: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onStartRegistration: () => void;
  onNameSearch: () => void;
  onDownloadForms: () => void;
  onComplianceAlerts: () => void;
  onStepContinue: (stepIndex: number) => void;
}
