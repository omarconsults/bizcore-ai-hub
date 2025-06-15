
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
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

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else if (onAuthClick) {
      onAuthClick();
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">BizCore</h1>
              <p className="text-xs text-emerald-600 font-medium">Powered by AI</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-blue-900 transition-colors">Features</button>
              <button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-blue-900 transition-colors">Pricing</button>
              <button onClick={() => handleNavigation('/help')} className="text-gray-600 hover:text-blue-900 transition-colors">Resources</button>
              <button onClick={() => handleNavigation('/contact')} className="text-gray-600 hover:text-blue-900 transition-colors">Contact</button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Welcome, {user.user_metadata?.business_name || user.email}</span>
                <Button variant="outline" onClick={handleAuthAction} className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onAuthClick} className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Sign In
                </Button>
                <Button onClick={onAuthClick} className="bg-blue-900 hover:bg-blue-800 text-white">
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-900 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-900">Features</button>
              <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-900">Pricing</button>
              <button onClick={() => handleNavigation('/help')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-900">Resources</button>
              <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-900">Contact</button>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                {user ? (
                  <Button variant="outline" onClick={handleAuthAction} className="w-full border-blue-900 text-blue-900">
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={onAuthClick} className="w-full border-blue-900 text-blue-900">
                      Sign In
                    </Button>
                    <Button onClick={onAuthClick} className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                      Start Free Trial
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
