
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResourceCard from './ResourceCard';
import { getTypeIcon, getTypeColor } from './utils';
import { type FetchedResource } from '@/services/resourceService';
import { allResources } from './constants';

interface ResourcesSectionProps {
  storedResources: FetchedResource[];
  isLoading: boolean;
  searchTerm: string;
  activeCategory: string;
}

const ResourcesSection = ({ storedResources, isLoading, searchTerm, activeCategory }: ResourcesSectionProps) => {
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {storedResources.length > 0 ? 'Stored Resources' : 'Available Resources'}
      </h2>
      
      {isLoading ? (
        <div className="text-center py-8">
          <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
          <p className="text-gray-600">Loading resources...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {storedResources.map((resource, index) => (
            <ResourceCard key={`stored-${index}`} resource={resource} />
          ))}
          
          {storedResources.length === 0 && filteredResources.map((resource, index) => (
            <Card key={index} className="border border-gray-200 hover:border-blue-900 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {React.createElement(getTypeIcon(resource.type), { 
                      className: getTypeColor(resource.type).includes('blue') ? "text-blue-600" : 
                                getTypeColor(resource.type).includes('emerald') ? "text-emerald-600" :
                                getTypeColor(resource.type).includes('purple') ? "text-purple-600" : "text-orange-600",
                      size: 16 
                    })}
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{resource.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesSection;
