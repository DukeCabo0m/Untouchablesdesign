import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Disc, ArrowRight, Heart, Calendar } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { getGafferTexture } from '@/app/utils/gafferTexture';
import { useState, useEffect } from 'react';
import { albumsApi } from '@/app/utils/api';

// Map backend album to frontend format
function mapBackendAlbum(album: any) {
  return {
    id: album.id,
    slug: album.slug,
    title: album.title,
    year: new Date(album.releaseDate).getFullYear(),
    type: album.type === 'album' ? 'studio' : album.type,
    cover: album.coverImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    label: album.label || 'Korn',
    description: album.description || '',
    tracks: album.tracks || [],
  };
}

export function FeaturedAlbumsSection() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load albums from backend
  useEffect(() => {
    async function loadAlbums() {
      try {
        setIsLoading(true);
        const data = await albumsApi.getAll();
        // Map and sort by number of tracks
        const mappedAlbums = data
          .map(mapBackendAlbum)
          .sort((a: any, b: any) => (b.tracks?.length || 0) - (a.tracks?.length || 0));
        setAlbums(mappedAlbums);
        setError(null);
      } catch (err) {
        console.error('[FeaturedAlbumsSection] Failed to load albums:', err);
        setError('Impossible de charger les albums');
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadAlbums();
  }, []);

  // Featured albums - Take first 4
  const featuredAlbums = albums.slice(0, 4);

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0 pb-4">
        <div>
          <div className="flex items-center justify-center h-48 md:h-64">
            <div className="font-mono text-[#8B0000] text-base md:text-lg animate-pulse">
              Chargement des albums...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || albums.length === 0) {
    return (
      <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0 pb-4">
        <div>
          <div className="flex items-center justify-center h-48 md:h-64">
            <div className="font-mono text-[#E0E0E0]/50 text-base md:text-lg">
              {error || 'Aucun album disponible pour le moment'}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0 pb-4">
      {/* Animated gradient background */}
      {/* <AnimatedGradientBackground 
        colors={['#0A0A0A', '#1A0000', '#0A0A0A']} 
        opacity={0.3}
      /> */}

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 mb-12 md:mb-14 lg:mb-16">
          <SectionHeading 
            title="L'HERITAGE NU METAL" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description="De la rage des débuts à Bakersfield jusqu'à la consécration des années 2000 : redécouvrez les albums cultes qui ont défini le Nu Metal et marqué l'histoire du rock moderne à jamais."
          />
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="w-full lg:w-auto lg:mt-4"
          >
            <Button
              href="/discography/studio"
              variant="primary"
              className="w-full lg:w-auto"
            >
              <span className="hidden md:inline">Explorer la discographie complète</span>
              <span className="md:hidden">Voir discographie</span>
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {featuredAlbums.map((album, index) => (
            <motion.article
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <HandDrawnBox
                color="#8B00004D"
                strokeWidth={3}
                roughness={2.5}
                passes={1}
                padding="0"
                hoverColor="#8B0000"
              >
                <div className="bg-[#1A1A1A] h-full flex flex-col">
                  <Link to={`/discography/album/${album.slug}`} className="flex flex-col h-full">
                    {/* Album Cover */}
                    <div className="relative overflow-hidden aspect-square">
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={album.cover}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{
                            filter: 'contrast(1.5) brightness(0.7)',
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-30"
                          style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                          }}
                        />

                        {/* Type badge (Studio/Live/Compilation) - Top left */}
                        <div 
                          className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-1 md:px-3 md:py-1 flex items-center gap-2 font-mono tracking-tight"
                          style={{
                            clipPath: `polygon(
                              3% 0%, 5% 2%, 8% 1%, 12% 3%, 15% 1%, 20% 2%, 25% 0%, 30% 1%, 35% 3%, 40% 1%, 
                              45% 2%, 50% 0%, 55% 2%, 60% 1%, 65% 3%, 70% 1%, 75% 2%, 80% 0%, 85% 3%, 
                              90% 1%, 94% 2%, 97% 0%, 99% 3%, 100% 6%, 100% 10%, 99% 15%, 100% 20%, 
                              99% 30%, 100% 40%, 99% 50%, 100% 60%, 99% 70%, 100% 80%, 99% 85%, 100% 90%, 
                              99% 94%, 97% 97%, 100% 100%, 95% 99%, 90% 100%, 85% 98%, 80% 100%, 75% 99%, 
                              70% 100%, 65% 98%, 60% 100%, 55% 99%, 50% 100%, 45% 99%, 40% 100%, 35% 98%, 
                              30% 100%, 25% 99%, 20% 100%, 15% 98%, 10% 100%, 5% 99%, 2% 97%, 0% 100%, 
                              1% 95%, 0% 90%, 2% 85%, 0% 80%, 1% 70%, 0% 60%, 1% 50%, 0% 40%, 1% 30%, 
                              0% 20%, 1% 15%, 0% 10%, 2% 6%
                            )`,
                            transform: 'rotate(-0.5deg)',
                            backgroundImage: `url(${getGafferTexture('red')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            color: '#FFFFFF',
                          }}
                        >
                          <span className="font-['Special_Elite'] text-sm md:text-base uppercase text-white">
                            {album.type}
                          </span>
                        </div>

                        {/* Heart badge styled like primary button */}
                        <div 
                          className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-1 md:px-3 md:py-1 flex items-center gap-1 md:gap-2 font-mono tracking-tight"
                          style={{
                            clipPath: `polygon(
                              3% 0%, 5% 2%, 8% 1%, 12% 3%, 15% 1%, 20% 2%, 25% 0%, 30% 1%, 35% 3%, 40% 1%, 
                              45% 2%, 50% 0%, 55% 2%, 60% 1%, 65% 3%, 70% 1%, 75% 2%, 80% 0%, 85% 3%, 
                              90% 1%, 94% 2%, 97% 0%, 99% 3%, 100% 6%, 100% 10%, 99% 15%, 100% 20%, 
                              99% 30%, 100% 40%, 99% 50%, 100% 60%, 99% 70%, 100% 80%, 99% 85%, 100% 90%, 
                              99% 94%, 97% 97%, 100% 100%, 95% 99%, 90% 100%, 85% 98%, 80% 100%, 75% 99%, 
                              70% 100%, 65% 98%, 60% 100%, 55% 99%, 50% 100%, 45% 99%, 40% 100%, 35% 98%, 
                              30% 100%, 25% 99%, 20% 100%, 15% 98%, 10% 100%, 5% 99%, 2% 97%, 0% 100%, 
                              1% 95%, 0% 90%, 2% 85%, 0% 80%, 1% 70%, 0% 60%, 1% 50%, 0% 40%, 1% 30%, 
                              0% 20%, 1% 15%, 0% 10%, 2% 6%
                            )`,
                            transform: 'rotate(-0.5deg)',
                            backgroundImage: `url(${getGafferTexture('black')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            color: '#FFFFFF',
                          }}
                        >
                          <Heart size={10} className="md:w-3 md:h-3 text-white fill-white" />
                          <span className="font-['Special_Elite'] text-sm md:text-base text-white">
                            {album.tracks.length}
                          </span>
                        </div>
                      </div>
                      
                      {/* HandDrawn Border - Bottom only */}
                      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '2px' }}>
                        <svg 
                          className="w-full h-full" 
                          viewBox="0 0 1000 2"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 0 1 Q 50 0.5 100 1 T 200 1 T 300 1 T 400 1 T 500 1 T 600 1 T 700 1 T 800 1 T 900 1 T 1000 1"
                            stroke="#8B00004D"
                            strokeWidth="2"
                            fill="none"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Album Info - Card Body */}
                    <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                        <div className="flex items-stretch gap-0">
                          <HandDrawnBox
                            color="#8B0000"
                            strokeWidth={2}
                            roughness={2.5}
                            passes={1}
                            padding="0"
                          >
                            <div className="bg-[#8B0000] p-1 md:p-1.5 flex items-center justify-center">
                              <Calendar size={10} className="md:w-3 md:h-3 text-white" />
                            </div>
                          </HandDrawnBox>
                          <span 
                            className="font-mono text-xs md:text-sm text-black uppercase px-2 md:px-3 bg-white relative flex items-center"
                            style={{
                              backgroundImage: `url(${getGafferTexture('white')})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            {album.year}
                          </span>
                        </div>
                        <div className="flex items-stretch gap-0">
                          <HandDrawnBox
                            color="#8B0000"
                            strokeWidth={2}
                            roughness={2.5}
                            passes={1}
                            padding="0"
                          >
                            <div className="bg-[#8B0000] p-1 md:p-1.5 flex items-center justify-center">
                              <Disc size={10} className="md:w-3 md:h-3 text-white" />
                            </div>
                          </HandDrawnBox>
                          <span 
                            className="font-mono text-xs md:text-sm text-black px-2 md:px-3 bg-white relative flex items-center"
                            style={{
                              backgroundImage: `url(${getGafferTexture('white')})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            {album.label}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-[#E0E0E0] uppercase tracking-tight mb-2 md:mb-3 mt-2 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                        {album.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-mono text-xs sm:text-sm text-[#E0E0E0]/60 leading-relaxed line-clamp-3 mb-3 md:mb-4 flex-1">
                        {album.description.split('\n')[0]}
                      </p>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                        {/* Track count label - Left aligned */}
                        <Button
                          as="button"
                          variant="secondary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          {album.tracks.length} pistes
                        </Button>

                        {/* CTA Button - Right aligned */}
                        <Button
                          as="button"
                          variant="primary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          <span className="hidden md:inline">VOIR L'ALBUM</span>
                          <span className="md:hidden">VOIR</span>
                          <ArrowRight size={12} />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </div>
              </HandDrawnBox>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}