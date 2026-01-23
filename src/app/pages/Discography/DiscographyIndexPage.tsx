import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GlitchText } from '@/app/components/GlitchText';
import { Disc3, Radio, ListMusic, Music4, Video } from 'lucide-react';

const categories = [
  {
    title: 'ALBUMS STUDIO',
    href: '/discography/studio',
    icon: Disc3,
    description: '14 albums studio qui ont révolutionné le metal',
    count: '14',
  },
  {
    title: 'ALBUMS LIVE',
    href: '/discography/live',
    icon: Radio,
    description: 'Captures de l\'énergie brute sur scène',
    count: '3+',
  },
  {
    title: 'COMPILATIONS',
    href: '/discography/compilations',
    icon: ListMusic,
    description: 'Best-of et collections essentielles',
    count: '5+',
  },
  {
    title: 'SINGLES & EPs',
    href: '/discography/singles',
    icon: Music4,
    description: 'Singles, EPs et raretés',
    count: '20+',
  },
  {
    title: 'VIDÉOCLIPS',
    href: '/discography/videos',
    icon: Video,
    description: 'Galerie complète des clips officiels',
    count: '30+',
  },
];

export function DiscographyIndexPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1
            className="text-7xl md:text-9xl font-black text-[#E0E0E0] uppercase tracking-tighter mb-6"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText>DISCOGRAPHIE</GlitchText>
          </h1>
          <div className="h-1 w-32 bg-[#8B0000]" />
          <p className="font-mono text-sm text-[#E0E0E0]/70 mt-6 max-w-3xl">
            30+ ans de révolution sonore. Albums studio, live, compilations, singles et vidéoclips.
            L'intégralité de la discographie de Korn.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {[
            { label: 'ALBUMS VENDUS', value: '40M+' },
            { label: 'GRAMMY AWARDS', value: '2' },
            { label: '#1 BILLBOARD', value: '7' },
            { label: 'ANNÉES ACTIF', value: '30+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6 text-center"
            >
              <div
                className="text-4xl md:text-5xl font-black text-[#8B0000] mb-2"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-[#E0E0E0]/70 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                to={category.href}
                className="group relative bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all p-8 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {/* Background effect */}
                  <div className="absolute inset-0 bg-[#8B0000] opacity-0 group-hover:opacity-10 transition-opacity" />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <Icon className="w-16 h-16 text-[#8B0000]" strokeWidth={1.5} />
                  </div>

                  {/* Count badge */}
                  <div className="absolute top-6 right-6 font-mono text-xs text-[#E0E0E0] bg-[#8B0000]/20 border border-[#8B0000] px-3 py-1">
                    {category.count}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h2
                      className="text-3xl font-black text-[#E0E0E0] uppercase mb-3 tracking-tight"
                      style={{ fontFamily: 'Arial Black, sans-serif' }}
                    >
                      {category.title}
                    </h2>
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="relative z-10 mt-6 flex items-center font-mono text-xs text-[#8B0000] uppercase group-hover:translate-x-2 transition-transform">
                    <span>EXPLORER</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24 p-12 bg-[#0A0A0A] border-l-4 border-[#8B0000] text-center"
        >
          <h3
            className="text-3xl font-black text-[#E0E0E0] uppercase mb-4 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <GlitchText glitchIntensity="medium">NOUVEL ALBUM EN 2026</GlitchText>
          </h3>
          <p className="font-mono text-sm text-[#E0E0E0]/70 mb-6">
            Korn revient avec Ross Robinson pour un 15e album studio. Sortie prévue été 2026.
          </p>
          <Link
            to="/news"
            className="inline-block font-mono text-xs text-[#8B0000] border border-[#8B0000] hover:bg-[#8B0000] hover:text-[#E0E0E0] transition-all px-6 py-3 uppercase"
          >
            SUIVRE L'ACTUALITÉ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}