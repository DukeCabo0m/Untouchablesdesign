import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { newsArticles } from '@/app/data/news';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { getGafferTexture } from '@/app/utils/gafferTexture';

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
    <section className="bg-[#0A0A0A] py-12 px-0 pb-4">
      <div>
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16">
          <SectionHeading 
            title="Toute l'actu de Korn" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description="Des studios d'enregistrement aux scènes de concerts : retrouvez les annonces officielles, les rumeurs vérifiées et les débats qui animent la communauté Untouchables."
          />
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="mt-4"
          >
            <Button
              href="/news"
              variant="primary"
            >
              Explorer toutes les archives news
              <ArrowRight size={14} />
            </Button>
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
              className="group cursor-pointer"
            >
              <HandDrawnBox
                color="#8B00004D"
                strokeWidth={3}
                roughness={2.5}
                passes={1}
                padding="0"
                hoverColor="#8B0000"
              >
                <div className="bg-[#1A1A1A] pt-0 px-0 pb-16">
                  <Link to={`/news/${mainNews.slug}`} className="block">
                    {/* Large Image - Height matches first news + gap + second news image */}
                    <div className="relative mb-5" style={{ height: '417px' }}>
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={mainNews.image}
                          alt={mainNews.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{
                            filter: 'contrast(1.5) brightness(0.7)',
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                          }}
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-[#8B0000] px-4 py-2 z-20">
                          <span className="font-mono text-sm text-[#E0E0E0] uppercase tracking-wider">
                            {mainNews.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* HandDrawn Border - Bottom only */}
                      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '2px' }}>
                        <svg 
                          className="w-full h-full" 
                          viewBox="0 0 1000 2"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 0 1 Q 50 0.5 100 1 T 200 1 T 300 1 T 400 1 T 500 1 T 600 1 T 700 1 T 800 1 T 900 1 T 1000 1"
                            stroke="#8B00004D"
                            strokeWidth="2"
                            fill="none"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Content - Fixed height to match 3 news items on right */}
                    <div className="flex flex-col justify-between px-4" style={{ height: '216px' }}>
                      <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-4 mb-5">
                          <div className="flex items-stretch gap-0">
                            <HandDrawnBox
                              color="#8B0000"
                              strokeWidth={2}
                              roughness={2.5}
                              passes={1}
                              padding="0"
                            >
                              <div className="bg-[#8B0000] p-1.5 flex items-center justify-center">
                                <Calendar size={14} className="text-white" />
                              </div>
                            </HandDrawnBox>
                            <time 
                              className="font-mono text-sm text-black uppercase px-3 bg-white relative flex items-center"
                              style={{
                                backgroundImage: `url(${getGafferTexture('white')})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            >
                              {new Date(mainNews.date).toLocaleDateString('fr-FR', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                              })}
                            </time>
                          </div>
                          <div className="flex items-stretch gap-0">
                            <HandDrawnBox
                              color="#8B0000"
                              strokeWidth={2}
                              roughness={2.5}
                              passes={1}
                              padding="0"
                            >
                              <div className="bg-[#8B0000] p-1.5 flex items-center justify-center">
                                <User size={14} className="text-white" />
                              </div>
                            </HandDrawnBox>
                            <span 
                              className="font-mono text-sm text-black px-3 bg-white relative flex items-center"
                              style={{
                                backgroundImage: `url(${getGafferTexture('white')})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            >
                              {mainNews.author}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-black text-[#E0E0E0] uppercase tracking-tight mb-2 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                          {mainNews.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed line-clamp-4 mb-3">
                          {mainNews.excerpt}
                        </p>
                      </div>

                      {/* Tags and Read More - Aligned on same line */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        {/* Tags - Left aligned */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {mainNews.tags.slice(0, 4).map((tag) => (
                            <Button
                              key={tag}
                              as="button"
                              variant="secondary"
                              size="sm"
                            >
                              #{tag}
                            </Button>
                          ))}
                        </div>

                        {/* Read More - Right aligned */}
                        <div className="flex-shrink-0">
                          <Button
                            as="button"
                            variant="primary"
                            size="sm"
                          >
                            Lire l'article complet
                            <span className="sr-only"> : {mainNews.title}</span>
                            <ArrowRight size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </HandDrawnBox>
            </motion.article>
          )}

          {/* Secondary News - Small */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* News Container with overflow hidden for animation */}
            <div className="overflow-hidden space-y-6 relative" style={{ height: '720px' }}>
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
                    className="group cursor-pointer"
                  >
                    <HandDrawnBox
                      color="#8B00004D"
                      strokeWidth={3}
                      roughness={2.5}
                      passes={1}
                      padding="0"
                      hoverColor="#8B0000"
                    >
                      <div className="bg-[#1A1A1A] p-0">
                        <Link to={`/news/${item.slug}`} className="flex gap-4">
                          {/* Small Image */}
                          <div className="relative w-56 h-56 flex-shrink-0">
                            <div className="relative w-full h-full overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{
                                  filter: 'contrast(1.5) brightness(0.7)',
                                }}
                              />
                              <div
                                className="absolute inset-0 pointer-events-none opacity-20"
                                style={{
                                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                                }}
                              />
                              
                              {/* Category Badge */}
                              <div className="absolute top-2 left-2 bg-[#8B0000] px-2 py-1 z-20">
                                <span className="font-mono text-[#E0E0E0] uppercase tracking-wider">
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            
                            {/* HandDrawn Border - Right only */}
                            <div className="absolute top-0 right-0 bottom-0 pointer-events-none" style={{ width: '2px' }}>
                              <svg 
                                className="w-full h-full" 
                                viewBox="0 0 2 1000"
                                preserveAspectRatio="none"
                              >
                                <path
                                  d="M 1 0 Q 0.5 50 1 100 T 1 200 T 1 300 T 1 400 T 1 500 T 1 600 T 1 700 T 1 800 T 1 900 T 1 1000"
                                  stroke="#8B00004D"
                                  strokeWidth="2"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col py-4 pr-4 pb-4">
                            {/* Meta info */}
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-stretch gap-0">
                                <HandDrawnBox
                                  color="#8B0000"
                                  strokeWidth={2}
                                  roughness={2.5}
                                  passes={1}
                                  padding="0"
                                >
                                  <div className="bg-[#8B0000] p-1.5 flex items-center justify-center">
                                    <Calendar size={12} className="text-white" />
                                  </div>
                                </HandDrawnBox>
                                <time 
                                  className="font-mono text-sm text-black uppercase px-3 bg-white relative flex items-center"
                                  style={{
                                    backgroundImage: `url(${getGafferTexture('white')})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }}
                                >
                                  {new Date(item.date).toLocaleDateString('fr-FR', { 
                                    day: '2-digit', 
                                    month: '2-digit', 
                                    year: 'numeric' 
                                  })}
                                </time>
                              </div>
                              <div className="flex items-stretch gap-0">
                                <HandDrawnBox
                                  color="#8B0000"
                                  strokeWidth={2}
                                  roughness={2.5}
                                  passes={1}
                                  padding="0"
                                >
                                  <div className="bg-[#8B0000] p-1.5 flex items-center justify-center">
                                    <User size={12} className="text-white" />
                                  </div>
                                </HandDrawnBox>
                                <span 
                                  className="font-mono text-sm text-black px-3 bg-white relative flex items-center"
                                  style={{
                                    backgroundImage: `url(${getGafferTexture('white')})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }}
                                >
                                  {item.author}
                                </span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-black text-[#E0E0E0] uppercase tracking-tight mb-2 group-hover:text-[#8B0000] transition-colors">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p 
                              className="font-mono text-sm text-[#E0E0E0]/70 leading-normal mb-3 flex-1"
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {item.excerpt}
                            </p>

                            {/* Tags and Read More - Aligned on same line */}
                            <div className="flex items-center justify-between gap-3">
                              {/* Tags - Left aligned */}
                              <div className="flex items-center gap-2 flex-wrap">
                                {item.tags.slice(0, 2).map((tag) => (
                                  <Button
                                    key={tag}
                                    as="button"
                                    variant="secondary"
                                    size="sm"
                                  >
                                    #{tag}
                                  </Button>
                                ))}
                              </div>

                              {/* Read More - Right aligned */}
                              <div className="flex-shrink-0">
                                <Button
                                  as="button"
                                  variant="primary"
                                  size="sm"
                                >
                                  Lire l'article complet
                                  <span className="sr-only"> : {item.title}</span>
                                  <ArrowRight size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </HandDrawnBox>
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
            <div className="flex items-center gap-4 my-2">
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