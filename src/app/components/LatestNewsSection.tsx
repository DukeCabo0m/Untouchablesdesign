import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { newsArticles } from '@/app/data/news';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { useState, useEffect } from 'react';

export function LatestNewsSection() {
  // Get latest news (1 main + all others for rotation)
  const mainNews = newsArticles[0];
  const secondaryNewsPool = newsArticles.slice(1); // All news except the first one
  
  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % (secondaryNewsPool.length - 2));
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [secondaryNewsPool.length, isPaused]);

  // Get 3 consecutive news starting from currentIndex
  const visibleNews = [
    secondaryNewsPool[currentIndex],
    secondaryNewsPool[(currentIndex + 1) % secondaryNewsPool.length],
    secondaryNewsPool[(currentIndex + 2) % secondaryNewsPool.length],
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + (secondaryNewsPool.length - 2)) % (secondaryNewsPool.length - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (secondaryNewsPool.length - 2));
  };

  return (
    <section className="bg-[#0A0A0A] py-12 px-4 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16">
          <SectionHeading 
            title="ACTUALITÉS" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description={
              <>
                Suivez l'actualité de Korn en temps réel, sans filtre ni compromis.<br />
                Annonces officielles, tournées, sorties et exclusivités de la communauté.
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
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase hover:bg-[#8B0000] transition-colors cursor-none"
            >
              TOUTES LES NEWS
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* News Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Featured News - Large */}
          {mainNews && (
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group cursor-none"
            >
              <Link to={`/news/${mainNews.slug}`} className="block">
                {/* Large Image - Height matches first news + gap + second news image */}
                <div className="relative overflow-hidden border-2 border-[#E0E0E0]/20 group-hover:border-[#8B0000] transition-colors mb-6" style={{ height: '408px' }}>
                  <img
                    src={mainNews.image}
                    alt={mainNews.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: 'contrast(1.5) brightness(0.7) grayscale(0.9)',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#8B0000] px-4 py-2">
                    <span className="font-mono text-xs text-[#E0E0E0] uppercase tracking-wider">
                      {mainNews.category}
                    </span>
                  </div>
                </div>

                {/* Content - Fixed height to match 3 news items on right */}
                <div className="flex flex-col justify-between" style={{ height: '192px' }}>
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#8B0000]" />
                        <time className="font-mono text-xs text-[#E0E0E0]/60 uppercase">
                          {new Date(mainNews.date).toLocaleDateString('fr-FR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric' 
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-[#8B0000]" />
                        <span className="font-mono text-xs text-[#E0E0E0]/60">
                          {mainNews.author}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-black text-[#E0E0E0] uppercase tracking-tight mb-2 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                      {mainNews.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed line-clamp-2 mb-3">
                      {mainNews.excerpt}
                    </p>
                  </div>

                  {/* Read More - Aligned with bottom of 3rd news image */}
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 border-2 border-[#8B0000] bg-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase font-bold group-hover:bg-[#E0E0E0] group-hover:text-[#8B0000] group-hover:border-[#E0E0E0] transition-all w-fit">
                    LIRE LA SUITE
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Secondary News - Small */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* News Container with overflow hidden for animation */}
            <div className="overflow-hidden space-y-6 relative" style={{ height: '696px' }}>
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleNews.map((item, index) => (
                  <motion.article
                    key={`${item.id}-${currentIndex}`}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut",
                      layout: { duration: 0.5 }
                    }}
                    layout
                    className="group cursor-none"
                  >
                    <Link to={`/news/${item.slug}`} className="flex gap-6">
                      {/* Small Image */}
                      <div className="relative overflow-hidden border-2 border-[#E0E0E0]/20 group-hover:border-[#8B0000] transition-colors w-48 flex-shrink-0 aspect-square">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{
                            filter: 'contrast(1.5) brightness(0.7) grayscale(0.9)',
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                          }}
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-2 left-2 bg-[#8B0000] px-2 py-1">
                          <span className="font-mono text-[10px] text-[#E0E0E0] uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        {/* Meta info */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-[#8B0000]" />
                            <time className="font-mono text-[10px] text-[#E0E0E0]/60 uppercase">
                              {new Date(item.date).toLocaleDateString('fr-FR', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={12} className="text-[#8B0000]" />
                            <span className="font-mono text-[10px] text-[#E0E0E0]/60">
                              {item.author}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-black text-[#E0E0E0] uppercase tracking-tight mb-2 group-hover:text-[#8B0000] transition-colors">
                          {item.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed line-clamp-2 mb-3 flex-1">
                          {item.excerpt}
                        </p>

                        {/* Read More - More Prominent */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#8B0000] bg-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase font-bold group-hover:bg-[#E0E0E0] group-hover:text-[#8B0000] group-hover:border-[#E0E0E0] transition-all w-fit">
                          LIRE LA SUITE
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Breaking News Ticker (if any urgent news) */}
        {newsArticles.some(n => n.category === 'URGENT') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 border-2 border-[#8B0000] bg-[#8B0000]/10 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8B0000] animate-pulse" />
                <span className="font-black text-[#8B0000] text-sm uppercase">BREAKING</span>
              </div>
              <p className="font-mono text-sm text-[#E0E0E0]">
                {newsArticles.find(n => n.category === 'URGENT')?.title}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}