import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { COLORS } from '@/app/constants/colors';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high' | 'extreme';
}

export function GlitchText({ children, className = '', glitchIntensity = 'medium' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const intensity = {
      low: 5000,
      medium: 3000,
      high: 1500,
      extreme: 800,
    }[glitchIntensity];

    const glitchDuration = {
      low: 100,
      medium: 150,
      high: 200,
      extreme: 300,
    }[glitchIntensity];

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), glitchDuration);
    }, intensity + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [glitchIntensity]);

  const glitchAnimation = {
    low: {
      x: [0, -2, 2, -1, 1, 0],
      textShadow: [
        'none',
        `2px 0 ${COLORS.red.pure}, -2px 0 #00FF00`,
        `-2px 0 ${COLORS.red.pure}, 2px 0 #00FF00`,
        'none',
      ],
    },
    medium: {
      x: [0, -3, 3, -2, 2, 0],
      textShadow: [
        'none',
        `3px 0 ${COLORS.red.pure}, -3px 0 #00FF00`,
        `-3px 0 ${COLORS.red.pure}, 3px 0 #00FF00`,
        `2px 2px ${COLORS.red.pure}, -2px -2px #00FF00`,
        'none',
      ],
    },
    high: {
      x: [0, -5, 5, -3, 3, -2, 2, 0],
      y: [0, -2, 2, -1, 1, 0],
      textShadow: [
        'none',
        `5px 0 ${COLORS.red.pure}, -5px 0 #00FF00`,
        `-5px 0 ${COLORS.red.pure}, 5px 0 #00FF00`,
        `3px 3px ${COLORS.red.pure}, -3px -3px #00FF00`,
        `-3px 3px ${COLORS.red.pure}, 3px -3px #00FF00`,
        'none',
      ],
    },
    extreme: {
      x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
      y: [0, -4, 4, -2, 2, -3, 3, 0],
      textShadow: [
        'none',
        `8px 0 ${COLORS.red.pure}, -8px 0 #00FF00, 0 4px rgba(139, 0, 0, 0.8)`,
        `-8px 0 ${COLORS.red.pure}, 8px 0 #00FF00, 0 -4px rgba(0, 255, 0, 0.8)`,
        `6px 6px ${COLORS.red.pure}, -6px -6px #00FF00`,
        `-6px 6px ${COLORS.red.pure}, 6px -6px #00FF00`,
        `4px -4px ${COLORS.red.pure}, -4px 4px #00FF00`,
        `10px 0 ${COLORS.red.pure}, -10px 0 #00FF00`,
        'none',
      ],
    },
  }[glitchIntensity];

  return (
    <motion.span
      className={`relative inline-block font-heading ${className}`}
      style={{
        fontFamily: "'Martian Mono'",
        fontWeight: 600,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        paddingTop: '0.15em',
        paddingBottom: '0.15em',
        lineHeight: 1.3,
      }}
      animate={isGlitching ? glitchAnimation : {}}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}