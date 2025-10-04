import React from 'react';
import { motion } from 'motion/react';

interface SpaceBackgroundProps {
  className?: string;
  showImage?: boolean;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ className = "", showImage = true }) => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {showImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1627947224567-4b17c3137ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTkzMjgyOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};