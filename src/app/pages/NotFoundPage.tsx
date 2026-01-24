import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Search, Home } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { COLORS } from '@/app/constants/colors';
import bgImage from 'figma:asset/b8f1aea6c1044520cc9d21a8b0de7671600f9572.png';

export function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* 404 Error */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-[180px] md:text-[240px] font-black tracking-tighter leading-none mb-4"
            style={{ 
              color: COLORS.red.pure,
              textShadow: `0 0 30px ${COLORS.red.pure}80, 0 0 60px ${COLORS.red.pure}40`,
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Tagline humoristique */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-[#E0E0E0] font-mono text-lg md:text-xl uppercase tracking-wider mb-2">
            CETTE PAGE A ÉTÉ ASPIRÉE
          </p>
          <p 
            className="font-black text-2xl md:text-3xl uppercase tracking-tight"
            style={{ color: COLORS.red.pure }}
          >
            HERE TO STAY? PAS CELLE-LÀ...
          </p>
        </motion.div>

        {/* Search form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E0E0E0]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="RECHERCHER SUR LE SITE..."
                className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border-2 text-[#E0E0E0] font-mono text-sm uppercase tracking-wider placeholder:text-[#E0E0E0]/30 focus:outline-none transition-colors"
                style={{ borderColor: COLORS.red.pure }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#E0E0E0';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = COLORS.red.pure;
                }}
              />
            </div>
            <Button type="submit" variant="primary" size="lg">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </motion.form>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to="/">
            <Button variant="secondary" size="lg">
              <Home className="w-5 h-5" />
              RETOUR À L'ACCUEIL
            </Button>
          </Link>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 text-[#E0E0E0]/50 font-mono text-xs uppercase tracking-widest"
        >
          &gt; ERROR_CODE: BLIND // STATUS: LOST_IN_THE_VOID_
        </motion.p>
      </div>
    </div>
  );
}