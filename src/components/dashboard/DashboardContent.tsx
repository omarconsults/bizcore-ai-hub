
import React from 'react';
import Dashboard from '@/components/Dashboard';
import ComplianceHub from '@/components/ComplianceHub';
import Operations from '@/components/Operations';
import KnowledgeHub from '@/components/KnowledgeHub';
import HRDashboard from '@/components/HRDashboard';
import Marketing from '@/components/Marketing';
import Strategy from '@/components/Strategy';
import DigitalPresenceAnalyzer from '@/components/DigitalPresenceAnalyzer';
import Settings from '@/components/Settings';

interface DashboardContentProps {
  activeModule: string;
}

const PlaceholderModule = ({ title }: { title: string }) => (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-1">This module is coming soon!</p>
    </div>
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
      <div className="text-4xl mb-4">🚀</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Under Development</h2>
      <p className="text-gray-600">We're working hard to bring you this feature. Stay tuned for updates!</p>
    </div>
  </div>
);

const DashboardContent = ({ activeModule }: DashboardContentProps) => {
  console.log('Rendering module:', activeModule);
  
  switch (activeModule) {
    case 'dashboard':
      return <Dashboard />;
    case 'launch':
      // Redirect launch to dashboard since they're now merged
      return <Dashboard />;
    case 'compliance':
      return <ComplianceHub />;
    case 'operations':
      return <Operations />;
    case 'team':
      return <HRDashboard />;
    case 'marketing':
      return <Marketing />;
    case 'strategy':
      return <Strategy />;
    case 'presence':
      return <DigitalPresenceAnalyzer />;
    case 'knowledge':
      return <KnowledgeHub />;
    case 'settings':
      return <Settings />;
    case 'help':
      return <PlaceholderModule title="Help & Support" />;
    default:
      console.log('Unknown module, defaulting to dashboard:', activeModule);
      return <Dashboard />;
  }
};

export default DashboardContent;
