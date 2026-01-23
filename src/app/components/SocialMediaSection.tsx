import { motion } from 'motion/react';
import { Youtube, Play, Heart, MessageCircle, Instagram, UserPlus } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Mock data - à remplacer par de vraies données API
const latestVideo = {
  id: 'video-1',
  title: 'Korn - New Single "Worse" Official Music Video',
  thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  url: 'https://youtube.com',
  views: '2.4M',
  date: '2026-01-15',
  duration: '3:42'
};

const shorts = [
  {
    id: 'short-1',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    title: 'Behind the Scenes - Studio Session',
    views: '845K',
    date: '2026-01-18',
    hashtags: ['#BehindTheScenes', '#Studio', '#Korn'],
    url: 'https://youtube.com/shorts'
  },
  {
    id: 'short-2',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80',
    title: 'Jonathan Davis Vocal Warm-up',
    views: '1.2M',
    date: '2026-01-17',
    hashtags: ['#JonathanDavis', '#Vocals', '#WarmUp'],
    url: 'https://tiktok.com'
  },
  {
    id: 'short-3',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    title: 'Fieldy Bass Breakdown',
    views: '654K',
    date: '2026-01-16',
    hashtags: ['#Fieldy', '#Bass', '#Breakdown'],
    url: 'https://youtube.com/shorts'
  },
  {
    id: 'short-4',
    thumbnail: 'https://images.unsplash.com/photo-1690013429722-87852aae164b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY4OTc2NzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Live Stage Setup Time-lapse',
    views: '923K',
    date: '2026-01-15',
    hashtags: ['#LiveStage', '#Timelapse', '#Concert'],
    url: 'https://youtube.com/shorts'
  },
  {
    id: 'short-5',
    thumbnail: 'https://images.unsplash.com/photo-1639408431842-a635d57b4dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGJhY2tzdGFnZXxlbnwxfHx8fDE3NjkwMzUyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Backstage Pre-Show Ritual',
    views: '1.1M',
    date: '2026-01-14',
    hashtags: ['#Backstage', '#PreShow', '#Ritual'],
    url: 'https://tiktok.com'
  },
  {
    id: 'short-6',
    thumbnail: 'https://images.unsplash.com/photo-1664817717775-956820aa14e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBtaXhpbmd8ZW58MXx8fHwxNzY5MDM1MjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Mixing the New Album',
    views: '789K',
    date: '2026-01-13',
    hashtags: ['#Mixing', '#NewAlbum', '#Studio'],
    url: 'https://youtube.com/shorts'
  },
  {
    id: 'short-7',
    thumbnail: 'https://images.unsplash.com/photo-1746358359001-679e992ff4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvbmNlcnQlMjBtb3NofGVufDF8fHx8MTc2OTAzNTI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Insane Mosh Pit Energy',
    views: '1.5M',
    date: '2026-01-12',
    hashtags: ['#MoshPit', '#Live', '#Energy'],
    url: 'https://tiktok.com'
  }
];

const instagramPosts = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1747003869273-9fc7ad373137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwY29uY2VydCUyMHN0YWdlfGVufDF8fHx8MTc2ODk1Nzk3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 45620,
    comments: 234,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1552595458-e8ad6af8aa10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjkwMzQ5NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 38950,
    comments: 189,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1694024561275-c91acabb05ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBuaWdodHxlbnwxfHx8fDE3Njg5MjkyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 52100,
    comments: 312,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1608660890457-e985951f07d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXIlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc2OTAyMDU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 41830,
    comments: 276,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1641264024622-fbc1abeb6075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtJTIwa2l0JTIwc3R1ZGlvfGVufDF8fHx8MTc2OTAwMjExM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 47200,
    comments: 198,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1642946795468-3ca1a1e0068d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNzJTIwZ3VpdGFyJTIwbXVzaWNpYW58ZW58MXx8fHwxNzY5MDM0OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 39450,
    comments: 221,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-7',
    image: 'https://images.unsplash.com/photo-1669181339677-0f646762be03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Bob25lJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY5MDE5NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 56780,
    comments: 342,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-8',
    image: 'https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZmVzdGl2YWwlMjBjcm93ZHxlbnwxfHx8fDE3Njg5NTcxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 43210,
    comments: 267,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-9',
    image: 'https://images.unsplash.com/photo-1620455992636-3118c85e30f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3Njg5MzE2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 49560,
    comments: 298,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-10',
    image: 'https://images.unsplash.com/photo-1647142300197-33fa91ed0b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwZ3VpdGFyaXN0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NjkwMzQ5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 51240,
    comments: 315,
    url: 'https://instagram.com'
  }
];

// Social media stats
const socialStats = {
  youtube: {
    subscribers: '2.8M',
    url: 'https://youtube.com/@korn'
  },
  tiktok: {
    followers: '1.2M',
    url: 'https://tiktok.com/@korn'
  },
  instagram: {
    followers: '3.4M',
    url: 'https://instagram.com/korn'
  }
};

export function SocialMediaSection() {
  const [shortsPaused, setShortsPaused] = useState(false);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [instaPaused, setInstaPaused] = useState(false);
  const [currentInstaIndex, setCurrentInstaIndex] = useState(0);

  // Auto-scroll for shorts
  useEffect(() => {
    const interval = setInterval(() => {
      if (!shortsPaused) {
        setCurrentShortIndex((prev) => (prev + 1) % (shorts.length - 1));
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [shortsPaused]);

  // Auto-scroll for Instagram
  useEffect(() => {
    const interval = setInterval(() => {
      if (!instaPaused) {
        setCurrentInstaIndex((prev) => (prev + 1) % (instagramPosts.length - 3));
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [instaPaused]);

  // Get 2 consecutive shorts starting from currentShortIndex
  const visibleShorts = [
    shorts[currentShortIndex],
    shorts[(currentShortIndex + 1) % shorts.length],
  ];

  // Get 4 consecutive Instagram posts starting from currentInstaIndex
  const visibleInstaPosts = Array.from({ length: 4 }, (_, i) => 
    instagramPosts[(currentInstaIndex + i) % instagramPosts.length]
  );

  return (
    <section id="social-media-section" className="min-h-screen bg-[#0A0A0A] py-12 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-4"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span>{' '}
            <GlitchText glitchIntensity="low">SOCIAL_FEED</GlitchText>
          </h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '128px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#8B0000]"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest YouTube Video */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Youtube size={24} className="text-[#8B0000]" />
                <h3 className="font-black text-xl text-[#E0E0E0] uppercase tracking-tight">
                  <span className="text-[#8B0000]">//</span> DERNIÈRE VIDÉO
                </h3>
              </div>
              <a
                href={socialStats.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-[#E0E0E0] font-mono text-[10px] uppercase hover:bg-[#8B0000]/80 transition-colors cursor-none"
              >
                <UserPlus size={12} />
                S'ABONNER
                <span className="text-[#E0E0E0] ml-1">{socialStats.youtube.subscribers}</span>
              </a>
            </div>

            <a
              href={latestVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block cursor-none"
            >
              <div className="relative overflow-hidden border-2 border-[#E0E0E0]/20 group-hover:border-[#8B0000] transition-colors h-[360px]">
                <img
                  src={latestVideo.thumbnail}
                  alt={latestVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    filter: 'contrast(1.4) brightness(0.7) saturate(0.8)',
                  }}
                />
                
                {/* Scanlines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
                  }}
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#8B0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-[#E0E0E0] fill-[#E0E0E0]" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/90 px-2 py-1">
                  <span className="font-mono text-xs text-[#E0E0E0]">{latestVideo.duration}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-black text-2xl text-[#E0E0E0] uppercase mb-2 group-hover:text-[#8B0000] transition-colors leading-tight">
                  {latestVideo.title}
                </h4>
                <div className="flex items-center gap-4 font-mono text-base text-[#E0E0E0]/60">
                  <span>{latestVideo.views} vues</span>
                  <span className="text-[#8B0000]">•</span>
                  <span>{new Date(latestVideo.date).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Separator - visible only on mobile */}
          <div className="lg:hidden my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E0E0E0]/20 border-t border-dashed border-[#E0E0E0]/20" style={{ backgroundImage: 'none' }} />
            <div className="flex-1 h-px bg-[#E0E0E0]/20 border-t border-dashed border-[#E0E0E0]/20" style={{ backgroundImage: 'none' }} />
          </div>

          {/* Shorts Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:border-l lg:border-dashed lg:border-[#E0E0E0]/20 lg:pl-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Play size={24} className="text-[#8B0000]" />
                <h3 className="font-black text-xl text-[#E0E0E0] uppercase tracking-tight">
                  <span className="text-[#8B0000]">//</span> SHORTS
                </h3>
              </div>
              <a
                href={socialStats.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-[#E0E0E0] font-mono text-[10px] uppercase hover:bg-[#8B0000]/80 transition-colors cursor-none"
              >
                <UserPlus size={12} />
                SUIVRE
                <span className="text-[#E0E0E0] ml-1">{socialStats.tiktok.followers}</span>
              </a>
            </div>

            <div 
              className="space-y-4 overflow-hidden relative"
              onMouseEnter={() => setShortsPaused(true)}
              onMouseLeave={() => setShortsPaused(false)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleShorts.map((short) => (
                  <motion.a
                    key={`${short.id}-${currentShortIndex}`}
                    href={short.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut",
                      layout: { duration: 0.5 }
                    }}
                    layout
                    className="group flex gap-4 cursor-none"
                  >
                    <div className="relative w-36 h-52 flex-shrink-0 overflow-hidden border-2 border-[#E0E0E0]/20 group-hover:border-[#8B0000] transition-colors">
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'contrast(1.4) brightness(0.7) saturate(0.8)',
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#8B0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={20} className="text-[#E0E0E0] fill-[#E0E0E0]" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-mono text-sm text-[#E0E0E0] uppercase mb-2 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
                        {short.title}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/60 mb-2">
                        <span>{short.views} vues</span>
                        <span className="text-[#8B0000]">•</span>
                        <span>{new Date(short.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {short.hashtags.map((tag, idx) => (
                          <span key={idx} className="font-mono text-xs text-[#8B0000] font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Instagram Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          {/* Separator */}
          <div className="mb-8 border-t border-dashed border-[#E0E0E0]/20" />

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Instagram size={24} className="text-[#8B0000]" />
              <h3 className="font-black text-xl text-[#E0E0E0] uppercase tracking-tight">
                <span className="text-[#8B0000]">//</span> INSTAGRAM
              </h3>
            </div>
            <a
              href={socialStats.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-[#E0E0E0] font-mono text-[10px] uppercase hover:bg-[#8B0000]/80 transition-colors cursor-none"
            >
              <UserPlus size={12} />
              SUIVRE
              <span className="text-[#E0E0E0] ml-1">{socialStats.instagram.followers}</span>
            </a>
          </div>

          {/* Instagram Carousel */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setInstaPaused(true)}
            onMouseLeave={() => setInstaPaused(false)}
          >
            <div className="flex gap-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleInstaPosts.map((post, index) => (
                  <motion.a
                    key={`${post.id}-${currentInstaIndex}-${index}`}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: index * 0.05
                    }}
                    layout
                    className="group relative flex-1 aspect-square overflow-hidden border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-colors cursor-none"
                  >
                    <img
                      src={post.image}
                      alt={`Instagram post`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        filter: 'contrast(1.4) brightness(0.7) saturate(0.8)',
                      }}
                    />

                    {/* Scanlines overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
                      }}
                    />

                    {/* Hover Stats */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]">
                        <Heart size={14} className="text-[#8B0000]" />
                        <span>{(post.likes / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]">
                        <MessageCircle size={14} className="text-[#8B0000]" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}