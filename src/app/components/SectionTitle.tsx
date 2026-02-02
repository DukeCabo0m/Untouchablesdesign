import { motion, useInView } from 'motion/react';
import { GlitchText } from './GlitchText';
import { useState, useEffect, useRef } from 'react';
import { HandDrawnLine } from './HandDrawnLine';

interface SectionTitleProps {
  title: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

export function SectionTitle({
  title,
  glitchIntensity = 'low',
}: SectionTitleProps) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const hasStartedRef = useRef(false);

  // Déclencher l'animation quand la section entre dans le viewport
  useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      
      // Attendre que les chevrons apparaissent avant de commencer le typing
      const chevronDelay = setTimeout(() => {
        let currentIndex = 0;
        
        const typingInterval = setInterval(() => {
          if (currentIndex <= title.length) {
            setDisplayedTitle(title.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setAnimationComplete(true);
          }
        }, 60); // Vitesse de frappe : 60ms par caractère
      }, 800);

      return () => clearTimeout(chevronDelay);
    }
  }, [isInView, title]);

  return (
    <div ref={ref} className="mb-6">
      {/* Titre avec chevrons */}
      <div className="flex items-center gap-4 mb-4 overflow-hidden">
        {/* Chevrons animés depuis la gauche */}
        <motion.span
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-heading text-[#8B0000] uppercase text-5xl md:text-7xl flex-shrink-0 leading-none"
        >
          &gt;&gt;
        </motion.span>

        {/* Titre avec effet typing */}
        <h2
          className="font-heading text-[#E0E0E0] uppercase text-4xl md:text-6xl whitespace-nowrap overflow-hidden flex-1 min-w-0 leading-none"
        >
          <GlitchText glitchIntensity={glitchIntensity}>
            {displayedTitle}
          </GlitchText>
          {/* Curseur clignotant pendant la frappe */}
          {displayedTitle.length > 0 && !animationComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-1 bg-[#8B0000] ml-2 align-middle h-16 md:h-24"
            />
          )}
        </h2>
      </div>

      {/* Ligne rouge animée après le titre */}
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '256px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <HandDrawnLine 
            color="#8B0000" 
            strokeWidth={3} 
            roughness={2.5} 
            passes={2}
          />
        </motion.div>
      )}
    </div>
  );
}