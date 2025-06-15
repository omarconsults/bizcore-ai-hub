
import { useState, useEffect } from 'react';
import { fetchResources, searchResources, FetchedResource } from '@/services/resourceService';

export const useKnowledgeResources = () => {
  const [resources, setResources] = useState<FetchedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [internetResources, setInternetResources] = useState<FetchedResource[]>([]);
  const [isFetchingNew, setIsFetchingNew] = useState(false);

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'guide', name: 'Guides', count: resources.filter(r => r.type === 'guide').length },
    { id: 'template', name: 'Templates', count: resources.filter(r => r.type === 'template').length },
    { id: 'video', name: 'Videos', count: resources.filter(r => r.type === 'video').length },
    { id: 'course', name: 'Courses', count: resources.filter(r => r.type === 'course').length }
  ];

  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchResources();
      setResources(data);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Failed to load resources');
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const searchResourcesQuery = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchResources(query);
      setResources(data);
    } catch (err) {
      console.error('Error searching resources:', err);
      setError('Failed to search resources');
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewResources = async () => {
    try {
      setIsFetchingNew(true);
      // Simulate fetching from web - in a real implementation this would call an API
      const mockInternetResources: FetchedResource[] = [
        {
          id: 'web-1',
          title: 'Latest CAC Registration Updates 2024',
          url: 'https://cac.gov.ng',
          type: 'guide',
          category: 'registration',
          description: 'Recent updates to business registration requirements',
          created_at: new Date().toISOString()
        },
        {
          id: 'web-2',
          title: 'New Tax Compliance Guidelines',
          url: 'https://firs.gov.ng',
          type: 'guide',
          category: 'tax',
          description: 'Updated tax filing requirements for businesses',
          created_at: new Date().toISOString()
        }
      ];
      setInternetResources(mockInternetResources);
    } catch (err) {
      console.error('Error fetching new resources:', err);
    } finally {
      setIsFetchingNew(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  return {
    resources,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    internetResources,
    storedResources: resources,
    isLoading: loading,
    isFetchingNew,
    hasDbError: !!error,
    categories,
    refetch: loadResources,
    searchResources: searchResourcesQuery,
    fetchNewResources
  };
};
