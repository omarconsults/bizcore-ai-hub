
import React, { useEffect } from 'react';
import { 
  Home, 
  Shield, 
  Calculator, 
  Users, 
  Megaphone, 
  Target, 
  BookOpen,
  Settings,
  HelpCircle,
  Search,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface DashboardSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const DashboardSidebar = ({ activeModule, setActiveModule }: DashboardSidebarProps) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'registration', name: 'Business Registration', icon: Building2 },
    { id: 'compliance', name: 'Compliance Hub', icon: Shield },
    { id: 'operations', name: 'Operations', icon: Calculator },
    { id: 'hr', name: 'HR & Team', icon: Users },
    { id: 'marketing', name: 'Marketing', icon: Megaphone },
    { id: 'strategy', name: 'Strategy', icon: Target },
    { id: 'presence', name: 'Digital Presence', icon: Search },
    { id: 'knowledge', name: 'Knowledge Hub', icon: BookOpen },
  ];

  const bottomItems = [
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'help', name: 'Help & Support', icon: HelpCircle },
  ];

  const businessName = user?.user_metadata?.business_name || 'Your Business';
  const userEmail = user?.email || '';
  const userInitial = businessName.charAt(0).toUpperCase();

  // Enhanced mobile menu close functionality
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-blue-900">BizCore</h1>
            <p className="text-xs text-emerald-600 font-medium">AI Business OS</p>
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 lg:py-2 rounded-lg text-left transition-colors text-sm lg:text-base ${
              activeModule === module.id
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <module.icon size={18} className="flex-shrink-0" />
            <span className="font-medium truncate">{module.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-3 lg:p-4 border-t border-gray-200 space-y-1 lg:space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleModuleClick(item.id)}
            className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 lg:py-2 rounded-lg text-left transition-colors text-sm lg:text-base ${
              activeModule === item.id
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon size={18} className="flex-shrink-0" />
            <span className="font-medium truncate">{item.name}</span>
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-3 lg:p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base flex-shrink-0">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate text-sm lg:text-base">{businessName}</p>
            <p className="text-xs lg:text-sm text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - only show when sidebar is closed */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden fixed top-4 left-4 z-40 p-2 bg-blue-900 text-white rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay with improved interaction */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
          onClick={closeMobileMenu}
          onTouchStart={(e) => {
            // Prevent scrolling when overlay is touched
            e.preventDefault();
          }}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar with improved animations */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-2xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default DashboardSidebar;
