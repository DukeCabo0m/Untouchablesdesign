import { motion, useAnimation } from 'motion/react';
import { Link } from 'react-router';
import { GlitchText } from '@/app/components/GlitchText';
import { useState, useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  descriptionPrefix?: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
  glitchIntensity?: 'low' | 'medium' | 'high';
}

export function PageHeader({
  title,
  description,
  descriptionPrefix = '//',
  backgroundImage,
  breadcrumbs,
  glitchIntensity = 'low',
}: PageHeaderProps) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showTitle, setShowTitle] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Attendre que les chevrons apparaissent avant de commencer le typing
    const chevronDelay = setTimeout(() => {
      setShowTitle(true);
    }, 1200); // Augmenté de 600ms à 1200ms

    return () => clearTimeout(chevronDelay);
  }, []);

  useEffect(() => {
    if (!showTitle) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= title.length) {
        setDisplayedTitle(title.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setAnimationComplete(true);
      }
    }, 80); // Vitesse de frappe ralentie : 80ms par caractère (au lieu de 50ms)

    return () => clearInterval(typingInterval);
  }, [showTitle, title]);

  return (
    <div className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        
        {/* Gradient fade to background at bottom */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 md:h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
          }}
        />
        
        {/* Grain Effect */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="noise-header">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-header)" opacity="0.5"/>
          </svg>
        </div>
        
        {/* Scanlines VHS */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(224, 224, 224, 0.03) 2px, rgba(224, 224, 224, 0.03) 4px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* Breadcrumb - Hidden on mobile */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 hidden sm:block"
        >
          <ol className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-xs text-[#E0E0E0]/70 uppercase">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center gap-2 md:gap-3">
                {item.path ? (
                  <Link 
                    to={item.path}
                    className="hover:text-[#8B0000] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#8B0000] font-black">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-[#8B0000] font-black">&gt;&gt;</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Header */}
        <div>
          {/* Titre avec chevrons et texte sur une seule ligne */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 overflow-hidden">
            {/* Chevrons animés depuis la gauche */}
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`font-black text-[#8B0000] leading-none flex-shrink-0 ${
                title.length > 18 ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-8xl'
              }`}
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              &gt;&gt;
            </motion.span>

            {/* Titre avec effet typing - taille ajustée selon la longueur */}
            <h1
              className={`font-black text-[#E0E0E0] uppercase tracking-[-0.05em] leading-none whitespace-nowrap overflow-hidden flex-1 min-w-0 ${
                title.length > 18 ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-8xl'
              }`}
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              {showTitle && (
                <>
                  <GlitchText glitchIntensity={glitchIntensity}>
                    {displayedTitle}
                  </GlitchText>
                  {/* Curseur clignotant pendant la frappe */}
                  {!animationComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className={`inline-block w-0.5 md:w-1 bg-[#8B0000] ml-1 md:ml-2 align-middle ${
                        title.length > 18 ? 'h-10 sm:h-12 md:h-16 lg:h-20' : 'h-10 sm:h-12 md:h-16 lg:h-24'
                      }`}
                    />
                  )}
                </>
              )}
            </h1>
          </div>
          
          {/* Ligne rouge animée après le titre */}
          {animationComplete && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '80px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-0.5 md:h-1 bg-[#8B0000] mb-4 md:mb-6 md:!w-32"
            />
          )}
          
          {/* Description animée en dernier */}
          {animationComplete && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-mono text-xs sm:text-sm text-[#E0E0E0]/70 max-w-full md:max-w-2xl"
              dangerouslySetInnerHTML={{
                __html: `<span class="text-[#8B0000] font-black">${descriptionPrefix}</span> ${description}`
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}