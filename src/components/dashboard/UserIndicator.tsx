
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, ExternalLink, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserIndicatorProps {
  user: any;
  onExit: () => void;
}

const UserIndicator = ({ user, onExit }: UserIndicatorProps) => {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const businessName = user?.user_metadata?.business_name || 'Your Business';
  const userEmail = user?.email || '';
  const userInitial = businessName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    onExit();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 hover:bg-gray-50 transition-colors"
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {userInitial}
        </div>
        <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-fade-in">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{businessName}</p>
              <p className="text-sm text-gray-500 truncate">{userEmail}</p>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                onExit();
                setIsOpen(false);
              }}
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <ExternalLink className="mr-2" size={14} />
              Back to Landing
            </Button>
            
            <Button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              variant="outline"
              size="sm"
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="mr-2" size={14} />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserIndicator;
