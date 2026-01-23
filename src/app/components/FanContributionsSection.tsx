import { motion } from 'motion/react';
import { Hash, Heart, MessageCircle, ExternalLink, Upload, ArrowRight, Instagram } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { Link } from 'react-router-dom';

// Mock data - contributions des fans
const fanContributions = [
  {
    id: 'fan-1',
    type: 'tattoo',
    image: 'https://images.unsplash.com/photo-1761957360313-3e63d01415a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnQlMjBkYXJrfGVufDF8fHx8MTc2OTAyNTAyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    author: '@darkside_ink',
    likes: 342,
    comments: 28,
    caption: 'Mon nouveau tattoo Korn #UntouchablesFR',
  },
  {
    id: 'fan-2',
    type: 'art',
    image: 'https://images.unsplash.com/photo-1759302307377-e72f6a6918a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW4lMjBhcnQlMjBkcmF3aW5nfGVufDF8fHx8MTc2OTAyNTAyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    author: '@kornartiist',
    likes: 589,
    comments: 45,
    caption: 'Fan art Jonathan Davis #UntouchablesFR',
  },
  {
    id: 'fan-3',
    type: 'collection',
    image: 'https://images.unsplash.com/photo-1616663395731-d70897355fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzY4OTgwNjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: '@vinyl_collector',
    likes: 234,
    comments: 19,
    caption: 'Ma collection Korn complète #UntouchablesFR',
  },
  {
    id: 'fan-4',
    type: 'memorabilia',
    image: 'https://images.unsplash.com/photo-1759835715024-11684a8109e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbWVtb3JhYmlsaWF8ZW58MXx8fHwxNzY5MDI1MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: '@korn_memories',
    likes: 412,
    comments: 31,
    caption: 'Souvenirs du concert Paris 2024 #UntouchablesFR',
  },
];

export function FanContributionsSection() {
  return (
    <section className="py-12 relative">
      {/* Background texture - TEMPORARILY DISABLED */}
      {/* <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #8B0000 2px, #8B0000 4px)',
        }}
      /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              <span className="text-[#8B0000]">&gt;&gt;</span>{' '}
              <GlitchText glitchIntensity="low">FAMILY_VALUES</GlitchText>
            </h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '128px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-[#8B0000]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase hover:bg-[#8B0000] transition-colors cursor-none"
            >
              VISITEZ LA GALERIE
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-[#E0E0E0]/70 mb-12 max-w-3xl"
        >
          <span className="text-[#8B0000] font-black">//</span> Partagez vos fanarts, tatouages, collections et souvenirs avec la communauté.<br />
          Utilisez le hashtag <span className="text-[#8B0000] font-black">#UntouchablesFR</span> sur Instagram pour apparaître ici.
        </motion.p>

        {/* Contributions Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {fanContributions.map((contribution, index) => (
            <motion.div
              key={contribution.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all duration-300 cursor-none"
            >
              {/* Image */}
              <img
                src={contribution.image}
                alt={contribution.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  filter: 'contrast(1.4) brightness(0.7) saturate(0.8)',
                }}
              />

              {/* Type badge - top left */}
              <div className="absolute top-2 left-2 bg-[#8B0000] px-2 py-1 font-mono text-[10px] text-[#E0E0E0] uppercase z-10">
                {contribution.type}
              </div>

              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#8B0000]/10 border-2 border-[#8B0000] p-6">
            <div className="flex items-center gap-12">
              {/* Title */}
              <h3 className="font-black text-2xl text-[#E0E0E0] uppercase whitespace-nowrap">
                <span className="text-[#8B0000]">#</span> <GlitchText glitchIntensity="low">REJOINS LA GALERIE</GlitchText>
              </h3>
              
              {/* Text */}
              <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed flex-1 mr-8">
                Partage tes créations, ta collection ou tes tatouages Korn avec la communauté.<br />
                Ajoute simplement <span className="text-[#8B0000] font-black">#UntouchablesFR</span> à tes posts Instagram !
              </p>
              
              {/* Button */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase hover:bg-transparent hover:border-2 hover:border-[#8B0000] transition-all cursor-none whitespace-nowrap flex-shrink-0"
              >
                <Instagram size={14} />
                INSTAGRAM
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}