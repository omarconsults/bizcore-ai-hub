
import React, { useState, useEffect } from 'react';
import { Globe, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResourceService, type FetchedResource } from '@/services/resourceService';
import KnowledgeHubHeader from './knowledge-hub/KnowledgeHubHeader';
import CategoryFilter from './knowledge-hub/CategoryFilter';
import ResourceCard from './knowledge-hub/ResourceCard';
import FeaturedResources from './knowledge-hub/FeaturedResources';
import LearningTracks from './knowledge-hub/LearningTracks';
import QuickAccess from './knowledge-hub/QuickAccess';
import { featuredResources, allResources, learningTracks } from './knowledge-hub/constants';
import { getTypeIcon, getTypeColor } from './knowledge-hub/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const KnowledgeHub = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [internetResources, setInternetResources] = useState<FetchedResource[]>([]);
  const [storedResources, setStoredResources] = useState<FetchedResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNew, setIsFetchingNew] = useState(false);

  const categories = [
    { id: 'all', name: 'All Resources', count: storedResources.length },
    { id: 'compliance', name: 'Compliance & Legal', count: storedResources.filter(r => r.category === 'compliance').length },
    { id: 'finance', name: 'Finance & Tax', count: storedResources.filter(r => r.category === 'finance').length },
    { id: 'hr', name: 'HR & Employment', count: storedResources.filter(r => r.category === 'hr').length },
    { id: 'marketing', name: 'Marketing & Sales', count: storedResources.filter(r => r.category === 'marketing').length },
    { id: 'operations', name: 'Operations', count: storedResources.filter(r => r.category === 'operations').length }
  ];

  useEffect(() => {
    loadStoredResources();
  }, []);

  useEffect(() => {
    loadStoredResources();
  }, [activeCategory, searchTerm]);

  const loadStoredResources = async () => {
    try {
      setIsLoading(true);
      const resources = await ResourceService.getStoredResources(activeCategory, searchTerm);
      setStoredResources(resources);
    } catch (error) {
      console.error('Error loading stored resources:', error);
      toast({
        title: "Error",
        description: "Failed to load stored resources",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewResources = async () => {
    try {
      setIsFetchingNew(true);
      const result = await ResourceService.refreshResources(activeCategory);
      
      setInternetResources(result.fresh);
      setStoredResources(result.stored);
      
      toast({
        title: "Resources Updated",
        description: `Found ${result.fresh.length} new resources from the internet`,
      });
    } catch (error) {
      console.error('Error fetching new resources:', error);
      toast({
        title: "Error",
        description: "Failed to fetch new resources from the internet",
        variant: "destructive",
      });
    } finally {
      setIsFetchingNew(false);
    }
  };

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <KnowledgeHubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFetchNew={fetchNewResources}
        isFetchingNew={isFetchingNew}
      />

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {internetResources.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="text-emerald-600" size={20} />
                Fresh from the Web
              </h2>
              <div className="grid gap-4">
                {internetResources.map((resource, index) => (
                  <ResourceCard key={`web-${index}`} resource={resource} isFromInternet={true} />
                ))}
              </div>
            </div>
          )}

          {activeCategory === 'all' && (
            <FeaturedResources resources={featuredResources} />
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {storedResources.length > 0 ? 'Stored Resources' : 'All Resources'}
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
        </div>

        <div className="space-y-6">
          <LearningTracks tracks={learningTracks} />
          <QuickAccess />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
