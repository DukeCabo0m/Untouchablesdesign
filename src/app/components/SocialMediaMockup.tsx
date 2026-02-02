import { motion } from 'motion/react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { generatePlaceholder } from '@/app/utils/placeholder';

const socialPosts = [
  {
    type: 'abstract',
    image: generatePlaceholder(1080, 1080, 'CORROSION'),
    caption: 'CORROSION // 2026',
    filter: 'contrast(1.2) saturate(0.7) brightness(0.9)',
  },
  {
    type: 'band',
    image: generatePlaceholder(1080, 1080, 'SOLD OUT'),
    caption: 'SOLD OUT // BERLIN',
    filter: 'contrast(1.2) saturate(0.7) brightness(0.9)',
  },
  {
    type: 'abstract',
    image: generatePlaceholder(1080, 1080, 'INSIDE OUT'),
    caption: 'INSIDE OUT',
    filter: 'invert(1) contrast(2) grayscale(1) brightness(0.8)',
  },
];

export function SocialMediaMockup() {
  return (
    <section className="min-h-screen bg-[#0A0A0A] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-24"
          style={{ fontFamily: 'Arial Black, sans-serif' }}
        >
          NOS_RÉSEAUX
        </motion.h2>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {socialPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0A0A] border border-[#E0E0E0]/20 overflow-hidden cursor-none"
            >
              {/* Post header */}
              <div className="p-4 border-b border-[#E0E0E0]/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B0000]" />
                <span className="font-mono text-xs text-[#E0E0E0] tracking-wider">
                  UNTOUCHABLES_FR
                </span>
              </div>

              {/* Post image */}
              <div className="relative aspect-square overflow-hidden group">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                  style={{
                    filter: post.filter,
                  }}
                />
                
                {/* Noise overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-[#8B0000] mix-blend-multiply"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: [0, 0.3, 0, 0.2, 0] }}
                  transition={{ duration: 0.3 }}
                />

                {/* Scanlines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, #E0E0E0 2px, #E0E0E0 4px)',
                  }}
                />
              </div>

              {/* Post actions */}
              <div className="p-4 border-t border-[#E0E0E0]/20">
                <div className="flex items-center gap-4 mb-3">
                  <Heart size={20} className="text-[#E0E0E0] cursor-none" />
                  <MessageCircle size={20} className="text-[#E0E0E0] cursor-none" />
                  <Send size={20} className="text-[#E0E0E0] cursor-none" />
                  <Bookmark size={20} className="text-[#E0E0E0] ml-auto cursor-none" />
                </div>
                <p className="font-mono text-xs text-[#E0E0E0] tracking-wider">
                  <GlitchText glitchIntensity="low">{post.caption}</GlitchText>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TikTok / Story style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kinetic Typography example */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[9/16] bg-[#0A0A0A] border border-[#8B0000] overflow-hidden cursor-none"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/20 to-[#0A0A0A]" />

            {/* Kinetic text animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center"
                animate={{
                  scale: [1, 1.1, 1, 1.05, 1],
                  rotate: [0, -2, 2, -1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <h3
                  className="text-6xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-4"
                  style={{
                    fontFamily: 'Arial Black, sans-serif',
                    textShadow: '3px 3px 0px #8B0000',
                  }}
                >
                  FREAK
                </h3>
                <h3
                  className="text-6xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-4"
                  style={{
                    fontFamily: 'Arial Black, sans-serif',
                    textShadow: '3px 3px 0px #8B0000',
                  }}
                >
                  ON A
                </h3>
                <h3
                  className="text-6xl font-black text-[#8B0000] uppercase tracking-[-0.05em]"
                  style={{
                    fontFamily: 'Arial Black, sans-serif',
                    textShadow: '3px 3px 0px #E0E0E0',
                  }}
                >
                  LEASH
                </h3>
              </motion.div>
            </div>

            {/* Footer info */}
            <div className="absolute bottom-8 left-8 font-mono text-xs text-[#E0E0E0]">
              <p>TIKTOK // REELS</p>
              <p className="text-[#8B0000]">KINETIC_TYPE_V1</p>
            </div>
          </motion.div>

          {/* Story format */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[9/16] overflow-hidden cursor-none"
          >
            <img
              src={generatePlaceholder(1080, 1920, 'STORY')}
              alt="Story"
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.2) saturate(0.7) brightness(0.9)',
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B0000]" />
                <span className="font-mono text-sm text-[#E0E0E0]">KORN</span>
                <span className="font-mono text-xs text-[#E0E0E0]/60">2h</span>
              </div>

              <div>
                <p className="font-mono text-sm text-[#E0E0E0] mb-2">NEW MERCH DROP</p>
                <p className="text-xs text-[#8B0000] uppercase tracking-wider">
                  LINK IN BIO_
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guidelines note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 border-2 border-[#8B0000] font-mono text-xs text-[#E0E0E0] leading-loose"
        >
          <p className="text-[#8B0000] mb-4">&gt;&gt; SOCIAL_MEDIA_FILTER_SPECS:</p>
          <p>CONTRAST: +20</p>
          <p>SATURATION: -30</p>
          <p>GRAIN: +50</p>
          <p className="mt-4 text-[#8B0000]">FEED_PATTERN: [ABSTRACT] / [BAND_PHOTO] / REPEAT</p>
        </motion.div>
      </div>
    </section>
  );
}