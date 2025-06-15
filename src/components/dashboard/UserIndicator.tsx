
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, ExternalLink, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserIndicatorProps {
  user: any;
  onExit: () => void;
}

const UserIndicator = ({ user, onExit }: UserIndicatorProps) => {
  const { signOut } = useAuth();
  const businessName = user?.user_metadata?.business_name || 'Your Business';
  const userEmail = user?.email || '';
  const userInitial = businessName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    onExit();
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
          {userInitial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{businessName}</p>
          <p className="text-sm text-gray-500 truncate">{userEmail}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button
          onClick={onExit}
          variant="outline"
          size="sm"
          className="w-full justify-start"
        >
          <ExternalLink className="mr-2" size={14} />
          Back to Landing
        </Button>
        
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:border-red-200"
        >
          <LogOut className="mr-2" size={14} />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default UserIndicator;
