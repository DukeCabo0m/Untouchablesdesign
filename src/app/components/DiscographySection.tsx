import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { generatePlaceholder } from '@/app/utils/placeholder';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { HandDrawnBox } from './HandDrawnBox';
import { useState, useEffect } from 'react';
import { albumsApi } from '@/app/utils/api';

export function DiscographySection() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [stats, setStats] = useState({
    studioCount: 0,
    totalSold: '40M+',
    grammyWins: 2,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load albums and calculate stats
  useEffect(() => {
    async function loadAlbums() {
      try {
        setIsLoading(true);
        console.log('[DiscographySection] Loading albums from backend...');
        
        const allAlbums = await albumsApi.getAll();
        console.log('[DiscographySection] Received albums:', allAlbums);
        
        // Filter only studio albums and sort by release date
        const studioAlbums = allAlbums
          .filter((a: any) => a.type === 'album')
          .sort((a: any, b: any) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
          .slice(0, 6) // Show first 6 albums
          .map((album: any) => ({
            ...album,
            year: new Date(album.releaseDate).getFullYear().toString(),
            tracks: album.tracks?.length || 0,
            image: album.coverImage || generatePlaceholder(1080, 1080, album.title),
          }));
        
        console.log('[DiscographySection] Filtered studio albums:', studioAlbums);
        
        setAlbums(studioAlbums);
        setStats({
          studioCount: allAlbums.filter((a: any) => a.type === 'album').length,
          totalSold: '40M+',
          grammyWins: 2,
        });
      } catch (err) {
        console.error('[DiscographySection] Failed to load albums:', err);
        // Keep empty array on error
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadAlbums();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section id="discography" className="relative py-32 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="font-mono text-[#8B0000] text-lg animate-pulse">
              Chargement de la discographie...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="discography" className="relative py-32 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-7xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText glitchIntensity="high">DISCOGRAPHIE</GlitchText>
            </h2>
            <div className="h-[2px] w-32 bg-[#8B0000]" />
          </motion.div>
        </div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-[#E0E0E0]/70 mb-12 max-w-3xl"
        >
          <span className="text-[#8B0000] font-black">//</span> De l'album éponyme de 1994 à aujourd'hui, explorez trois décennies d'évolution sonore.<br />
          Chaque album est une révolution, chaque track une déclaration de guerre.
        </motion.p>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="font-mono text-[#E0E0E0]/50 text-lg">
                Aucun album disponible pour le moment.
              </p>
            </div>
          ) : (
            albums.map((album, index) => {
              console.log('[DiscographySection] Rendering album:', { id: album.id, slug: album.slug, title: album.title });
              return (
                <Link
                  key={album.id}
                  to={`/discography/album/${album.slug}`}
                  className="group cursor-pointer block"
                  onClick={() => console.log('[DiscographySection] Clicking album link:', `/discography/album/${album.slug}`)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Album Cover */}
                    <HandDrawnBox
                      color="#8B0000"
                      strokeWidth={3}
                      roughness={2.5}
                      className="relative overflow-hidden aspect-square mb-6"
                    >
                      <ImageWithFallback
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        style={{
                          filter: 'contrast(1.5) brightness(0.7) grayscale(0.9)',
                          mixBlendMode: 'luminosity',
                        }}
                      />

                      {/* Scanlines */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40"
                        style={{
                          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                        }}
                      />

                      {/* Year badge */}
                      <HandDrawnBox
                        color="#E0E0E0"
                        strokeWidth={2}
                        roughness={2}
                        className="absolute top-4 left-4 bg-[#8B0000] px-4 py-2"
                      >
                        <span className="font-black text-xl text-[#0A0A0A]">{album.year}</span>
                      </HandDrawnBox>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#8B0000]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                        <p className="font-mono text-xs text-[#E0E0E0] text-center leading-relaxed mb-4">
                          {album.description}
                        </p>
                        <div className="text-[#E0E0E0] font-mono text-xs">
                          {album.tracks} TRACKS
                        </div>
                      </div>
                    </HandDrawnBox>

                    {/* Album Info */}
                    <div>
                      <h3 className="text-2xl font-black text-[#E0E0E0] mb-2 uppercase tracking-tight group-hover:text-[#8B0000] transition-colors">
                        {album.title}
                      </h3>
                      <div className="flex items-center gap-4 font-mono text-xs text-[#E0E0E0]/60">
                        <span className="text-[#8B0000]">{album.year}</span>
                        <span>//</span>
                        <span>{album.tracks} TRACKS</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          )}
        </div>

        {/* Stats */}
        <HandDrawnBox
          color="#8B0000"
          strokeWidth={3}
          roughness={2.5}
          className="mt-20 p-8 bg-[#0A0A0A]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl font-black text-[#8B0000] mb-2">{isLoading ? '...' : stats.studioCount}</p>
                <p className="font-mono text-xs text-[#E0E0E0] uppercase">Albums studio</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#8B0000] mb-2">{stats.totalSold}</p>
                <p className="font-mono text-xs text-[#E0E0E0] uppercase">Albums vendus</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#8B0000] mb-2">{stats.grammyWins}</p>
                <p className="font-mono text-xs text-[#E0E0E0] uppercase">Grammy Awards</p>
              </div>
            </div>
          </motion.div>
        </HandDrawnBox>
      </div>
    </section>
  );
}