// Local storage functions
function getLocalPublications() {
  const stored = localStorage.getItem('publications');
  return stored ? JSON.parse(stored) : [];
}

function saveLocalPublications(publications: any[]) {
  localStorage.setItem('publications', JSON.stringify(publications));
}

// Temporary local storage solution until Supabase is properly configured
export const supabase = {
  from: (table: string) => {
    if (table === 'publications') {
      return {
        insert: (data: any[]) => ({
          select: () => {
            console.log('💾 Saving to localStorage:', data);
            const publications = getLocalPublications();
            const newPublications = data.map(item => ({
              ...item,
              id: crypto.randomUUID(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }));
            const updatedPublications = [...publications, ...newPublications];
            saveLocalPublications(updatedPublications);
            console.log('✅ Saved publications:', updatedPublications);
            return Promise.resolve({ data: newPublications, error: null });
          }
        }),
        select: (columns: string = '*') => {
          console.log('📖 Reading from localStorage');
          const publications = getLocalPublications();
          console.log('📖 Found publications:', publications);
          return {
            eq: (column: string, value: any) => ({
              in: (column2: string, values: any[]) => Promise.resolve({ 
                data: publications, 
                error: null 
              })
            }),
            in: (column: string, values: any[]) => Promise.resolve({ 
              data: publications, 
              error: null 
            }),
            gte: (column: string, value: any) => ({
              lte: (column2: string, value2: any) => Promise.resolve({ 
                data: publications, 
                error: null 
              })
            }),
            lte: (column: string, value: any) => Promise.resolve({ 
              data: publications, 
              error: null 
            }),
            overlaps: (column: string, values: any[]) => Promise.resolve({ 
              data: publications, 
              error: null 
            }),
            order: (column: string, options: any) => Promise.resolve({ 
              data: publications, 
              error: null 
            })
          };
        }
      };
    }
    return {
      insert: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
      select: () => ({ 
        eq: () => ({ in: () => Promise.resolve({ data: [], error: null }) }),
        in: () => Promise.resolve({ data: [], error: null }),
        gte: () => ({ lte: () => Promise.resolve({ data: [], error: null }) }),
        lte: () => Promise.resolve({ data: [], error: null }),
        overlaps: () => Promise.resolve({ data: [], error: null }),
        order: () => Promise.resolve({ data: [], error: null })
      })
    };
  }
};

// Database Types
export interface Publication {
  id: string;
  author_name: string;
  project_name: string;
  summary: string;
  project_link: string;
  species: string[];
  missions: string[];
  year: number;
  created_at: string;
  updated_at: string;
}

export interface PublicationInsert {
  author_name: string;
  project_name: string;
  summary: string;
  project_link: string;
  species: string[];
  missions: string[];
  year: number;
}

