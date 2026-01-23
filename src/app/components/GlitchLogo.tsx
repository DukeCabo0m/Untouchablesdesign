import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GlitchLogoProps {
  className?: string;
}

export function GlitchLogo({ className = '' }: GlitchLogoProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 180);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Image principale */}
      <motion.img
        src="https://www.untouchables.fr/img/untouchables-white.svg"
        alt="Untouchables"
        className="relative z-10"
        animate={
          isGlitching
            ? {
                x: [0, -4, 4, -3, 3, -2, 2, 0],
                skewX: [0, -2, 2, -1, 1, 0],
              }
            : {}
        }
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />

      {/* Couche rouge (canal R) */}
      <motion.img
        src="https://www.untouchables.fr/img/untouchables-white.svg"
        alt=""
        className="absolute top-0 left-0 z-0 pointer-events-none"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [-8, 8, -6, 6, -10, 8, -4],
                y: [0, -2, 2, -1, 1, 0],
                opacity: [0, 0.9, 0.8, 0.9, 0.7, 0.9, 0],
                filter: [
                  'none',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'none',
                ],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />

      {/* Couche verte (canal G) */}
      <motion.img
        src="https://www.untouchables.fr/img/untouchables-white.svg"
        alt=""
        className="absolute top-0 left-0 z-0 pointer-events-none"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [8, -8, 6, -6, 10, -8, 4],
                y: [0, 2, -2, 1, -1, 0],
                opacity: [0, 0.8, 0.7, 0.8, 0.6, 0.8, 0],
                filter: [
                  'none',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'none',
                ],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      />

      {/* Effet de cassure / bandes horizontales */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute top-[20%] left-0 w-full h-[15%] overflow-hidden pointer-events-none z-20"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, 20, -15, 10, 0],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <img
              src="https://www.untouchables.fr/img/untouchables-white.svg"
              alt=""
              className="absolute top-[-20%] left-0 w-full h-auto"
              style={{ transform: 'translateY(-20%)' }}
            />
          </motion.div>

          <motion.div
            className="absolute top-[60%] left-0 w-full h-[12%] overflow-hidden pointer-events-none z-20"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, -25, 18, -12, 0],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <img
              src="https://www.untouchables.fr/img/untouchables-white.svg"
              alt=""
              className="absolute top-[-60%] left-0 w-full h-auto"
              style={{ transform: 'translateY(-60%)' }}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}
