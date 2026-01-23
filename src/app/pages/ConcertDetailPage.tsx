import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Music, Image, Video, UserCheck, Upload, MessageSquare, ArrowLeft, Users } from 'lucide-react';
import { useState } from 'react';

// Données mock détaillées pour un concert
const concertDetails = {
  '2023-06-17': {
    date: '2023-06-17',
    venue: 'Hellfest',
    city: 'Clisson',
    country: 'France',
    attendance: '60,000+',
    support: 'Gojira, Mastodon',
    attendees: 247,
    setlist: [
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
    ],
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', user: 'MetalFan92' },
      { id: 2, url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', user: 'KornArmy666' },
      { id: 3, url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800', user: 'JonathanD_Fan' },
      { id: 4, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', user: 'LiveMetal' }
    ],
    videos: [
      { id: 1, title: 'Blind - Live @ Hellfest 2023', thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800', user: 'ConcertArchive' },
      { id: 2, title: 'Freak on a Leash - Epic Crowd', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', user: 'MetalHead_FR' }
    ],
    comments: [
      {
        id: 1,
        user: 'MetalFan92',
        avatar: 'https://i.pravatar.cc/150?img=12',
        date: '2023-06-18',
        text: 'Concert absolument dingue ! L\'ambiance était électrique du début à la fin. Jonathan Davis en pleine forme !'
      },
      {
        id: 2,
        user: 'KornArmy666',
        avatar: 'https://i.pravatar.cc/150?img=33',
        date: '2023-06-19',
        text: 'Meilleure setlist de la tournée. Le medley avec Another Brick in the Wall était inattendu et génial.'
      },
      {
        id: 3,
        user: 'JonathanD_Fan',
        avatar: 'https://i.pravatar.cc/150?img=45',
        date: '2023-06-20',
        text: 'Mon 7ème concert de Korn, et toujours cette même énergie. La scène du Hellfest leur va si bien !'
      }
    ]
  }
};

export function ConcertDetailPage() {
  const { concertId } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Pour l'exemple, on utilise toujours le concert du 2023-06-17
  const concert = concertDetails['2023-06-17'];

  if (!concert) {
    return (
      <div className="min-h-screen py-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#FFFFFF] uppercase mb-4">Concert non trouvé</h1>
          <Link to="/tour" className="text-[#8B0000] underline">Retour à la tournée</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link 
          to="/tour"
          className="inline-flex items-center gap-2 text-[#8B0000] hover:text-[#FFFFFF] transition-colors mb-8 cursor-none"
        >
          <ArrowLeft size={20} />
          <span className="font-mono text-sm uppercase">Retour aux concerts</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              CONCERT ARCHIVE
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-6 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">{concert.venue}</GlitchText>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#a8a8a8] font-mono text-lg mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="text-[#8B0000]" size={20} />
              <span>
                {new Date(concert.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-[#8B0000]" size={20} />
              <span>{concert.city}, {concert.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-[#8B0000]" size={20} />
              <span>{concert.attendance} spectateurs</span>
            </div>
          </div>

          {concert.support && (
            <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4">
              <span className="font-mono text-sm text-[#8B0000] uppercase">Premières parties : </span>
              <span className="font-mono text-sm text-[#E0E0E0]">{concert.support}</span>
            </div>
          )}

          {/* J'y étais button & stats */}
          <div className="mt-8 flex items-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-none border-2 bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] hover:bg-transparent hover:border-[#FFFFFF]">
              <UserCheck size={16} />
              J'Y ÉTAIS
            </button>
            <span className="font-mono text-sm text-[#8B0000]">{concert.attendees} fans y étaient</span>
          </div>
        </motion.div>

        {/* Setlist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <Music className="text-[#8B0000]" size={32} />
            <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
              SETLIST
            </h2>
          </div>

          <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
            <ol className="space-y-3">
              {concert.setlist.map((song, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 ${
                    song.startsWith('Encore:')
                      ? 'text-[#8B0000] font-black text-lg uppercase mt-6'
                      : 'text-[#E0E0E0]'
                  }`}
                >
                  {!song.startsWith('Encore:') && (
                    <span className="font-mono text-sm text-[#8B0000] min-w-[30px]">
                      {index < concert.setlist.indexOf('Encore:') ? index + 1 : index}
                    </span>
                  )}
                  <span className={song.startsWith('Encore:') ? '' : 'font-bold text-lg'}>
                    {song}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* Photos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Image className="text-[#8B0000]" size={32} />
              <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
                PHOTOS
              </h2>
              <span className="font-mono text-sm text-[#8B0000]">({concert.photos.length})</span>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-none border-2 bg-transparent text-[#E0E0E0] border-[#E0E0E0]/30 hover:bg-[#E0E0E0] hover:text-[#0A0A0A]"
            >
              <Upload size={14} />
              AJOUTER
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concert.photos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all">
                <img
                  src={photo.url}
                  alt={`Photo du concert`}
                  className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent p-4">
                  <p className="font-mono text-xs text-[#E0E0E0]">Par : {photo.user}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Vidéos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Video className="text-[#8B0000]" size={32} />
              <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
                VIDÉOS
              </h2>
              <span className="font-mono text-sm text-[#8B0000]">({concert.videos.length})</span>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-none border-2 bg-transparent text-[#E0E0E0] border-[#E0E0E0]/30 hover:bg-[#E0E0E0] hover:text-[#0A0A0A]"
            >
              <Upload size={14} />
              AJOUTER
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concert.videos.map((video) => (
              <div key={video.id} className="group relative overflow-hidden border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all cursor-none">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#8B0000] border-2 border-[#FFFFFF] flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#FFFFFF] border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0A0A0A] p-4 border-t-2 border-[#8B0000]/30">
                  <h3 className="font-bold text-[#E0E0E0] mb-1">{video.title}</h3>
                  <p className="font-mono text-xs text-[#8B0000]">Par : {video.user}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Commentaires */}
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
              <span className="font-mono text-sm text-[#8B0000]">({concert.comments.length})</span>
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
            {concert.comments.map((comment) => (
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

        {/* Modal Upload */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-[#0A0A0A]/95 flex items-center justify-center z-50 p-4">
            <div className="bg-[#0A0A0A] border-4 border-[#8B0000] max-w-2xl w-full p-8">
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase mb-6">
                AJOUTER DU CONTENU
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-sm text-[#8B0000] uppercase mb-2">
                    Type de contenu
                  </label>
                  <select className="w-full bg-[#0A0A0A] border-2 border-[#8B0000]/30 text-[#E0E0E0] font-mono text-sm p-3 focus:outline-none focus:border-[#8B0000]">
                    <option>Photo</option>
                    <option>Vidéo</option>
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
      </div>
    </div>
  );
}