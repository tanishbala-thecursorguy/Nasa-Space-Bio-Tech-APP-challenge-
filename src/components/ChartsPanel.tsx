import React from 'react';
import { Card } from './ui/card';
import { TrendingUp, PieChartIcon, BarChart3, Database } from 'lucide-react';

interface ChartsPanelProps {
  className?: string;
}

export const ChartsPanel: React.FC<ChartsPanelProps> = ({ className = "" }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Experiments Over Time */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium">Experiments Per Species Over Time</h3>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No timeline data available</p>
            <p className="text-xs mt-1">Connect data source to view trends</p>
          </div>
        </div>
      </Card>

      {/* Experiment Type Distribution */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <PieChartIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium">Experiment Type Distribution</h3>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <PieChartIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No distribution data available</p>
            <p className="text-xs mt-1">Connect data source to view breakdown</p>
          </div>
        </div>
      </Card>

      {/* Research Coverage Heatmap */}
      <Card className="bg-gray-800/50 border-gray-700 p-6 lg:col-span-2">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium">Research Coverage Across Missions</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No coverage data available</p>
            <p className="text-xs mt-1">Connect data source to view mission analytics</p>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <Card className="bg-gray-800/50 border-gray-700 p-6 lg:col-span-2">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium">Research Statistics</h3>
        </div>
        <div className="text-center text-gray-400">
          <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-white text-xl mb-4">No Analytics Available</h3>
          <p className="leading-relaxed max-w-2xl mx-auto">
            Connect your NASA space biology database to view comprehensive analytics including 
            research trends, experiment distributions, mission coverage, and statistical insights 
            across the 2015-2025 research timeline.
          </p>
        </div>
      </Card>
    </div>
  );
};