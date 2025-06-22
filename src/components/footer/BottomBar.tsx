
import React from 'react';

const BottomBar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-800 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-400 text-sm">
          © {currentYear} BizCore. All rights reserved. Built with ❤️ for Entrepreneurs.
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            All systems operational
          </span>
          <span>NDPR Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
