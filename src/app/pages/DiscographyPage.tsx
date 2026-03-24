import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { Calendar, Disc, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { albumsApi } from '@/app/utils/api';

export function DiscographyPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // State for albums from backend
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('korn-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Load albums from backend
  useEffect(() => {
    async function loadAlbums() {
      try {
        setIsLoading(true);
        console.log('[DiscographyPage] Loading albums from backend...');
        
        const data = await albumsApi.getAll();
        console.log('[DiscographyPage] Received albums:', data);
        
        // Sort by release date
        const sortedAlbums = data.sort((a: any, b: any) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        
        setAlbums(sortedAlbums);
        setError(null);
      } catch (err) {
        console.error('[DiscographyPage] Failed to load albums:', err);
        setError('Impossible de charger la discographie');
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadAlbums();
  }, []);

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
  let filteredAlbums = albums;
  let title = 'ALBUMS STUDIO';
  let description = 'La discographie complète des albums studio de Korn.<br />De l\'album éponyme de 1994 aux sorties les plus récentes.';
  let breadcrumbLabel = 'STUDIO';
  
  if (currentPath.includes('/live')) {
    filteredAlbums = albums.filter((a: any) => a.type === 'live');
    title = 'ALBUMS LIVE';
    description = 'Concerts légendaires et performances live capturés sur album.<br />L\'énergie brute de Korn sur scène.';
    breadcrumbLabel = 'LIVE';
  } else if (currentPath.includes('/compilations')) {
    filteredAlbums = albums.filter((a: any) => a.type === 'compilation');
    title = 'COMPILATIONS';
    description = 'Les compilations officielles et best-of du groupe.<br />Les classiques incontournables réunis en un seul album.';
    breadcrumbLabel = 'COMPILATIONS';
  } else if (currentPath.includes('/singles')) {
    filteredAlbums = albums.filter((a: any) => a.type === 'single' || a.type === 'ep');
    title = 'SINGLES & EPs';
    description = 'Singles, EPs et sorties spéciales.<br />Les pépites rares et éditions limitées.';
    breadcrumbLabel = 'SINGLES';
  } else if (currentPath.includes('/favorites')) {
    filteredAlbums = albums.filter((album: any) => favorites.includes(album.id));
    title = 'MES FAVORIS';
    description = `Votre sélection personnelle d'albums Korn.<br />${favorites.length} album${favorites.length > 1 ? 's' : ''} dans vos favoris.`;
    breadcrumbLabel = 'FAVORIS';
  } else {
    filteredAlbums = albums.filter((a: any) => a.type === 'album');
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

      <div className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Navigation tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8 md:mb-10 lg:mb-12"
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
                  font-mono text-xs uppercase px-4 py-2 md:px-6 md:py-3 border-2 transition-all
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
          {isLoading ? (
            <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="font-mono text-[#8B0000] text-base md:text-lg animate-pulse">
                Chargement de la discographie...
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="font-mono text-[#E0E0E0]/50 text-base md:text-lg">
                {error}
              </div>
            </div>
          ) : filteredAlbums.length === 0 ? (
            <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="text-center">
                <p className="font-mono text-[#E0E0E0]/50 text-base md:text-lg mb-4">
                  Aucun album dans cette catégorie
                </p>
                <Link
                  to="/discography/studio"
                  className="text-[#8B0000] font-mono text-sm hover:underline"
                >
                  &lt;&lt; Retour aux albums studio
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredAlbums.map((album, index) => (
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
                        src={album.coverImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'}
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
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#8B0000] px-2 py-1 md:px-3 md:py-1">
                        <span className="font-black text-base md:text-lg text-[#E0E0E0]">
                          {new Date(album.releaseDate).getFullYear()}
                        </span>
                      </div>

                      {/* Favorite button */}
                      <button
                        onClick={(e) => toggleFavorite(album.id, e)}
                        className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 bg-[#0A0A0A]/90 border-2 border-[#8B0000] hover:bg-[#8B0000] transition-all group/fav z-10"
                      >
                        <Heart 
                          size={16}
                          className={`md:w-5 md:h-5 transition-all ${
                            favorites.includes(album.id) 
                              ? 'fill-[#8B0000] text-[#8B0000]' 
                              : 'text-[#E0E0E0] group-hover/fav:text-[#8B0000]'
                          }`}
                        />
                      </button>

                      {/* Track count badge */}
                      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-[#0A0A0A]/90 border border-[#8B0000] px-2 py-1 md:px-3 md:py-1">
                        <span className="font-mono text-xs text-[#E0E0E0]">
                          {album.tracks?.length || 0} TRACKS
                        </span>
                      </div>
                    </div>

                    {/* Album info */}
                    <div className="p-4 md:p-5 lg:p-6">
                      <h2
                        className="text-lg sm:text-xl md:text-2xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight group-hover:text-[#8B0000] transition-colors"
                        style={{ fontFamily: 'Arial Black, sans-serif' }}
                      >
                        {album.title}
                      </h2>
                      
                      <div className="space-y-1.5 md:space-y-2 font-mono text-xs text-[#E0E0E0]/70">
                        {album.producer && (
                          <div className="flex items-center gap-2">
                            <Disc size={11} className="md:w-3 md:h-3 text-[#8B0000]" />
                            <span>{album.producer}</span>
                          </div>
                        )}
                        {album.label && (
                          <div className="flex items-center gap-2">
                            <Calendar size={11} className="md:w-3 md:h-3 text-[#8B0000]" />
                            <span>{album.label}</span>
                          </div>
                        )}
                      </div>

                      {/* Certifications - if they exist */}
                      {album.certifications && album.certifications.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1">
                          {album.certifications.slice(0, 2).map((cert: string, i: number) => (
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
          )}
        </div>
      </div>
    </div>
  );
}