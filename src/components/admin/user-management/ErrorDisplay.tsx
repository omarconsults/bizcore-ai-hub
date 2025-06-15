
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-600 mt-1" size={20} />
          <div>
            <h3 className="font-medium text-red-800">Data Access Issue</h3>
            <p className="text-red-700 mt-1">{error}</p>
            <p className="text-sm text-red-600 mt-2">
              Note: This system can only see users who have interacted with tracked features (business profiles, tokens, onboarding, transactions).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
