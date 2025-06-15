
import React from 'react';
import { useKnowledgeResources } from '@/hooks/useKnowledgeResources';
import KnowledgeHubHeader from './knowledge-hub/KnowledgeHubHeader';
import CategoryFilter from './knowledge-hub/CategoryFilter';
import DatabaseErrorAlert from './knowledge-hub/DatabaseErrorAlert';
import KnowledgeHubContent from './knowledge-hub/KnowledgeHubContent';

const KnowledgeHub = () => {
  const {
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
  } = useKnowledgeResources();

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

      {hasDbError && <DatabaseErrorAlert />}

      <KnowledgeHubContent
        internetResources={internetResources}
        storedResources={storedResources}
        isLoading={isLoading}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
      />
    </div>
  );
};

export default KnowledgeHub;
