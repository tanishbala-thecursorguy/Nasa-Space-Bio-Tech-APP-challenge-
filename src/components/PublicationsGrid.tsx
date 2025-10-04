import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { FileText, Database, ExternalLink, Loader2 } from 'lucide-react';
import { supabase, Publication } from '../lib/supabase';
import { Badge } from './ui/badge';

interface PublicationsGridProps {
  filters: {
    species: string[];
    missions: string[];
    yearRange: [number, number];
  };
  refreshTrigger?: number;
  onPublicationClick?: (publication: Publication) => void;
}

export const PublicationsGrid: React.FC<PublicationsGridProps> = ({ 
  filters, 
  refreshTrigger,
  onPublicationClick 
}) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublications();
  }, [filters, refreshTrigger]);

  const fetchPublications = async () => {
    setLoading(true);
    setError(null);
    console.log('📚 Fetching publications... refreshTrigger:', refreshTrigger);
    console.log('🔍 Current filters:', filters);

    try {
      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('*');

      console.log('📊 Raw fetched data:', data);
      console.log('📊 Fetch error:', fetchError);

      if (fetchError) throw fetchError;

      // Apply filters locally since we're using localStorage
      let filteredData = data || [];
      console.log('🔍 Before filtering, count:', filteredData.length);
      
      // Apply species filter
      if (filters.species.length > 0) {
        console.log('🔍 Filtering by species:', filters.species);
        filteredData = filteredData.filter(pub => {
          const hasMatchingSpecies = pub.species.some((species: string) => filters.species.includes(species));
          console.log(`🔍 Publication "${pub.project_name}" species:`, pub.species, 'matches:', hasMatchingSpecies);
          return hasMatchingSpecies;
        });
        console.log('🔍 After species filter, count:', filteredData.length);
      }

      // Apply missions filter
      if (filters.missions.length > 0) {
        console.log('🔍 Filtering by missions:', filters.missions);
        filteredData = filteredData.filter(pub => {
          const hasMatchingMission = pub.missions.some((mission: string) => filters.missions.includes(mission));
          console.log(`🔍 Publication "${pub.project_name}" missions:`, pub.missions, 'matches:', hasMatchingMission);
          return hasMatchingMission;
        });
        console.log('🔍 After missions filter, count:', filteredData.length);
      }

      // Apply year range filter
      console.log('🔍 Filtering by year range:', filters.yearRange);
      filteredData = filteredData.filter(pub => {
        const yearMatches = pub.year >= filters.yearRange[0] && pub.year <= filters.yearRange[1];
        console.log(`🔍 Publication "${pub.project_name}" year:`, pub.year, 'matches:', yearMatches);
        return yearMatches;
      });
      console.log('🔍 After year filter, count:', filteredData.length);

      // Sort by created_at descending
      filteredData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setPublications(filteredData);
      console.log('✅ Publications updated! Final count:', filteredData.length);
      console.log('✅ Publications:', filteredData);
    } catch (err) {
      console.error('❌ Error fetching publications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch publications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="bg-red-900/20 border-red-700 p-6">
          <p className="text-red-400">Error: {error}</p>
        </Card>
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-white">
            <h2 className="text-xl font-medium">Publications & Experiments</h2>
            <p className="text-gray-400 text-sm">
              No publications match your filters
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
              No publications found matching your current filters. Try adjusting your filters or add a new publication using the Post button above.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="text-white">
          <h2 className="text-xl font-medium">Publications & Experiments</h2>
          <p className="text-gray-400 text-sm">
            {publications.length} publication{publications.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publications.map((publication) => (
          <Card
            key={publication.id}
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => onPublicationClick?.(publication)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {publication.year}
                </Badge>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <CardTitle className="text-white text-base line-clamp-2">
                {publication.project_name}
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm line-clamp-3 mt-2">
                {publication.summary}
              </CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {publication.species.slice(0, 2).map((species) => (
                  <Badge key={species} variant="outline" className="text-xs">
                    {species}
                  </Badge>
                ))}
                {publication.species.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{publication.species.length - 2} more
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};