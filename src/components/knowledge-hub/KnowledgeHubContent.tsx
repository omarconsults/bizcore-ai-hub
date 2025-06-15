
import React from 'react';
import FreshResourcesSection from './FreshResourcesSection';
import FeaturedResources from './FeaturedResources';
import ResourcesSection from './ResourcesSection';
import LearningTracks from './LearningTracks';
import QuickAccess from './QuickAccess';
import { featuredResources, learningTracks } from './constants';
import { type FetchedResource } from '@/services/resourceService';

interface KnowledgeHubContentProps {
  internetResources: FetchedResource[];
  storedResources: FetchedResource[];
  isLoading: boolean;
  searchTerm: string;
  activeCategory: string;
}

const KnowledgeHubContent = ({
  internetResources,
  storedResources,
  isLoading,
  searchTerm,
  activeCategory
}: KnowledgeHubContentProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <FreshResourcesSection resources={internetResources} />

        {activeCategory === 'all' && (
          <FeaturedResources resources={featuredResources} />
        )}

        <ResourcesSection
          storedResources={storedResources}
          isLoading={isLoading}
          searchTerm={searchTerm}
          activeCategory={activeCategory}
        />
      </div>

      <div className="space-y-6">
        <LearningTracks tracks={learningTracks} />
        <QuickAccess />
      </div>
    </div>
  );
};

export default KnowledgeHubContent;
