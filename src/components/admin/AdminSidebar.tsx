import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Menu,
  X,
  Mail,
  Monitor,
  Activity
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'payments', name: 'Payments', icon: FileText },
    { id: 'tokens', name: 'Token Management', icon: Coins },
    { id: 'email', name: 'Email Management', icon: Mail },
    { id: 'monitoring', name: 'System Monitoring', icon: Monitor },
    { id: 'activity', name: 'Activity Tracking', icon: Activity },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Enhanced mobile menu close functionality
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    closeMobileMenu(); // Always close on module selection
  };

  // Add escape key support and auto-close on route changes
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      // Close mobile menu if screen becomes large
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  // Auto-close when activeModule changes (route change)
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [activeModule]);

  const SidebarContent = () => (
    <>
      {/* Logo with close button for mobile */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={16} />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-red-600">Admin Portal</h1>
            </div>
          </div>
          {/* Close button - only visible on mobile */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        <p className="text-xs text-gray-600 font-medium">BizCore Management</p>
        <div className="mt-2 text-xs text-gray-500 truncate">
          Logged in as: {user?.email}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 lg:py-2 rounded-lg text-left transition-colors text-sm lg:text-base ${
              activeModule === module.id
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <module.icon size={18} className="flex-shrink-0" />
            <span className="font-medium truncate">{module.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 lg:p-4 border-t border-gray-200 space-y-1 lg:space-y-2">
        <button
          onClick={handleBackToDashboard}
          className="w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 lg:py-2 rounded-lg text-left transition-colors text-blue-600 hover:bg-blue-50 text-sm lg:text-base"
        >
          <Sparkles size={18} className="flex-shrink-0" />
          <span className="font-medium truncate">Back to Dashboard</span>
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 lg:py-2 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100 text-sm lg:text-base"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span className="font-medium truncate">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
        aria-label="Toggle admin sidebar"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
          onClick={closeMobileMenu}
          onTouchStart={(e) => {
            e.preventDefault();
          }}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-2xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default AdminSidebar;
