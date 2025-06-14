
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface QuickActionsProps {
  selectedEntityType: string;
  onStartRegistration: () => void;
  onNameSearch: () => void;
  onDownloadForms: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  selectedEntityType,
  onStartRegistration,
  onNameSearch,
  onDownloadForms
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-blue-900" size={20} />
          In-House Registration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={onStartRegistration}
          disabled={!selectedEntityType}
        >
          Start Registration Form
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onNameSearch}
        >
          Search Business Name
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onDownloadForms}
        >
          Download Forms
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
