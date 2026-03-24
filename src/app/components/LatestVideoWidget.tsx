import { Play, Eye, Clock, Youtube } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';
import { useState, useEffect } from 'react';
import { projectId } from '/utils/supabase/info';

export function LatestVideoWidget() {
  const [video, setVideo] = useState({
    id: 'loading',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    title: 'Chargement...',
    views: '0',
    duration: '0:00',
    url: '#',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/media/latest-video`
        );
        
        if (response.ok) {
          const data = await response.json();
          setVideo(data.video);
        }
      } catch (error) {
        console.error('Error fetching latest video:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
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
        <div className="flex items-center justify-between gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Youtube size={24} className="md:w-7 md:h-7 text-[#8B0000]" />
            <h3 className="font-black text-base md:text-lg uppercase tracking-tight text-[#E0E0E0]">
              À la une sur Untouchables TV
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 mb-4 md:mb-6 leading-relaxed">
          Analyses, clips officiels et archives live : regardez le meilleur de Korn en vidéo.
        </p>

        {/* Video */}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <HandDrawnBox
            color={COLORS.red.pure}
            strokeWidth={3}
            roughness={2}
            className="relative overflow-hidden mb-3 md:mb-4"
            style={{ aspectRatio: '16/9' }}
            hoverColor={COLORS.red.pure}
          >
            <div className="absolute inset-0">
              <img
                src={video.thumbnail}
                alt={video.title}
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
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#8B0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={18} className="md:w-5 md:h-5 text-[#E0E0E0] fill-[#E0E0E0]" />
                </div>
              </div>

              {/* Bottom right badges - Duration & Views */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#8B0000] px-1.5 py-0.5 md:px-2 md:py-1">
                  <span className="font-mono text-[9px] md:text-[10px] text-[#F0F0F0] font-semibold">{video.duration}</span>
                </div>
                <div className="bg-[#8B0000] px-1.5 py-0.5 md:px-2 md:py-1">
                  <span className="font-mono text-[9px] md:text-[10px] text-[#F0F0F0] font-semibold">{video.views} vues</span>
                </div>
              </div>
            </div>
          </HandDrawnBox>

          <h5 className="font-mono text-xs md:text-sm text-[#E0E0E0] uppercase mb-2 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
            {video.title}
          </h5>
        </a>

        {/* Footer */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#8B0000]/30">
          <div className="flex justify-center">
            <Button
              as="a"
              href="https://www.youtube.com/@UntouchablesFR?sub_confirmation=1"
              external
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <span className="hidden md:inline">S'abonner à la chaîne Untouchables</span>
              <span className="md:hidden">S'abonner</span>
            </Button>
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}