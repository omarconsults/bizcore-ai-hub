
import React from 'react';

interface ComplianceTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ComplianceTabs: React.FC<ComplianceTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', name: 'Compliance Overview' },
    { id: 'documents', name: 'Document Generator' },
    { id: 'calendar', name: 'Compliance Calendar' },
    { id: 'vault', name: 'Document Vault' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ComplianceTabs;
