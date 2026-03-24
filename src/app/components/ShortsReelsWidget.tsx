import { Play, Film } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';
import { TikTokIcon } from './TikTokIcon';
import { useState, useEffect } from 'react';
import { projectId } from '/utils/supabase/info';

export function ShortsReelsWidget() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/media/shorts`
        );
        
        if (response.ok) {
          const data = await response.json();
          setShorts(data.shorts || []);
        }
      } catch (error) {
        console.error('Error fetching shorts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShorts();
  }, []);

  return (
    <HandDrawnBox
      color="#80808080"
      strokeWidth={3}
      roughness={2.5}
      padding="0"
    >
      <div className="bg-[#000000] p-4 md:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <TikTokIcon size={24} className="md:w-7 md:h-7 text-[#8B0000]" />
          <h3 className="font-black text-base md:text-lg uppercase tracking-tight text-[#E0E0E0] leading-tight">
            Les coulisses et secrets de Korn sur TikTok
          </h3>
        </div>

        {/* Description */}
        <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 mb-4 md:mb-6 leading-relaxed">
          Répétitions, soundchecks et archives rares : plongez dans l'intimité du groupe en format court.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {isLoading ? (
            <div className="col-span-2 text-center">
              <p className="font-mono text-sm text-[#E0E0E0]/70">Chargement...</p>
            </div>
          ) : (
            shorts.map((short) => (
              <a
                key={short.id}
                href={short.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <HandDrawnBox
                  color={COLORS.red.pure}
                  strokeWidth={3}
                  roughness={2}
                  className="relative overflow-hidden mb-2 md:mb-3"
                  style={{ aspectRatio: '9/16' }}
                  hoverColor={COLORS.red.pure}
                >
                  <div className="absolute inset-0">
                    <img
                      src={short.thumbnail}
                      alt={short.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        filter: 'contrast(1.4) brightness(0.7) saturate(0.8)',
                      }}
                    />

                    {/* Scanlines overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
                      }}
                    />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#8B0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={14} className="md:w-4 md:h-4 text-[#E0E0E0] fill-[#E0E0E0]" />
                      </div>
                    </div>

                    {/* Bottom right badges - Duration & Views */}
                    <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 flex items-center gap-1 md:gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#8B0000] px-1 py-0.5 md:px-1.5">
                        <span className="font-mono text-[8px] md:text-[9px] text-[#F0F0F0] font-semibold">{short.duration}</span>
                      </div>
                      <div className="bg-[#8B0000] px-1 py-0.5 md:px-1.5">
                        <span className="font-mono text-[8px] md:text-[9px] text-[#F0F0F0] font-semibold">{short.views}</span>
                      </div>
                    </div>
                  </div>
                </HandDrawnBox>

                <p className="font-mono text-[10px] md:text-xs text-[#E0E0E0] uppercase line-clamp-1 group-hover:text-[#8B0000] transition-colors">
                  {short.title}
                </p>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#8B0000]/30">
          <div className="flex justify-center">
            <Button
              as="a"
              href="https://www.tiktok.com/@untouchables.fr"
              external
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <span className="hidden md:inline">Rejoindre les Korn Kids sur TikTok</span>
              <span className="md:hidden">Suivre sur TikTok</span>
            </Button>
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}