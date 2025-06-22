
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onAuthClick?: () => void;
}

const Navbar = ({ onAuthClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (path.startsWith('#')) {
      // Handle scroll to section on same page
      if (location.pathname === '/') {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home first, then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
    closeMobileMenu();
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
          <Link to="/" className="flex items-center cursor-pointer group">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/6a0e5efd-2366-477b-8fd2-53d719319ed6.png" alt="BizCore Logo" className="h-8 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4 xl:space-x-8">
              <button onClick={() => handleNavigation('#features')} className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Features</button>
              <Link to="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Pricing</Link>
              <Link to="/help" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Resources</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium text-sm xl:text-base">Contact</Link>
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
              className="text-gray-700 hover:text-gray-900 p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with improved functionality */}
        {isMenuOpen && (
          <div className="md:hidden lg:hidden bg-white border-t border-gray-200 rounded-b-2xl shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Close button inside mobile menu */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <button onClick={() => handleNavigation('#features')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">Features</button>
              <Link to="/pricing" onClick={closeMobileMenu} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">Pricing</Link>
              <Link to="/help" onClick={closeMobileMenu} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">Resources</Link>
              <Link to="/contact" onClick={closeMobileMenu} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">Contact</Link>
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-gray-200 mt-4">
                {user ? (
                  <>
                    <div className="text-sm text-gray-700 text-center py-2 truncate">
                      Welcome, {user.user_metadata?.business_name || user.email}
                    </div>
                    <Button variant="outline" onClick={handleAuthAction} className="w-full border-gray-400 text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={onAuthClick} className="w-full border-gray-400 text-gray-700 hover:bg-gray-100">
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
