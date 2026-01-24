import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { GlitchLogo } from '@/app/components/GlitchLogo';
import { FilmGrain } from '@/app/components/FilmGrain';
import { ScanLines } from '@/app/components/ScanLines';
import { Countdown } from '@/app/components/Countdown';
import { COLORS } from '@/app/constants/colors';
import bgImage from 'figma:asset/b8f1aea6c1044520cc9d21a8b0de7671600f9572.png';
import { useState } from 'react';

export function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous ajouterez la logique d'inscription à la newsletter
    console.log('Email soumis:', email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'grayscale(100%) contrast(1.1)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A] opacity-60" />

      {/* TV Flicker effect - lightens the room */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.1, 0.5, 0.2, 0.6, 0.15, 0.3],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'loop',
          times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        }}
      />

      {/* Additional flicker for TV screen area */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '10%',
          top: '30%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.3, 0.8, 0.2, 0.9, 0.3, 1, 0.2, 0.4],
          scale: [1, 1.2, 0.9, 1.3, 1, 1.4, 0.95, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'loop',
          times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        }}
      />

      {/* Textures */}
      <FilmGrain />
      <ScanLines />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Logo Untouchables avec effet glitch */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-4"
        >
          <GlitchLogo className="w-full max-w-2xl mx-auto" />
        </motion.div>

        {/* Clock + SOON Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          {/* Clock Icon animée */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <Clock 
              size={60}
              style={{ 
                color: COLORS.red.pure,
                filter: `drop-shadow(0 0 30px ${COLORS.red.pure}80) drop-shadow(0 0 60px ${COLORS.red.pure}40)`,
              }}
            />
          </motion.div>

          {/* SOON Title */}
          <h1 
            className="text-[80px] md:text-[120px] font-bold tracking-tighter leading-none"
            style={{ 
              color: COLORS.red.pure,
              textShadow: `0 0 30px ${COLORS.red.pure}80, 0 0 60px ${COLORS.red.pure}40`,
            }}
          >
            SOON
          </h1>
        </motion.div>

        {/* Tagline humoristique */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-4"
        >
          <p className="text-[#E0E0E0] font-mono text-base md:text-lg uppercase tracking-wider mb-1">
            CETTE PAGE EST EN CONSTRUCTION
          </p>
          <p 
            className="font-black text-xl md:text-2xl uppercase tracking-tight"
            style={{ color: COLORS.red.pure }}
          >
            TWIST? ON Y TRAVAILLE...
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-[#E0E0E0]/70 font-mono text-xs md:text-sm uppercase tracking-wide max-w-lg mx-auto leading-relaxed">
            Nous préparons quelque chose d'intense pour vous.<br />
            Restez connectés, ça arrive bientôt.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-[#E0E0E0] font-mono text-xs uppercase tracking-widest mb-4">
            LANCEMENT DANS :
          </p>
          <Countdown />
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-[#E0E0E0] font-mono text-xs uppercase tracking-widest mb-3">
            <Mail className="inline-block w-4 h-4 mr-2" />
            NEWSLETTER // SOYEZ PRÉVENUS DU LANCEMENT
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="VOTRE EMAIL"
                  required
                  className="flex-1 px-3 py-2 font-mono text-xs bg-[#1A1A1A] text-[#E0E0E0] placeholder-[#E0E0E0]/30 uppercase tracking-wider focus:outline-none"
                  style={{
                    border: `1px solid ${COLORS.red.pure}40`,
                  }}
                />
                <button
                  type="submit"
                  className="px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    backgroundColor: COLORS.red.pure,
                    color: '#E0E0E0',
                  }}
                >
                  OK
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <p 
                className="font-mono text-sm uppercase tracking-wider font-bold"
                style={{ color: COLORS.red.pure }}
              >
                ✓ INSCRIPTION CONFIRMÉE !
              </p>
              <p className="mt-1 text-[#E0E0E0]/70 font-mono text-xs uppercase">
                On vous tient au courant_
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-[#E0E0E0] font-mono text-xs uppercase tracking-widest mb-3">
            SUIVEZ-NOUS
          </p>
          <div className="flex items-center justify-center gap-5">
            <motion.a
              href="https://www.facebook.com/korn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Facebook 
                size={28} 
                className="text-[#E0E0E0] hover:text-white transition-colors"
                style={{
                  filter: `drop-shadow(0 0 10px ${COLORS.red.pure}40)`,
                }}
              />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/korn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Instagram 
                size={28} 
                className="text-[#E0E0E0] hover:text-white transition-colors"
                style={{
                  filter: `drop-shadow(0 0 10px ${COLORS.red.pure}40)`,
                }}
              />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/korn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Youtube 
                size={28} 
                className="text-[#E0E0E0] hover:text-white transition-colors"
                style={{
                  filter: `drop-shadow(0 0 10px ${COLORS.red.pure}40)`,
                }}
              />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@korn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#E0E0E0] hover:text-white transition-colors"
                style={{
                  filter: `drop-shadow(0 0 10px ${COLORS.red.pure}40)`,
                }}
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="text-[#E0E0E0]/50 font-mono text-xs uppercase tracking-widest"
        >
          &gt; STATUS: UNDER_CONSTRUCTION // PATIENCE_IS_KEY_
        </motion.p>
      </div>
    </div>
  );
}