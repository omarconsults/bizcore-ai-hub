
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';
import { createLaunchSteps } from './constants';

interface LaunchStepsProps {
  currentStep: number;
  onStepContinue: (stepIndex: number) => void;
}

const LaunchSteps: React.FC<LaunchStepsProps> = ({ currentStep, onStepContinue }) => {
  const launchSteps = createLaunchSteps(currentStep);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Business Registration Steps</CardTitle>
        <p className="text-gray-600">Complete these steps to get your business fully registered</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {launchSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {step.status === 'completed' ? (
                <CheckCircle className="text-emerald-600" size={20} />
              ) : step.status === 'in-progress' ? (
                <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{step.step}</h3>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  {step.timeframe}
                </div>
                {step.status === 'in-progress' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onStepContinue(index)}
                  >
                    Continue
                  </Button>
                )}
                {step.status === 'pending' && (
                  <Button size="sm" variant="ghost" className="text-gray-400" disabled>
                    Pending
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LaunchSteps;
