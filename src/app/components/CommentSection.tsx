import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { LikeButton } from './LikeButton';
import { useAuth } from '@/app/contexts/AuthContext';
import { useAlert } from '@/app/contexts/AlertContext';

interface Comment {
  id: string;
  content: string;
  userId: string;
  username?: string;
  avatar?: string;
  createdAt: string;
  isApproved: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => Promise<void>;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      showAlert('Vous devez être connecté pour commenter', 'error');
      return;
    }

    if (!commentText.trim()) {
      showAlert('Le commentaire ne peut pas être vide', 'error');
      return;
    }

    if (!onAddComment) {
      showAlert('Impossible d\'ajouter un commentaire', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddComment(commentText);
      setCommentText('');
      setShowCommentForm(false);
      showAlert('Commentaire envoyé ! Il sera visible après modération.', 'success');
    } catch (error) {
      console.error('[CommentSection] Failed to post comment:', error);
      showAlert('Erreur lors de la publication du commentaire', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <MessageSquare className="text-[#8B0000]" size={32} />
          <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
            COMMENTAIRES
          </h2>
          <span className="font-mono text-sm text-[#8B0000]">({comments.length})</span>
        </div>
        <Button
          onClick={() => setShowCommentForm(!showCommentForm)}
          variant="secondary"
          size="sm"
        >
          <MessageSquare size={14} />
          COMMENTER
        </Button>
      </div>

      {/* Formulaire commentaire */}
      {showCommentForm && (
        <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-6 mb-6">
          <h3 className="font-black text-[#FFFFFF] uppercase mb-4">Ajouter un commentaire</h3>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Partagez votre avis..."
            className="w-full bg-[#0A0A0A] border border-[#8B0000]/30 text-[#E0E0E0] font-mono text-sm p-4 min-h-[120px] focus:outline-none focus:border-[#8B0000] resize-none"
          />
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleSubmit}
              variant="primary"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'ENVOI...' : 'PUBLIER'}
            </Button>
            <Button
              onClick={() => {
                setShowCommentForm(false);
                setCommentText('');
              }}
              variant="secondary"
              size="sm"
            >
              ANNULER
            </Button>
          </div>
        </div>
      )}

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-8 text-center">
            <p className="font-mono text-sm text-[#8B0000] uppercase">
              Aucun commentaire pour le moment. Soyez le premier à commenter !
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6">
              <div className="flex items-start gap-4">
                <img
                  src={comment.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
                  alt={comment.username || 'Anonymous'}
                  className="w-12 h-12 rounded-none border-2 border-[#8B0000] object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-black text-[#FFFFFF]">{comment.username || 'Anonymous'}</h4>
                    <span className="font-mono text-xs text-[#8B0000]">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-[#E0E0E0] leading-relaxed mb-3">{comment.content}</p>
                  
                  {/* Like button for comment */}
                  <div className="mt-3 pt-3 border-t border-[#E0E0E0]/10">
                    <LikeButton 
                      targetType="comment" 
                      targetId={comment.id} 
                      size="small"
                      showCount={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}