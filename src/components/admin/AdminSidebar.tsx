
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  DollarSign, 
  BarChart3, 
  Shield, 
  Settings, 
  Coins,
  Mail,
  Monitor,
  Activity,
  BookOpen,
  FileText
} from 'lucide-react';

interface AdminSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const AdminSidebar = ({ activeModule, setActiveModule }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'forms', name: 'Form Management', icon: FileText },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'payments', name: 'Payment Tracking', icon: DollarSign },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'tokens', name: 'Token Management', icon: Coins },
    { id: 'email', name: 'Email Management', icon: Mail },
    { id: 'monitoring', name: 'System Monitoring', icon: Monitor },
    { id: 'activity', name: 'Activity Tracking', icon: Activity },
    { id: 'knowledge', name: 'Knowledge Management', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-red-600">BizCore Admin</h1>
        <p className="text-xs text-gray-500 mt-1">Administration Portal</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeModule === item.id
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon size={18} />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500">
          <p>Admin Portal v1.0</p>
          <p>© 2024 BizCore</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
