import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { GlitchLogo } from './GlitchLogo';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.querySelector('#social-media-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video YouTube */}
      <div className="absolute inset-0">
        <iframe
          className="absolute"
          style={{
            width: '300vw',
            height: '300vh',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          src="https://www.youtube.com/embed/pr3x7tS__dE?autoplay=1&mute=1&loop=1&playlist=pr3x7tS__dE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          allow="autoplay; fullscreen"
          title="Korn Live Background"
        />
      </div>

      {/* Grayscale overlay effect */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundColor: '#0A0A0A',
          mixBlendMode: 'color',
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A] opacity-70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 flex justify-center"
        >
          <GlitchLogo className="w-full max-w-4xl" />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-mono text-[#FFFFFF] text-sm md:text-base tracking-wider"
        >
          <p className="mb-2 font-bold">COMMUNAUTÉ FRANCOPHONE // FANS DE KORN</p>
          <p className="font-bold" style={{ color: COLORS.red.pure }}>&gt; LA PASSION NE S'ÉTEINT JAMAIS_</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-wrap gap-4 justify-center"
        >
          <Button onClick={scrollToNext} variant="primary" size="lg">
            <GlitchText glitchIntensity="low">EXPLORER LE SITE</GlitchText>
            <ChevronDown className="w-5 h-5 text-white animate-bounce" />
          </Button>
          <Link to="/signup">
            <Button variant="secondary" size="lg">
              <GlitchText glitchIntensity="low">REJOINDRE LA COMMUNAUTÉ</GlitchText>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <motion.div
        className="absolute bottom-0 left-0 w-full py-3 overflow-hidden"
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
          className="flex whitespace-nowrap font-mono text-[#E0E0E0] text-xs tracking-widest relative z-10"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array(10)
            .fill('COMMUNAUTÉ FRANCOPHONE // PARTAGE // DISCUSSION // ACTUALITÉS // ')
            .map((text, i) => (
              <span key={i} className="mx-4">
                {text}
              </span>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}