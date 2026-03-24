import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Button } from '@/app/components/Button';
import { Search, Tag as TagIcon, Layers, Calendar, User, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { articlesApi, usersApi, commentsApi } from '@/app/utils/api';

export function NewsPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load articles from backend
  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        console.log('[NewsPage] Loading articles from backend...');
        
        const [articlesData, usersData] = await Promise.all([
          articlesApi.getAll(),
          usersApi.getAll().catch(() => [])
        ]);
        
        console.log('[NewsPage] Received articles:', articlesData);
        
        // Filter published articles and map
        const publishedArticles = articlesData
          .filter((a: any) => a.isPublished)
          .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
          .map((a: any) => mapArticleToNews(a, usersData));
        
        setArticles(publishedArticles);
        setError(null);
      } catch (err) {
        console.error('[NewsPage] Failed to load articles:', err);
        setError('Impossible de charger les actualités');
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  // Load comment counts for articles
  useEffect(() => {
    async function loadCommentCounts() {
      if (articles.length === 0) return;
      
      try {
        const entities = articles.map(a => ({
          entityType: 'article',
          entityId: a.id,
        }));
        const counts = await commentsApi.getCounts(entities);
        console.log('[NewsPage] Received comment counts:', counts);
        setCommentCounts(counts);
      } catch (err) {
        console.error('[NewsPage] Failed to load comment counts:', err);
        // Continue without comment counts
      }
    }
    loadCommentCounts();
  }, [articles]);

  // Map backend article to frontend news format
  function mapArticleToNews(article: any, users: any[]) {
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

  // Extract categories and tags
  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));
  const popularTags = allTags.slice(0, 10); // Top 10 tags

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    const tagMatch = !selectedTag || article.tags.includes(selectedTag);
    const searchMatch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && tagMatch && searchMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="ACTUALITÉS"
        description="Toute l'actualité de Korn et de la communauté Untouchables.<br />Nouveaux albums, interviews exclusives, événements."
        backgroundImage="https://images.unsplash.com/photo-1692663869038-fd7443634268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGJhbmQlMjBsaXZlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzY5MTkyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'ACTUALITÉS' }
        ]}
        glitchIntensity="low"
      />

      {/* Main Content Section */}
      <div className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="font-mono text-[#8B0000] text-base md:text-lg animate-pulse">
                Chargement des actualités...
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="font-mono text-[#E0E0E0]/50 text-base md:text-lg">
                {error}
              </div>
            </div>
          ) : (
            // Layout: Main content + Sidebar
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
              {/* Main Content - Articles Grid */}
              <div className="flex-1 min-w-0 order-2 lg:order-1">
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {filteredArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.05 }}
                      >
                        <Link
                          to={`/news/${article.slug}`}
                          className="group block h-full"
                        >
                          <div className="bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] hover:bg-[#1a1a1a] transition-all overflow-hidden h-full flex flex-col">
                            {/* Image with badges */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                              />
                              
                              {/* Category badge - Top Left - Clickable */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  navigate(`/category/${article.category}`);
                                }}
                                className="absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1.5 md:px-4 md:py-2 bg-[#8B0000] hover:bg-[#6B0000] uppercase text-xs font-black text-[#FFFFFF] transition-colors z-10 cursor-pointer"
                              >
                                {article.category}
                              </button>
                              
                              {/* Tags badges - Bottom Right - Clickable */}
                              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex gap-1 md:gap-1.5 overflow-hidden z-10">
                                {article.tags.slice(0, 2).map((tag, i) => (
                                  <button
                                    key={i}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      navigate(`/tag/${tag}`);
                                    }}
                                    className="px-2 py-1 md:px-3 md:py-1.5 bg-[#0A0A0A]/90 hover:bg-[#8B0000]/90 backdrop-blur-sm text-[#E0E0E0] hover:text-[#FFFFFF] uppercase text-[10px] md:text-[11px] font-mono whitespace-nowrap flex items-center justify-center leading-none transition-colors cursor-pointer"
                                  >
                                    #{tag}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1">
                              {/* Meta with red background - No gap with image */}
                              <div className="bg-[#8B0000] px-4 py-2 md:px-6 md:py-3 flex flex-wrap items-center gap-3 md:gap-4 font-mono text-xs">
                                <span className="inline-flex items-baseline gap-1.5 text-[#FFFFFF] font-black">
                                  <Calendar size={11} className="md:w-3 md:h-3 text-[#FFFFFF] inline-block" style={{ verticalAlign: 'middle', marginBottom: '1px' }} />
                                  <span>{new Date(article.date).toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}</span>
                                </span>
                                <span className="inline-flex items-baseline gap-1.5 text-[#FFFFFF] font-black">
                                  <User size={11} className="md:w-3 md:h-3 text-[#FFFFFF] inline-block" style={{ verticalAlign: 'middle', marginBottom: '1px' }} />
                                  <span>{article.author}</span>
                                </span>
                              </div>

                              {/* Rest of content with padding */}
                              <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-1">
                                {/* Title */}
                                <h2
                                  className="text-lg sm:text-xl font-black text-[#FFFFFF] uppercase mb-2 md:mb-3 tracking-tight group-hover:text-[#8B0000] transition-colors line-clamp-3"
                                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                                >
                                  {article.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="font-mono text-xs text-[#E0E0E0]/80 leading-relaxed mb-3 md:mb-4 line-clamp-3 flex-1">
                                  {article.excerpt}
                                </p>

                                {/* Read more button - Bottom Right */}
                                <div className="flex justify-end">
                                  <Button variant="primary" size="sm">
                                    <span className="hidden md:inline">LIRE L'ARTICLE</span>
                                    <span className="md:hidden">LIRE</span>
                                    <ArrowRight size={12} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8 md:p-12 text-center">
                    <p className="text-[#a8a8a8] text-base md:text-lg font-mono">
                      Aucun article trouvé avec ces filtres
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar - Desktop sticky, Mobile at top */}
              <aside className="w-full lg:w-[340px] xl:w-[380px] lg:sticky lg:top-20 h-fit order-1 lg:order-2 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Search */}
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <Search size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                      <h3 className="text-lg md:text-xl font-black text-[#FFFFFF] uppercase">
                        RECHERCHE
                      </h3>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Titre, contenu, auteur..."
                        className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 focus:border-[#8B0000] text-[#E0E0E0] font-mono text-xs md:text-sm placeholder:text-[#E0E0E0]/40 transition-colors outline-none"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-[#8B0000] hover:text-[#FFFFFF] transition-colors font-mono text-xs font-black p-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filters by Category */}
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <Layers size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                      <h3 className="text-lg md:text-xl font-black text-[#FFFFFF] uppercase">
                        CATÉGORIES
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {categories.map((category) => (
                        category === 'all' ? (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setSelectedTag(null);
                            }}
                            className={`w-full text-left px-3 py-2 md:px-4 md:py-3 font-mono text-xs md:text-sm uppercase transition-all duration-300 border-l-4 ${
                              selectedCategory === category
                                ? 'bg-[#8B0000] border-[#8B0000] text-[#FFFFFF] font-black'
                                : 'bg-[#0A0A0A]/50 border-[#E0E0E0]/20 text-[#E0E0E0] hover:border-[#8B0000] hover:bg-[#8B0000]/30'
                            }`}
                          >
                            Tous
                          </button>
                        ) : (
                          <Link
                            key={category}
                            to={`/category/${category}`}
                            className="w-full text-left px-3 py-2 md:px-4 md:py-3 font-mono text-xs md:text-sm uppercase transition-all duration-300 border-l-4 bg-[#0A0A0A]/50 border-[#E0E0E0]/20 text-[#E0E0E0] hover:border-[#8B0000] hover:bg-[#8B0000]/30 block"
                          >
                            {category}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Popular Tags */}
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <TagIcon size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                      <h3 className="text-lg md:text-xl font-black text-[#FFFFFF] uppercase">
                        TAGS
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/tag/${tag}`}
                          className="font-mono text-[10px] px-2.5 py-1.5 md:px-3 md:py-2 border transition-all duration-300 uppercase bg-[#E0E0E0]/10 text-[#E0E0E0] border-[#E0E0E0]/20 hover:border-[#8B0000] hover:bg-[#8B0000]/20"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <Eye size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                      <h3 className="text-lg md:text-xl font-black text-[#FFFFFF] uppercase">
                        STATS
                      </h3>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-[#E0E0E0] uppercase">Articles</span>
                        <span className="text-xl md:text-2xl font-black text-[#8B0000]">{articles.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-[#E0E0E0] uppercase">Catégories</span>
                        <span className="text-xl md:text-2xl font-black text-[#8B0000]">{categories.length - 1}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-[#E0E0E0] uppercase">Tags</span>
                        <span className="text-xl md:text-2xl font-black text-[#8B0000]">{allTags.length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}