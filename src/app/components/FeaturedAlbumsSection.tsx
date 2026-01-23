import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Disc, ArrowRight, Star } from 'lucide-react';
import { albums } from '@/app/data/albums';
import { GlitchText } from './GlitchText';

export function FeaturedAlbumsSection() {
  // Featured albums - les 4 plus aimés par la communauté
  const featuredAlbums = albums.filter(a => 
    ['untouchables-2002', 'follow-the-leader-1998', 'issues-1999', 'korn-1994'].includes(a.slug)
  ).slice(0, 4);

  return (
    <section className="py-12 relative">
      {/* Background texture - TEMPORARILY DISABLED */}
      {/* <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #8B0000 35px, #8B0000 37px)',
        }}
      /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em]"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span>{' '}
            <GlitchText glitchIntensity="low">ALBUMS_CULTES</GlitchText>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/discography/studio"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase hover:bg-[#8B0000] transition-colors cursor-none"
            >
              EXPLORER LA DISCOGRAPHIE
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Red Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: '128px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-[#8B0000] mb-6"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm text-[#E0E0E0]/70 max-w-2xl mb-16"
        >
          <span className="text-[#8B0000] font-black">//</span> Les albums qui ont défini le nu-metal et marqué des générations entières.<br />
          Sélection exclusive de la communauté Untouchables.
        </motion.p>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredAlbums.map((album, index) => (
            <motion.article
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-none"
            >
              <Link to={`/discography/${album.slug}`}>
                {/* Card Container */}
                <div className="border-2 border-[#E0E0E0]/20 bg-[#000000] hover:border-[#E0E0E0] transition-colors h-full flex flex-col">
                  {/* Album Cover */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{
                        filter: 'contrast(1.5) brightness(0.7) grayscale(0.9)',
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                      }}
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[#8B0000]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <Disc size={48} className="text-[#E0E0E0] mb-4 mx-auto animate-spin" style={{ animationDuration: '3s' }} />
                        <p className="font-mono text-xs text-[#E0E0E0] uppercase">EXPLORER L'ALBUM</p>
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4 bg-[#E0E0E0] px-3 py-1">
                      <span className="font-black text-lg text-[#0A0A0A]">
                        {album.year}
                      </span>
                    </div>

                    {/* Star badge for favorites */}
                    <div className="absolute top-4 left-4 bg-[#8B0000] p-2">
                      <Star size={16} className="text-[#E0E0E0] fill-[#E0E0E0]" />
                    </div>
                  </div>

                  {/* Red separator */}
                  <div className="h-px bg-[#E0E0E0]/20" />

                  {/* Album Info - Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-[#E0E0E0] uppercase tracking-tight mb-3 group-hover:text-[#8B0000] transition-colors">
                      {album.title}
                    </h3>

                    <div className="space-y-2 font-mono text-xs text-[#E0E0E0]/70 mb-4">
                      <div>
                        <span className="text-[#8B0000] uppercase">Label : </span>
                        {album.label}
                      </div>
                      <div>
                        <span className="text-[#8B0000] uppercase">Pistes : </span>
                        {album.tracks.length}
                      </div>
                      {album.certifications && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {album.certifications.slice(0, 2).map((cert, i) => (
                            <span
                              key={i}
                              className="bg-[#8B0000]/20 border border-[#8B0000] px-2 py-1 text-[10px] uppercase"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <p className="font-mono text-xs text-[#E0E0E0]/60 leading-relaxed line-clamp-3 mb-4 flex-1">
                      {album.description.split('\n')[0]}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-[#8B0000] font-mono text-xs uppercase group-hover:gap-4 transition-all">
                      VOIR L'ALBUM
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}