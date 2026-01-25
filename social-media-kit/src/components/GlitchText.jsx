import { motion } from 'motion/react';

export default function GlitchText({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Texte principal */}
      <span className="relative z-10">{children}</span>
      
      {/* Couche rouge (glitch) */}
      <motion.span
        className="absolute inset-0 text-[#8B0000]"
        style={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{
          x: [-2, 2, -2, 0],
          clipPath: [
            'inset(0 0 0 0)',
            'inset(40% 0 60% 0)',
            'inset(60% 0 40% 0)',
            'inset(0 0 0 0)',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
      
      {/* Couche cyan (glitch) */}
      <motion.span
        className="absolute inset-0 text-cyan-400 opacity-70"
        style={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{
          x: [2, -2, 2, 0],
          clipPath: [
            'inset(0 0 0 0)',
            'inset(20% 0 80% 0)',
            'inset(80% 0 20% 0)',
            'inset(0 0 0 0)',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
          delay: 0.05,
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}
