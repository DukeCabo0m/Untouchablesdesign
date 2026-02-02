import { Play, Youtube, ExternalLink } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';

const latestVideo = {
  id: 'video-1',
  thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  title: 'New Single "Worse" Official Music Video',
  views: '2.4M',
  duration: '3:42',
  url: 'https://youtube.com',
};

export function LatestVideoWidget() {
  return (
    <HandDrawnBox
      color="#80808080"
      strokeWidth={3}
      roughness={2.5}
      padding="0"
    >
      <div className="bg-[#000000] p-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Youtube size={28} className="text-[#8B0000]" />
            <h3 className="font-black text-lg uppercase tracking-tight text-[#E0E0E0]">
              À la une sur Untouchables TV
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="font-mono text-[#E0E0E0]/70 mb-6">
          Analyses, clips officiels et archives live : regardez le meilleur de Korn en vidéo.
        </p>

        {/* Video */}
        <a
          href={latestVideo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <HandDrawnBox
            color={COLORS.red.pure}
            strokeWidth={3}
            roughness={2}
            className="relative overflow-hidden mb-4"
            style={{ aspectRatio: '16/9' }}
            hoverColor={COLORS.red.pure}
          >
            <div className="absolute inset-0">
              <img
                src={latestVideo.thumbnail}
                alt={latestVideo.title}
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
                <div className="w-12 h-12 bg-[#8B0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={20} className="text-[#E0E0E0] fill-[#E0E0E0]" />
                </div>
              </div>

              {/* Bottom right badges - Duration & Views (appear on hover) */}
              <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#8B0000] px-2 py-1">
                  <span className="font-mono text-[10px] text-[#F0F0F0] font-semibold">{latestVideo.duration}</span>
                </div>
                <div className="bg-[#8B0000] px-2 py-1">
                  <span className="font-mono text-[10px] text-[#F0F0F0] font-semibold">{latestVideo.views} vues</span>
                </div>
              </div>
            </div>
          </HandDrawnBox>

          <h5 className="font-mono text-sm text-[#E0E0E0] uppercase mb-2 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
            {latestVideo.title}
          </h5>
        </a>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#8B0000]/30">
          <div className="flex justify-center">
            {/* CTA Subscribe */}
            <Button
              as="a"
              href="https://www.youtube.com/@UntouchablesFR?sub_confirmation=1"
              external
              variant="primary"
              size="md"
            >
              S'abonner à la chaîne Untouchables
            </Button>
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}