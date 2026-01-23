import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GlitchText } from '@/app/components/GlitchText';
import { getLatestArticles } from '@/app/data/news';
import { Calendar, User, Tag } from 'lucide-react';

export function NewsPage() {
  const articles = getLatestArticles();

  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1
            className="text-7xl md:text-9xl font-black text-[#FFFFFF] uppercase tracking-tighter mb-6"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText>ACTUALITÉS</GlitchText>
          </h1>
          <div className="h-1 w-32 bg-[#8B0000]" />
          <p className="font-mono text-sm text-[#E0E0E0]/70 mt-6 max-w-2xl">
            Toute l'actualité de Korn et de la communauté Untouchables. Nouveaux albums, interviews exclusives, événements.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="space-y-12">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Link
                to={`/news/${article.slug}`}
                className="group block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all overflow-hidden">
                  {/* Image */}
                  <div className="lg:col-span-1 aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 font-mono text-xs text-[#E0E0E0]/70">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {article.author}
                        </span>
                        <span className="px-2 py-1 bg-[#8B0000]/20 border border-[#8B0000] uppercase text-[10px]">
                          {article.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-3xl md:text-4xl font-black text-[#FFFFFF] uppercase mb-4 tracking-tight group-hover:text-[#8B0000] transition-colors"
                        style={{ fontFamily: 'Arial Black, sans-serif' }}
                      >
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-mono text-sm text-[#FFFFFF] leading-relaxed mb-6">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 4).map((tag, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] text-[#E0E0E0] bg-[#E0E0E0]/10 px-2 py-1 border border-[#E0E0E0]/20"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Read more */}
                    <div className="mt-6 flex items-center font-mono text-xs text-[#8B0000] uppercase group-hover:translate-x-2 transition-transform">
                      <span>LIRE L'ARTICLE</span>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}