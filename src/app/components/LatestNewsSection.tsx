import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { getGafferTexture } from '@/app/utils/gafferTexture';
import { articlesApi, usersApi, commentsApi } from '@/app/utils/api';

// Map backend article to frontend news format
function mapArticleToNews(article: any, users: any[]) {
  // Find author username from users array
  const author = users.find(u => u.id === article.authorId);
  const authorName = author?.username || 'Untouchables Team';
  
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category || 'actualité',
    date: article.publishedAt || article.createdAt,
    author: authorName,
    excerpt: article.excerpt || '',
    image: article.coverImage || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200',
    tags: article.tags || [],
  };
}

export function LatestNewsSection() {
  const navigate = useNavigate();
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load articles and comment counts from backend
  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        console.log('[LatestNewsSection] Starting to load articles from backend...');
        
        // Load both articles and users in parallel
        const [articles, users] = await Promise.all([
          articlesApi.getAll(),
          usersApi.getAll().catch(() => []) // Fallback to empty array if users fail
        ]);
        
        console.log('[LatestNewsSection] Received articles from backend:', articles);
        console.log('[LatestNewsSection] Received users from backend:', users);
        
        // Filter only published and sort by date (most recent first)
        const publishedArticles = articles
          .filter((a: any) => a.isPublished)
          .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        
        console.log('[LatestNewsSection] Filtered published articles:', publishedArticles);
        
        // Map articles with author data
        const articlesWithAuthors = publishedArticles.map((article: any) => {
          const author = users.find((u: any) => u.id === article.authorId);
          return {
            ...article,
            author: author?.username || 'Anonyme',
            authorAvatar: author?.avatar || null,
            image: article.coverImage,
            views: article.viewCount || 0,
          };
        });
        
        console.log('[LatestNewsSection] Articles with authors:', articlesWithAuthors);
        
        // Load comment counts for all articles
        if (articlesWithAuthors.length > 0) {
          try {
            const entities = articlesWithAuthors.map((a: any) => ({
              entityType: 'article',
              entityId: a.id,
            }));
            const counts = await commentsApi.getCounts(entities);
            console.log('[LatestNewsSection] Received comment counts:', counts);
            setCommentCounts(counts);
          } catch (err) {
            console.error('[LatestNewsSection] Failed to load comment counts:', err);
            // Continue without comment counts
          }
        }
        
        setNewsArticles(articlesWithAuthors);
        setError(null);
      } catch (err) {
        console.error('[LatestNewsSection] Failed to load articles:', err);
        setError('Impossible de charger les actualités');
        setNewsArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  // Get latest news (1 main + all others for rotation)
  const mainNews = newsArticles.length > 0 ? newsArticles[0] : null;
  const secondaryNewsPool = newsArticles.slice(1);
  
  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (secondaryNewsPool.length <= 3) return; // No need to scroll if not enough items
    
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, secondaryNewsPool.length - 2));
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [secondaryNewsPool.length, isPaused]);

  // Get 3 consecutive news starting from currentIndex
  const visibleNews = secondaryNewsPool.length > 0 ? [
    secondaryNewsPool[currentIndex % secondaryNewsPool.length],
    secondaryNewsPool[(currentIndex + 1) % secondaryNewsPool.length],
    secondaryNewsPool[(currentIndex + 2) % secondaryNewsPool.length],
  ].filter(Boolean) : [];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, secondaryNewsPool.length - 2)) % Math.max(1, secondaryNewsPool.length - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, secondaryNewsPool.length - 2));
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-[#0A0A0A] py-12 px-0 pb-4">
        <div>
          <div className="flex items-center justify-center h-64">
            <div className="font-mono text-[#8B0000] text-lg animate-pulse">
              Chargement des actualités...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || newsArticles.length === 0) {
    return (
      <section className="bg-[#0A0A0A] py-12 px-0 pb-4">
        <div>
          <div className="flex items-center justify-center h-64">
            <div className="font-mono text-[#E0E0E0]/50 text-lg">
              {error || 'Aucune actualité disponible pour le moment'}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0 pb-4">
      <div>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 mb-12 md:mb-14 lg:mb-16">
          <SectionHeading 
            title="Toute l'actu de Korn" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description="Des studios d'enregistrement aux scènes de concerts : retrouvez les annonces officielles, les rumeurs vérifiées et les débats qui animent la communauté Untouchables."
            noGap={true}
          />
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="w-full lg:w-auto lg:mt-4"
          >
            <Button
              href="/news"
              variant="primary"
              className="w-full lg:w-auto"
            >
              <span className="hidden md:inline">Explorer toutes les archives news</span>
              <span className="md:hidden">Voir toute l'actu</span>
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* News Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
                <div className="bg-[#1A1A1A] pt-0 px-0 pb-8 md:pb-12 lg:pb-16">
                  <Link to={`/news/${mainNews.slug}`} className="block">
                    {/* Large Image - Height responsive */}
                    <div className="relative mb-4 md:mb-5 h-[250px] sm:h-[350px] lg:h-[417px]">
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
                        <div 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/category/${mainNews.category}`);
                          }}
                          className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#8B0000] hover:bg-[#6B0000] px-3 py-1.5 md:px-4 md:py-2 z-20 transition-colors cursor-pointer"
                        >
                          <span className="font-mono text-xs md:text-sm text-[#E0E0E0] uppercase tracking-wider">
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

                    {/* Content */}
                    <div className="flex flex-col px-3 md:px-4">
                      <div>
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-5">
                          <div className="flex items-stretch gap-0">
                            <HandDrawnBox
                              color="#8B0000"
                              strokeWidth={2}
                              roughness={2.5}
                              passes={1}
                              padding="0"
                            >
                              <div className="bg-[#8B0000] p-1 md:p-1.5 flex items-center justify-center">
                                <Calendar size={12} className="md:w-[14px] md:h-[14px] text-white" />
                              </div>
                            </HandDrawnBox>
                            <time 
                              className="font-mono text-xs md:text-sm text-black uppercase px-2 md:px-3 bg-white relative flex items-center"
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
                              <div className="bg-[#8B0000] p-1 md:p-1.5 flex items-center justify-center">
                                <User size={12} className="md:w-[14px] md:h-[14px] text-white" />
                              </div>
                            </HandDrawnBox>
                            <span 
                              className="font-mono text-xs md:text-sm text-black px-2 md:px-3 bg-white relative flex items-center"
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
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#E0E0E0] uppercase tracking-tight mb-2 md:mb-3 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                          {mainNews.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-mono text-xs sm:text-sm text-[#E0E0E0]/70 leading-relaxed line-clamp-3 md:line-clamp-4 mb-4 md:mb-6">
                          {mainNews.excerpt}
                        </p>
                      </div>

                      {/* Tags and Read More */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        {/* Tags - Left aligned */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {mainNews.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Button
                              key={`${mainNews.id}-tag-${tagIndex}`}
                              as="button"
                              variant="secondary"
                              size="sm"
                            >
                              #{tag}
                            </Button>
                          ))}
                        </div>

                        {/* Read More - Right aligned */}
                        <div className="w-full sm:w-auto flex-shrink-0">
                          <Button
                            as="button"
                            variant="primary"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            <span className="hidden md:inline">Lire l'article complet</span>
                            <span className="md:hidden">Lire la suite</span>
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

          {/* Secondary News - Small (Hidden on mobile, shown as carousel on tablet+) */}
          <div 
            className="hidden lg:block relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* News Container with overflow hidden for animation */}
            <div className="overflow-hidden space-y-6 relative" style={{ height: '720px' }}>
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleNews.map((item, displayIndex) => {
                  // Create truly unique key using item ID and its position in the visible array
                  const uniqueKey = `news-${item.id}-pos-${displayIndex}-idx-${currentIndex}`;
                  
                  return (
                    <motion.article
                      key={uniqueKey}
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
                                <div 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(`/category/${item.category}`);
                                  }}
                                  className="absolute top-2 left-2 bg-[#8B0000] hover:bg-[#6B0000] px-2 py-1 z-20 transition-colors cursor-pointer"
                                >
                                  <span className="font-mono text-[#E0E0E0] uppercase tracking-wider text-xs">
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
                                  {item.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <Button
                                      key={`${item.id}-tag-${tagIndex}`}
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
                  );
                })}
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