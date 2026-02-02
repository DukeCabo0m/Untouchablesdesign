import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { Button } from './Button';
import { COLORS } from '@/app/constants/colors';

const instagramPosts = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1747003869273-9fc7ad373137?w=400&q=80',
    likes: 45620,
    comments: 234,
    url: 'https://www.instagram.com/untouchables.fr/',
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1552595458-e8ad6af8aa10?w=400&q=80',
    likes: 38950,
    comments: 189,
    url: 'https://www.instagram.com/untouchables.fr/',
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1694024561275-c91acabb05ce?w=400&q=80',
    likes: 52100,
    comments: 312,
    url: 'https://www.instagram.com/untouchables.fr/',
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1608660890457-e985951f07d2?w=400&q=80',
    likes: 41830,
    comments: 276,
    url: 'https://www.instagram.com/untouchables.fr/',
  },
];

export function InstagramPostsWidget() {
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
          <Instagram size={28} className="text-[#8B0000]" />
          <h3 className="font-black text-lg uppercase tracking-tight text-[#E0E0E0]">
            Le Quartier Général Social des Korn Kids
          </h3>
        </div>

        {/* Description */}
        <p className="font-mono text-[#E0E0E0]/70 mb-6">
          Débats sur les albums, sondages en Story et partages de fans : là où la communauté vibre au quotidien.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <HandDrawnBox
                color={COLORS.red.pure}
                strokeWidth={3}
                roughness={2}
                className="relative overflow-hidden"
                style={{ aspectRatio: '1/1' }}
                hoverColor={COLORS.red.pure}
              >
                <div className="absolute inset-0">
                  <img
                    src={post.image}
                    alt="Instagram post"
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

                  {/* Hover Stats */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center gap-2 font-mono text-sm text-[#E0E0E0]">
                      <Heart size={16} className="text-[#8B0000]" />
                      <span>{(post.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm text-[#E0E0E0]">
                      <MessageCircle size={16} className="text-[#8B0000]" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </HandDrawnBox>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#8B0000]/30">
          <div className="flex justify-center">
            {/* CTA Instagram */}
            <Button
              as="a"
              href="https://www.instagram.com/untouchables.fr/"
              external
              variant="primary"
              size="md"
            >
              Rejoindre la communauté sur Insta
            </Button>
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}