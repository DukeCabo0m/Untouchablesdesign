import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { CommentSection } from '@/app/components/CommentSection';
import { ArrowLeft, Music, Languages, Lightbulb, ExternalLink, Clock } from 'lucide-react';
import { albums } from '@/app/data/albums';

export function TrackDetailPage() {
  const { albumSlug, trackSlug } = useParams<{ albumSlug: string; trackSlug: string }>();
  const [activeTab, setActiveTab] = useState<'lyrics' | 'translation' | 'meaning'>('lyrics');

  // Find album and track
  const album = albums.find(a => a.slug === albumSlug);
  const track = album?.tracks.find(t => 
    t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === trackSlug
  );

  // Mock comments data
  const trackComments = [
    {
      id: 1,
      user: 'KornFreak93',
      avatar: 'https://i.pravatar.cc/150?img=33',
      date: '2026-01-19',
      text: 'Ces paroles m\'ont toujours parlé. Merci pour la traduction et l\'analyse !'
    },
    {
      id: 2,
      user: 'MetalPoet',
      avatar: 'https://i.pravatar.cc/150?img=54',
      date: '2026-01-15',
      text: 'L\'interprétation sur le contexte personnel de Jonathan est fascinante. Ça donne une toute nouvelle profondeur au morceau.'
    }
  ];

  if (!album || !track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#E0E0E0] mb-4">TRACK NON TROUVÉ</h1>
          <Link to="/discography" className="text-[#8B0000] font-mono text-sm hover:underline">
            &lt;&lt; RETOUR À LA DISCOGRAPHIE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          to={`/discography/${albumSlug}`}
          className="inline-flex items-center gap-2 text-[#8B0000] font-mono text-xs uppercase mb-12 hover:text-[#E0E0E0] transition-colors cursor-none"
        >
          <ArrowLeft size={16} />
          RETOUR À L'ALBUM
        </Link>

        {/* Track Header */}
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

            {/* Album Info */}
            <div className="mb-8 p-6 bg-[#8B0000]/10 border-l-4 border-[#8B0000]">
              <div className="mb-3">
                <div className="font-mono text-xs text-[#8B0000] uppercase mb-1">Album</div>
                <div className="font-black text-xl text-[#E0E0E0] uppercase tracking-tight">
                  {album.title}
                </div>
              </div>
              <div className="space-y-2 font-mono text-xs text-[#E0E0E0]">
                <div>
                  <span className="text-[#8B0000] uppercase">Année : </span>
                  {album.year}
                </div>
                <div>
                  <span className="text-[#8B0000] uppercase">Piste : </span>
                  #{String(track.number).padStart(2, '0')}
                </div>
                {album.label && (
                  <div>
                    <span className="text-[#8B0000] uppercase">Label : </span>
                    {album.label}
                  </div>
                )}
              </div>
            </div>

            {/* Streaming Links */}
            {track.streamingLinks && (
              <div className="p-6 bg-[#0A0A0A] border-2 border-[#8B0000]">
                <div className="font-mono text-xs text-[#8B0000] uppercase mb-4">
                  Écouter
                </div>
                <div className="flex gap-3">
                  {track.streamingLinks.spotify && (
                    <a
                      href={track.streamingLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#1DB954]/10 border border-[#1DB954]/30 hover:bg-[#1DB954]/30 transition-colors cursor-none"
                      title="Écouter sur Spotify"
                    >
                      <svg className="w-6 h-6 fill-[#1DB954]" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>
                  )}
                  {track.streamingLinks.appleMusic && (
                    <a
                      href={track.streamingLinks.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#FA243C]/10 border border-[#FA243C]/30 hover:bg-[#FA243C]/30 transition-colors cursor-none"
                      title="Écouter sur Apple Music"
                    >
                      <svg className="w-6 h-6 fill-[#FA243C]" viewBox="0 0 24 24">
                        <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.047 5.047 0 0 0 1.88-2.208c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536-.142-.773.227-1.624 1.038-2.022.323-.16.67-.25 1.018-.324.378-.08.76-.132 1.143-.185.27-.037.54-.058.807-.12.557-.128.934-.49.944-1.068.012-.675 0-1.35 0-2.027 0-.215-.054-.278-.267-.315-.498-.086-1.002-.14-1.502-.213-1.218-.177-2.435-.36-3.653-.533-.35-.05-.697-.11-1.046-.168-.092-.015-.13.018-.13.11-.002.683 0 1.365-.002 2.048l-.006 2.048c0 .392-.024.788-.17 1.16-.24.613-.69 1.035-1.315 1.25-.47.163-.96.2-1.45.165-.282-.02-.558-.085-.836-.132-.958-.164-1.594-.85-1.74-1.794-.18-1.167.486-2.288 1.612-2.696.4-.146.818-.23 1.238-.28.603-.07 1.208-.125 1.814-.175.115-.01.135-.04.135-.15-.002-1.633-.002-3.266-.002-4.898 0-.5.022-.518.52-.447 1.112.16 2.227.316 3.34.478.776.114 1.553.228 2.328.346.268.04.535.09.8.144.41.082.545.26.545.677.002 1.616 0 3.23 0 4.846z"/>
                      </svg>
                    </a>
                  )}
                  {track.streamingLinks.youtube && (
                    <a
                      href={track.streamingLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000]/30 transition-colors cursor-none"
                      title="Écouter sur YouTube Music"
                    >
                      <svg className="w-6 h-6 fill-[#FF0000]" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Track Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:col-span-2"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-[#8B0000]" />
                <span className="font-black text-2xl text-[#8B0000]">{track.duration}</span>
              </div>
              <h1
                className="text-6xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-6"
                style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
              >
                <GlitchText glitchIntensity="high">{track.title}</GlitchText>
              </h1>
            </div>

            {track.notes && (
              <div className="mb-8 p-6 bg-[#8B0000]/10 border-l-4 border-[#8B0000]">
                <p className="font-mono text-sm text-[#E0E0E0] leading-relaxed">
                  {track.notes}
                </p>
              </div>
            )}

            {/* Tabs Navigation */}
            <div className="pt-8 border-t border-[#E0E0E0]/20">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('lyrics')}
                  className={`flex items-center gap-2 px-6 py-3 border-2 transition-all font-black text-sm uppercase tracking-wider cursor-none ${
                    activeTab === 'lyrics'
                      ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]'
                      : 'bg-transparent border-[#E0E0E0]/30 text-[#E0E0E0] hover:border-[#8B0000] hover:text-[#8B0000]'
                  }`}
                >
                  <Music size={16} />
                  LYRICS
                </button>
                <button
                  onClick={() => setActiveTab('translation')}
                  className={`flex items-center gap-2 px-6 py-3 border-2 transition-all font-black text-sm uppercase tracking-wider cursor-none ${
                    activeTab === 'translation'
                      ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]'
                      : 'bg-transparent border-[#E0E0E0]/30 text-[#E0E0E0] hover:border-[#8B0000] hover:text-[#8B0000]'
                  }`}
                >
                  <Languages size={16} />
                  TRADUCTION
                </button>
                <button
                  onClick={() => setActiveTab('meaning')}
                  className={`flex items-center gap-2 px-6 py-3 border-2 transition-all font-black text-sm uppercase tracking-wider cursor-none ${
                    activeTab === 'meaning'
                      ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]'
                      : 'bg-transparent border-[#E0E0E0]/30 text-[#E0E0E0] hover:border-[#8B0000] hover:text-[#8B0000]'
                  }`}
                >
                  <Lightbulb size={16} />
                  SIGNIFICATION
                </button>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'lyrics' && (
                  <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-4">
                    {/* COPYRIGHT WARNING */}
                    <div className="bg-[#8B0000]/20 border-2 border-[#8B0000] p-6 mb-6">
                      <p className="font-mono text-sm text-[#E0E0E0] leading-relaxed">
                        ⚠️ <span className="font-black">AVERTISSEMENT DROITS D'AUTEUR</span>
                        <br /><br />
                        Les paroles de chansons sont protégées par le droit d'auteur.
                        <br /><br />
                        Pour afficher les paroles légalement, vous devez :
                        <br />
                        • Utiliser une API autorisée (Genius API, Musixmatch, LyricFind)
                        <br />
                        • Obtenir les licences appropriées
                        <br />
                        • Ou intégrer un widget de service agréé
                        <br /><br />
                        <span className="text-[#8B0000]">
                          Ce système est fourni comme structure technique uniquement.
                        </span>
                      </p>
                    </div>

                    {/* PLACEHOLDER EXAMPLE */}
                    <div className="text-[#E0E0E0]/40 leading-loose whitespace-pre-line">
                      [Verse 1]
                      [Paroles à obtenir via API légale]
                      [Exemple : Genius API, Musixmatch API]
                      
                      [Chorus]
                      [Nécessite licence ou intégration autorisée]
                      
                      [Verse 2]
                      [Ne pas reproduire de vraies paroles ici]
                      
                      [Bridge]
                      [Utiliser seulement des sources légales]
                    </div>

                    <div className="pt-6 border-t border-[#E0E0E0]/20">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-[#8B0000] font-mono text-xs uppercase hover:text-[#E0E0E0] transition-colors cursor-none"
                      >
                        VOIR SUR GENIUS.COM
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'translation' && (
                  <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-4">
                    <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6 mb-6">
                      <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed">
                        <span className="font-black text-[#8B0000]">INFO TRADUCTION :</span>
                        <br /><br />
                        Les traductions sont des interprétations et doivent être créées par la communauté
                        ou des traducteurs qualifiés. Les traductions automatiques ne capturent pas toujours
                        les nuances poétiques et émotionnelles des paroles originales.
                        <br /><br />
                        Cette section peut accueillir des traductions contributives sous modération.
                      </p>
                    </div>

                    <div className="text-[#E0E0E0]/40 leading-loose whitespace-pre-line">
                      [Couplet 1]
                      [Traduction à ajouter par la communauté]
                      [Vérification par modérateurs]
                      
                      [Refrain]
                      [Traduction collaborative]
                      
                      [Couplet 2]
                      [Respectant l'esprit de l'original]
                      
                      [Pont]
                      [Avec notes de contexte si nécessaire]
                    </div>

                    <div className="pt-6 border-t border-[#E0E0E0]/20 flex gap-4">
                      <button className="px-4 py-2 bg-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase border-2 border-[#8B0000] hover:bg-transparent transition-colors cursor-none">
                        PROPOSER UNE TRADUCTION
                      </button>
                      <button className="px-4 py-2 bg-transparent text-[#E0E0E0] font-mono text-xs uppercase border-2 border-[#8B0000] hover:bg-[#8B0000] transition-colors cursor-none">
                        SIGNALER UNE ERREUR
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'meaning' && (
                  <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-6">
                    {/* EXAMPLE ANALYSIS (Editorial content - OK to create) */}
                    <div>
                      <h3 className="text-lg font-black text-[#8B0000] mb-3 uppercase tracking-wider">
                        Contexte de création
                      </h3>
                      <p className="text-[#E0E0E0]/80">
                        Ce titre fait partie de l'album <span className="text-[#8B0000] font-black">{album.title}</span> ({album.year}),
                        une période clé dans l'évolution du son de Korn. À cette époque, le groupe explorait
                        [contexte musical et personnel à documenter].
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#8B0000] mb-3 uppercase tracking-wider">
                        Thèmes principaux
                      </h3>
                      <ul className="space-y-3 text-[#E0E0E0]/80">
                        <li className="flex gap-3">
                          <span className="text-[#8B0000] font-black">•</span>
                          <span>[Thème 1 : à documenter selon interviews et analyses officielles]</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#8B0000] font-black">•</span>
                          <span>[Thème 2 : basé sur déclarations du groupe]</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#8B0000] font-black">•</span>
                          <span>[Thème 3 : interprétation critique]</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#8B0000] mb-3 uppercase tracking-wider">
                        Analyse musicale
                      </h3>
                      <p className="text-[#E0E0E0]/80">
                        Musicalement, "<span className="text-[#E0E0E0] font-black">{track.title}</span>" se caractérise par
                        [analyse des éléments musicaux : riffs, structure, production, etc.].
                        <br /><br />
                        La production de {album.producer || '[producteur]'} apporte [éléments techniques distinctifs].
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#8B0000] mb-3 uppercase tracking-wider">
                        Citations & Interviews
                      </h3>
                      <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
                        <p className="text-[#E0E0E0]/80 italic">
                          "[Citations d'interviews officielles du groupe à intégrer ici]"
                          <br /><br />
                          <span className="not-italic text-[#8B0000]">
                            — Jonathan Davis, [source & date]
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#8B0000] mb-3 uppercase tracking-wider">
                        Impact & Héritage
                      </h3>
                      <p className="text-[#E0E0E0]/80">
                        [Impact du morceau sur la scène nu metal, réception critique, influence sur d'autres artistes,
                        performances live mémorables, etc.]
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#E0E0E0]/20">
                      <button className="px-4 py-2 bg-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase border-2 border-[#8B0000] hover:bg-transparent transition-colors cursor-none">
                        CONTRIBUER À L'ANALYSE
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CommentSection comments={trackComments} />
        </motion.div>
      </div>
    </div>
  );
}