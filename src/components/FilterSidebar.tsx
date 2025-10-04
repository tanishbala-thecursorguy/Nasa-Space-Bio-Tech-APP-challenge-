import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Filter, Calendar, Users, Rocket as RocketIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';


interface FilterSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  filters: {
    species: string[];
    missions: string[];
    yearRange: [number, number];
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isCollapsed, 
  onToggle, 
  filters, 
  onFiltersChange 
}) => {
  const speciesOptions = [
    { id: 'humans', label: 'Humans' },
    { id: 'animals', label: 'Animals' },
    { id: 'cell-lines', label: 'Cell Lines' },
    { id: 'plants', label: 'Plants' }
  ];

  const missionOptions = [
    { id: 'iss', label: 'ISS' },
    { id: 'moon', label: 'Moon Simulations' },
    { id: 'mars', label: 'Mars Simulations' },
    { id: 'radiation', label: 'Radiation Studies' },
    { id: 'microgravity', label: 'Microgravity Studies' }
  ];

  const updateFilters = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const current = filters[key as keyof typeof filters] as string[];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    updateFilters(key, updated);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 320 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 backdrop-blur-sm border-r border-gray-700 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 text-white">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="space-y-6">
            {/* Species Filter */}
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-4 h-4 text-blue-400" />
                <h3 className="text-white font-medium">Species</h3>
              </div>
              <div className="space-y-2">
                {speciesOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.species.includes(option.id)}
                      onCheckedChange={() => toggleArrayFilter('species', option.id)}
                    />
                    <label className="text-sm text-gray-300">{option.label}</label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Mission Type Filter */}
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RocketIcon className="w-4 h-4 text-blue-400" />
                <h3 className="text-white font-medium">Mission Type</h3>
              </div>
              <div className="space-y-2">
                {missionOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.missions.includes(option.id)}
                      onCheckedChange={() => toggleArrayFilter('missions', option.id)}
                    />
                    <label className="text-sm text-gray-300">{option.label}</label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Year Range Filter */}
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-400" />
                <h3 className="text-white font-medium">Year Range</h3>
              </div>
              <div className="px-2">
                <Slider
                  value={filters.yearRange}
                  onValueChange={(value) => updateFilters('yearRange', value as [number, number])}
                  min={2015}
                  max={2025}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{filters.yearRange[0]}</span>
                  <span>{filters.yearRange[1]}</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
};