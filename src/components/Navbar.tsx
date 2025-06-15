
import React from 'react';
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
    <nav className="bg-slate-950/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                    BizCore
                  </h1>
                  <p className="text-xs text-cyan-400 font-medium -mt-1">Powered by AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              <button onClick={() => handleNavigation('/')} className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base">Features</button>
              <button onClick={() => handleNavigation('/')} className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base">Pricing</button>
              <button onClick={() => handleNavigation('/help')} className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base">Resources</button>
              <button onClick={() => handleNavigation('/contact')} className="text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm lg:text-base">Contact</button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <>
                <span className="text-sm text-slate-300 max-w-32 lg:max-w-none truncate">Welcome, {user.user_metadata?.business_name || user.email}</span>
                <Button variant="outline" onClick={handleAuthAction} className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 text-sm px-3 py-2">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onAuthClick} className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 text-sm px-3 py-2">
                  Sign In
                </Button>
                <Button onClick={onAuthClick} className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold px-4 lg:px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25 text-sm">
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 rounded-b-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Features</button>
              <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Pricing</button>
              <button onClick={() => handleNavigation('/help')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Resources</button>
              <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">Contact</button>
              <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-white/10 mt-4">
                {user ? (
                  <Button variant="outline" onClick={handleAuthAction} className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={onAuthClick} className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                      Sign In
                    </Button>
                    <Button onClick={onAuthClick} className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold">
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
