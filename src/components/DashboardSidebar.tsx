import React from 'react';
import { 
  Home, 
  Building, 
  Shield, 
  Calculator, 
  Users, 
  Megaphone, 
  Target, 
  BarChart3, 
  BookOpen,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardSidebar = ({ activeModule, setActiveModule }) => {
  const { user } = useAuth();

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'launch', name: 'Business Launch', icon: Building },
    { id: 'compliance', name: 'Compliance Hub', icon: Shield },
    { id: 'operations', name: 'Operations', icon: Calculator },
    { id: 'team', name: 'HR & Team', icon: Users },
    { id: 'marketing', name: 'Marketing', icon: Megaphone },
    { id: 'strategy', name: 'Strategy', icon: Target },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'knowledge', name: 'Knowledge Hub', icon: BookOpen },
  ];

  const bottomItems = [
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'help', name: 'Help & Support', icon: HelpCircle },
  ];

  const businessName = user?.user_metadata?.business_name || 'Your Business';
  const userEmail = user?.email || '';
  const userInitial = businessName.charAt(0).toUpperCase();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-900">BizCore</h1>
        <p className="text-xs text-emerald-600 font-medium">AI Business OS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeModule === module.id
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <module.icon size={20} />
            <span className="font-medium">{module.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeModule === item.id
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{businessName}</p>
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
