import React from 'react';
import { Card } from './ui/card';
import { TrendingUp, Users, Rocket, FlaskConical, Calendar, Award } from 'lucide-react';

interface ChartsPanelProps {
  className?: string;
}

export const ChartsPanel: React.FC<ChartsPanelProps> = ({ className = "" }) => {
  // Fake analytics data
  const totalPublications = 247;
  const activeResearchers = 89;
  const completedMissions = 15;
  const ongoingStudies = 34;
  
  const speciesData = [
    { name: 'Humans', count: 87, percentage: 35, color: 'bg-blue-500' },
    { name: 'Animals', count: 62, percentage: 25, color: 'bg-green-500' },
    { name: 'Cell Lines', count: 54, percentage: 22, color: 'bg-purple-500' },
    { name: 'Plants', count: 44, percentage: 18, color: 'bg-yellow-500' }
  ];

  const missionData = [
    { name: 'ISS', count: 112, percentage: 45, color: 'bg-blue-400' },
    { name: 'Mars Simulations', count: 58, percentage: 23, color: 'bg-red-500' },
    { name: 'Moon Simulations', count: 38, percentage: 15, color: 'bg-gray-400' },
    { name: 'Microgravity Studies', count: 28, percentage: 11, color: 'bg-indigo-500' },
    { name: 'Radiation Studies', count: 11, percentage: 4, color: 'bg-orange-500' }
  ];

  const yearlyData = [
    { year: '2015', publications: 15 },
    { year: '2016', publications: 18 },
    { year: '2017', publications: 22 },
    { year: '2018', publications: 28 },
    { year: '2019', publications: 31 },
    { year: '2020', publications: 25 },
    { year: '2021', publications: 29 },
    { year: '2022', publications: 35 },
    { year: '2023', publications: 29 },
    { year: '2024', publications: 12 },
    { year: '2025', publications: 3 }
  ];

  const maxYearly = Math.max(...yearlyData.map(d => d.publications));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Publications</p>
              <h3 className="text-3xl font-bold text-white mt-1">{totalPublications}</h3>
              <p className="text-green-400 text-xs mt-2">↑ 12% from last year</p>
            </div>
            <FlaskConical className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Researchers</p>
              <h3 className="text-3xl font-bold text-white mt-1">{activeResearchers}</h3>
              <p className="text-green-400 text-xs mt-2">↑ 8% from last year</p>
            </div>
            <Users className="w-12 h-12 text-green-400 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed Missions</p>
              <h3 className="text-3xl font-bold text-white mt-1">{completedMissions}</h3>
              <p className="text-green-400 text-xs mt-2">↑ 25% from last year</p>
            </div>
            <Rocket className="w-12 h-12 text-purple-400 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ongoing Studies</p>
              <h3 className="text-3xl font-bold text-white mt-1">{ongoingStudies}</h3>
              <p className="text-yellow-400 text-xs mt-2">→ Active research</p>
            </div>
            <Award className="w-12 h-12 text-orange-400 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Publications by Species */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FlaskConical className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium text-lg">Publications by Species</h3>
        </div>
        <div className="space-y-4">
          {speciesData.map((species) => (
            <div key={species.name}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 text-sm">{species.name}</span>
                <span className="text-gray-400 text-sm">{species.count} publications ({species.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`${species.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${species.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Publications by Mission Type */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Rocket className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium text-lg">Publications by Mission Type</h3>
        </div>
        <div className="space-y-4">
          {missionData.map((mission) => (
            <div key={mission.name}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 text-sm">{mission.name}</span>
                <span className="text-gray-400 text-sm">{mission.count} publications ({mission.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`${mission.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${mission.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Publications Over Time */}
      <Card className="bg-gray-800/50 border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium text-lg">Publications Over Time (2015-2025)</h3>
        </div>
        <div className="flex items-end justify-between space-x-2 h-64">
          {yearlyData.map((data) => (
            <div key={data.year} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-48">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-500 hover:to-blue-300"
                  style={{ height: `${(data.publications / maxYearly) * 100}%` }}
                  title={`${data.publications} publications`}
                />
              </div>
              <span className="text-gray-400 text-xs mt-2">{data.year}</span>
              <span className="text-gray-500 text-xs">{data.publications}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-white font-medium text-lg">Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">Most Studied Species</h4>
            <p className="text-gray-300 text-sm">Humans lead with 35% of all publications, followed by Animals (25%) and Cell Lines (22%)</p>
          </div>
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
            <h4 className="text-green-400 font-medium mb-2">Peak Research Year</h4>
            <p className="text-gray-300 text-sm">2022 saw the highest number of publications with 35 studies completed</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-medium mb-2">Primary Research Platform</h4>
            <p className="text-gray-300 text-sm">ISS accounts for 45% of all space biology research publications</p>
          </div>
          <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
            <h4 className="text-orange-400 font-medium mb-2">Research Growth</h4>
            <p className="text-gray-300 text-sm">12% year-over-year increase in publication volume since 2015</p>
          </div>
        </div>
      </Card>
    </div>
  );
};