import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { useParams, Link } from 'react-router';
import { Calendar, MapPin, Music, Image, Video, UserCheck, Upload, MessageSquare, ArrowLeft, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAttendedConcerts } from '@/app/hooks/useAttendedConcerts';
import { concertsApi, commentsApi } from '@/app/utils/api';

export function ConcertDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [concert, setConcert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const { attendedConcerts, toggleAttendance } = useAttendedConcerts();

  // Load concert from backend
  useEffect(() => {
    async function loadConcert() {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log('[ConcertDetailPage] Loading concert:', slug);
        
        // Get all concerts and find by slug
        const concerts = await concertsApi.getAll();
        const foundConcert = concerts.find((c: any) => {
          // Generate slug from concert data
          const concertSlug = `${c.city.toLowerCase().replace(/\s+/g, '-')}-${new Date(c.date).getFullYear()}`;
          return concertSlug === slug || c.slug === slug;
        });
        
        if (!foundConcert) {
          setError('Concert non trouvé');
          setIsLoading(false);
          return;
        }
        
        console.log('[ConcertDetailPage] Found concert:', foundConcert);
        
        // Load comments from backend
        try {
          const concertComments = await commentsApi.getByEntity('concert', foundConcert.id);
          setComments(concertComments);
          setCommentCount(concertComments.length);
          console.log('[ConcertDetailPage] Loaded comments:', concertComments.length);
        } catch (err) {
          console.error('[ConcertDetailPage] Failed to load comments:', err);
          setComments([]);
          setCommentCount(0);
        }
        
        setConcert(foundConcert);
        setError(null);
      } catch (err) {
        console.error('[ConcertDetailPage] Failed to load concert:', err);
        setError('Impossible de charger le concert');
      } finally {
        setIsLoading(false);
      }
    }
    loadConcert();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="font-mono text-[#8B0000] text-lg animate-pulse">
          Chargement du concert...
        </div>
      </div>
    );
  }

  if (error || !concert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#E0E0E0] mb-4">CONCERT NON TROUVÉ</h1>
          <Link to="/tour/archives" className="text-[#8B0000] font-mono text-sm hover:underline">
            &lt;&lt; RETOUR AUX ARCHIVES
          </Link>
        </div>
      </div>
    );
  }

  const concertSlug = `${concert.city.toLowerCase().replace(/\s+/g, '-')}-${new Date(concert.date).getFullYear()}`;
  const isAttended = attendedConcerts.includes(concertSlug);
  const attendeesCount = Math.floor(Math.random() * 300) + 50; // Mock count for now

  // Mock data for setlist, photos, videos
  const setlist = concert.setlist || [
    'Here to Stay',
    'Rotting in Vain',
    'Blind',
    'Coming Undone',
    'Got the Life',
    'Shoots and Ladders',
    'Make Me Bad',
    'You\'ll Never Find Me',
    'Somebody Someone',
    'Twisted Transistor',
    'Falling Away from Me',
    'Freak on a Leash',
    'A.D.I.D.A.S.',
    'Encore:',
    'Another Brick in the Wall',
    'Oildale (Leave Me Alone)'
  ];

  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', user: 'MetalFan92' },
    { id: 2, url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800', user: 'KornArmy666' },
    { id: 3, url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800', user: 'NuMetalKing' },
  ];

  const videos = [
    { id: 1, title: 'Blind - Live', thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', user: 'LiveMetal' },
    { id: 2, title: 'Freak on a Leash - Live', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', user: 'ConcertVids' },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title={concert.title}
        description={`Concert mythique du ${new Date(concert.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })} à ${concert.city}, ${concert.country}.<br />${concert.attendance} spectateurs présents pour une soirée inoubliable.`}
        backgroundImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBsaXZlfGVufDF8fHx8MTc2OTE5Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'TOURNÉE', path: '/tour' },
          { label: 'ARCHIVES', path: '/tour/archives' },
          { label: concert.title }
        ]}
        glitchIntensity="high"
      />

      <div className="py-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Layout principal : 2 colonnes (1/3 + 2/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* COLONNE GAUCHE (1/3) : Infos + Bouton + Setlist */}
            <div className="lg:col-span-1 space-y-8">
              {/* Concert Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <Calendar className="text-[#8B0000]" size={28} />
                  <h2 className="text-2xl font-black text-[#FFFFFF] uppercase tracking-tight">
                    INFORMATIONS
                  </h2>
                </div>

                <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6 h-full flex flex-col">
                  <div className="space-y-4 text-[#E0E0E0] font-mono text-sm flex-grow">
                    <div className="flex items-start gap-2">
                      <Calendar className="text-[#8B0000] flex-shrink-0 mt-1" size={18} />
                      <span>
                        {new Date(concert.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="text-[#8B0000] flex-shrink-0 mt-1" size={18} />
                      <span>{concert.city}, {concert.country}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="text-[#8B0000] flex-shrink-0 mt-1" size={18} />
                      <span>{concert.attendance} spectateurs</span>
                    </div>
                  </div>

                  {concert.support && (
                    <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4 mt-6">
                      <span className="font-mono text-xs text-[#8B0000] uppercase block mb-2">Premières parties :</span>
                      <span className="font-mono text-sm text-[#E0E0E0]">{concert.support}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Setlist */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <Music className="text-[#8B0000]" size={28} />
                  <h2 className="text-2xl font-black text-[#FFFFFF] uppercase tracking-tight">
                    SETLIST
                  </h2>
                </div>

                <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6">
                  <ol className="space-y-2">
                    {setlist.map((song, index) => (
                      <li
                        key={index}
                        className={`flex items-center gap-3 ${
                          song.startsWith('Encore:')
                            ? 'text-[#8B0000] font-black text-base uppercase mt-4'
                            : 'text-[#E0E0E0]'
                        }`}
                      >
                        {!song.startsWith('Encore:') && (
                          <span className="font-mono text-xs text-[#8B0000] min-w-[24px]">
                            {index < setlist.indexOf('Encore:') ? index + 1 : index}
                          </span>
                        )}
                        <span className={song.startsWith('Encore:') ? '' : 'font-bold text-base'}>
                          {song}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.section>
            </div>

            {/* COLONNE DROITE (2/3) : Galerie Photos + Vidéos */}
            <div className="lg:col-span-2">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Image className="text-[#8B0000]" size={28} />
                      <h2 className="text-2xl font-black text-[#FFFFFF] uppercase tracking-tight">
                        PHOTOS & VIDÉOS
                      </h2>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-xs text-[#8B0000]">
                      <span>{photos.length} photos</span>
                      <span>•</span>
                      <span>{videos.length} vidéos</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-none border-2 bg-transparent text-[#E0E0E0] border-[#E0E0E0]/30 hover:bg-[#E0E0E0] hover:text-[#0A0A0A]"
                  >
                    <Upload size={14} />
                    AJOUTER
                  </button>
                </div>

                {/* Galerie mixte Photos + Vidéos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Photos */}
                  {photos.map((photo) => (
                    <div key={`photo-${photo.id}`} className="group relative overflow-hidden border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all">
                      <div className="aspect-video relative">
                        <img
                          src={photo.url}
                          alt={`Photo du concert`}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-[#8B0000] px-2 py-1 font-mono text-xs text-[#FFFFFF] uppercase">
                          Photo
                        </div>
                      </div>
                      <div className="bg-[#0A0A0A] p-3 border-t-2 border-[#8B0000]/30">
                        <p className="font-mono text-xs text-[#E0E0E0]">Par : {photo.user}</p>
                      </div>
                    </div>
                  ))}

                  {/* Vidéos */}
                  {videos.map((video) => (
                    <div key={`video-${video.id}`} className="group relative overflow-hidden border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all cursor-none">
                      <div className="aspect-video relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-[#8B0000] px-2 py-1 font-mono text-xs text-[#FFFFFF] uppercase">
                          Vidéo
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#8B0000]/90 border-2 border-[#FFFFFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#FFFFFF] border-b-8 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0A0A0A] p-3 border-t-2 border-[#8B0000]/30">
                        <h3 className="font-bold text-sm text-[#E0E0E0] mb-1">{video.title}</h3>
                        <p className="font-mono text-xs text-[#8B0000]">Par : {video.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>

          {/* Modal Upload */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-[#0A0A0A]/95 flex items-center justify-center z-50 p-4">
              <div className="bg-[#0A0A0A] border-4 border-[#8B0000] max-w-2xl w-full p-8">
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase mb-6">
                  AJOUTER DU CONTENU
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="contentType" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                      Type de contenu
                    </label>
                    <select className="w-full bg-[#0A0A0A] border-2 border-[#8B0000]/30 text-[#E0E0E0] font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#8B0000]">
                      <option>Photo</option>
                      <option>Vidéo</option>
                      <option>Audio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-sm text-[#8B0000] uppercase mb-2">
                      Fichier
                    </label>
                    <div className="border-2 border-dashed border-[#8B0000]/30 p-8 text-center hover:border-[#8B0000] transition-colors cursor-none">
                      <Upload className="mx-auto mb-4 text-[#8B0000]" size={48} />
                      <p className="font-mono text-sm text-[#E0E0E0]">
                        Cliquez ou glissez votre fichier ici
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-sm text-[#8B0000] uppercase mb-2">
                      Description (optionnelle)
                    </label>
                    <textarea
                      placeholder="Ajoutez une description..."
                      className="w-full bg-[#0A0A0A] border-2 border-[#8B0000]/30 text-[#E0E0E0] font-mono text-sm p-4 min-h-[100px] focus:outline-none focus:border-[#8B0000] resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button className="flex-1 px-6 py-3 font-black text-sm uppercase bg-[#8B0000] text-[#FFFFFF] border-2 border-[#8B0000] hover:bg-transparent transition-all cursor-none">
                    ENVOYER
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 font-black text-sm uppercase bg-transparent text-[#E0E0E0] border-2 border-[#E0E0E0]/30 hover:border-[#E0E0E0] transition-all cursor-none"
                  >
                    ANNULER
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* J'y étais + Commentaires - Layout 1/3 + 2/3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* COLONNE GAUCHE (1/3) : J'y étais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#8B0000]/10 border-2 border-[#8B0000]/20 p-6 lg:sticky lg:top-8">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="text-[#8B0000]" size={28} />
                  <h3 className="text-xl font-black text-[#FFFFFF] uppercase tracking-wider">
                    VOUS Y ÉTIEZ ?
                  </h3>
                </div>
                
                <p className="text-[#E0E0E0] text-sm mb-6">
                  Partagez vos souvenirs de ce concert légendaire avec la communauté
                </p>
                
                <button
                  onClick={() => toggleAttendance(concertSlug)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-none border-2 mb-6 ${
                    isAttended
                      ? 'bg-transparent text-[#8B0000] border-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFFFFF]'
                      : 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] hover:bg-transparent hover:border-[#FFFFFF]'
                  }`}
                >
                  <UserCheck size={18} />
                  {isAttended ? 'PRÉSENCE CONFIRMÉE' : 'J\'Y ÉTAIS'}
                </button>
                
                <div className="pt-6 border-t-2 border-[#8B0000]/40 text-center">
                  <p className="font-mono text-lg font-black text-[#8B0000]">
                    {attendeesCount} fans
                  </p>
                  <p className="font-mono text-xs text-[#E0E0E0] uppercase mt-1">
                    ont confirmé leur présence
                  </p>
                </div>
              </div>
            </motion.div>

            {/* COLONNE DROITE (2/3) : Commentaires */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <MessageSquare className="text-[#8B0000]" size={28} />
                  <h2 className="text-2xl font-black text-[#FFFFFF] uppercase tracking-tight">
                    COMMENTAIRES
                  </h2>
                  <span className="font-mono text-sm text-[#8B0000]">({commentCount})</span>
                </div>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="inline-flex items-center gap-2 px-4 py-2 font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-none border-2 bg-transparent text-[#E0E0E0] border-[#E0E0E0]/30 hover:bg-[#E0E0E0] hover:text-[#0A0A0A]"
                >
                  <MessageSquare size={14} />
                  COMMENTER
                </button>
              </div>

              {/* Formulaire commentaire */}
              {showCommentForm && (
                <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-6 mb-6">
                  <h3 className="font-black text-[#FFFFFF] uppercase mb-4">Ajouter un commentaire</h3>
                  <textarea
                    placeholder="Partagez votre expérience de ce concert..."
                    className="w-full bg-[#0A0A0A] border border-[#8B0000]/30 text-[#E0E0E0] font-mono text-sm p-4 min-h-[120px] focus:outline-none focus:border-[#8B0000] resize-none"
                  />
                  <div className="flex gap-3 mt-4">
                    <button className="px-6 py-2 font-black text-xs uppercase bg-[#8B0000] text-[#FFFFFF] border-2 border-[#8B0000] hover:bg-transparent transition-all cursor-none">
                      PUBLIER
                    </button>
                    <button
                      onClick={() => setShowCommentForm(false)}
                      className="px-6 py-2 font-black text-xs uppercase bg-transparent text-[#E0E0E0] border-2 border-[#E0E0E0]/30 hover:border-[#E0E0E0] transition-all cursor-none"
                    >
                      ANNULER
                    </button>
                  </div>
                </div>
              )}

              {/* Liste des commentaires */}
              <div className="space-y-4">
                {comments.map((comment) => (
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
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}