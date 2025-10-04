import React from 'react';
import { X } from 'lucide-react';

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog Content */}
      <div 
        className="relative bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

