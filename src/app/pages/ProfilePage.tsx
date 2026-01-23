import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { 
  User, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Mail,
  MessageSquare,
  Heart,
  Award,
  Edit,
  Settings,
  Trash2
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - à remplacer par de vraies données
const mockUserData = {
  username: 'DarkFreak666',
  avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  bio: 'Fan de Korn depuis Follow The Leader. La scène française manque de vraie énergie brute. Korn forever 🤘',
  joinDate: '15 mars 2024',
  location: 'Paris, France',
  website: 'https://darkfreakmusic.com',
  email: 'darkfreak@untouchables.fr',
  stats: {
    posts: 247,
    comments: 1.2,
    likes: 892,
    badges: 12
  },
  favoriteAlbums: [
    { title: 'Untouchables', year: '2002' },
    { title: 'Issues', year: '1999' },
    { title: 'Follow The Leader', year: '1998' }
  ],
  badges: [
    { name: 'Membre Fondateur', icon: '🏆', color: '#FFD700' },
    { name: 'Contributeur Actif', icon: '⭐', color: '#8B0000' },
    { name: 'Expert Korn', icon: '🎸', color: '#E0E0E0' },
    { name: 'Commentateur Pro', icon: '💬', color: '#8B0000' }
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

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header avec avatar et infos principales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-[#0A0A0A] border-4 border-[#8B0000] p-8 lg:p-12 relative overflow-hidden">
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #8B0000 2px, #8B0000 4px)'
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-40 lg:w-48 lg:h-48 border-4 border-[#8B0000] overflow-hidden relative group">
                  <img 
                    src={mockUserData.avatar} 
                    alt={mockUserData.username}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90"
                  />
                  {/* Effet X-Ray au survol */}
                  <div className="absolute inset-0 bg-[#8B0000] mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                
                {/* Badge de statut */}
                <div className="absolute -bottom-3 -right-3 bg-[#8B0000] border-2 border-[#0A0A0A] px-3 py-1">
                  <span className="font-mono text-xs text-[#E0E0E0] uppercase">Actif</span>
                </div>
              </div>

              {/* Infos principales */}
              <div className="flex-1">
                <div className="mb-4">
                  <h1 
                    className="text-4xl lg:text-6xl font-black text-[#FFFFFF] uppercase mb-2"
                    style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
                  >
                    <GlitchText glitchIntensity="medium">{mockUserData.username}</GlitchText>
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[#a8a8a8] font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#8B0000]" />
                      Membre depuis {mockUserData.joinDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#8B0000]" />
                      {mockUserData.location}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[#E0E0E0] leading-loose mb-6 max-w-2xl">
                  {mockUserData.bio}
                </p>

                {/* Liens */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <a 
                    href={mockUserData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#8B0000] hover:text-[#FFFFFF] transition-colors cursor-none"
                  >
                    <LinkIcon size={14} />
                    <span className="font-mono">{mockUserData.website}</span>
                  </a>
                  <div className="flex items-center gap-2 text-sm text-[#a8a8a8] font-mono">
                    <Mail size={14} className="text-[#8B0000]" />
                    {mockUserData.email}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/30 p-4 text-center">
                    <div className="text-3xl font-black text-[#8B0000] mb-1">{mockUserData.stats.posts}</div>
                    <div className="font-mono text-xs text-[#a8a8a8] uppercase">Posts</div>
                  </div>
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/30 p-4 text-center">
                    <div className="text-3xl font-black text-[#8B0000] mb-1">{mockUserData.stats.comments}K</div>
                    <div className="font-mono text-xs text-[#a8a8a8] uppercase">Commentaires</div>
                  </div>
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/30 p-4 text-center">
                    <div className="text-3xl font-black text-[#8B0000] mb-1">{mockUserData.stats.likes}</div>
                    <div className="font-mono text-xs text-[#a8a8a8] uppercase">Likes</div>
                  </div>
                  <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/30 p-4 text-center">
                    <div className="text-3xl font-black text-[#8B0000] mb-1">{mockUserData.stats.badges}</div>
                    <div className="font-mono text-xs text-[#a8a8a8] uppercase">Badges</div>
                  </div>
                </div>
              </div>

              {/* Boutons d'action (si c'est son propre profil) */}
              {isOwnProfile && (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile/edit"
                    className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center gap-2 whitespace-nowrap"
                  >
                    <Edit size={14} />
                    Modifier profil
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] flex items-center gap-2 whitespace-nowrap"
                  >
                    <Settings size={14} />
                    Paramètres
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <SectionSeparator />

        {/* Section Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-12"
        >
          <div className="mb-8">
            <div className="inline-block bg-[#8B0000] px-4 py-2 mb-4">
              <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
                <Award size={14} className="inline mr-2" />
                BADGES & RÉCOMPENSES
              </span>
            </div>
            <h2 
              className="text-3xl lg:text-5xl font-black text-[#FFFFFF] uppercase"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText>ACCOMPLISSEMENTS</GlitchText>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockUserData.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6 text-center hover:border-[#8B0000] transition-all duration-300 cursor-none group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>
                <div className="font-mono text-xs text-[#E0E0E0] uppercase">{badge.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <SectionSeparator />

        {/* Section Albums favoris */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-12"
        >
          <div className="mb-8">
            <div className="inline-block bg-[#8B0000] px-4 py-2 mb-4">
              <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
                <Heart size={14} className="inline mr-2" />
                TOP ALBUMS
              </span>
            </div>
            <h2 
              className="text-3xl lg:text-5xl font-black text-[#FFFFFF] uppercase"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText>ALBUMS FAVORIS</GlitchText>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockUserData.favoriteAlbums.map((album, index) => (
              <div
                key={index}
                className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6 hover:border-[#8B0000] transition-all duration-300 cursor-none group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#FFFFFF] uppercase mb-1 group-hover:text-[#8B0000] transition-colors">
                      {album.title}
                    </h3>
                    <p className="font-mono text-sm text-[#a8a8a8]">{album.year}</p>
                  </div>
                  <Heart className="text-[#8B0000]" size={24} fill="#8B0000" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <SectionSeparator />

        {/* Section Activité récente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-12"
        >
          <div className="mb-8">
            <div className="inline-block bg-[#8B0000] px-4 py-2 mb-4">
              <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
                <MessageSquare size={14} className="inline mr-2" />
                DERNIÈRES ACTIONS
              </span>
            </div>
            <h2 
              className="text-3xl lg:text-5xl font-black text-[#FFFFFF] uppercase"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText>ACTIVITÉ RÉCENTE</GlitchText>
            </h2>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-[#0A0A0A] border-l-4 border-[#8B0000] p-6 hover:bg-[#8B0000]/5 transition-all duration-300 cursor-none relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {activity.type === 'post' && <MessageSquare size={16} className="text-[#8B0000]" />}
                      {activity.type === 'comment' && <MessageSquare size={16} className="text-[#8B0000]" />}
                      {activity.type === 'like' && <Heart size={16} className="text-[#8B0000]" />}
                      <span className="font-mono text-xs text-[#8B0000] uppercase">{activity.type}</span>
                    </div>
                    <p className="text-[#E0E0E0] leading-relaxed mb-3">{activity.content}</p>
                    {activity.linkTo && activity.articleTitle && (
                      <Link
                        to={activity.linkTo}
                        className="text-[#8B0000] hover:text-[#FFFFFF] font-black text-sm uppercase transition-colors duration-300 cursor-none"
                      >
                        → {activity.articleTitle}
                      </Link>
                    )}
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#a8a8a8] whitespace-nowrap">{activity.date}</span>
                    
                    {/* Boutons de suppression */}
                    {isOwnProfile && (
                      <div className="flex items-center gap-2">
                        {deletingActivityId === activity.id ? (
                          <>
                            <button
                              onClick={() => confirmDeleteActivity(activity.id)}
                              className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-3 py-1 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF]"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={cancelDeleteActivity}
                              className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-xs uppercase tracking-wider px-3 py-1 transition-all duration-300 cursor-none border-2 border-[#8B0000]"
                            >
                              Annuler
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleDeleteActivity(activity.id)}
                            className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] p-2 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF]"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bouton voir plus */}
          <div className="text-center mt-8">
            <Link
              to="/profile/activity"
              className="inline-block bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF]"
            >
              VOIR TOUTE L'ACTIVITÉ
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}