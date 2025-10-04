import React, { useState } from 'react';
import { Rocket, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { AddPublicationDialog } from './AddPublicationDialog';

interface HeaderProps {
  onPublicationAdded?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPublicationAdded }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
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

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </header>

      <AddPublicationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onPublicationAdded={() => {
          onPublicationAdded?.();
        }}
      />
    </>
  );
};