
import React from 'react';
import { BookOpen, Globe, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface KnowledgeHubHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onFetchNew: () => void;
  isFetchingNew: boolean;
}

const KnowledgeHubHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  onFetchNew, 
  isFetchingNew 
}: KnowledgeHubHeaderProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-blue-900" size={28} />
            Knowledge Hub
          </h1>
          <p className="text-gray-600 mt-1">Learn, grow, and stay compliant with our comprehensive resources</p>
        </div>
        
        <Button 
          onClick={onFetchNew} 
          disabled={isFetchingNew}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
        >
          {isFetchingNew ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              Fetch Latest
            </>
          )}
        </Button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides, templates, videos..."
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHubHeader;
