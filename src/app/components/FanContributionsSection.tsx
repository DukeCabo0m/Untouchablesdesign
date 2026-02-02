import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { Link } from 'react-router';
import { Heart, MessageCircle, ArrowRight, Instagram } from 'lucide-react';
import { Button } from './Button';

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
    <section className="bg-[#0A0A0A] py-12 px-0 pb-4">
      {/* Animated gradient background */}
      {/* <AnimatedGradientBackground 
        colors={['#0A0A0A', '#1A0000', '#0A0A0A']} 
        opacity={0.3}
      /> */}

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16">
          <SectionHeading 
            title="FAMILY_VALUES" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description={
              <>
                Partagez vos fanarts, tatouages, collections et souvenirs avec la communauté.<br />
                Utilisez le hashtag <span className="text-[#8B0000] font-black">#UntouchablesFR</span> sur Instagram pour apparaître ici.
              </>
            }
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="mt-4"
          >
            <Button
              href="/gallery"
              variant="primary"
            >
              VISITEZ LA GALERIE
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* Contributions Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {fanContributions.map((contribution, index) => (
            <motion.div
              key={contribution.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all duration-300 cursor-pointer"
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
              <div className="absolute top-2 left-2 bg-[#8B0000] px-2 py-1 font-mono text-[#E0E0E0] uppercase z-10">
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
              <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed flex-1 mr-8">
                Partage tes créations, ta collection ou tes tatouages Korn avec la communauté.<br />
                Ajoute simplement <span className="text-[#8B0000] font-black">#UntouchablesFR</span> à tes posts Instagram !
              </p>
              
              {/* Button */}
              <Button
                as="a"
                href="https://www.instagram.com/untouchables.fr/"
                external
                variant="primary"
                size="md"
              >
                <Instagram size={14} />
                INSTAGRAM
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}