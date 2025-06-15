
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings,
  FileText,
  BarChart3,
  Shield,
  LogOut,
  Coins,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const AdminSidebar = ({ activeModule, setActiveModule }: AdminSidebarProps) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'payments', name: 'Payments', icon: FileText },
    { id: 'tokens', name: 'Token Management', icon: Coins },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Shield className="text-white" size={18} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-red-600">Admin Portal</h1>
          </div>
        </div>
        <p className="text-xs text-gray-600 font-medium">BizCore Management</p>
        <div className="mt-2 text-xs text-gray-500">
          Logged in as: {user?.email}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeModule === module.id
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <module.icon size={20} />
            <span className="font-medium">{module.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={handleBackToDashboard}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-blue-600 hover:bg-blue-50"
        >
          <Sparkles size={20} />
          <span className="font-medium">Back to Dashboard</span>
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
