
import { supabase } from '@/integrations/supabase/client';

export interface FetchedResource {
  id?: string;
  title: string;
  description: string;
  url: string;
  type: 'guide' | 'template' | 'video' | 'course';
  category: string;
  source: string;
  tags: string[];
  fetched_at: string;
  rating?: number;
  duration?: string;
}

export class ResourceService {
  static async fetchResources(query: string = '', category: string = 'all', sources?: string[]) {
    try {
      console.log('Fetching resources for:', { query, category, sources });
      
      const { data, error } = await supabase.functions.invoke('fetch-resources', {
        body: { query, category, sources }
      });

      if (error) {
        console.error('Error calling fetch-resources function:', error);
        throw error;
      }

      console.log('Fetched resources:', data);
      return data;
    } catch (error) {
      console.error('Error in fetchResources:', error);
      throw error;
    }
  }

  static async getStoredResources(category: string = 'all', searchTerm: string = '') {
    try {
      let query = supabase
        .from('knowledge_resources')
        .select('*')
        .order('rating', { ascending: false });

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching stored resources:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getStoredResources:', error);
      throw error;
    }
  }

  static async refreshResources(category: string = 'all') {
    try {
      // Fetch new resources from the internet
      const freshData = await this.fetchResources('', category);
      
      // Get updated stored resources
      const storedResources = await this.getStoredResources(category);
      
      return {
        fresh: freshData?.resources || [],
        stored: storedResources
      };
    } catch (error) {
      console.error('Error refreshing resources:', error);
      throw error;
    }
  }
}
