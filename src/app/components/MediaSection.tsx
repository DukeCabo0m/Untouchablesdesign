import { useState } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { GlitchImage } from './GlitchImage';
import { Play, Image as ImageIcon, Video } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';
import { generatePlaceholder } from '@/app/utils/placeholder';
import { HandDrawnBox } from './HandDrawnBox';

const mediaItems = [
  {
    id: 1,
    type: 'video',
    title: 'FREAK ON A LEASH',
    subtitle: 'CLIP OFFICIEL • 1999',
    image: generatePlaceholder(1080, 720, 'VIDEO'),
    views: '47M',
  },
  {
    id: 2,
    type: 'photo',
    title: 'STUDIO SESSION',
    subtitle: 'REQUIEM RECORDING • 2022',
    image: generatePlaceholder(1080, 720, 'STUDIO'),
    views: '892K',
  },
  {
    id: 3,
    type: 'audio',
    title: 'BLIND',
    subtitle: 'LIVE PARIS • 2019',
    image: generatePlaceholder(1080, 720, 'LIVE'),
    views: '2.1M',
  },
  {
    id: 4,
    type: 'video',
    title: 'FALLING AWAY FROM ME',
    subtitle: 'REMASTERED • 2024',
    image: generatePlaceholder(1080, 720, 'REMASTER'),
    views: '12M',
  },
  {
    id: 5,
    type: 'photo',
    title: 'BACKSTAGE',
    subtitle: 'HELLFEST • 2023',
    image: generatePlaceholder(1080, 720, 'BACKSTAGE'),
    views: '456K',
  },
  {
    id: 6,
    type: 'video',
    title: 'ROTTING IN VAIN',
    subtitle: 'ACOUSTIC SESSION • 2026',
    image: generatePlaceholder(1080, 720, 'ACOUSTIC'),
    views: '3.8M',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Play size={32} />;
    case 'photo':
      return <ImageIcon size={32} />;
    case 'audio':
      return <Video size={32} />;
    default:
      return <Play size={32} />;
  }
};

export function MediaSection() {
  return (
    <section id="media" className="relative py-32 px-4 bg-[#0A0A0A]">
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
              <GlitchText glitchIntensity="high">MÉDIA</GlitchText>
            </h2>
            <div className="h-[2px] w-32 bg-[#8B0000]" />
          </motion.div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer relative"
            >
              {/* Media Container */}
              <HandDrawnBox
                color="#8B0000"
                strokeWidth={3}
                roughness={2.5}
                className="relative overflow-hidden aspect-video bg-[#0A0A0A]"
              >
                {/* Image with X-Ray treatment */}
                <GlitchImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Scanlines effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
                  }}
                />

                {/* Overlay with icon */}
                <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-[#8B0000]">
                    {getIcon(item.type)}
                  </div>
                </div>

                {/* Type badge */}
                <div className="absolute top-3 left-3 bg-[#8B0000] px-3 py-1">
                  <span className="font-mono text-xs text-[#0A0A0A] font-bold uppercase">
                    {item.type}
                  </span>
                </div>

                {/* Views counter */}
                <HandDrawnBox
                  color="#8B0000"
                  strokeWidth={2}
                  roughness={2}
                  className="absolute bottom-3 right-3 bg-[#0A0A0A]/90 px-3 py-1"
                >
                  <span className="font-mono text-xs text-[#E0E0E0]">
                    {item.views}
                  </span>
                </HandDrawnBox>
              </HandDrawnBox>

              {/* Info */}
              <div className="mt-4">
                <h3 className="text-lg font-black text-[#E0E0E0] mb-1 uppercase tracking-tight group-hover:text-[#8B0000] transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[#E0E0E0]/60 uppercase">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Media Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 text-center"
          >
            <p className="text-4xl font-black text-[#E0E0E0] mb-2">847</p>
            <p className="font-mono text-xs text-[#8B0000] uppercase">VIDÉOS</p>
          </HandDrawnBox>
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 text-center"
          >
            <p className="text-4xl font-black text-[#E0E0E0] mb-2">2.3K</p>
            <p className="font-mono text-xs text-[#8B0000] uppercase">PHOTOS</p>
          </HandDrawnBox>
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 text-center"
          >
            <p className="text-4xl font-black text-[#E0E0E0] mb-2">1.1K</p>
            <p className="font-mono text-xs text-[#8B0000] uppercase">AUDIOS</p>
          </HandDrawnBox>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button variant="secondary" size="md">
            EXPLORER LA GALERIE COMPLÈTE
          </Button>
        </motion.div>
      </div>
    </section>
  );
}