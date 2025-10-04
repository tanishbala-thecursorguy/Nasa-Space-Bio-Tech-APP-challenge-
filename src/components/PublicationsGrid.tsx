import React from 'react';
import { Card } from './ui/card';
import { FileText, Database } from 'lucide-react';

export const PublicationsGrid: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="text-white">
          <h2 className="text-xl font-medium">Publications & Experiments</h2>
          <p className="text-gray-400 text-sm">
            No data sources connected
          </p>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700 p-12">
        <div className="text-center text-gray-400 max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <FileText className="w-16 h-16 opacity-50" />
            <Database className="w-16 h-16 opacity-50" />
          </div>
          <h3 className="text-white text-xl mb-4">No Publications Available</h3>
          <p className="leading-relaxed">
            Connect your NASA space biology database to view publications, experiments, and research findings. 
            This section will display studies on human physiology, plant biology, radiation effects, and more.
          </p>
        </div>
      </Card>
    </div>
  );
};