import React from 'react';
import { Card } from './ui/card';
import { Network, Database } from 'lucide-react';

interface KnowledgeGraphProps {
  className?: string;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ className = "" }) => {
  return (
    <Card className={`bg-gray-800/50 border-gray-700 ${className}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Knowledge Graph</h3>
            <p className="text-gray-400 text-sm">Interactive relationship map</p>
          </div>
        </div>
      </div>

      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400 max-w-md">
            <div className="flex justify-center space-x-4 mb-6">
              <Network className="w-16 h-16 opacity-50" />
              <Database className="w-16 h-16 opacity-50" />
            </div>
            <h3 className="text-white text-xl mb-4">No Knowledge Graph Available</h3>
            <p className="leading-relaxed">
              Connect your NASA space biology database to visualize relationships between publications, 
              experiments, species, conditions, and research outcomes. This interactive graph will help 
              you discover connections and knowledge gaps in space biology research.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};