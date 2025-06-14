
import React from 'react';

interface UserIndicatorProps {
  user: any;
  onExit: () => void;
}

const UserIndicator = ({ user, onExit }: UserIndicatorProps) => {
  return (
    <div className="fixed top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-40">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Welcome, {user.user_metadata?.business_name || 'User'}</span>
        <button 
          onClick={onExit}
          className="ml-2 text-emerald-200 hover:text-white text-sm underline"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default UserIndicator;
