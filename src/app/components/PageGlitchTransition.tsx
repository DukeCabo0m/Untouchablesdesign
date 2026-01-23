import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function PageGlitchTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* CRT Screen Collapse - Compression verticale */}
          <motion.div
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ 
              scaleY: [1, 1, 0.05, 0],
              scaleX: [1, 1, 1.2, 1],
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.3, 0.8, 1],
              ease: [0.87, 0, 0.13, 1],
            }}
            className="fixed inset-0 z-[9999] pointer-events-none origin-center"
            style={{
              background: '#E0E0E0',
            }}
          />

          {/* White Flash - Flash blanc brutal au début */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.15,
              times: [0, 0.5, 1],
            }}
            className="fixed inset-0 z-[10000] pointer-events-none bg-white"
          />

          {/* Static Noise - Bruit statique TV */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.2, 0.7, 1],
            }}
            className="fixed inset-0 z-[10001] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Horizontal Scanlines - Lignes de balayage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0],
              y: [0, 0, 0, -50],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.2, 0.7, 1],
            }}
            className="fixed inset-0 z-[10002] pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
            }}
          />

          {/* CRT Curvature Distortion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 0.6,
            }}
            className="fixed inset-0 z-[10003] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />

          {/* Horizontal Interference Lines - Lignes parasites */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`interference-${i}`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                opacity: [0, 0.8, 0.5, 0],
                x: [-100, 20, -20, 100],
                scaleX: [1, 1.5, 1, 1],
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: 'easeInOut',
              }}
              className="fixed z-[10004] w-full pointer-events-none"
              style={{
                top: `${(i * 100) / 6 + Math.random() * 10}%`,
                height: `${Math.random() * 3 + 1}px`,
                background: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              }}
            />
          ))}

          {/* Vertical Collapse Line - Ligne horizontale de collapse */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 1, 1, 1],
              opacity: [0, 1, 1, 0],
              height: ['100vh', '100vh', '2px', '0px'],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.1, 0.7, 1],
              ease: 'easeInOut',
            }}
            className="fixed left-0 right-0 top-1/2 z-[10005] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9), transparent)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
              transformOrigin: 'center',
            }}
          />

          {/* Channel Static Bars - Barres de static comme au zapping */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`static-bar-${i}`}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ 
                opacity: [0, Math.random() * 0.8 + 0.2, 0],
                scaleY: [0, 1, 0],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 0.3,
                delay: Math.random() * 0.3,
                ease: 'easeOut',
              }}
              className="fixed z-[10006] pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 40 + 10}px`,
                background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              }}
            />
          ))}

          {/* RGB Ghosting - Léger effet de ghosting couleur (subtil) */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0.2, 0],
              x: [-3, 2, -2, 0],
            }}
            transition={{
              duration: 0.4,
              times: [0, 0.3, 0.7, 1],
            }}
            className="fixed inset-0 z-[10007] pointer-events-none"
            style={{
              background: 'rgba(139, 0, 0, 0.15)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Electron Beam Flash - Flash du faisceau cathodique */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.2,
              delay: 0.15,
            }}
            className="fixed left-0 right-0 top-1/2 z-[10008] pointer-events-none origin-center"
            style={{
              height: '1px',
              background: 'rgba(255, 255, 255, 1)',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.6)',
            }}
          />

          {/* Vignette Fade - Assombrissement progressif */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0, 0.8, 0],
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.3, 0.8, 1],
            }}
            className="fixed inset-0 z-[10009] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, black 120%)',
            }}
          />

          {/* Screen Turn-Off Glow - Lueur résiduelle */}
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: [0, 0, 0.4, 0],
              scale: [1, 1, 0.8, 0.5],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.4, 0.8, 1],
              ease: 'easeOut',
            }}
            className="fixed inset-0 z-[10010] pointer-events-none flex items-center justify-center"
          >
            <div 
              className="w-32 h-32"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}