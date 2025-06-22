
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onAuthClick?: () => void;
}

const Navbar = ({ onAuthClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Enhanced mobile menu close functionality
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else if (onAuthClick) {
      onAuthClick();
    }
    closeMobileMenu();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMobileMenu(); // Always close on navigation
  };

  // Add escape key support and auto-close functionality
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      // Close mobile menu if screen becomes large
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavigation('/')}>
              <div className="flex items-center gap-2">
                <img src="/lovable-uploads/6a0e5efd-2366-477b-8fd2-53d719319ed6.png" alt="BizCore Logo" className="h-8 w-auto" />
              </div>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4 xl:space-x-8">
              <button onClick={() => handleNavigation('#')} className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Features</button>
              <button onClick={() => handleNavigation('/pricing')} className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Pricing</button>
              <button onClick={() => handleNavigation('/help')} className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Resources</button>
              <button onClick={() => handleNavigation('/contact')} className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Contact</button>
            </div>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <>
                <span className="text-xs lg:text-sm text-gray-700 max-w-24 lg:max-w-32 xl:max-w-none truncate">
                  Welcome, {user.user_metadata?.business_name || user.email}
                </span>
                <Button variant="outline" onClick={handleAuthAction} className="border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 text-xs lg:text-sm px-2 lg:px-3 py-2">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onAuthClick} className="border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 text-xs lg:text-sm px-2 lg:px-3 py-2">
                  Sign In
                </Button>
                <Button onClick={onAuthClick} className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold px-3 lg:px-4 xl:px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25 text-xs lg:text-sm">
                  <Sparkles className="mr-1" size={14} />
                  Start 100-Day Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2 transition-colors duration-200 rounded-lg hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with improved functionality */}
        {isMenuOpen && (
          <div className="md:hidden lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 rounded-b-2xl animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Close button inside mobile menu */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md hover:bg-slate-800 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={20} className="text-slate-300" />
                </button>
              </div>

              <button onClick={() => handleNavigation('/#features')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Features</button>
              <button onClick={() => handleNavigation('/pricing')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Pricing</button>
              <button onClick={() => handleNavigation('/help')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Resources</button>
              <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Contact</button>
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-white/10 mt-4">
                {user ? (
                  <>
                    <div className="text-sm text-slate-300 text-center py-2 truncate">
                      Welcome, {user.user_metadata?.business_name || user.email}
                    </div>
                    <Button variant="outline" onClick={handleAuthAction} className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={onAuthClick} className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                      Sign In
                    </Button>
                    <Button onClick={onAuthClick} className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold">
                      <Sparkles className="mr-1" size={14} />
                      Start 100-Day Trial
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
