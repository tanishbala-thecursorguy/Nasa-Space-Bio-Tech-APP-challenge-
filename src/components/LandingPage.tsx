import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { SpaceBackground } from './SpaceBackground';
import { Rocket } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <SpaceBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <Rocket className="w-12 h-12 text-blue-400" />
            <div className="text-white">
              <div className="text-sm tracking-wider opacity-80">NASA</div>
              <div className="text-4xl font-light tracking-wide">SPACE BIOLOGY</div>
              <div className="text-2xl font-light tracking-widest opacity-90">KNOWLEDGE ENGINE</div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore comprehensive space biology research from 2015-2025. 
            Discover experiments, publications, and knowledge gaps across missions to the ISS, Moon, and Mars.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button
              onClick={onEnter}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Enter Dashboard
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 text-center text-gray-400 text-sm"
        >
          <p>Powered by NASA Open Data • 2015-2025 Research Archive</p>
        </motion.div>
      </div>
    </div>
  );
};