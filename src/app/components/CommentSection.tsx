import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './Button';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  date: string;
  text: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText);
      setCommentText('');
      setShowCommentForm(false);
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
            >
              PUBLIER
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
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-12 h-12 rounded-none border-2 border-[#8B0000]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-black text-[#FFFFFF]">{comment.user}</h4>
                    <span className="font-mono text-xs text-[#8B0000]">
                      {new Date(comment.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-[#E0E0E0] leading-relaxed">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}