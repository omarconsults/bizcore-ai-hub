
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Target, Loader2 } from 'lucide-react';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { useToast } from '@/hooks/use-toast';

interface ChecklistItemData {
  key: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const checklistItemsData: ChecklistItemData[] = [
  {
    key: 'cac-registration',
    title: 'Complete CAC Registration',
    description: 'Register your business with the Corporate Affairs Commission',
    priority: 'high',
    category: 'Legal'
  },
  {
    key: 'tax-registration',
    title: 'Tax Registration',
    description: 'Register for Federal Inland Revenue Service (FIRS)',
    priority: 'high',
    category: 'Tax'
  },
  {
    key: 'bank-account',
    title: 'Open Business Bank Account',
    description: 'Set up a dedicated business banking account',
    priority: 'high',
    category: 'Banking'
  },
  {
    key: 'insurance',
    title: 'Get Business Insurance',
    description: 'Protect your business with appropriate insurance coverage',
    priority: 'medium',
    category: 'Insurance'
  },
  {
    key: 'vat-registration',
    title: 'VAT Registration',
    description: 'Register for Value Added Tax if applicable',
    priority: 'medium',
    category: 'Tax'
  },
  {
    key: 'business-permit',
    title: 'Obtain Business Permits',
    description: 'Get industry-specific permits and licenses',
    priority: 'medium',
    category: 'Legal'
  },
  {
    key: 'website-setup',
    title: 'Create Business Website',
    description: 'Establish your online presence',
    priority: 'low',
    category: 'Digital'
  },
  {
    key: 'social-media',
    title: 'Set Up Social Media',
    description: 'Create business profiles on relevant platforms',
    priority: 'low',
    category: 'Digital'
  }
];

const InteractiveChecklist = () => {
  const { businessProfile, onboardingSteps, loading, updateStepProgress, getCompletionPercentage } = useBusinessProfile();
  const { toast } = useToast();

  const handleToggleItem = async (stepKey: string, currentStatus: boolean) => {
    try {
      await updateStepProgress(stepKey, !currentStatus);
      toast({
        title: !currentStatus ? "Step completed!" : "Step unmarked",
        description: !currentStatus ? "Great progress on your business setup." : "Step has been unmarked.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="animate-spin" size={24} />
          <span className="ml-2">Loading checklist...</span>
        </CardContent>
      </Card>
    );
  }

  const completionPercentage = getCompletionPercentage();

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-blue-900" size={20} />
          Business Setup Checklist
          {businessProfile?.has_existing_business && (
            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              Existing Business
            </Badge>
          )}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">
              {onboardingSteps.filter(s => s.is_completed || s.is_skipped).length}/{onboardingSteps.length} completed
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {checklistItemsData.map((itemData) => {
          const stepProgress = onboardingSteps.find(step => step.step_key === itemData.key);
          const isCompleted = stepProgress?.is_completed || false;
          const isSkipped = stepProgress?.is_skipped || false;
          
          return (
            <div 
              key={itemData.key} 
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                isCompleted || isSkipped ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Checkbox
                checked={isCompleted}
                onCheckedChange={() => handleToggleItem(itemData.key, isCompleted)}
                className="mt-0.5"
                disabled={isSkipped}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-medium ${
                    isCompleted || isSkipped ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {itemData.title}
                  </h4>
                  {isCompleted && <CheckCircle className="text-green-600" size={16} />}
                  {isSkipped && (
                    <Badge variant="secondary" className="text-xs">
                      Pre-completed
                    </Badge>
                  )}
                </div>
                <p className={`text-sm mb-2 ${
                  isCompleted || isSkipped ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {itemData.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(itemData.priority)}>
                    {itemData.priority} priority
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {itemData.category}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
        
        {completionPercentage === 100 && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="font-medium text-green-800">Congratulations!</p>
            <p className="text-sm text-green-600">You've completed all setup tasks</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveChecklist;
