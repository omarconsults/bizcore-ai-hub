
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star } from 'lucide-react';
import { getTypeIcon, getTypeColor } from './utils';
import { Resource } from './types';

interface FeaturedResourcesProps {
  resources: Resource[];
}

const FeaturedResources = ({ resources }: FeaturedResourcesProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
      <div className="grid gap-6">
        {resources.map((resource, index) => {
          const TypeIcon = getTypeIcon(resource.type);
          
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <TypeIcon className="text-blue-600" size={16} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          {resource.duration && (
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">{resource.duration}</span>
                            </div>
                          )}
                          {resource.rating && (
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500" />
                              <span className="text-sm text-gray-600">{resource.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(resource.type)}>
                            {resource.type}
                          </Badge>
                          {resource.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="bg-blue-900 hover:bg-blue-800">
                        {resource.type === 'template' ? 'Download' : 
                         resource.type === 'video' ? 'Watch' : 'Read'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedResources;
