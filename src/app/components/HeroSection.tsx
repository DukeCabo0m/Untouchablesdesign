import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { GlitchLogo } from './GlitchLogo';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';

export function HeroSection() {
  const scrollToNext = () => {
    // Scroll vers la première section après le hero
    const heroHeight = window.innerHeight;
    window.scrollTo({ 
      top: heroHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video - YouTube embed in full cover mode */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/pr3x7tS__dE?autoplay=1&mute=1&loop=1&playlist=pr3x7tS__dE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Korn Live Background"
          allow="autoplay; encrypted-media"
          style={{
            filter: 'grayscale(100%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '300vw',
            height: '300vh',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            border: 'none',
          }}
        />
      </div>

      {/* Dark overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-[#0A0A0A] opacity-70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 md:mb-12 flex justify-center"
        >
          <GlitchLogo className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl" />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[#FFFFFF] text-xs sm:text-sm md:text-base tracking-wider px-4"
        >
          <p className="mb-2 font-bold">COMMUNAUTÉ FRANCOPHONE // FANS DE KORN</p>
          <p className="font-bold" style={{ color: COLORS.red.pure }}>&gt; LA PASSION NE S'ÉTEINT JAMAIS_</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 md:mt-16 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
        >
          <Button 
            onClick={scrollToNext} 
            variant="primary" 
            size="lg"
            className="w-full sm:w-auto"
          >
            <span className="hidden md:inline">EXPLORER LE SITE</span>
            <span className="md:hidden">EXPLORER</span>
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white animate-bounce" />
          </Button>
          <Link to="/signup" className="w-full sm:w-auto">
            <Button 
              variant="secondary" 
              size="lg"
              className="w-full"
            >
              <span className="hidden md:inline">REJOINDRE LA COMMUNAUTÉ</span>
              <span className="md:hidden">REJOINDRE</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <motion.div
        className="absolute bottom-0 left-0 w-full py-2 md:py-3 overflow-hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* Background - NO TEXTURES */}
        <div className="absolute inset-0 z-0">
          {/* Base color only */}
          <div className="absolute inset-0" style={{ backgroundColor: COLORS.red.pure }} />
        </div>

        {/* Content - ABOVE textures */}
        <motion.div
          className="flex whitespace-nowrap text-[#E0E0E0] text-xs md:text-sm tracking-widest relative z-10 font-mono"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array(10)
            .fill('COMMUNAUTÉ FRANCOPHONE // PARTAGE // DISCUSSION // ACTUALITÉS // ')
            .map((text, i) => (
              <span key={i} className="mx-2 md:mx-4">
                {text}
              </span>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}