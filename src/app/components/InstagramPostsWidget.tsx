import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { Button } from './Button';
import { COLORS } from '@/app/constants/colors';
import { useState, useEffect } from 'react';
import { projectId } from '/utils/supabase/info';

export function InstagramPostsWidget() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/media/instagram`
        );
        
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
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
          <Instagram size={24} className="md:w-7 md:h-7 text-[#8B0000]" />
          <h3 className="font-black text-base md:text-lg uppercase tracking-tight text-[#E0E0E0] leading-tight">
            Le Quartier Général Social des Korn Kids
          </h3>
        </div>

        {/* Description */}
        <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 mb-4 md:mb-6 leading-relaxed">
          Débats sur les albums, sondages en Story et partages de fans : là où la communauté vibre au quotidien.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {isLoading ? (
            <div className="col-span-2 text-center text-[#E0E0E0]/70">Chargement...</div>
          ) : (
            posts.map((post) => (
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
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 md:gap-3">
                      <div className="flex items-center gap-1.5 md:gap-2 font-mono text-xs md:text-sm text-[#E0E0E0]">
                        <Heart size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                        <span>{(post.likes / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 font-mono text-xs md:text-sm text-[#E0E0E0]">
                        <MessageCircle size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </HandDrawnBox>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#8B0000]/30">
          <div className="flex justify-center">
            <Button
              as="a"
              href="https://www.instagram.com/untouchables.fr/"
              external
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <span className="hidden md:inline">Rejoindre la communauté sur Insta</span>
              <span className="md:hidden">Suivre sur Insta</span>
            </Button>
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}