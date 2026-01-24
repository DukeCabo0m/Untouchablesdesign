import { motion } from 'motion/react';
import { Link } from 'react-router';
import { PageHeader } from '@/app/components/PageHeader';
import { getLatestArticles } from '@/app/data/news';
import { Calendar, User, Tag, Layers, TrendingUp, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

export function NewsPage() {
  const articles = getLatestArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

      {/* Main Content Section - No background image, just dark background */}
      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Layout: Main content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Articles Grid (2/3) */}
            <div className="lg:col-span-2">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            
                            {/* Category badge - Top Left */}
                            <div className="absolute top-4 left-4 px-4 py-2 bg-[#8B0000] uppercase text-xs font-black text-[#FFFFFF]">
                              {article.category}
                            </div>
                            
                            {/* Tags badges - Bottom Right */}
                            <div className="absolute bottom-4 right-4 flex gap-1.5 overflow-hidden">
                              {article.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-[#0A0A0A]/90 backdrop-blur-sm text-[#E0E0E0] uppercase text-[11px] font-mono whitespace-nowrap flex items-center justify-center leading-none"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex flex-col flex-1">
                            {/* Meta with red background - No gap with image */}
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

                            {/* Rest of content with padding */}
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

                              {/* Read more button - Bottom Right */}
                              <div className="flex justify-end">
                                <button className="px-5 py-2.5 bg-[#8B0000] border-2 border-[#8B0000] text-[#FFFFFF] font-mono text-xs uppercase font-black transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#8B0000] hover:border-[#FFFFFF] flex items-center gap-2">
                                  <span>LIRE L'ARTICLE</span>
                                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-12 text-center">
                  <p className="text-[#a8a8a8] text-lg font-mono">
                    Aucun article trouvé avec ces filtres
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-20 h-fit">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Search */}
                <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Search size={16} className="text-[#8B0000]" />
                    <h3 className="text-xl font-black text-[#FFFFFF] uppercase">
                      RECHERCHE
                    </h3>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Titre, contenu, auteur..."
                      className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 focus:border-[#8B0000] text-[#E0E0E0] font-mono text-sm placeholder:text-[#E0E0E0]/40 transition-colors outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B0000] hover:text-[#FFFFFF] transition-colors font-mono text-xs font-black"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Filters by Category */}
                <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Layers size={16} className="text-[#8B0000]" />
                    <h3 className="text-xl font-black text-[#FFFFFF] uppercase">
                      CATÉGORIES
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedTag(null);
                        }}
                        className={`w-full text-left px-4 py-3 font-mono text-sm uppercase transition-all duration-300 cursor-none border-l-4 ${
                          selectedCategory === category
                            ? 'bg-[#8B0000] border-[#8B0000] text-[#FFFFFF] font-black'
                            : 'bg-[#0A0A0A]/50 border-[#E0E0E0]/20 text-[#E0E0E0] hover:border-[#8B0000] hover:bg-[#8B0000]/30'
                        }`}
                      >
                        {category === 'all' ? 'Tous' : category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Tag size={16} className="text-[#8B0000]" />
                    <h3 className="text-xl font-black text-[#FFFFFF] uppercase">
                      TAGS
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTag(selectedTag === tag ? null : tag);
                        }}
                        className={`font-mono text-[10px] px-3 py-2 border transition-all duration-300 cursor-none uppercase ${
                          selectedTag === tag
                            ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000]'
                            : 'bg-[#E0E0E0]/10 text-[#E0E0E0] border-[#E0E0E0]/20 hover:border-[#8B0000] hover:bg-[#8B0000]/20'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="w-full mt-4 px-4 py-2 font-mono text-xs uppercase bg-transparent border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFFFFF] transition-all duration-300 cursor-none"
                    >
                      Effacer le tag
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={16} className="text-[#8B0000]" />
                    <h3 className="text-xl font-black text-[#FFFFFF] uppercase">
                      STATS
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[#E0E0E0] uppercase">Articles</span>
                      <span className="text-2xl font-black text-[#8B0000]">{articles.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[#E0E0E0] uppercase">Catégories</span>
                      <span className="text-2xl font-black text-[#8B0000]">{categories.length - 1}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[#E0E0E0] uppercase">Tags</span>
                      <span className="text-2xl font-black text-[#8B0000]">{allTags.length}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}