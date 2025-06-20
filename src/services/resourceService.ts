
import { supabase } from '@/integrations/supabase/client';

export interface FetchedResource {
  id: string;
  title: string;
  url: string;
  type: string;
  category: string;
  description?: string;
  created_at: string;
  source?: string;
  rating?: string;
  duration?: string;
}

export const fetchResources = async (): Promise<FetchedResource[]> => {
  try {
    const { data, error } = await supabase
      .from('knowledge_resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resources:', error);
      return [];
    }

    return (data || []).map(resource => ({
      id: resource.id,
      title: resource.title,
      url: resource.url,
      type: resource.type,
      category: resource.category,
      description: resource.description,
      created_at: resource.created_at || '',
      source: resource.source,
      rating: resource.rating?.toString(),
      duration: resource.duration
    }));
  } catch (error) {
    console.error('Error in fetchResources:', error);
    return [];
  }
};

export const searchResources = async (query: string): Promise<FetchedResource[]> => {
  try {
    const { data, error } = await supabase
      .from('knowledge_resources')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching resources:', error);
      return [];
    }

    return (data || []).map(resource => ({
      id: resource.id,
      title: resource.title,
      url: resource.url,
      type: resource.type,
      category: resource.category,
      description: resource.description,
      created_at: resource.created_at || '',
      source: resource.source,
      rating: resource.rating?.toString(),
      duration: resource.duration
    }));
  } catch (error) {
    console.error('Error in searchResources:', error);
    return [];
  }
};
