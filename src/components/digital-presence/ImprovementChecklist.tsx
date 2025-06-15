
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Clock } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  priority: string;
  category: string;
}

interface ImprovementChecklistProps {
  checklist: ChecklistItem[];
  checkedItems: string[];
  onToggleItem: (itemId: string) => void;
}

const ImprovementChecklist = ({ checklist, checkedItems, onToggleItem }: ImprovementChecklistProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Your Improvement Checklist
        </CardTitle>
        <p className="text-gray-600">Complete these tasks to boost your visibility score</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checklist.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => onToggleItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.timeEstimate}</span>
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority} priority
                      </Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Progress Tracking</h4>
          <div className="flex items-center gap-2 mb-2">
            <Progress value={(checkedItems.length / checklist.length) * 100} className="flex-1" />
            <span className="text-sm font-medium">
              {checkedItems.length}/{checklist.length} complete
            </span>
          </div>
          <p className="text-sm text-blue-700">
            Estimated score improvement: +{checkedItems.length * 3} points
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementChecklist;
