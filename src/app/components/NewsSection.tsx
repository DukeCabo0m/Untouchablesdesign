import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { GlitchImage } from './GlitchImage';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { Button } from './Button';

const newsItems = [
  {
    id: 1,
    slug: 'korn-annonce-date-exclusive-france',
    date: '21.01.2026',
    category: 'TOURNÉE',
    title: 'KORN ANNONCE UNE DATE EXCLUSIVE EN FRANCE',
    excerpt: 'Le groupe légendaire revient à Paris pour un concert exceptionnel en juin 2026. Les préventes débutent dans 48h.',
    image: 'https://images.unsplash.com/photo-1682343712259-d3f5fa95ee22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29uY2VydCUyMGNyb3dkfGVufDF8fHx8MTc2ODk5ODM4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    slug: 'nouveau-single-rotting-in-vain-reenregistre',
    date: '18.01.2026',
    category: 'ALBUM',
    title: 'NOUVEAU SINGLE : "ROTTING IN VAIN" RÉENREGISTRÉ',
    excerpt: 'Une version acoustique surprise qui divise déjà la communauté. Écoute disponible sur toutes les plateformes.',
    image: 'https://images.unsplash.com/photo-1727044113921-8d0a82502248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMG11c2ljJTIwdmlueWx8ZW58MXx8fHwxNzY4OTk4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    slug: 'concours-design-creez-visuel-officiel',
    date: '15.01.2026',
    category: 'COMMUNAUTÉ',
    title: 'CONCOURS DESIGN : CRÉEZ LE VISUEL OFFICIEL',
    excerpt: 'Untouchables lance un concours ouvert à tous les créatifs. Le gagnant verra son design sur notre merchandise.',
    image: 'https://images.unsplash.com/photo-1650207292995-7a2386769c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZXh0dXJlfGVufDF8fHx8MTc2ODkwODc4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function NewsSection() {
  return (
    <section id="news" className="relative py-32 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-7xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText glitchIntensity="high">ACTUALITÉS</GlitchText>
            </h2>
            <div className="h-[2px] w-32" style={{ backgroundColor: COLORS.red.pure }} />
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-none"
            >
              {/* Image with X-Ray treatment */}
              <div className="relative overflow-hidden mb-6 border-2 aspect-[4/3]" style={{ borderColor: COLORS.red.pure }}>
                <GlitchImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  style={{
                    filter: 'contrast(1.3) brightness(0.8) grayscale(0.6)',
                    mixBlendMode: 'luminosity',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.1) 2px, rgba(139, 0, 0, 0.1) 4px)',
                  }}
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-3 font-mono text-xs uppercase" style={{ color: COLORS.red.pure }}>
                <span>{item.date}</span>
                <span className="text-[#E0E0E0]">//</span>
                <span>{item.category}</span>
              </div>

              {/* Title */}
              <h3 
                className="text-xl font-black text-[#E0E0E0] mb-3 tracking-tight uppercase leading-tight transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red.pure}
                onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}
              >
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed">
                {item.excerpt}
              </p>

              {/* Read more */}
              <div className="mt-4 font-mono text-xs uppercase flex items-center gap-2 group-hover:gap-4 transition-all" style={{ color: COLORS.red.pure }}>
                <span>&gt;&gt;</span>
                <Link to={`/news/${item.slug}`} className="cursor-pointer">LIRE LA SUITE</Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/news">
            <Button variant="secondary" size="md">
              <GlitchText glitchIntensity="medium">TOUTES LES ACTUALITÉS</GlitchText>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}