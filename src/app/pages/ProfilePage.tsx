import { Calendar, MapPin, Mail, Edit, Settings, Award, Heart, MessageSquare, Trash2, UserCheck, Ticket, X, Users, MessageCircle, Star, Trophy, Flame, FileText, Bug, Disc, Activity } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { useAttendedConcerts } from '@/app/hooks/useAttendedConcerts';

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

// Mock data - à remplacer par de vraies données
const mockUserData = {
  username: 'DarkFreak666',
  avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  bio: 'Fan de Korn depuis Follow The Leader. La scène française manque de vraie énergie brute. Korn forever 🤘',
  joinDate: '15 mars 2024',
  location: 'Paris (75), France',
  website: 'https://darkfreakmusic.com',
  email: 'darkfreak@untouchables.fr',
  level: {
    name: 'Freak',
    description: 'Déchaîné et complètement intégré'
  },
  stats: {
    posts: 247,
    comments: 1.2,
    likes: 892,
    badges: 3
  },
  favoriteAlbums: [
    { title: 'Untouchables', year: '2002' },
    { title: 'Issues', year: '1999' },
    { title: 'Follow The Leader', year: '1998' }
  ],
  badges: [
    { name: 'Korn Kid', description: 'Membre officiel de la famille', icon: <Users size={28} />, earned: true },
    { name: 'Twist', description: 'Plus de 200 messages postés', icon: <MessageCircle size={28} />, earned: true },
    { name: 'Got the Life', description: 'Profil complet à 100%', icon: <Star size={28} />, earned: true },
    { name: 'Here to Stay', description: 'Fidèle depuis plus d\'un an', icon: <Trophy size={28} />, earned: false },
    { name: 'A.D.I.D.A.S.', description: 'Visite quotidienne pendant 30 jours', icon: <Flame size={28} />, earned: false },
    { name: 'Y\'All Want a Single', description: '10 sujets créés', icon: <FileText size={28} />, earned: false },
    { name: 'Issues', description: 'Rapporteur de bugs', icon: <Bug size={28} />, earned: false },
    { name: 'Issues Cover', description: 'Collectionneur vérifié', icon: <Disc size={28} />, earned: false }
  ]
};

const initialRecentActivity = [
  { 
    id: 1, 
    type: 'post', 
    content: 'Nouveau son de Korn incroyable !', 
    date: 'Il y a 2h',
    linkTo: '/actualites/korn-devoile-nouveau-single',
    articleTitle: 'Korn dévoile un nouveau single explosif'
  },
  { 
    id: 2, 
    type: 'comment', 
    content: 'Totalement d\'accord avec cette analyse', 
    date: 'Il y a 5h',
    linkTo: '/actualites/interview-jonathan-davis',
    articleTitle: 'Interview exclusive avec Jonathan Davis'
  },
  { 
    id: 3, 
    type: 'like', 
    content: 'A aimé "Les meilleures performances live"', 
    date: 'Hier',
    linkTo: '/actualites/meilleures-performances-live',
    articleTitle: 'Les meilleures performances live de Korn'
  },
  { 
    id: 4, 
    type: 'post', 
    content: 'Les riffs de Munky sont légendaires', 
    date: 'Il y a 1 jour',
    linkTo: '/actualites/analyse-riffs-munky',
    articleTitle: 'Analyse : Les riffs légendaires de Munky'
  },
  { 
    id: 5, 
    type: 'comment', 
    content: 'Cette setlist était parfaite', 
    date: 'Il y a 2 jours',
    linkTo: '/actualites/concert-paris-2024',
    articleTitle: 'Retour sur le concert de Paris 2024'
  }
];

export function ProfilePage() {
  const [isOwnProfile] = useState(true); // Mock - true si c'est le profil de l'utilisateur connecté
  const [recentActivity, setRecentActivity] = useState(initialRecentActivity);
  const [deletingActivityId, setDeletingActivityId] = useState<number | null>(null);
  const [favoriteAlbums, setFavoriteAlbums] = useState(mockUserData.favoriteAlbums);
  const [deletingAlbumIndex, setDeletingAlbumIndex] = useState<number | null>(null);
  
  // Récupérer les concerts auxquels l'utilisateur a assisté
  const { attendedConcerts, toggleAttendance } = useAttendedConcerts();
  const [deletingConcertSlug, setDeletingConcertSlug] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="PROFIL"
        description={`${mockUserData.username} • ${mockUserData.level.name}<br />${mockUserData.level.description}`}
        backgroundImage="https://images.unsplash.com/photo-1756978303719-57095d8bd250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbWV0YWwlMjBjcm93ZHxlbnwxfHx8fDE3NjkyMTA0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        breadcrumbs={[
          { label: 'Accueil', path: '/' },
          { label: 'Profil' }
        ]}
        glitchIntensity="high"
      />

      <div className="max-w-7xl mx-auto pt-0 pb-12">
        {/* Layout en colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
          
          {/* COLONNE GAUCHE - Sidebar */}
          <div className="space-y-8">
            
            {/* Carte Profil Principal avec Stats et Badges intégrés */}
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
                    src={mockUserData.avatar} 
                    alt={mockUserData.username}
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
                  <GlitchText glitchIntensity="medium">{mockUserData.username}</GlitchText>
                </h1>

                {/* Niveau / Titre */}
                <div className="mb-4 inline-block">
                  <div className="bg-[#8B0000] px-3 py-1 border-l-4 border-[#FFFFFF]">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#FFFFFF] uppercase tracking-wider">
                        {mockUserData.level.name}
                      </span>
                      <span className="text-[#E0E0E0] text-xs font-mono">•</span>
                      <span className="text-[#E0E0E0] text-xs font-mono italic">
                        {mockUserData.level.description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[#E0E0E0] text-sm leading-relaxed mb-6">
                  {mockUserData.bio}
                </p>

                {/* Infos */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#a8a8a8] font-mono">
                    <Calendar size={14} className="text-[#8B0000]" />
                    Membre depuis le {mockUserData.joinDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#a8a8a8] font-mono">
                    <MapPin size={14} className="text-[#8B0000]" />
                    {mockUserData.location}
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

          </div>

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
                    <div className="text-xl font-black text-[#8B0000] mb-1">{mockUserData.stats.posts}</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Posts publiés</div>
                  </div>
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{mockUserData.stats.comments}K</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Commentaires</div>
                  </div>
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{mockUserData.stats.likes}</div>
                    <div className="font-mono text-[9px] text-[#a8a8a8] uppercase">Likes donnés</div>
                  </div>
                  <div className="p-3 border-l-2 border-[#8B0000] bg-black hover:bg-[#8B0000]/10 transition-all duration-300 cursor-none">
                    <div className="text-xl font-black text-[#8B0000] mb-1">{mockUserData.stats.badges}</div>
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
                    {mockUserData.badges.filter(b => b.earned).length}/{mockUserData.badges.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-8 gap-3">
                  {mockUserData.badges.map((badge, index) => (
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