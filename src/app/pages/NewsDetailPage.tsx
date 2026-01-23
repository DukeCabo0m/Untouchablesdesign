import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { CommentSection } from '@/app/components/CommentSection';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { getNewsArticleBySlug } from '@/app/data/news';

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsArticleBySlug(slug) : undefined;

  // Mock comments data
  const newsComments = [
    {
      id: 1,
      user: 'KornArmy666',
      avatar: 'https://i.pravatar.cc/150?img=33',
      date: '2026-01-20',
      text: 'Excellent article ! Korn reste le meilleur groupe de nu-metal de tous les temps. Hâte de voir ce que l\'avenir nous réserve.'
    },
    {
      id: 2,
      user: 'MetalFan92',
      avatar: 'https://i.pravatar.cc/150?img=12',
      date: '2026-01-19',
      text: 'Merci pour ces infos ! J\'ai découvert Korn avec Follow The Leader en 1998 et je ne m\'en suis jamais lassé.'
    },
    {
      id: 3,
      user: 'JonathanD_Fan',
      avatar: 'https://i.pravatar.cc/150?img=45',
      date: '2026-01-18',
      text: 'Article très complet. La plume est bonne et l\'analyse pertinente. Continuez comme ça !'
    }
  ];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#FFFFFF] mb-4">ARTICLE NON TROUVÉ</h1>
          <Link to="/news" className="text-[#8B0000] font-mono text-sm hover:underline">
            &lt;&lt; RETOUR AUX ACTUALITÉS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/news" 
          className="inline-flex items-center gap-2 text-[#8B0000] font-mono text-xs uppercase mb-12 hover:text-[#E0E0E0] transition-colors cursor-none"
        >
          <ArrowLeft size={16} />
          RETOUR AUX ACTUALITÉS
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl lg:text-6xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">{article.title}</GlitchText>
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#E0E0E0]/70 uppercase mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#8B0000]" />
              <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#8B0000]" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-[#FFFFFF] leading-relaxed border-l-4 border-[#8B0000] pl-6">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden border-4 border-[#8B0000] aspect-video">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.4) brightness(0.8) grayscale(0.7)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
              }}
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div 
            className="prose prose-invert max-w-none !text-[#a8a8a8]
              prose-headings:font-black prose-headings:!text-white prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:border-b-2 prose-h2:border-[#8B0000] prose-h2:pb-6 prose-h2:!text-white
              prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-8 prose-h3:!text-[#8B0000]
              prose-p:!text-[#a8a8a8] prose-p:leading-loose prose-p:mb-8
              prose-strong:!text-[#8B0000] prose-strong:font-black
              prose-ul:list-disc prose-ul:pl-6 prose-ul:!text-[#a8a8a8]
              prose-li:mb-3 prose-li:!text-[#a8a8a8]
              prose-blockquote:border-l-4 prose-blockquote:border-[#8B0000] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:!text-[#a8a8a8]/80
              prose-code:!text-[#8B0000] prose-code:bg-[#E0E0E0]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-a:!text-[#8B0000] prose-a:no-underline hover:prose-a:underline
              [&_*]:!text-[#a8a8a8] [&_p]:!text-[#a8a8a8] [&_span]:!text-[#a8a8a8] [&_div]:!text-[#a8a8a8] [&_br~*]:!text-[#a8a8a8]
              [&_h2]:!text-white [&_h3]:!text-[#8B0000] [&_strong]:!text-[#8B0000] [&_a]:!text-[#8B0000]
            "
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />').replace(/##\s/g, '<h2>').replace(/<br \/><br \/>/g, '</h2>') }}
          />
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16 pb-16 border-b border-[#E0E0E0]/20"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={16} className="text-[#8B0000]" />
            <span className="font-mono text-xs text-[#8B0000] uppercase mr-4">Tags:</span>
            <div className="flex gap-2 flex-wrap">
              {['KORN', article.category, '2026', 'UNTOUCHABLES'].map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 border border-[#E0E0E0]/20 font-mono text-xs text-[#E0E0E0] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors cursor-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comment Section */}
        <CommentSection comments={newsComments} />
      </div>
    </div>
  );
}