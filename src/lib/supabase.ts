// Temporary local storage solution until Supabase is properly configured
export const supabase = {
  from: (table: string) => ({
    insert: (data: any[]) => ({
      select: () => Promise.resolve({ data: data, error: null })
    }),
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        in: (column2: string, values: any[]) => Promise.resolve({ 
          data: getLocalPublications(), 
          error: null 
        })
      }),
      in: (column: string, values: any[]) => Promise.resolve({ 
        data: getLocalPublications(), 
        error: null 
      }),
      gte: (column: string, value: any) => ({
        lte: (column2: string, value2: any) => Promise.resolve({ 
          data: getLocalPublications(), 
          error: null 
        })
      }),
      lte: (column: string, value: any) => Promise.resolve({ 
        data: getLocalPublications(), 
        error: null 
      })
    })
  })
};

// Local storage functions
function getLocalPublications() {
  const stored = localStorage.getItem('publications');
  return stored ? JSON.parse(stored) : [];
}

function saveLocalPublications(publications: any[]) {
  localStorage.setItem('publications', JSON.stringify(publications));
}

// Override the insert method to save to localStorage
const originalFrom = supabase.from;
supabase.from = function(table: string) {
  const result = originalFrom(table);
  if (table === 'publications') {
    return {
      ...result,
      insert: (data: any[]) => ({
        select: () => {
          const publications = getLocalPublications();
          const newPublications = data.map(item => ({
            ...item,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));
          const updatedPublications = [...publications, ...newPublications];
          saveLocalPublications(updatedPublications);
          return Promise.resolve({ data: newPublications, error: null });
        }
      })
    };
  }
  return result;
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

