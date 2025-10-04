import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SpaceBackground } from './SpaceBackground';
import { Header } from './Header';
import { FilterSidebar } from './FilterSidebar';
import { PublicationsGrid } from './PublicationsGrid';
import { ChatbotPanel } from './ChatbotPanel';
import { KnowledgeGraph } from './KnowledgeGraph';
import { ChartsPanel } from './ChartsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Network, BarChart3 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('publications');
  
  const [filters, setFilters] = useState({
    species: [] as string[],
    missions: [] as string[],
    yearRange: [2015, 2025] as [number, number]
  });

  return (
    <div className="h-screen bg-black overflow-hidden">
      <SpaceBackground showImage={false} />
      
      <div className="relative z-10 h-full flex flex-col">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          <FilterSidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <main className="flex-1 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="px-6 pt-4">
                  <TabsList className="bg-gray-800/50 border border-gray-700">
                    <TabsTrigger value="publications" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Publications</span>
                    </TabsTrigger>
                    <TabsTrigger value="knowledge-graph" className="flex items-center space-x-2">
                      <Network className="w-4 h-4" />
                      <span>Knowledge Graph</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Analytics</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <TabsContent value="publications" className="h-full overflow-auto">
                    <PublicationsGrid />
                  </TabsContent>
                  
                  <TabsContent value="knowledge-graph" className="h-full overflow-auto p-6">
                    <KnowledgeGraph className="h-full" />
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="h-full overflow-auto p-6">
                    <ChartsPanel />
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          </main>
        </div>
      </div>
      
      <ChatbotPanel 
        isOpen={chatbotOpen}
        onToggle={() => setChatbotOpen(!chatbotOpen)}
      />
    </div>
  );
};