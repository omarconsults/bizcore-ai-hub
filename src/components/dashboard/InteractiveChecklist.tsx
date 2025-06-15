
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const InteractiveChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const checklistItems: ChecklistItem[] = [
    {
      id: 'cac-registration',
      title: 'Complete CAC Registration',
      description: 'Register your business with the Corporate Affairs Commission',
      priority: 'high',
      category: 'Legal'
    },
    {
      id: 'tax-registration',
      title: 'Tax Registration',
      description: 'Register for Federal Inland Revenue Service (FIRS)',
      priority: 'high',
      category: 'Tax'
    },
    {
      id: 'bank-account',
      title: 'Open Business Bank Account',
      description: 'Set up a dedicated business banking account',
      priority: 'high',
      category: 'Banking'
    },
    {
      id: 'insurance',
      title: 'Get Business Insurance',
      description: 'Protect your business with appropriate insurance coverage',
      priority: 'medium',
      category: 'Insurance'
    },
    {
      id: 'vat-registration',
      title: 'VAT Registration',
      description: 'Register for Value Added Tax if applicable',
      priority: 'medium',
      category: 'Tax'
    },
    {
      id: 'business-permit',
      title: 'Obtain Business Permits',
      description: 'Get industry-specific permits and licenses',
      priority: 'medium',
      category: 'Legal'
    },
    {
      id: 'website-setup',
      title: 'Create Business Website',
      description: 'Establish your online presence',
      priority: 'low',
      category: 'Digital'
    },
    {
      id: 'social-media',
      title: 'Set Up Social Media',
      description: 'Create business profiles on relevant platforms',
      priority: 'low',
      category: 'Digital'
    }
  ];

  const handleToggleItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const completionPercentage = (checkedItems.length / checklistItems.length) * 100;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-blue-900" size={20} />
          Business Setup Checklist
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{checkedItems.length}/{checklistItems.length} completed</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {checklistItems.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <div 
              key={item.id} 
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                isChecked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => handleToggleItem(item.id)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-medium ${isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.title}
                  </h4>
                  {isChecked && <CheckCircle className="text-green-600" size={16} />}
                </div>
                <p className={`text-sm mb-2 ${isChecked ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(item.priority)}>
                    {item.priority} priority
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
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
