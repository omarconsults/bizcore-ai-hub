
import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import SubscriptionManagement from './SubscriptionManagement';
import PaymentTracking from './PaymentTracking';
import AdminAnalytics from './AdminAnalytics';
import ComplianceOverview from './ComplianceOverview';
import AdminSettings from './AdminSettings';

interface AdminContentProps {
  activeModule: string;
}

const AdminContent = ({ activeModule }: AdminContentProps) => {
  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'payments':
        return <PaymentTracking />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'compliance':
        return <ComplianceOverview />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
};

export default AdminContent;
