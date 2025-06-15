
// This service handles resource management
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

// Mock service for now - can be replaced with actual API calls
export const fetchResources = async (): Promise<FetchedResource[]> => {
  // Return empty array for now since the actual knowledge_resources table doesn't exist
  // This prevents the build error while maintaining the interface
  return [];
};

export const searchResources = async (query: string): Promise<FetchedResource[]> => {
  // Return empty array for now
  return [];
};
