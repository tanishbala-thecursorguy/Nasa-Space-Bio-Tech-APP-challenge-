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
    console.log('📚 Fetching publications from Supabase... refreshTrigger:', refreshTrigger);
    console.log('🔍 Current filters:', filters);

    try {
      let query = supabase
        .from('publications')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply species filter
      if (filters.species.length > 0) {
        query = query.overlaps('species', filters.species);
      }

      // Apply missions filter
      if (filters.missions.length > 0) {
        query = query.overlaps('missions', filters.missions);
      }

      // Apply year range filter
      query = query
        .gte('year', filters.yearRange[0])
        .lte('year', filters.yearRange[1]);

      const { data, error: fetchError } = await query;

      console.log('📊 Fetched data:', data);
      console.log('📊 Fetch error:', fetchError);

      if (fetchError) throw fetchError;

      setPublications(data || []);
      console.log('✅ Publications updated! Count:', data?.length || 0);
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