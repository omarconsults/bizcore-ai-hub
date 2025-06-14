
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">BizCore</h1>
              <p className="text-xs text-emerald-600 font-medium">Powered by AI</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-900 transition-colors">Pricing</a>
              <a href="#resources" className="text-gray-600 hover:text-blue-900 transition-colors">Resources</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-900 transition-colors">Contact</a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
              Sign In
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white">
              Start Free Trial
            </Button>
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
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-900">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-900">Pricing</a>
              <a href="#resources" className="block px-3 py-2 text-gray-600 hover:text-blue-900">Resources</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-900">Contact</a>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="outline" className="w-full border-blue-900 text-blue-900">
                  Sign In
                </Button>
                <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
