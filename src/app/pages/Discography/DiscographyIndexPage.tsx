import { Link } from 'react-router';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { Disc3, Radio, ListMusic, Music4, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { albumsApi } from '@/app/utils/api';

export function DiscographyIndexPage() {
  const [stats, setStats] = useState({
    studioCount: 0,
    liveCount: 0,
    compilationCount: 0,
    singlesCount: 0,
    totalAlbums: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load albums and calculate stats
  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true);
        const albums = await albumsApi.getAll();
        
        const studioCount = albums.filter((a: any) => a.type === 'album').length;
        const liveCount = albums.filter((a: any) => a.type === 'live').length;
        const compilationCount = albums.filter((a: any) => a.type === 'compilation').length;
        const singlesCount = albums.filter((a: any) => a.type === 'single' || a.type === 'ep').length;
        
        setStats({
          studioCount,
          liveCount,
          compilationCount,
          singlesCount,
          totalAlbums: albums.length,
        });
      } catch (err) {
        console.error('[DiscographyIndexPage] Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const categories = [
    {
      title: 'ALBUMS STUDIO',
      href: '/discography/studio',
      icon: Disc3,
      description: `${stats.studioCount} albums studio qui ont révolutionné le metal`,
      count: isLoading ? '...' : String(stats.studioCount),
    },
    {
      title: 'ALBUMS LIVE',
      href: '/discography/live',
      icon: Radio,
      description: 'Captures de l\'énergie brute sur scène',
      count: isLoading ? '...' : String(stats.liveCount),
    },
    {
      title: 'COMPILATIONS',
      href: '/discography/compilations',
      icon: ListMusic,
      description: 'Best-of et collections essentielles',
      count: isLoading ? '...' : String(stats.compilationCount),
    },
    {
      title: 'SINGLES & EPs',
      href: '/discography/singles',
      icon: Music4,
      description: 'Singles, EPs et raretés',
      count: isLoading ? '...' : String(stats.singlesCount),
    },
    {
      title: 'VIDÉOCLIPS',
      href: '/discography/videos',
      icon: Video,
      description: 'Galerie complète des clips officiels',
      count: '30+', // Static for now
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="DISCOGRAPHIE"
        description="30+ ans de révolution sonore. Albums studio, live, compilations, singles et vidéoclips.<br />L'intégralité de la discographie de Korn."
        backgroundImage="https://images.unsplash.com/photo-1761098281103-51bf33e39d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBjb2xsZWN0aW9uJTIwZGFya3xlbnwxfHx8fDE3NjkxOTI5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'DISCOGRAPHIE' }
        ]}
        glitchIntensity="low"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {[
              { label: 'ÉCOUTES MENSUELLES', value: '40M+' },
              { label: 'GRAMMYS', value: '2' },
              { label: 'MEMBRES', value: '7' },
              { label: 'ANNÉES DE CARRIÈRE', value: '30+' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6 text-center"
              >
                <div
                  className="text-4xl md:text-5xl font-black text-[#8B0000] mb-2"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-[#E0E0E0]/70 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.title}
                  to={category.href}
                  className="group relative bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all p-8 overflow-hidden"
                >
                  {/* Background effect */}
                  <div className="absolute inset-0 bg-[#8B0000] opacity-0 group-hover:opacity-10 transition-opacity" />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <Icon className="w-16 h-16 text-[#8B0000]" strokeWidth={1.5} />
                  </div>

                  {/* Count badge */}
                  <div className="absolute top-6 right-6 font-mono text-xs text-[#E0E0E0] bg-[#8B0000]/20 border border-[#8B0000] px-3 py-1">
                    {category.count}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h2
                      className="text-3xl font-black text-[#E0E0E0] uppercase mb-3 tracking-tight"
                      style={{ fontFamily: 'Arial Black, sans-serif' }}
                    >
                      {category.title}
                    </h2>
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="relative z-10 mt-6 flex items-center font-mono text-xs text-[#8B0000] uppercase group-hover:translate-x-2 transition-transform">
                    <span>EXPLORER</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 p-12 bg-[#0A0A0A] border-l-4 border-[#8B0000] text-center">
            <h3
              className="text-3xl font-black text-[#E0E0E0] uppercase mb-4 tracking-tight"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              <GlitchText glitchIntensity="medium">NOUVEL ALBUM EN 2026</GlitchText>
            </h3>
            <p className="font-mono text-sm text-[#E0E0E0]/70 mb-6">
              Korn revient avec Ross Robinson pour un 15e album studio. Sortie prévue été 2026.
            </p>
            <Link
              to="/news"
              className="inline-block font-mono text-xs text-[#8B0000] border border-[#8B0000] hover:bg-[#8B0000] hover:text-[#E0E0E0] transition-all px-6 py-3 uppercase"
            >
              SUIVRE L'ACTUALITÉ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}