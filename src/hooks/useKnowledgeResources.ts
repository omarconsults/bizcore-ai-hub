
import { useState, useEffect } from 'react';
import { fetchResources, searchResources, FetchedResource } from '@/services/resourceService';

export const useKnowledgeResources = () => {
  const [resources, setResources] = useState<FetchedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadResources();
  }, []);

  return {
    resources,
    loading,
    error,
    refetch: loadResources,
    searchResources: searchResourcesQuery
  };
};
