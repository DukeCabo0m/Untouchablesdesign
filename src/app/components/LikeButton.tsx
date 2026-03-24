import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { likesApi } from '@/app/utils/api';
import { useAuth } from '@/app/contexts/AuthContext';
import { useAlert } from '@/app/contexts/AlertContext';
import { motion } from 'motion/react';

interface LikeButtonProps {
  targetType: 'article' | 'comment';
  targetId: string;
  initialLikesCount?: number;
  showCount?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function LikeButton({
  targetType,
  targetId,
  initialLikesCount = 0,
  showCount = true,
  size = 'medium'
}: LikeButtonProps) {
  const { userId, isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load initial like state and count
  useEffect(() => {
    async function loadLikeState() {
      if (!targetId) return;

      try {
        setIsInitializing(true);

        // Get likes count
        const likesData = targetType === 'article'
          ? await likesApi.getArticleLikes(targetId)
          : await likesApi.getCommentLikes(targetId);

        setLikesCount(likesData.count);

        // Check if current user liked
        if (userId) {
          const likeStatus = targetType === 'article'
            ? await likesApi.checkArticleLike(targetId, userId)
            : await likesApi.checkCommentLike(targetId, userId);

          setIsLiked(likeStatus.liked);
        }
      } catch (err) {
        console.error('[LikeButton] Failed to load like state:', err);
      } finally {
        setIsInitializing(false);
      }
    }

    loadLikeState();
  }, [targetId, targetType, userId]);

  const handleLikeToggle = async () => {
    if (!isAuthenticated || !userId) {
      showAlert('Connecte-toi pour liker', 'error');
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      if (isLiked) {
        // Unlike
        if (targetType === 'article') {
          await likesApi.unlikeArticle(targetId, userId);
        } else {
          await likesApi.unlikeComment(targetId, userId);
        }
        setIsLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        // Like
        if (targetType === 'article') {
          await likesApi.likeArticle(targetId, userId);
        } else {
          await likesApi.likeComment(targetId, userId);
        }
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (err: any) {
      console.error('[LikeButton] Toggle like error:', err);
      const errorMessage = err.message || 'Erreur lors du like';
      
      // Don't show "already liked" error as it's not user-facing
      if (!errorMessage.includes('déjà liké')) {
        showAlert(errorMessage, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 20
  };

  const iconSize = iconSizes[size];

  if (isInitializing) {
    return (
      <div className="flex items-center gap-2 opacity-50">
        <Heart size={iconSize} className="text-[#a8a8a8]" />
        {showCount && <span className="font-mono text-xs text-[#a8a8a8]">...</span>}
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleLikeToggle}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 transition-all duration-300 cursor-none
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${isLiked ? 'text-[#8B0000]' : 'text-[#a8a8a8] hover:text-[#8B0000]'}
      `}
      title={isLiked ? 'Retirer le like' : 'Liker'}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={iconSize}
          fill={isLiked ? 'currentColor' : 'none'}
          className="transition-all duration-300"
        />
      </motion.div>
      {showCount && (
        <span className={`font-mono text-xs font-bold ${isLiked ? 'text-[#8B0000]' : 'text-[#a8a8a8]'}`}>
          {likesCount}
        </span>
      )}
    </motion.button>
  );
}
