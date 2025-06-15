
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ResourceService, type FetchedResource } from '@/services/resourceService';

export const useKnowledgeResources = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [internetResources, setInternetResources] = useState<FetchedResource[]>([]);
  const [storedResources, setStoredResources] = useState<FetchedResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNew, setIsFetchingNew] = useState(false);
  const [hasDbError, setHasDbError] = useState(false);

  const categories = [
    { id: 'all', name: 'All Resources', count: storedResources.length },
    { id: 'compliance', name: 'Compliance & Legal', count: storedResources.filter(r => r.category === 'compliance').length },
    { id: 'finance', name: 'Finance & Tax', count: storedResources.filter(r => r.category === 'finance').length },
    { id: 'hr', name: 'HR & Employment', count: storedResources.filter(r => r.category === 'hr').length },
    { id: 'marketing', name: 'Marketing & Sales', count: storedResources.filter(r => r.category === 'marketing').length },
    { id: 'operations', name: 'Operations', count: storedResources.filter(r => r.category === 'operations').length }
  ];

  const loadStoredResources = async () => {
    try {
      setIsLoading(true);
      setHasDbError(false);
      const resources = await ResourceService.getStoredResources(activeCategory, searchTerm);
      setStoredResources(resources);
    } catch (error) {
      console.error('Error loading stored resources:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('knowledge_resources') || errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
        setHasDbError(true);
      } else {
        toast({
          title: "Error",
          description: "Failed to load stored resources",
          variant: "destructive",
        });
      }
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
      setHasDbError(false);
      
      toast({
        title: "Resources Updated",
        description: `Found ${result.fresh.length} new resources from the internet`,
      });
    } catch (error) {
      console.error('Error fetching new resources:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('knowledge_resources') || errorMessage.includes('relation')) {
        setHasDbError(true);
        toast({
          title: "Database Setup Required",
          description: "Please set up the knowledge resources database to use this feature",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch new resources from the internet",
          variant: "destructive",
        });
      }
    } finally {
      setIsFetchingNew(false);
    }
  };

  useEffect(() => {
    loadStoredResources();
  }, []);

  useEffect(() => {
    if (!hasDbError) {
      loadStoredResources();
    }
  }, [activeCategory, searchTerm, hasDbError]);

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    internetResources,
    storedResources,
    isLoading,
    isFetchingNew,
    hasDbError,
    categories,
    fetchNewResources
  };
};
