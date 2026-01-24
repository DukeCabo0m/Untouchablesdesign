import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { UntouchablesLogo } from './UntouchablesLogo';

export function LogoText({ className = "" }: { className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 4000 + Math.random() * 2000);

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
                x: [0, -3, 3, -2, 2, 0],
                skewX: [0, -1, 1, 0],
              }
            : {}
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        <UntouchablesLogo className="w-full h-auto" />
      </motion.div>

      {/* Couche rouge (canal R) - effet glitch */}
      <motion.div
        className="absolute top-0 left-0 z-0 pointer-events-none w-full text-[#8B0000]"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [-6, 6, -4, 4, 0],
                opacity: [0, 0.8, 0.6, 0.7, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
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
                x: [6, -6, 4, -4, 0],
                opacity: [0, 0.7, 0.5, 0.6, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        <UntouchablesLogo className="w-full h-auto" />
      </motion.div>
    </div>
  );
}