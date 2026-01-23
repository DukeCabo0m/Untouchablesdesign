import { motion } from 'motion/react';

export function ScanLines() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[150] opacity-[0.025]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #E0E0E0 2px, #E0E0E0 4px)',
        backgroundSize: '100% 4px',
      }}
      animate={{
        opacity: [0.02, 0.03, 0.023, 0.03],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  );
}