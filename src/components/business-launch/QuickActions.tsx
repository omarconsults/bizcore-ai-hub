
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import NameSearchForm from './forms/NameSearchForm';

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
  const [showNameSearch, setShowNameSearch] = useState(false);

  const handleNameSearch = () => {
    setShowNameSearch(true);
  };

  const handleNameSelected = (name: string) => {
    console.log('Selected name:', name);
    // You could pass this back to parent component if needed
  };

  return (
    <>
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
            onClick={handleNameSearch}
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

      <NameSearchForm
        isOpen={showNameSearch}
        onClose={() => setShowNameSearch(false)}
        onNameSelected={handleNameSelected}
      />
    </>
  );
};

export default QuickActions;
