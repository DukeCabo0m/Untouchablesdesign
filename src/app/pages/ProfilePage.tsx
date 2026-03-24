import { Calendar, MapPin, Mail, Edit, Settings, Award, Heart, MessageSquare, Trash2, UserCheck, Ticket, X, Users, MessageCircle, Star, Trophy, Flame, FileText, Bug, Disc, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { useAttendedConcerts } from '@/app/hooks/useAttendedConcerts';
import { usersApi } from '@/app/utils/api';
import { useAuth } from '@/app/contexts/AuthContext';

// Icônes SVG pour les réseaux sociaux
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function ProfilePage() {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isOwnProfile] = useState(true); // Mock - true si c'est le profil de l'utilisateur connecté
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [deletingActivityId, setDeletingActivityId] = useState<number | null>(null);
  const [favoriteAlbums, setFavoriteAlbums] = useState<any[]>([]);
  const [deletingAlbumIndex, setDeletingAlbumIndex] = useState<number | null>(null);
  
  // Récupérer les concerts auxquels l'utilisateur a assisté
  const { attendedConcerts, toggleAttendance } = useAttendedConcerts();
  const [deletingConcertSlug, setDeletingConcertSlug] = useState<string | null>(null);

  // Load user profile from backend
  useEffect(() => {
    async function loadProfile() {
      // Vérifier si l'utilisateur est authentifié
      if (!isAuthenticated || !userId) {
        console.log('[ProfilePage] User not authenticated, redirecting to login');
        navigate('/login');
        return;
      }
      
      try {
        setIsLoading(true);
        console.log('[ProfilePage] Loading profile for user:', userId);
        
        // Get current user from backend using their ID
        const currentUser = await usersApi.getById(userId);
        
        if (!currentUser) {
          setError('Utilisateur non trouvé');
          setIsLoading(false);
          return;
        }
        
        console.log('[ProfilePage] Loaded user:', currentUser);
        
        // Load user stats
        try {
          const stats = await usersApi.getStats(currentUser.id);
          currentUser.stats = stats;
          console.log('[ProfilePage] Loaded stats:', stats);
        } catch (err) {
          console.error('[ProfilePage] Failed to load stats:', err);
          currentUser.stats = { posts: 0, comments: 0, likes: 0, badges: 0 };
        }
        
        // Load user activity
        try {
          const activity = await usersApi.getActivity(currentUser.id);
          setRecentActivity(activity.slice(0, 5)); // Limiter aux 5 derniers
          console.log('[ProfilePage] Loaded activity:', activity.length);
        } catch (err) {
          console.error('[ProfilePage] Failed to load activity:', err);
          setRecentActivity([]);
        }
        
        // Set favorite albums from user data
        setFavoriteAlbums(currentUser.favoriteAlbums || []);
        
        setUserData(currentUser);
        setError(null);
      } catch (err) {
        console.error('[ProfilePage] Failed to load profile:', err);
        setError('Impossible de charger le profil');
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleDeleteActivity = (activityId: number) => {
    setDeletingActivityId(activityId);
  };

  const confirmDeleteActivity = (activityId: number) => {
    setRecentActivity(prev => prev.filter(activity => activity.id !== activityId));
    setDeletingActivityId(null);
  };

  const cancelDeleteActivity = () => {
    setDeletingActivityId(null);
  };

  const handleDeleteAlbum = (index: number) => {
    setDeletingAlbumIndex(index);
  };

  const confirmDeleteAlbum = (index: number) => {
    setFavoriteAlbums(prev => prev.filter((_, i) => i !== index));
    setDeletingAlbumIndex(null);
  };

  const cancelDeleteAlbum = () => {
    setDeletingAlbumIndex(null);
  };

  const handleDeleteConcert = (slug: string) => {
    setDeletingConcertSlug(slug);
  };

  const confirmDeleteConcert = (slug: string) => {
    toggleAttendance(slug);
    setDeletingConcertSlug(null);
  };

  const cancelDeleteConcert = () => {
    setDeletingConcertSlug(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="font-mono text-[#8B0000] text-lg animate-pulse">
          Chargement du profil...
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#E0E0E0] mb-4">ERREUR</h1>
          <p className="text-[#8B0000] font-mono text-sm mb-6">{error || 'Profil non trouvé'}</p>
          <Link to="/" className="text-[#8B0000] font-mono text-sm hover:underline">
            &lt;&lt; RETOUR À L'ACCUEIL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="PROFIL"
        description={`${userData?.username}${userData?.level ? ` • ${userData.level.name}<br />${userData.level.description}` : ''}`}
        backgroundImage="https://images.unsplash.com/photo-1756978303719-57095d8bd250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbWV0YWwlMjBjcm93ZHxlbnwxfHx8fDE3NjkyMTA0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        breadcrumbs={[
          { label: 'Accueil', path: '/' },
          { label: 'Profil' }
        ]}
        glitchIntensity="high"
      />

      <div className="max-w-[1920px] mx-auto pt-0 pb-8 md:pb-10 lg:pb-12 px-4 md:px-6 lg:px-8">
        {/* Layout en colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[380px_1fr] gap-6 md:gap-8">
          
          {/* COLONNE GAUCHE - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#8B0000]/20 border border-[#8B0000]"
          >
            {/* Avatar - sans padding */}
            <div className="relative">
              <div className="w-full aspect-[4/3] border-b border-[#8B0000]/30 overflow-hidden relative group">
                <img 
                  src={userData?.avatar} 
                  alt={userData?.username}
                  className="w-full h-full object-cover contrast-125 brightness-90"
                />
                {/* Effet X-Ray au survol */}
                <div className="absolute inset-0 bg-[#8B0000] mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                
                {/* Badge de statut - en haut à droite */}
                <div className="absolute top-3 right-3 bg-[#8B0000] px-3 py-1">
                  <span className="font-mono text-xs text-[#E0E0E0] uppercase">Actif</span>
                </div>

                {/* Boutons d'action - en bas à droite */}
                {isOwnProfile && (
                  <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                    <Link
                      to="/profile/edit"
                      className="bg-[#8B0000] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] font-black text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 cursor-none flex items-center justify-center gap-2 backdrop-blur-sm border border-[#8B0000] hover:border-[#FFFFFF]"
                    >
                      <Edit size={12} />
                      Modifier
                    </Link>
                    <Link
                      to="/profile/settings"
                      className="bg-[#0A0A0A]/80 hover:bg-[#8B0000]/80 text-[#FFFFFF] hover:text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 cursor-none border border-[#FFFFFF] flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                      <Settings size={12} />
                      Paramètres
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Contenu avec padding */}
            <div className="p-6">
              {/* Username */}
              <h1 
                className="text-3xl font-black text-[#FFFFFF] uppercase mb-2"
                style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
              >
                <GlitchText glitchIntensity="medium">{userData?.username}</GlitchText>
              </h1>

              {/* Niveau / Titre */}
              {userData?.level && (
                <div className="mb-4 inline-block">
                  <div className="bg-[#8B0000] px-3 py-1 border-l-4 border-[#FFFFFF]">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#FFFFFF] uppercase tracking-wider">
                        {userData.level.name}
                      </span>
                      <span className="text-[#E0E0E0] text-xs font-mono">•</span>
                      <span className="text-[#E0E0E0] text-xs font-mono italic">
                        {userData.level.description}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bio */}
              <p className="text-[#E0E0E0] text-sm leading-relaxed mb-6">
                {userData?.bio}
              </p>

              {/* Infos */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#a8a8a8] font-mono">
                  <Calendar size={14} className="text-[#8B0000]" />
                  Membre depuis le {userData?.joinDate}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#a8a8a8] font-mono">
                  <MapPin size={14} className="text-[#8B0000]" />
                  {userData?.location}
                </div>
                
                {/* Réseaux sociaux */}
                <div className="flex items-center gap-4 pt-2">
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors cursor-none"
                    title="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors cursor-none"
                    title="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a 
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors cursor-none"
                    title="TikTok"
                  >
                    <TikTokIcon />
                  </a>
                </div>
              </div>

              {/* Séparateur */}
              <div className="h-[1px] bg-[#FFFFFF]/30 mb-6" />

              {/* Albums favoris (intégrés et compacts) */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-[2px] w-8 bg-[#FFFFFF]" />
                  <span className="font-black text-sm text-[#FFFFFF] uppercase">
                    <Heart size={12} className="inline mr-1" />
                    Albums favoris
                  </span>
                </div>
                
                <div className="space-y-2">
                  {favoriteAlbums.map((album, index) => (
                    <div
                      key={index}
                      className="bg-black hover:bg-[#8B0000]/10 border-l-2 border-[#8B0000] p-3 hover:border-l-4 transition-all duration-300 cursor-none group relative"
                    >
                      <div className="flex items-center justify-between gap-8">
                        <div className="flex-1">
                          <h3 className="text-sm font-black text-[#FFFFFF] uppercase group-hover:text-[#8B0000] transition-colors leading-tight">
                            {album.title}
                          </h3>
                          <p className="font-mono text-xs text-[#a8a8a8] mt-1">{album.year}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="text-[#8B0000] flex-shrink-0" size={16} fill="#8B0000" />
                          {isOwnProfile && (
                            <>
                              {deletingAlbumIndex === index ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      confirmDeleteAlbum(index);
                                    }}
                                    className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                                  >
                                    Oui
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      cancelDeleteAlbum();
                                    }}
                                    className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-none border border-[#8B0000]"
                                  >
                                    Non
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteAlbum(index);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] p-1 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                                  title="Supprimer"
                                >
                                  <X size={12} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concerts où j'ai été (intégrés et compacts) */}
              {attendedConcerts.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-[2px] w-8 bg-[#FFFFFF]" />
                    <span className="font-black text-sm text-[#FFFFFF] uppercase">
                      <Ticket size={12} className="inline mr-1" />
                      Concerts où j'ai été
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {attendedConcerts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map((concert) => (
                      <div
                        key={concert.slug}
                        className="relative bg-black hover:bg-[#8B0000]/10 border-l-2 border-[#8B0000] p-3 hover:border-l-4 transition-all duration-300 cursor-none group"
                      >
                        <Link
                          to={`/tour/concert/${concert.slug}`}
                          className="block"
                        >
                          <div className="flex items-start justify-between gap-8 mb-2">
                            <h3 className="text-sm font-black text-[#FFFFFF] uppercase group-hover:text-[#8B0000] transition-colors leading-tight flex-1">
                              {concert.venue}
                            </h3>
                            <div className="flex items-center gap-2">
                              <UserCheck className="text-[#8B0000] flex-shrink-0" size={14} />
                              {isOwnProfile && (
                                <>
                                  {deletingConcertSlug === concert.slug ? (
                                    <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          confirmDeleteConcert(concert.slug);
                                        }}
                                        className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                                      >
                                        Oui
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          cancelDeleteConcert();
                                        }}
                                        className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-none border border-[#8B0000]"
                                      >
                                        Non
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteConcert(concert.slug);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] p-1 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                                      title="Supprimer"
                                    >
                                      <X size={12} />
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-[#a8a8a8]">
                              <Calendar size={10} className="text-[#8B0000]" />
                              <span className="font-mono">
                                {new Date(concert.date).toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[#a8a8a8]">
                              <MapPin size={10} className="text-[#8B0000]" />
                              <span className="font-mono">{concert.city}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  
                  {attendedConcerts.length > 3 && (
                    <Link
                      to="/tour"
                      className="block text-center text-[#8B0000] hover:text-[#FFFFFF] font-mono text-xs uppercase mt-3 transition-colors cursor-none"
                    >
                      Voir tous ({attendedConcerts.length})
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* COLONNE DROITE - Contenu principal */}
          <div className="space-y-6">

            {/* Grille Stats + Badges */}
            <div className="border border-[#a8a8a8]/30 bg-[#0A0A0A]/95 p-6 space-y-6">
              
              {/* Statistiques (ligne horizontale en haut) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[2px] w-8 bg-[#8B0000]" />
                  <Activity size={12} className="text-[#FFFFFF]" />
                  <span className="font-mono text-sm text-[#FFFFFF] uppercase font-black">
                    Statistiques
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{userData?.stats.posts}</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Posts publiés</div>
                  </div>
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{userData?.stats.comments}K</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Commentaires</div>
                  </div>
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{userData?.stats.likes}</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Likes donnés</div>
                  </div>
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{userData?.stats.badges}</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Badges débloqués</div>
                  </div>
                </div>
              </motion.div>

              {/* Badges (ligne horizontale en dessous) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-[#8B0000]" />
                    <span className="font-mono text-sm text-[#FFFFFF] uppercase font-black">
                      <Award size={12} className="inline mr-1" />
                      Collection de Badges
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#a8a8a8]">
                    {userData?.badges?.filter(b => b.earned).length || 0}/{userData?.badges?.length || 0}
                  </span>
                </div>
                
                <div className="grid grid-cols-8 gap-3">
                  {userData?.badges?.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-3 flex flex-col items-center justify-center bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none group relative ${
                        badge.earned ? '' : 'opacity-40'
                      }`}
                    >
                      <div className={`mb-2 group-hover:scale-110 transition-transform duration-300 ${
                        badge.earned ? 'text-[#8B0000]' : 'text-[#3a3a3a]'
                      }`}>
                        {badge.icon}
                      </div>
                      <div className={`font-black text-[9px] uppercase leading-tight text-center ${
                        badge.earned ? 'text-[#FFFFFF]' : 'text-[#4a4a4a]'
                      }`}>
                        {badge.name}
                      </div>
                      
                      {/* Tooltip au survol */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#8B0000] border border-[#FFFFFF] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-10 whitespace-nowrap">
                        <div className="font-black text-xs text-[#FFFFFF] uppercase">{badge.name}</div>
                        <div className="font-mono text-[10px] text-[#E0E0E0] mt-1">{badge.description}</div>
                        {!badge.earned && (
                          <div className="font-mono text-[10px] text-[#8B0000] mt-1 bg-[#FFFFFF] px-2 py-1 inline-block">
                            NON DÉBLOQUÉ
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Activité récente - Pleine largeur en dessous */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-[#a8a8a8]/30 bg-[#0A0A0A]/95 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-8 bg-[#8B0000]" />
                  <span className="font-mono text-sm text-[#FFFFFF] uppercase font-black">
                    <MessageSquare size={12} className="inline mr-1" />
                    Activité récente
                  </span>
                </div>
                <Link
                  to="/profile/activity"
                  className="bg-transparent hover:bg-[#8B0000] text-[#8B0000] hover:text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                >
                  VOIR TOUTE L'ACTIVITÉ
                </Link>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-black border-l-2 border-[#8B0000] p-4 hover:border-l-4 hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none relative group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Ligne 1 : Type + Date + Article */}
                        <div className="flex items-center gap-2 mb-2">
                          {activity.type === 'post' && <MessageSquare size={12} className="text-[#8B0000]" />}
                          {activity.type === 'comment' && <MessageSquare size={12} className="text-[#8B0000]" />}
                          {activity.type === 'like' && <Heart size={12} className="text-[#8B0000]" />}
                          <span className="font-mono text-[10px] text-[#8B0000] uppercase font-black">{activity.type}</span>
                          <span className="text-[#a8a8a8]">•</span>
                          <span className="font-mono text-[10px] text-[#a8a8a8]">{activity.date}</span>
                          {activity.linkTo && activity.articleTitle && (
                            <>
                              <span className="text-[#a8a8a8]">—</span>
                              <Link
                                to={activity.linkTo}
                                className="text-[#E0E0E0] hover:text-[#8B0000] text-sm font-black uppercase transition-colors duration-300 cursor-none"
                              >
                                {activity.articleTitle}
                              </Link>
                            </>
                          )}
                        </div>
                        {/* Ligne 2 : Commentaire / Texte */}
                        <div className="text-[#a8a8a8] text-sm font-mono pl-5">
                          {activity.content}
                        </div>
                      </div>
                      
                      {/* Boutons de suppression */}
                      {isOwnProfile && (
                        <div className="flex items-center gap-2">
                          {deletingActivityId === activity.id ? (
                            <>
                              <button
                                onClick={() => confirmDeleteActivity(activity.id)}
                                className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                              >
                                Oui
                              </button>
                              <button
                                onClick={cancelDeleteActivity}
                                className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-none border border-[#8B0000]"
                              >
                                Non
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleDeleteActivity(activity.id)}
                              className="opacity-0 group-hover:opacity-100 bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] p-1 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF]"
                              title="Supprimer"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}