
import React from 'react';
import { Globe } from 'lucide-react';
import ResourceCard from './ResourceCard';
import { type FetchedResource } from '@/services/resourceService';

interface FreshResourcesSectionProps {
  resources: FetchedResource[];
}

const FreshResourcesSection = ({ resources }: FreshResourcesSectionProps) => {
  if (resources.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Globe className="text-emerald-600" size={20} />
        Fresh from the Web
      </h2>
      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <ResourceCard key={`web-${index}`} resource={resource} isFromInternet={true} />
        ))}
      </div>
    </div>
  );
};

export default FreshResourcesSection;
