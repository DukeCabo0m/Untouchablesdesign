import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Button } from '@/app/components/Button';
import { Calendar, User, ArrowRight, Tag as TagIcon } from 'lucide-react';
import { articlesApi, usersApi, tagsApi } from '@/app/utils/api';

export function TagPage() {
  const { slug } = useParams<{ slug: string }>();
  const [tag, setTag] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tag and articles
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        console.log('[TagPage] Loading data for tag:', slug);
        
        // Load all data
        const [tagsData, articlesData, usersData] = await Promise.all([
          tagsApi.getAll(),
          articlesApi.getAll(),
          usersApi.getAll().catch(() => [])
        ]);
        
        // Find tag by slug
        const foundTag = tagsData.find((t: any) => t.slug === slug);
        if (!foundTag) {
          setError('Tag non trouvé');
          return;
        }
        
        setTag(foundTag);
        
        // Filter articles by tag and published status
        const filteredArticles = articlesData
          .filter((a: any) => a.isPublished && a.tags && a.tags.includes(slug))
          .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
          .map((a: any) => mapArticleToNews(a, usersData));
        
        setArticles(filteredArticles);
        setError(null);
      } catch (err) {
        console.error('[TagPage] Failed to load data:', err);
        setError('Impossible de charger les articles');
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (slug) {
      loadData();
    }
  }, [slug]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="font-mono text-[#8B0000] text-lg animate-pulse">
          Chargement...
        </div>
      </div>
    );
  }

  if (error || !tag) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-[#E0E0E0]/50 text-lg mb-6">
            {error || 'Tag non trouvé'}
          </div>
          <Link to="/news">
            <Button variant="primary">
              Retour aux actualités
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title={`#${tag.name.toUpperCase()}`}
        description={tag.description || `Tous les articles avec le tag ${tag.name}`}
        backgroundImage="https://images.unsplash.com/photo-1692663869038-fd7443634268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGJhbmQlMjBsaXZlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzY5MTkyNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'ACTUALITÉS', path: '/news' },
          { label: `#${tag.name.toUpperCase()}` }
        ]}
        glitchIntensity="low"
      />

      {/* Main Content Section */}
      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Tag Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-6 h-6 border-2 border-[#8B0000]"
                  style={{ backgroundColor: tag.color }}
                />
                <div>
                  <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-1">
                    #{tag.name}
                  </h2>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    {articles.length} article{articles.length > 1 ? 's' : ''} taggé{articles.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <Link to="/news">
                <Button variant="secondary" size="sm">
                  <TagIcon size={14} />
                  Tous les tags
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
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
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4 px-4 py-2 bg-[#8B0000] uppercase text-xs font-black text-[#FFFFFF]">
                          {article.category}
                        </div>
                        
                        {/* Tag badge highlighted */}
                        <div className="absolute bottom-4 right-4 flex gap-1.5 overflow-hidden">
                          <span
                            className="px-3 py-1.5 backdrop-blur-sm text-[#FFFFFF] uppercase text-[11px] font-mono whitespace-nowrap flex items-center justify-center leading-none border-2 font-black"
                            style={{ 
                              backgroundColor: tag.color,
                              borderColor: tag.color 
                            }}
                          >
                            #{tag.name}
                          </span>
                          {article.tags.filter((t: string) => t !== slug).slice(0, 1).map((t: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-[#0A0A0A]/90 backdrop-blur-sm text-[#E0E0E0] uppercase text-[11px] font-mono whitespace-nowrap flex items-center justify-center leading-none"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1">
                        {/* Meta */}
                        <div className="bg-[#8B0000] px-6 py-3 flex flex-wrap items-center gap-4 font-mono text-xs">
                          <span className="inline-flex items-baseline gap-1.5 text-[#FFFFFF] font-black">
                            <Calendar size={12} className="text-[#FFFFFF] inline-block" style={{ verticalAlign: 'middle', marginBottom: '1px' }} />
                            <span>{new Date(article.date).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}</span>
                          </span>
                          <span className="inline-flex items-baseline gap-1.5 text-[#FFFFFF] font-black">
                            <User size={12} className="text-[#FFFFFF] inline-block" style={{ verticalAlign: 'middle', marginBottom: '1px' }} />
                            <span>{article.author}</span>
                          </span>
                        </div>

                        {/* Rest of content */}
                        <div className="p-6 flex flex-col flex-1">
                          {/* Title */}
                          <h2
                            className="text-xl font-black text-[#FFFFFF] uppercase mb-3 tracking-tight group-hover:text-[#8B0000] transition-colors line-clamp-3"
                            style={{ fontFamily: 'Arial Black, sans-serif' }}
                          >
                            {article.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="font-mono text-xs text-[#E0E0E0]/80 leading-relaxed mb-4 line-clamp-3 flex-1">
                            {article.excerpt}
                          </p>

                          {/* Read more button */}
                          <div className="flex justify-end">
                            <Button variant="primary" size="sm">
                              <span>LIRE L'ARTICLE</span>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-12 text-center"
            >
              <TagIcon size={48} className="text-[#8B0000]/30 mx-auto mb-4" />
              <p className="text-[#a8a8a8] text-lg font-mono mb-4">
                Aucun article avec ce tag pour le moment
              </p>
              <Link to="/news">
                <Button variant="primary">
                  Voir toutes les actualités
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
