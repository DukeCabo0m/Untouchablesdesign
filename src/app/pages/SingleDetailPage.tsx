import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { CommentSection } from '@/app/components/CommentSection';
import { ArrowLeft, Clock, Award, Play, Film, Disc, ExternalLink } from 'lucide-react';
import { getSingleBySlug } from '@/app/data/singles';

export function SingleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const single = slug ? getSingleBySlug(slug) : undefined;

  // Mock comments data for singles
  const singleComments = [
    {
      id: 1,
      user: 'KornLegend88',
      avatar: 'https://i.pravatar.cc/150?img=21',
      date: '2026-01-18',
      text: 'Ce single a littéralement changé ma vie. Un classique intemporel du nu metal !'
    },
    {
      id: 2,
      user: 'MetalQueen',
      avatar: 'https://i.pravatar.cc/150?img=47',
      date: '2026-01-12',
      text: 'Le clip est absolument iconique. Je l\'ai regardé des centaines de fois et il me donne encore des frissons.'
    },
    {
      id: 3,
      user: 'NuMetalForever',
      avatar: 'https://i.pravatar.cc/150?img=68',
      date: '2026-01-08',
      text: 'Un des morceaux les plus puissants de Korn. La production est parfaite, les paroles sont profondes.'
    }
  ];

  if (!single) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#E0E0E0] mb-4">SINGLE NON TROUVÉ</h1>
          <Link to="/discography" className="text-[#8B0000] font-mono text-sm hover:underline">
            &lt;&lt; RETOUR À LA DISCOGRAPHIE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to={`/discography/${single.albumSlug}`}
          className="inline-flex items-center gap-2 text-[#8B0000] font-mono text-xs uppercase mb-12 hover:text-[#E0E0E0] transition-colors cursor-none"
        >
          <ArrowLeft size={16} />
          RETOUR À L'ALBUM
        </Link>

        {/* Single Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          {/* Single Cover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden border-4 border-[#8B0000] aspect-square mb-8">
              <img
                src={single.cover}
                alt={single.title}
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
              
              {/* Single Badge */}
              <div className="absolute top-4 left-4 bg-[#8B0000] px-4 py-2 border-2 border-[#E0E0E0]">
                <div className="flex items-center gap-2">
                  <Disc size={16} className="text-[#E0E0E0]" />
                  <span className="font-black text-xs uppercase tracking-wider text-[#E0E0E0]">
                    SINGLE
                  </span>
                </div>
              </div>
            </div>

            {/* Streaming Links */}
            <div className="p-6 bg-[#0A0A0A] border-2 border-[#8B0000]">
              <h3 className="font-mono text-xs text-[#8B0000] uppercase mb-4 tracking-wider">
                ÉCOUTER MAINTENANT
              </h3>
              <div className="space-y-3">
                <a
                  href={single.streamingLinks.spotify}
                  className="flex items-center gap-3 p-3 bg-[#1DB954]/20 border border-[#1DB954]/40 hover:bg-[#1DB954]/40 transition-colors cursor-none group"
                >
                  <svg className="w-6 h-6 fill-[#1DB954]" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <div className="flex-1">
                    <div className="font-black text-sm text-[#E0E0E0] group-hover:text-[#1DB954] transition-colors">
                      Spotify
                    </div>
                    <div className="font-mono text-xs text-[#E0E0E0]/50">
                      Stream now
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-[#1DB954]" />
                </a>

                <a
                  href={single.streamingLinks.appleMusic}
                  className="flex items-center gap-3 p-3 bg-[#FA243C]/20 border border-[#FA243C]/40 hover:bg-[#FA243C]/40 transition-colors cursor-none group"
                >
                  <svg className="w-6 h-6 fill-[#FA243C]" viewBox="0 0 24 24">
                    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.047 5.047 0 0 0 1.88-2.208c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536-.142-.773.227-1.624 1.038-2.022.323-.16.67-.25 1.018-.324.378-.08.76-.132 1.143-.185.27-.037.54-.058.807-.12.557-.128.934-.49.944-1.068.012-.675 0-1.35 0-2.027 0-.215-.054-.278-.267-.315-.498-.086-1.002-.14-1.502-.213-1.218-.177-2.435-.36-3.653-.533-.35-.05-.697-.11-1.046-.168-.092-.015-.13.018-.13.11-.002.683 0 1.365-.002 2.048l-.006 2.048c0 .392-.024.788-.17 1.16-.24.613-.69 1.035-1.315 1.25-.47.163-.96.2-1.45.165-.282-.02-.558-.085-.836-.132-.958-.164-1.594-.85-1.74-1.794-.18-1.167.486-2.288 1.612-2.696.4-.146.818-.23 1.238-.28.603-.07 1.208-.125 1.814-.175.115-.01.135-.04.135-.15-.002-1.633-.002-3.266-.002-4.898 0-.5.022-.518.52-.447 1.112.16 2.227.316 3.34.478.776.114 1.553.228 2.328.346.268.04.535.09.8.144.41.082.545.26.545.677.002 1.616 0 3.23 0 4.846z"/>
                  </svg>
                  <div className="flex-1">
                    <div className="font-black text-sm text-[#E0E0E0] group-hover:text-[#FA243C] transition-colors">
                      Apple Music
                    </div>
                    <div className="font-mono text-xs text-[#E0E0E0]/50">
                      Stream now
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-[#FA243C]" />
                </a>

                <a
                  href={single.streamingLinks.youtube}
                  className="flex items-center gap-3 p-3 bg-[#FF0000]/20 border border-[#FF0000]/40 hover:bg-[#FF0000]/40 transition-colors cursor-none group"
                >
                  <svg className="w-6 h-6 fill-[#FF0000]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <div className="flex-1">
                    <div className="font-black text-sm text-[#E0E0E0] group-hover:text-[#FF0000] transition-colors">
                      YouTube Music
                    </div>
                    <div className="font-mono text-xs text-[#E0E0E0]/50">
                      Watch video
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-[#FF0000]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Single Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:col-span-3"
          >
            <div className="mb-6">
              <div className="inline-block bg-[#8B0000] px-4 py-2 mb-4">
                <span className="font-black text-2xl text-[#E0E0E0]">{single.year}</span>
              </div>
              <h1
                className="text-6xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-4"
                style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
              >
                <GlitchText glitchIntensity="high">{single.title}</GlitchText>
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-sm text-[#8B0000] uppercase">De l'album</span>
                <Link
                  to={`/discography/${single.albumSlug}`}
                  className="font-black text-lg text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  {single.album}
                </Link>
              </div>
            </div>

            <div className="space-y-4 font-mono text-sm text-[#E0E0E0] mb-8">
              <div className="flex items-start gap-4">
                <Clock size={16} className="text-[#8B0000] mt-1" />
                <div>
                  <span className="text-[#8B0000] uppercase block mb-1">Durée</span>
                  <span className="font-black text-lg">{single.duration}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            {single.certifications && (
              <div className="mb-8 p-6 bg-[#8B0000]/10 border-l-4 border-[#8B0000]">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-[#8B0000]" />
                  <span className="font-mono text-xs text-[#8B0000] uppercase">Certifications</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {single.certifications.map((cert, i) => (
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

            {/* Chart Positions */}
            {single.chartPositions && (
              <div className="mb-8 p-6 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20">
                <h3 className="font-mono text-xs text-[#8B0000] uppercase mb-4 tracking-wider">
                  Classements
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {single.chartPositions.map((chart, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#8B0000]/10 border border-[#8B0000]/30">
                      <span className="font-mono text-xs text-[#E0E0E0]/70">{chart.country}</span>
                      <span className="font-black text-xl text-[#8B0000]">#{chart.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="pt-8 border-t border-[#E0E0E0]/20">
              <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-4">
                {single.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Clip Section */}
        {single.videoClip && (
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
              <span className="text-[#8B0000]">&gt;&gt;</span> VIDÉOCLIP
            </h2>
            
            <div className="p-8 bg-[#0A0A0A] border-2 border-[#8B0000]">
              <div className="flex items-start gap-6 mb-6">
                <Film size={32} className="text-[#8B0000] flex-shrink-0" />
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="font-mono text-xs text-[#8B0000] uppercase block mb-2">Réalisateur</span>
                      <span className="font-black text-lg text-[#E0E0E0]">{single.videoClip.director}</span>
                    </div>
                    {single.videoClip.views && (
                      <div>
                        <span className="font-mono text-xs text-[#8B0000] uppercase block mb-2">Vues YouTube</span>
                        <span className="font-black text-lg text-[#E0E0E0]">{single.videoClip.views}</span>
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-sm text-[#E0E0E0] leading-relaxed">
                    {single.videoClip.description}
                  </p>
                </div>
              </div>
              
              <a
                href={single.streamingLinks.youtube}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#FF0000]/20 border-2 border-[#FF0000] hover:bg-[#FF0000]/40 transition-colors cursor-none group w-full"
              >
                <Play size={24} className="text-[#FF0000] group-hover:text-[#E0E0E0] transition-colors" />
                <span className="font-black text-lg uppercase text-[#E0E0E0]">
                  REGARDER LE CLIP
                </span>
              </a>
            </div>
          </motion.div>
        )}

        {/* B-Sides Section */}
        {single.bSides && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-20"
          >
            <h2
              className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              <span className="text-[#8B0000]">&gt;&gt;</span> FACES B
            </h2>
            
            <div className="space-y-2">
              {single.bSides.map((bSide, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#E0E0E0]/20 hover:border-[#8B0000] transition-colors"
                >
                  <span className="font-black text-lg text-[#E0E0E0] uppercase">{bSide.title}</span>
                  <span className="font-mono text-sm text-[#E0E0E0]/60">{bSide.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comment Section */}
        <CommentSection comments={singleComments} />
      </div>
    </div>
  );
}