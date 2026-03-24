import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { ChevronLeft, Filter, MessageSquare, Heart, Trash2, Calendar } from 'lucide-react';
import { usersApi } from '@/app/utils/api';
import { useAuth } from '@/app/contexts/AuthContext';
import { useAlert } from '@/app/contexts/AlertContext';

type ActivityFilter = 'all' | 'post' | 'comment' | 'like';

export function ActivityPage() {
  const { userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingActivityId, setDeletingActivityId] = useState<number | null>(null);
  const [filter, setFilter] = useState<ActivityFilter>('all');
  const [isOwnProfile] = useState(true);

  // Load user activity from backend
  useEffect(() => {
    async function loadActivity() {
      if (!isAuthenticated || !userId) {
        console.log('[ActivityPage] User not authenticated, redirecting to login');
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        console.log(`[ActivityPage] Loading activity for userId: ${userId}`);
        
        // Load user activity with the real user ID
        const activity = await usersApi.getActivity(userId);
        setActivities(activity);
        console.log('[ActivityPage] Loaded activity:', activity.length, 'items');
        setError(null);
      } catch (err) {
        console.error('[ActivityPage] Failed to load activity:', err);
        setError('Impossible de charger l\'activité');
        showAlert('Impossible de charger l\'activité', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    loadActivity();
  }, [userId, isAuthenticated, navigate, showAlert]);

  const handleDeleteActivity = (activityId: number) => {
    setDeletingActivityId(activityId);
  };

  const confirmDeleteActivity = (activityId: number) => {
    setActivities(prev => prev.filter(activity => activity.id !== activityId));
    setDeletingActivityId(null);
  };

  const cancelDeleteActivity = () => {
    setDeletingActivityId(null);
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const stats = {
    all: activities.length,
    post: activities.filter(a => a.type === 'post').length,
    comment: activities.filter(a => a.type === 'comment').length,
    like: activities.filter(a => a.type === 'like').length
  };

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/profile"
              className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-xs uppercase tracking-wider px-4 py-3 transition-all duration-300 cursor-pointer border-2 border-[#8B0000] flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              RETOUR AU PROFIL
            </Link>
          </div>

          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              HISTORIQUE COMPLET
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">TOUTE MON ACTIVITÉ</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose mb-8">
            Retrouve l'historique complet de tes contributions
          </p>
        </motion.div>

        {/* Filtres et statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Filter size={20} className="text-[#8B0000]" />
              <h2 className="text-xl font-black text-[#FFFFFF] uppercase">
                FILTRER PAR TYPE
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`p-4 border-2 transition-all duration-300 cursor-pointer text-center
                  ${filter === 'all' 
                    ? 'bg-[#8B0000]/20 border-[#8B0000]' 
                    : 'bg-transparent border-[#E0E0E0]/20 hover:border-[#8B0000]/50'
                  }`}
              >
                <div className={`text-3xl font-black mb-2 ${filter === 'all' ? 'text-[#8B0000]' : 'text-[#FFFFFF]'}`}>
                  {stats.all}
                </div>
                <div className="font-mono text-xs text-[#a8a8a8] uppercase">Tout</div>
              </button>

              <button
                onClick={() => setFilter('post')}
                className={`p-4 border-2 transition-all duration-300 cursor-pointer text-center
                  ${filter === 'post' 
                    ? 'bg-[#8B0000]/20 border-[#8B0000]' 
                    : 'bg-transparent border-[#E0E0E0]/20 hover:border-[#8B0000]/50'
                  }`}
              >
                <div className={`text-3xl font-black mb-2 ${filter === 'post' ? 'text-[#8B0000]' : 'text-[#FFFFFF]'}`}>
                  {stats.post}
                </div>
                <div className="font-mono text-xs text-[#a8a8a8] uppercase">Posts</div>
              </button>

              <button
                onClick={() => setFilter('comment')}
                className={`p-4 border-2 transition-all duration-300 cursor-pointer text-center
                  ${filter === 'comment' 
                    ? 'bg-[#8B0000]/20 border-[#8B0000]' 
                    : 'bg-transparent border-[#E0E0E0]/20 hover:border-[#8B0000]/50'
                  }`}
              >
                <div className={`text-3xl font-black mb-2 ${filter === 'comment' ? 'text-[#8B0000]' : 'text-[#FFFFFF]'}`}>
                  {stats.comment}
                </div>
                <div className="font-mono text-xs text-[#a8a8a8] uppercase">Commentaires</div>
              </button>

              <button
                onClick={() => setFilter('like')}
                className={`p-4 border-2 transition-all duration-300 cursor-pointer text-center
                  ${filter === 'like' 
                    ? 'bg-[#8B0000]/20 border-[#8B0000]' 
                    : 'bg-transparent border-[#E0E0E0]/20 hover:border-[#8B0000]/50'
                  }`}
              >
                <div className={`text-3xl font-black mb-2 ${filter === 'like' ? 'text-[#8B0000]' : 'text-[#FFFFFF]'}`}>
                  {stats.like}
                </div>
                <div className="font-mono text-xs text-[#a8a8a8] uppercase">Likes</div>
              </button>
            </div>
          </div>
        </motion.div>

        <SectionSeparator />

        {/* Liste d'activités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-12"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-block bg-[#8B0000] px-4 py-2 mb-4">
                  <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
                    <Calendar size={14} className="inline mr-2" />
                    {filteredActivities.length} {filter === 'all' ? 'ACTIVITÉS' : filter.toUpperCase()}
                  </span>
                </div>
                <h2 
                  className="text-3xl lg:text-5xl font-black text-[#FFFFFF] uppercase"
                  style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
                >
                  <GlitchText>
                    {filter === 'all' && 'TOUTES LES ACTIVITÉS'}
                    {filter === 'post' && 'MES POSTS'}
                    {filter === 'comment' && 'MES COMMENTAIRES'}
                    {filter === 'like' && 'MES LIKES'}
                  </GlitchText>
                </h2>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-12 text-center">
              <p className="text-[#a8a8a8] text-lg font-mono">
                Chargement...
              </p>
            </div>
          ) : error ? (
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-12 text-center">
              <p className="text-[#a8a8a8] text-lg font-mono">
                {error}
              </p>
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="bg-[#0A0A0A] border-l-4 border-[#8B0000] p-6 hover:bg-[#8B0000]/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {activity.type === 'post' && <MessageSquare size={16} className="text-[#8B0000]" />}
                        {activity.type === 'comment' && <MessageSquare size={16} className="text-[#8B0000]" />}
                        {activity.type === 'like' && <Heart size={16} className="text-[#8B0000]" />}
                        <span className="font-mono text-xs text-[#8B0000] uppercase">{activity.type}</span>
                      </div>
                      <p className="text-[#E0E0E0] leading-relaxed mb-2">{activity.content}</p>
                      <p className="font-mono text-xs text-[#a8a8a8] mb-3">{activity.date}</p>
                      {activity.linkTo && activity.articleTitle && (
                        <Link
                          to={activity.linkTo}
                          className="text-[#8B0000] hover:text-[#FFFFFF] font-black text-sm uppercase transition-colors duration-300 cursor-pointer"
                        >
                          → {activity.articleTitle}
                        </Link>
                      )}
                    </div>
                    
                    {/* Boutons de suppression */}
                    {isOwnProfile && (
                      <div className="flex items-center gap-2">
                        {deletingActivityId === activity.id ? (
                          <>
                            <button
                              onClick={() => confirmDeleteActivity(activity.id)}
                              className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-3 py-1 transition-all duration-300 cursor-pointer border-2 border-[#8B0000] hover:border-[#FFFFFF]"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={cancelDeleteActivity}
                              className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-xs uppercase tracking-wider px-3 py-1 transition-all duration-300 cursor-pointer border-2 border-[#8B0000]"
                            >
                              Annuler
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleDeleteActivity(activity.id)}
                            className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] p-2 transition-all duration-300 cursor-pointer border-2 border-[#8B0000] hover:border-[#FFFFFF]"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-12 text-center">
              <p className="text-[#a8a8a8] text-lg font-mono">
                Aucune activité de ce type pour le moment
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}