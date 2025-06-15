
import React from 'react';
import Dashboard from '@/components/Dashboard';
import Operations from '@/components/Operations';
import ComplianceHub from '@/components/ComplianceHub';
import HRDashboard from '@/components/HRDashboard';
import Strategy from '@/components/Strategy';
import Marketing from '@/components/Marketing';
import KnowledgeHub from '@/components/KnowledgeHub';
import Settings from '@/components/Settings';
import DigitalPresenceAnalyzer from '@/components/DigitalPresenceAnalyzer';

interface DashboardContentProps {
  activeModule: string;
}

const DashboardContent = ({ activeModule }: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'operations':
        return <Operations />;
      case 'compliance':
        return <ComplianceHub />;
      case 'hr':
        return <HRDashboard />;
      case 'strategy':
        return <Strategy />;
      case 'marketing':
        return <Marketing />;
      case 'knowledge':
        return <KnowledgeHub />;
      case 'presence':
        return <DigitalPresenceAnalyzer />;
      case 'settings':
        return <Settings />;
      case 'help':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Help & Support</h1>
            <p className="text-gray-600">Need help? Contact our support team or browse our knowledge base.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {renderContent()}
    </div>
  );
};

export default DashboardContent;
