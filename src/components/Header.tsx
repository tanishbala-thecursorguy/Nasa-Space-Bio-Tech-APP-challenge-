import React from 'react';
import { Rocket } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Rocket className="w-8 h-8 text-blue-400" />
          <div className="text-white">
            <div className="text-sm font-medium">NASA Space Biology</div>
            <div className="text-xs text-gray-400">Knowledge Engine</div>
          </div>
        </div>

        {/* Empty space for future features */}
        <div className="flex-1" />

        {/* Placeholder for future stats */}
        <div className="flex items-center space-x-4">
          <div className="text-gray-400 text-sm">
            Ready to connect data sources
          </div>
        </div>
      </div>
    </header>
  );
};