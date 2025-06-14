
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { entityTypes } from './constants';

interface EntityTypeSelectorProps {
  selectedEntityType: string;
  setSelectedEntityType: (type: string) => void;
  onContinue: () => void;
}

const EntityTypeSelector: React.FC<EntityTypeSelectorProps> = ({
  selectedEntityType,
  setSelectedEntityType,
  onContinue
}) => {
  return (
    <Card className="border-0 shadow-sm mb-6">
      <CardHeader>
        <CardTitle>Choose Your Business Structure</CardTitle>
        <p className="text-gray-600">Select the entity type that best fits your business goals</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {entityTypes.map((entity, index) => (
          <div 
            key={index}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedEntityType === entity.type 
                ? 'border-blue-900 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedEntityType(entity.type)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{entity.type}</h3>
                <p className="text-sm text-gray-600 mt-1">{entity.description}</p>
                
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-emerald-600">Pros:</h4>
                    <ul className="text-sm text-gray-600 mt-1">
                      {entity.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-red-600">Cons:</h4>
                    <ul className="text-sm text-gray-600 mt-1">
                      {entity.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Best for: </span>
                    <span className="text-sm font-medium text-gray-700">{entity.bestFor}</span>
                  </div>
                  <div className="text-sm font-semibold text-blue-900">{entity.cost}</div>
                </div>
              </div>
              
              {selectedEntityType === entity.type && (
                <CheckCircle className="text-blue-900 ml-4" size={24} />
              )}
            </div>
          </div>
        ))}
        
        {selectedEntityType && (
          <Button 
            className="w-full bg-blue-900 hover:bg-blue-800"
            onClick={onContinue}
          >
            Continue with {selectedEntityType}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EntityTypeSelector;
