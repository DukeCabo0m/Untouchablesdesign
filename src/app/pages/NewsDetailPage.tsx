import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { CommentSection } from '@/app/components/CommentSection';
import { LikeButton } from '@/app/components/LikeButton';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { articlesApi, usersApi, commentsApi } from '@/app/utils/api';
import { useAuth } from '@/app/contexts/AuthContext';
import { useAlert } from '@/app/contexts/AlertContext';

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { userId, isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const [article, setArticle] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load article, author, and comments from backend
  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log('[NewsDetailPage] Loading article:', slug);
        
        // Get all articles and find by slug
        const articles = await articlesApi.getAll();
        const foundArticle = articles.find((a: any) => a.slug === slug);
        
        if (!foundArticle) {
          setError('Article non trouvé');
          setIsLoading(false);
          return;
        }
        
        console.log('[NewsDetailPage] Found article:', foundArticle);
        
        // Load author, users, and comments in parallel
        const [users, commentsData] = await Promise.all([
          usersApi.getAll().catch(() => []),
          commentsApi.getByEntity('article', foundArticle.id).catch(() => [])
        ]);
        
        const articleAuthor = users.find((u: any) => u.id === foundArticle.authorId);
        
        // Enrich comments with user data
        const enrichedComments = commentsData
          .filter((c: any) => c.isApproved)
          .map((comment: any) => {
            const commentUser = users.find((u: any) => u.id === comment.userId);
            return {
              ...comment,
              username: commentUser?.username || 'Anonymous',
              avatar: commentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
            };
          });
        
        setArticle(foundArticle);
        setAuthor(articleAuthor);
        setComments(enrichedComments);
        setError(null);
      } catch (err) {
        console.error('[NewsDetailPage] Failed to load article:', err);
        setError('Impossible de charger l\'article');
      } finally {
        setIsLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  // Add comment handler
  const handleAddComment = async (text: string) => {
    if (!isAuthenticated || !userId) {
      showAlert('Vous devez être connecté pour commenter', 'error');
      throw new Error('Not authenticated');
    }

    if (!article) {
      showAlert('Article non trouvé', 'error');
      throw new Error('Article not found');
    }

    try {
      console.log('[NewsDetailPage] Creating comment:', { text, userId, articleId: article.id });
      
      await commentsApi.create({
        content: text,
        userId: userId,
        entityType: 'article',
        entityId: article.id,
        isApproved: false // Will be moderated
      });

      console.log('[NewsDetailPage] Comment created and pending moderation');
      // Don't add to local state - comment needs approval first
    } catch (error) {
      console.error('[NewsDetailPage] Failed to create comment:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-mono text-[#8B0000] text-lg animate-pulse">
          Chargement de l'article...
        </div>
      </div>
    );
  }

  if (error || !article) {
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
    <div className="min-h-screen py-20 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Back Button */}
        <Link 
          to="/news" 
          className="inline-flex items-center gap-2 mb-6 md:mb-8 lg:mb-12 text-[#8B0000] hover:text-[#FFFFFF] transition-colors font-mono text-xs md:text-sm uppercase"
        >
          <ArrowLeft size={14} className="md:w-4 md:h-4" />
          Retour aux actualités
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <Link 
            to={`/category/${article.category}`}
            className="inline-block bg-[#8B0000] hover:bg-[#6B0000] px-4 py-2 mb-6 transition-colors"
          >
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              {article.category}
            </span>
          </Link>

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
              <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#8B0000]" />
              <span>{author?.username || 'Untouchables Team'}</span>
            </div>
            {/* Like Button */}
            <div className="ml-auto">
              <LikeButton 
                targetType="article" 
                targetId={article.id} 
                size="medium"
                showCount={true}
              />
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
              src={article.coverImage || article.image}
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
          {article.tags && article.tags.length > 0 ? (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={16} className="text-[#8B0000]" />
              <span className="font-mono text-xs text-[#8B0000] uppercase mr-4">Tags:</span>
              <div className="flex gap-2 flex-wrap">
                {article.tags.map((tag: string) => (
                  <Link 
                    key={tag}
                    to={`/tag/${tag}`}
                    className="px-3 py-1 border border-[#E0E0E0]/20 font-mono text-xs text-[#E0E0E0] hover:border-[#8B0000] hover:bg-[#8B0000]/20 hover:text-[#FFFFFF] transition-colors uppercase"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>

        {/* Comment Section */}
        <CommentSection comments={comments} onAddComment={handleAddComment} />
      </div>
    </div>
  );
}