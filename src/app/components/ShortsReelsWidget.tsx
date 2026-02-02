import { Play, Film } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';
import { TikTokIcon } from './TikTokIcon';

const latestShorts = [
  {
    id: 'short-1',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    title: 'Behind the Scenes',
    views: '845K',
    duration: '0:24',
    url: 'https://youtube.com/shorts',
  },
  {
    id: 'short-2',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80',
    title: 'Vocal Warm-up',
    views: '1.2M',
    duration: '0:18',
    url: 'https://tiktok.com',
  },
  {
    id: 'short-3',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    title: 'Bass Breakdown',
    views: '654K',
    duration: '0:31',
    url: 'https://youtube.com/shorts',
  },
  {
    id: 'short-4',
    thumbnail: 'https://images.unsplash.com/photo-1690013429722-87852aae164b?w=400&q=80',
    title: 'Stage Setup',
    views: '923K',
    duration: '0:45',
    url: 'https://youtube.com/shorts',
  },
];

export function ShortsReelsWidget() {
  return (
    <HandDrawnBox
      color="#80808080"
      strokeWidth={3}
      roughness={2.5}
      padding="0"
    >
      <div className="bg-[#000000] p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <TikTokIcon size={28} className="text-[#8B0000]" />
          <h3 className="font-black text-lg uppercase tracking-tight text-[#E0E0E0]">
            Les coulisses et secrets de Korn sur TikTok
          </h3>
        </div>

        {/* Description */}
        <p className="font-mono text-[#E0E0E0]/70 mb-6">
          Répétitions, soundchecks et archives rares : plongez dans l'intimité du groupe en format court.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {latestShorts.map((short) => (
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
                className="relative overflow-hidden mb-3"
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
                    <div className="w-10 h-10 bg-[#8B0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={16} className="text-[#E0E0E0] fill-[#E0E0E0]" />
                    </div>
                  </div>

                  {/* Bottom right badges - Duration & Views (appear on hover) */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#8B0000] px-1.5 py-0.5">
                      <span className="font-mono text-[9px] text-[#F0F0F0] font-semibold">{short.duration}</span>
                    </div>
                    <div className="bg-[#8B0000] px-1.5 py-0.5">
                      <span className="font-mono text-[9px] text-[#F0F0F0] font-semibold">{short.views}</span>
                    </div>
                  </div>
                </div>
              </HandDrawnBox>

              <p className="font-mono text-xs text-[#E0E0E0] uppercase line-clamp-1 group-hover:text-[#8B0000] transition-colors">
                {short.title}
              </p>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#8B0000]/30">
          <div className="flex justify-center">
            {/* CTA TikTok */}
            <Button
              as="a"
              href="https://www.tiktok.com/@untouchables.fr"
              external
              variant="primary"
              size="md"
            >
              Rejoindre les Korn Kids sur TikTok
            </Button>
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}