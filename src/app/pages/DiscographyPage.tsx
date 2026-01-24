import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { getStudioAlbums, getLiveAlbums, getCompilations, getSinglesEPs } from '@/app/data/albums';
import { Calendar, Disc, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DiscographyPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  
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
  const toggleFavorite = (albumId: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(albumId) 
        ? prev.filter(id => id !== albumId)
        : [...prev, albumId]
    );
  };

  // Determine which albums to show based on path
  let albums = getStudioAlbums();
  let title = 'ALBUMS STUDIO';
  let description = 'La discographie complète des albums studio de Korn.<br />De l\'album éponyme de 1994 aux sorties les plus récentes.';
  let breadcrumbLabel = 'STUDIO';
  
  if (currentPath.includes('/live')) {
    albums = getLiveAlbums();
    title = 'ALBUMS LIVE';
    description = 'Concerts légendaires et performances live capturés sur album.<br />L\'énergie brute de Korn sur scène.';
    breadcrumbLabel = 'LIVE';
  } else if (currentPath.includes('/compilations')) {
    albums = getCompilations();
    title = 'COMPILATIONS';
    description = 'Les compilations officielles et best-of du groupe.<br />Les classiques incontournables réunis en un seul album.';
    breadcrumbLabel = 'COMPILATIONS';
  } else if (currentPath.includes('/singles')) {
    albums = getSinglesEPs();
    title = 'SINGLES & EPs';
    description = 'Singles, EPs et sorties spéciales.<br />Les pépites rares et éditions limitées.';
    breadcrumbLabel = 'SINGLES';
  } else if (currentPath.includes('/favorites')) {
    // Show favorites from all categories
    const allAlbums = [...getStudioAlbums(), ...getLiveAlbums(), ...getCompilations(), ...getSinglesEPs()];
    albums = allAlbums.filter(album => favorites.includes(album.id));
    title = 'MES FAVORIS';
    description = `Votre sélection personnelle d'albums Korn.<br />${favorites.length} album${favorites.length > 1 ? 's' : ''} dans vos favoris.`;
    breadcrumbLabel = 'FAVORIS';
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title={title}
        description={description}
        backgroundImage="https://images.unsplash.com/photo-1604128311556-816dfb846a54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBjb2xsZWN0aW9uJTIwbXVzaWN8ZW58MXx8fHwxNzY5MTkzNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'DISCOGRAPHIE', path: '/discography' },
          { label: breadcrumbLabel }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Navigation tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {[
              { path: '/discography/studio', label: 'STUDIO' },
              { path: '/discography/live', label: 'LIVE' },
              { path: '/discography/compilations', label: 'COMPILATIONS' },
              { path: '/discography/singles', label: 'SINGLES' },
              { path: '/discography/favorites', label: `♥ FAVORIS (${favorites.length})`, special: true },
            ].map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`
                  font-mono text-xs uppercase px-6 py-3 border-2 transition-all
                  ${currentPath === tab.path
                    ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]'
                    : tab.special
                      ? 'bg-[#0A0A0A] border-[#8B0000]/50 text-[#8B0000] hover:bg-[#8B0000] hover:text-[#E0E0E0]'
                      : 'bg-[#0A0A0A] border-[#E0E0E0]/20 text-[#E0E0E0] hover:border-[#8B0000]'
                  }
                `}
              >
                {tab.label}
              </Link>
            ))}
          </motion.div>

          {/* Albums grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={`/discography/album/${album.slug}`}
                  className="group block bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all overflow-hidden"
                >
                  {/* Album cover */}
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                      }}
                    />
                    
                    {/* Year badge */}
                    <div className="absolute top-4 left-4 bg-[#8B0000] px-3 py-1">
                      <span className="font-black text-lg text-[#E0E0E0]">{album.year}</span>
                    </div>

                    {/* Favorite button */}
                    <button
                      onClick={(e) => toggleFavorite(album.id, e)}
                      className="absolute top-4 right-4 p-2 bg-[#0A0A0A]/90 border-2 border-[#8B0000] hover:bg-[#8B0000] transition-all group/fav z-10"
                    >
                      <Heart 
                        size={20} 
                        className={`transition-all ${
                          favorites.includes(album.id) 
                            ? 'fill-[#8B0000] text-[#8B0000]' 
                            : 'text-[#E0E0E0] group-hover/fav:text-[#8B0000]'
                        }`}
                      />
                    </button>

                    {/* Track count badge */}
                    <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/90 border border-[#8B0000] px-3 py-1">
                      <span className="font-mono text-xs text-[#E0E0E0]">{album.tracks.length} TRACKS</span>
                    </div>
                  </div>

                  {/* Album info */}
                  <div className="p-6">
                    <h2
                      className="text-2xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight group-hover:text-[#8B0000] transition-colors"
                      style={{ fontFamily: 'Arial Black, sans-serif' }}
                    >
                      {album.title}
                    </h2>
                    
                    <div className="space-y-2 font-mono text-xs text-[#E0E0E0]/70">
                      {album.producer && (
                        <div className="flex items-center gap-2">
                          <Disc size={12} className="text-[#8B0000]" />
                          <span>{album.producer}</span>
                        </div>
                      )}
                      {album.label && (
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-[#8B0000]" />
                          <span>{album.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Certifications */}
                    {album.certifications && album.certifications.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {album.certifications.slice(0, 2).map((cert, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] text-[#8B0000] bg-[#8B0000]/10 px-2 py-1 border border-[#8B0000]/30"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {albums.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              {currentPath.includes('/favorites') ? (
                <>
                  <Heart size={64} className="text-[#8B0000] mx-auto mb-6" />
                  <h3
                    className="text-3xl font-black text-[#E0E0E0] uppercase mb-4"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    AUCUN FAVORI
                  </h3>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    Cliquez sur le cœur ♥ d'un album pour l'ajouter à vos favoris.
                  </p>
                </>
              ) : (
                <>
                  <Disc size={64} className="text-[#8B0000] mx-auto mb-6" />
                  <h3
                    className="text-3xl font-black text-[#E0E0E0] uppercase mb-4"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    AUCUN ALBUM TROUVÉ
                  </h3>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    Cette section sera bientôt complétée avec plus de contenu.
                  </p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}