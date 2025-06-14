
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Star, ExternalLink } from 'lucide-react';
import { getTypeIcon, getTypeColor } from './utils';
import { type FetchedResource } from '@/services/resourceService';

interface ResourceCardProps {
  resource: FetchedResource;
  isFromInternet?: boolean;
}

const ResourceCard = ({ resource, isFromInternet = false }: ResourceCardProps) => {
  const TypeIcon = getTypeIcon(resource.type);

  return (
    <Card className="border border-gray-200 hover:border-blue-900 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TypeIcon className="text-blue-600" size={16} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
                {isFromInternet && (
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                    <Globe size={10} className="mr-1" />
                    Fresh
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getTypeColor(resource.type)}>
                  {resource.type}
                </Badge>
                {resource.source && (
                  <span className="text-xs text-gray-500">by {resource.source}</span>
                )}
                {resource.rating && (
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    <span className="text-xs text-gray-600">{resource.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {resource.url && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open(resource.url, '_blank')}
              >
                <ExternalLink size={14} className="mr-1" />
                Access
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
