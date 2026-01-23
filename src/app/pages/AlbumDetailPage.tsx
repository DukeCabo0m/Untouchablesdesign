import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { CommentSection } from '@/app/components/CommentSection';
import { ArrowLeft, Play, Clock, Disc, Award, Heart, Users, Film, Disc3 } from 'lucide-react';
import { getAlbumBySlug } from '@/app/data/albums';
import { useState, useEffect } from 'react';

export function AlbumDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const album = slug ? getAlbumBySlug(slug) : undefined;

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('korn-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('korn-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = () => {
    if (!album) return;
    setFavorites(prev => 
      prev.includes(album.id) 
        ? prev.filter(id => id !== album.id)
        : [...prev, album.id]
    );
  };

  // Mock favorite count (simule des favoris d'autres utilisateurs)
  const getFavoriteCount = (albumId: number) => {
    // Nombres de base différents pour chaque album
    const baseCounts: { [key: number]: number } = {
      1: 2847,  // Korn (1994)
      2: 3521,  // Life Is Peachy
      3: 5892,  // Follow the Leader
      4: 4231,  // Issues
      5: 6845,  // Untouchables - le plus populaire
      6: 3198,  // Take a Look in the Mirror
      7: 2564,  // See You on the Other Side
      8: 1876,  // Untitled Album
      9: 2103,  // Korn III
      10: 1645, // The Path of Totality
      11: 1398, // The Paradigm Shift
      12: 1721, // The Serenity of Suffering
      13: 1534, // The Nothing
      14: 1289, // Requiem
    };
    
    const baseCount = baseCounts[albumId] || 1000;
    // Ajoute 1 si l'utilisateur actuel l'a en favori
    return baseCount + (favorites.includes(albumId) ? 1 : 0);
  };

  // Mock comments data for albums
  const albumComments = [
    {
      id: 1,
      user: 'KornArmy666',
      avatar: 'https://i.pravatar.cc/150?img=33',
      date: '2026-01-15',
      text: 'Un chef-d\'œuvre absolu ! Cet album a changé ma vie. Chaque morceau est un uppercut émotionnel.'
    },
    {
      id: 2,
      user: 'NuMetalKing',
      avatar: 'https://i.pravatar.cc/150?img=25',
      date: '2026-01-10',
      text: 'La production est incroyable, les riffs sont lourds et brutaux. Korn au sommet de leur art !'
    },
    {
      id: 3,
      user: 'MetalFan92',
      avatar: 'https://i.pravatar.cc/150?img=12',
      date: '2026-01-05',
      text: 'Je ne me lasse jamais de cet album. Après toutes ces années, il reste aussi percutant qu\'au premier jour.'
    },
    {
      id: 4,
      user: 'JonathanD_Fan',
      avatar: 'https://i.pravatar.cc/150?img=45',
      date: '2025-12-28',
      text: 'Les paroles sont sombres et profondes. Jonathan Davis livre ici une performance vocale exceptionnelle.'
    }
  ];

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#E0E0E0] mb-4">ALBUM NON TROUVÉ</h1>
          <Link to="/discography" className="text-[#8B0000] font-mono text-sm hover:underline">
            &lt;&lt; RETOUR À LA DISCOGRAPHIE
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(album.id);
  const favoriteCount = getFavoriteCount(album.id);

  // Calculate total duration
  const totalMinutes = album.tracks.reduce((acc, track) => {
    const [min, sec] = track.duration.split(':').map(Number);
    return acc + min + (sec / 60);
  }, 0);
  const totalDuration = `${Math.floor(totalMinutes)}:${String(Math.round((totalMinutes % 1) * 60)).padStart(2, '0')}`;

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/discography/studio" 
          className="inline-flex items-center gap-2 text-[#8B0000] font-mono text-xs uppercase mb-12 hover:text-[#E0E0E0] transition-colors cursor-none"
        >
          <ArrowLeft size={16} />
          RETOUR À LA DISCOGRAPHIE
        </Link>

        {/* Album Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Album Cover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="relative overflow-hidden border-4 border-[#8B0000] aspect-square mb-8">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-full object-cover"
                style={{
                  filter: 'contrast(1.5) brightness(0.7) grayscale(0.9)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                }}
              />
            </div>

            {/* Certifications & Sales */}
            {(album.certifications || album.salesInfo) && (
              <div className="mb-8 p-6 bg-[#8B0000]/10 border-l-4 border-[#8B0000]">
                {album.certifications && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={16} className="text-[#8B0000]" />
                      <span className="font-mono text-xs text-[#8B0000] uppercase">Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {album.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="font-mono text-xs text-[#E0E0E0] bg-[#0A0A0A] border border-[#8B0000] px-3 py-1"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {album.salesInfo && (
                  <div className="font-mono text-xs text-[#E0E0E0]">
                    <span className="text-[#8B0000]">VENTES : </span>
                    {album.salesInfo}
                  </div>
                )}
              </div>
            )}

            {/* Favorite Button & Counter */}
            <div className="p-6 bg-[#0A0A0A] border-2 border-[#8B0000]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Users size={24} className="text-[#8B0000]" />
                  <div>
                    <div className="font-mono text-xs text-[#8B0000] uppercase mb-1">
                      FAVORIS COMMUNAUTÉ
                    </div>
                    <div className="font-black text-3xl text-[#E0E0E0]">
                      {favoriteCount.toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={toggleFavorite}
                  className={`
                    flex items-center justify-center gap-3 px-6 py-3 border-2 transition-all font-black text-sm uppercase tracking-wider cursor-none w-full
                    ${isFavorite 
                      ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]' 
                      : 'bg-transparent border-[#E0E0E0]/30 text-[#E0E0E0] hover:border-[#8B0000] hover:text-[#8B0000]'
                    }
                  `}
                >
                  <Heart 
                    size={20} 
                    className={isFavorite ? 'fill-[#E0E0E0]' : ''}
                  />
                  {isFavorite ? 'EN FAVORIS' : 'AJOUTER AUX FAVORIS'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Album Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:col-span-2"
          >
            <div className="mb-6">
              <div className="inline-block bg-[#8B0000] px-4 py-2 mb-4">
                <span className="font-black text-2xl text-[#E0E0E0]">{album.year}</span>
              </div>
              <h1
                className="text-6xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-6"
                style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
              >
                <GlitchText glitchIntensity="high">{album.title}</GlitchText>
              </h1>
            </div>

            <div className="space-y-4 font-mono text-sm text-[#E0E0E0] mb-8">
              {album.producer && (
                <div className="flex items-start gap-4">
                  <span className="text-[#8B0000] uppercase min-w-[120px]">Producteur :</span>
                  <span>{album.producer}</span>
                </div>
              )}
              {album.label && (
                <div className="flex items-start gap-4">
                  <span className="text-[#8B0000] uppercase min-w-[120px]">Label :</span>
                  <span>{album.label}</span>
                </div>
              )}
              <div className="flex items-start gap-4">
                <span className="text-[#8B0000] uppercase min-w-[120px]">Type :</span>
                <span className="uppercase">
                  {album.type === 'studio' ? 'ALBUM STUDIO' : 
                   album.type === 'live' ? 'ALBUM LIVE' : 
                   album.type === 'compilation' ? 'COMPILATION' : 'SINGLE/EP'}
                </span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#8B0000] uppercase min-w-[120px]">Pistes :</span>
                <span>{album.tracks.length} TRACKS</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-8 border-t border-[#E0E0E0]/20">
              <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-4">
                {album.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tracklist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2
            className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span> TRACKLIST
          </h2>
          
          <div className="space-y-1.5">
            {album.tracks.map((track, index) => (
              <motion.div
                key={track.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.03 }}
                className="border border-[#E0E0E0]/20 hover:border-[#8B0000] p-3 transition-all duration-300 cursor-none group bg-[#0A0A0A]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-black text-xl text-[#E0E0E0]/40 group-hover:text-[#8B0000] transition-colors min-w-[32px]">
                      {String(track.number).padStart(2, '0')}
                    </span>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link 
                          to={`/discography/${album.slug}/track/${track.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          className="hover:underline"
                        >
                          <h3 className="text-base font-black text-[#E0E0E0] group-hover:text-[#8B0000] uppercase tracking-tight transition-colors">
                            {track.title}
                          </h3>
                        </Link>
                        
                        {/* Badge SINGLE avec lien */}
                        {track.isSingle && track.singleSlug && (
                          <Link
                            to={`/discography/single/${track.singleSlug}`}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#8B0000] text-[#E0E0E0] hover:bg-[#E0E0E0] hover:text-[#8B0000] font-mono text-[9px] uppercase font-black tracking-wider transition-colors border border-[#8B0000]"
                          >
                            <Disc3 size={9} />
                            SINGLE
                          </Link>
                        )}
                        
                        {/* Badge VIDÉOCLIP */}
                        {track.hasVideoClip && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#E0E0E0]/10 border border-[#E0E0E0]/30 text-[#E0E0E0] font-mono text-[9px] uppercase font-black tracking-wider">
                            <Film size={9} />
                            CLIP
                          </span>
                        )}
                      </div>
                      
                      {track.notes && (
                        <p className="text-[10px] font-mono text-[#E0E0E0]/50 mt-0.5">
                          {track.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Streaming Icons */}
                    {track.streamingLinks && (
                      <div className="flex items-center gap-1.5">
                        {track.streamingLinks.spotify && (
                          <a
                            href={track.streamingLinks.spotify}
                            className="p-1 bg-[#1DB954]/10 border border-[#1DB954]/30 hover:bg-[#1DB954]/30 transition-colors cursor-none"
                            title="Écouter sur Spotify"
                          >
                            <svg className="w-3.5 h-3.5 fill-[#1DB954]" viewBox="0 0 24 24">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                          </a>
                        )}
                        
                        {track.streamingLinks.appleMusic && (
                          <a
                            href={track.streamingLinks.appleMusic}
                            className="p-1 bg-[#FA243C]/10 border border-[#FA243C]/30 hover:bg-[#FA243C]/30 transition-colors cursor-none"
                            title="Écouter sur Apple Music"
                          >
                            <svg className="w-3.5 h-3.5 fill-[#FA243C]" viewBox="0 0 24 24">
                              <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.047 5.047 0 0 0 1.88-2.208c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536-.142-.773.227-1.624 1.038-2.022.323-.16.67-.25 1.018-.324.378-.08.76-.132 1.143-.185.27-.037.54-.058.807-.12.557-.128.934-.49.944-1.068.012-.675 0-1.35 0-2.027 0-.215-.054-.278-.267-.315-.498-.086-1.002-.14-1.502-.213-1.218-.177-2.435-.36-3.653-.533-.35-.05-.697-.11-1.046-.168-.092-.015-.13.018-.13.11-.002.683 0 1.365-.002 2.048l-.006 2.048c0 .392-.024.788-.17 1.16-.24.613-.69 1.035-1.315 1.25-.47.163-.96.2-1.45.165-.282-.02-.558-.085-.836-.132-.958-.164-1.594-.85-1.74-1.794-.18-1.167.486-2.288 1.612-2.696.4-.146.818-.23 1.238-.28.603-.07 1.208-.125 1.814-.175.115-.01.135-.04.135-.15-.002-1.633-.002-3.266-.002-4.898 0-.5.022-.518.52-.447 1.112.16 2.227.316 3.34.478.776.114 1.553.228 2.328.346.268.04.535.09.8.144.41.082.545.26.545.677.002 1.616 0 3.23 0 4.846z"/>
                            </svg>
                          </a>
                        )}
                        
                        {track.streamingLinks.youtube && (
                          <a
                            href={track.streamingLinks.youtube}
                            className="p-1 bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000]/30 transition-colors cursor-none"
                            title="Écouter sur YouTube Music"
                          >
                            <svg className="w-3.5 h-3.5 fill-[#FF0000]" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                    
                    {/* Duration */}
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#E0E0E0]/60 min-w-[60px]">
                      <Clock size={12} />
                      <span>{track.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between p-6 border-2 border-[#8B0000] bg-[#8B0000]/5">
            <div className="flex items-center gap-2 font-mono text-sm text-[#E0E0E0]">
              <Disc size={18} className="text-[#8B0000]" />
              <span className="uppercase">Durée totale</span>
            </div>
            <span className="font-black text-xl text-[#8B0000]">{totalDuration}</span>
          </div>
        </motion.div>

        {/* Comment Section */}
        <CommentSection comments={albumComments} />
      </div>
    </div>
  );
}