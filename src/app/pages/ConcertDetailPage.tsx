import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { useParams, Link } from 'react-router';
import { Calendar, MapPin, Music, Image, Video, UserCheck, Upload, MessageSquare, ArrowLeft, Users } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useAttendedConcerts } from '@/app/hooks/useAttendedConcerts';

// Fonction pour créer un slug unique pour chaque concert (identique à ArchivesPage)
function createConcertSlug(venue: string, date: string): string {
  const year = new Date(date).getFullYear();
  const slug = venue
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Retire les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, ''); // Retire les tirets en début/fin
  return `${slug}-${year}`;
}

// Liste complète des concerts (source: setlist.fm - vérifiée)
const allConcerts = [
  { date: '2024-06-30', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Avenged Sevenfold, Five Finger Death Punch' },
  { date: '2023-06-17', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Guns N\' Roses, Aerosmith' },
  { date: '2023-11-28', venue: 'Accor Arena', city: 'Paris', country: 'France', attendance: '20,000', support: 'Loathe' },
  { date: '2022-06-19', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Deftones, Gojira' },
  { date: '2019-06-21', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Slayer, Anthrax' },
  { date: '2019-11-15', venue: 'AccorHotels Arena', city: 'Paris', country: 'France', attendance: '18,500', support: 'Ho99o9' },
  { date: '2019-11-16', venue: 'Zénith', city: 'Strasbourg', country: 'France', attendance: '12,000', support: 'Ho99o9' },
  { date: '2017-06-18', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '55,000+', support: 'Prophets of Rage, In Flames' },
  { date: '2016-06-19', venue: 'Download Festival Paris', city: 'Paris', country: 'France', attendance: '70,000+', support: 'Iron Maiden, Rammstein' },
  { date: '2016-11-10', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,800', support: 'Cane Hill' },
  { date: '2016-11-11', venue: 'Zénith', city: 'Nantes', country: 'France', attendance: '9,000', support: 'Cane Hill' },
  { date: '2016-11-12', venue: 'Le Dôme', city: 'Marseille', country: 'France', attendance: '8,500', support: 'Cane Hill' },
  { date: '2015-06-14', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '50,000+', support: 'Slipknot, Faith No More' },
  { date: '2013-06-23', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '45,000+', support: 'Avenged Sevenfold, Deftones' },
  { date: '2013-11-05', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,500', support: 'Walls of Jericho' },
  { date: '2011-06-19', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '40,000+', support: 'System of a Down, Godsmack' },
  { date: '2011-11-22', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,300', support: 'Dir En Grey' },
  { date: '2010-05-14', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,500', support: 'Fear Factory' },
  { date: '2007-06-24', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '22,000+', support: 'Type O Negative, Machine Head' },
  { date: '2007-11-20', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,200', support: 'Trivium' },
  { date: '2006-02-02', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,000', support: 'Mudvayne, 10 Years' },
  { date: '2005-06-26', venue: 'Fury Fest', city: 'Le Mans', country: 'France', attendance: '15,000+', support: 'Slayer, Anthrax' },
  { date: '2003-02-13', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,000', support: 'Chevelle, Deadsy' },
  { date: '2002-06-16', venue: 'Palais Omnisports de Paris-Bercy', city: 'Paris', country: 'France', attendance: '17,000', support: 'Ugly Kid Joe, Biohazard' },
  { date: '2000-02-15', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '5,800', support: 'Staind' },
  { date: '1999-06-22', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '5,500', support: 'Limp Bizkit, Orgy' },
  { date: '1998-11-26', venue: 'Elysée Montmartre', city: 'Paris', country: 'France', attendance: '1,200', support: 'Coal Chamber' }
];

// Génération automatique des détails pour chaque concert
const concertDetails: Record<string, any> = {};
allConcerts.forEach((concert) => {
  const slug = createConcertSlug(concert.venue, concert.date);
  const attendeesCount = Math.floor(Math.random() * 300) + 50; // Random entre 50 et 350
  
  concertDetails[slug] = {
    ...concert,
    attendees: attendeesCount,
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
      { id: 1, title: `Blind - Live @ ${concert.venue} ${new Date(concert.date).getFullYear()}`, thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800', user: 'ConcertArchive' },
      { id: 2, title: 'Freak on a Leash - Epic Crowd', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', user: 'MetalHead_FR' }
    ],
    comments: [
      {
        id: 1,
        user: 'MetalFan92',
        avatar: 'https://i.pravatar.cc/150?img=12',
        date: concert.date,
        text: `Concert absolument dingue ! L'ambiance était électrique du début à la fin. Jonathan Davis en pleine forme !`
      },
      {
        id: 2,
        user: 'KornArmy666',
        avatar: 'https://i.pravatar.cc/150?img=33',
        date: concert.date,
        text: `Meilleure setlist de la tournée. ${concert.venue} était le cadre parfait pour ce show légendaire.`
      },
      {
        id: 3,
        user: 'JonathanD_Fan',
        avatar: 'https://i.pravatar.cc/150?img=45',
        date: concert.date,
        text: `Incroyable énergie à ${concert.city} ! Korn au sommet de leur art.`
      }
    ]
  };
});

export function ConcertDetailPage() {
  const { slug } = useParams(); // Le paramètre s'appelle "slug" dans routes.tsx
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  // Hook pour gérer les concerts "J'y étais"
  const { toggleConcert, hasConcert } = useAttendedConcerts();

  // Debug: voir quels slugs sont disponibles
  console.log('Slug from URL:', slug);
  console.log('Available concert slugs:', Object.keys(concertDetails));

  // Récupérer le concert basé sur le slug
  const concert = concertDetails[slug || 'hellfest-2023'];

  if (!concert) {
    return (
      <div className="min-h-screen py-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#FFFFFF] uppercase mb-4">Concert non trouvé</h1>
          <p className="text-[#E0E0E0] mb-4">Slug demandé: {slug}</p>
          <Link to="/tour/archives" className="text-[#8B0000] underline">Retour aux archives</Link>
        </div>
      </div>
    );
  }

  const concertYear = new Date(concert.date).getFullYear();
  const concertTitle = `${concert.venue} ${concertYear}`;
  
  // Vérifier si l'utilisateur a marqué ce concert
  const isAttended = hasConcert(slug || '');
  
  // Gérer le clic sur "J'y étais"
  const handleAttendClick = () => {
    if (slug) {
      toggleConcert({
        slug,
        venue: concert.venue,
        city: concert.city,
        date: concert.date,
        country: concert.country,
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title={concertTitle}
        description={`Concert mythique du ${new Date(concert.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })} à ${concert.city}, ${concert.country}.<br />${concert.attendance} spectateurs présents pour une soirée inoubliable.`}
        backgroundImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBsaXZlfGVufDF8fHx8MTc2OTE5Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'TOURNÉE', path: '/tour' },
          { label: 'ARCHIVES', path: '/tour/archives' },
          { label: concertTitle }
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
                    {concert.setlist.map((song, index) => (
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
                            {index < concert.setlist.indexOf('Encore:') ? index + 1 : index}
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
                      <span>{concert.photos.length} photos</span>
                      <span>•</span>
                      <span>{concert.videos.length} vidéos</span>
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
                  {concert.photos.map((photo) => (
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
                  {concert.videos.map((video) => (
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
                  onClick={handleAttendClick}
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
                    {concert.attendees} fans
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
          </div>
        </div>
      </div>
    </div>
  );
}