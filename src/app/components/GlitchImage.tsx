import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GlitchImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function GlitchImage({ src, alt, className = '' }: GlitchImageProps) {
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
      {/* Image principale */}
      <motion.img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-auto"
        animate={
          isGlitching
            ? {
                x: [0, -3, 3, -2, 2, 0],
                skewX: [0, -1, 1, 0],
              }
            : {}
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />

      {/* Couche rouge (canal R) */}
      <motion.img
        src={src}
        alt=""
        className="absolute top-0 left-0 z-0 pointer-events-none w-full h-auto"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [-6, 6, -4, 4, -6, 4],
                y: [0, -1, 1, 0],
                opacity: [0, 0.8, 0.7, 0.8, 0.6, 0],
                filter: [
                  'none',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'brightness(0) saturate(100%) invert(13%) sepia(97%) saturate(7466%) hue-rotate(0deg) brightness(94%) contrast(113%)',
                  'none',
                ],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />

      {/* Couche verte (canal G) */}
      <motion.img
        src={src}
        alt=""
        className="absolute top-0 left-0 z-0 pointer-events-none w-full h-auto"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0,
        }}
        animate={
          isGlitching
            ? {
                x: [6, -6, 4, -4, 6, -4],
                y: [0, 1, -1, 0],
                opacity: [0, 0.7, 0.6, 0.7, 0.5, 0],
                filter: [
                  'none',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'brightness(0) saturate(100%) invert(72%) sepia(98%) saturate(4969%) hue-rotate(75deg) brightness(118%) contrast(119%)',
                  'none',
                ],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
    </div>
  );
}
