import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { UntouchablesLogo } from './UntouchablesLogo';

export function GlitchLogo({ className = "" }: { className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Logo principal */}
      <motion.div
        className="relative z-10 w-full text-[#E0E0E0]"
        animate={
          isGlitching
            ? {
                x: [0, -8, 5, -3, 7, -2, 0],
                y: [0, 2, -3, 1, -2, 1, 0],
                skewX: [0, -2, 3, -1, 2, 0],
              }
            : {}
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <UntouchablesLogo className="w-full h-auto" />
      </motion.div>

      {/* Couche rouge (canal R) - effet glitch avec slicing */}
      <motion.div
        className="absolute top-0 left-0 z-0 pointer-events-none w-full text-[#8B0000]"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [-12, 10, -8, 12, -6, 0],
                opacity: [0, 0.9, 0.7, 0.9, 0.6, 0],
                scaleX: [1, 1.02, 0.98, 1.03, 1],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <UntouchablesLogo className="w-full h-auto" />
      </motion.div>

      {/* Couche verte (canal G) - effet glitch */}
      <motion.div
        className="absolute top-0 left-0 z-0 pointer-events-none w-full text-green-500"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [10, -12, 8, -10, 6, 0],
                opacity: [0, 0.8, 0.6, 0.8, 0.5, 0],
                scaleX: [1, 0.98, 1.02, 0.99, 1],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <UntouchablesLogo className="w-full h-auto" />
      </motion.div>

      {/* Couche bleue (canal B) - troisième couche pour effet plus intense */}
      <motion.div
        className="absolute top-0 left-0 z-0 pointer-events-none w-full text-blue-500"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [8, -6, 10, -8, 4, 0],
                y: [-2, 3, -1, 2, -1, 0],
                opacity: [0, 0.6, 0.4, 0.6, 0.3, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <UntouchablesLogo className="w-full h-auto" />
      </motion.div>

      {/* VHS Tracking Lines - Lignes horizontales de distorsion */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute top-[20%] left-0 w-full h-[2px] bg-white z-20 pointer-events-none"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1.5, 0],
              x: [-100, 100],
            }}
            transition={{ duration: 0.15, ease: 'linear' }}
            style={{ mixBlendMode: 'overlay' }}
          />
          <motion.div
            className="absolute top-[60%] left-0 w-full h-[1px] bg-white z-20 pointer-events-none"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0, 1.2, 0],
              x: [100, -100],
            }}
            transition={{ duration: 0.2, delay: 0.05, ease: 'linear' }}
            style={{ mixBlendMode: 'overlay' }}
          />
        </>
      )}
    </div>
  );
}