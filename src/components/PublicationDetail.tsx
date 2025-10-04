import React from 'react';
import { Publication } from '../lib/supabase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, X, Calendar, Dna, Rocket } from 'lucide-react';

interface PublicationDetailProps {
  publication: Publication | null;
  onClose: () => void;
}

export const PublicationDetail: React.FC<PublicationDetailProps> = ({ publication, onClose }) => {
  if (!publication) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {publication.year}
            </Badge>
            <Badge variant="outline">
              ID: {publication.id.slice(0, 8)}
            </Badge>
          </div>

          <CardTitle className="text-3xl text-white pr-12">
            {publication.title}
          </CardTitle>

          <CardDescription className="text-gray-400 text-base mt-4">
            Added on {new Date(publication.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Summary</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {publication.summary}
            </p>
          </div>

          {/* Species */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Dna className="w-5 h-5" />
              Species Studied
            </h3>
            <div className="flex flex-wrap gap-2">
              {publication.species.map((species) => (
                <Badge key={species} variant="secondary" className="text-sm">
                  {species}
                </Badge>
              ))}
            </div>
          </div>

          {/* Missions */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Mission Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {publication.missions.map((mission) => (
                <Badge key={mission} variant="outline" className="text-sm">
                  {mission}
                </Badge>
              ))}
            </div>
          </div>

          {/* Research Link */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Research Link</h3>
            <a
              href={publication.research_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors break-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              {publication.research_link}
            </a>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-700">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(publication.research_link, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Research Paper
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

