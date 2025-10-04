import React, { useState } from 'react';
import { SimpleDialog } from './SimpleDialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { supabase, PublicationInsert } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface AddPublicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublicationAdded: () => void;
}

const SPECIES_OPTIONS = ['Humans', 'Animals', 'Cell Lines', 'Plants'];
const MISSION_OPTIONS = [
  'ISS',
  'Moon Simulations',
  'Mars Simulations',
  'Radiation Studies',
  'Microgravity Studies'
];
const YEARS = Array.from({ length: 10 }, (_, i) => 2015 + i);

export function AddPublicationDialog({ open, onOpenChange, onPublicationAdded }: AddPublicationDialogProps) {
  const [formData, setFormData] = useState({
    author_name: '',
    project_name: '',
    summary: '',
    project_link: '',
    species: [] as string[],
    missions: [] as string[],
    year: new Date().getFullYear()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  React.useEffect(() => {
    console.log('🎯 AddPublicationDialog - open state changed:', open);
    if (open) {
      console.log('✨ Dialog should be visible now!');
    }
  }, [open]);

  console.log('🔄 AddPublicationDialog render - open:', open);

  const handleSpeciesToggle = (species: string) => {
    setFormData(prev => ({
      ...prev,
      species: prev.species.includes(species)
        ? prev.species.filter(s => s !== species)
        : [...prev.species, species]
    }));
  };

  const handleMissionToggle = (mission: string) => {
    setFormData(prev => ({
      ...prev,
      missions: prev.missions.includes(mission)
        ? prev.missions.filter(m => m !== mission)
        : [...prev.missions, mission]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.author_name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.project_name.trim()) {
      setError('Project name is required');
      return;
    }
    if (!formData.summary.trim()) {
      setError('Summary is required');
      return;
    }
    if (!formData.project_link.trim()) {
      setError('Project link is required');
      return;
    }
    if (formData.species.length === 0) {
      setError('Please select at least one species');
      return;
    }
    if (formData.missions.length === 0) {
      setError('Please select at least one mission');
      return;
    }

    setIsSubmitting(true);
    console.log('🚀 Starting to add publication...');

    try {
      const publicationData: PublicationInsert = {
        author_name: formData.author_name.trim(),
        project_name: formData.project_name.trim(),
        summary: formData.summary.trim(),
        project_link: formData.project_link.trim(),
        species: formData.species,
        missions: formData.missions,
        year: formData.year
      };

      console.log('📝 Publication data to insert:', publicationData);

      const { data, error: insertError } = await supabase
        .from('publications')
        .insert([publicationData])
        .select();

      console.log('📥 Supabase response - data:', data);
      console.log('📥 Supabase response - error:', insertError);

      if (insertError) {
        console.error('❌ Insert error:', insertError);
        console.error('❌ Error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        
        if (insertError.code === '42P01') {
          alert('❌ DATABASE TABLE NOT FOUND!\n\nThe "publications" table does not exist in your Supabase database.\n\nPlease:\n1. Open create-table.html in your browser\n2. Follow the instructions to create the table\n3. Then try posting again');
        } else {
          throw insertError;
        }
        return;
      }

      console.log('✅ Publication added successfully!');
      alert('✅ Publication added successfully!');

      // Close dialog first
      console.log('🎉 Closing dialog...');
      onOpenChange(false);

      // Reset form
      setFormData({
        author_name: '',
        project_name: '',
        summary: '',
        project_link: '',
        species: [],
        missions: [],
        year: new Date().getFullYear()
      });

      // Trigger refresh with a small delay to ensure database has committed
      console.log('🔄 Triggering refresh...');
      setTimeout(() => {
        console.log('📡 Calling onPublicationAdded');
        onPublicationAdded();
      }, 100);
    } catch (err) {
      console.error('❌ Error adding publication:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add publication';
      setError(errorMessage);
      alert('Error: ' + errorMessage + '\n\nPlease check the console for details and make sure you have set up the Supabase database table.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SimpleDialog open={open} onClose={() => onOpenChange(false)}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Add New Publication</h2>
          <p className="text-gray-400 text-sm mt-2">
            Add a new research publication to the NASA Space Biology database.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Name */}
          <div className="space-y-2">
            <Label htmlFor="author_name" className="text-white font-medium">Name *</Label>
            <Input
              id="author_name"
              placeholder="Enter your name"
              value={formData.author_name}
              onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project_name" className="text-white font-medium">Project Name *</Label>
            <Input
              id="project_name"
              placeholder="Enter project name"
              value={formData.project_name}
              onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-white font-medium">Summary *</Label>
            <Textarea
              id="summary"
              placeholder="Enter project summary (10-15 lines recommended, but no limit)"
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              rows={6}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Project Link */}
          <div className="space-y-2">
            <Label htmlFor="project_link" className="text-white font-medium">Project Link *</Label>
            <Input
              id="project_link"
              type="url"
              placeholder="https://example.com/your-project"
              value={formData.project_link}
              onChange={(e) => setFormData(prev => ({ ...prev, project_link: e.target.value }))}
              required
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Species Filter */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Species * (Select at least one)</Label>
            <div className="grid grid-cols-2 gap-3">
              {SPECIES_OPTIONS.map((species) => (
                <div key={species} className="flex items-center space-x-2">
                  <Checkbox
                    id={`species-${species}`}
                    checked={formData.species.includes(species)}
                    onCheckedChange={() => handleSpeciesToggle(species)}
                    className="border-gray-600"
                  />
                  <label
                    htmlFor={`species-${species}`}
                    className="text-sm font-medium leading-none text-white cursor-pointer"
                  >
                    {species}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Type Filter */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Mission Type * (Select at least one)</Label>
            <div className="grid grid-cols-2 gap-3">
              {MISSION_OPTIONS.map((mission) => (
                <div key={mission} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mission-${mission}`}
                    checked={formData.missions.includes(mission)}
                    onCheckedChange={() => handleMissionToggle(mission)}
                    className="border-gray-600"
                  />
                  <label
                    htmlFor={`mission-${mission}`}
                    className="text-sm font-medium leading-none text-white cursor-pointer"
                  >
                    {mission}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Year Selector */}
          <div className="space-y-3">
            <Label htmlFor="year" className="text-white font-medium">Year *</Label>
            <select
              id="year"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-700 bg-gray-800 text-white"
              required
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Adding...' : 'Add Publication'}
            </Button>
          </div>
        </form>
      </div>
    </SimpleDialog>
  );
}

