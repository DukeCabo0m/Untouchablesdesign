import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { Link } from 'react-router';
import { Heart, MessageCircle, ArrowRight, Instagram } from 'lucide-react';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { useState, useEffect } from 'react';
import { projectId } from '/utils/supabase/info';

export function FanContributionsSection() {
  const [contributions, setContributions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/contributions/featured`
        );
        
        if (response.ok) {
          const data = await response.json();
          setContributions(data.contributions || []);
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-12 px-0 pb-4">
      {/* Animated gradient background */}
      {/* <AnimatedGradientBackground 
        colors={['#0A0A0A', '#1A0000', '#0A0A0A']} 
        opacity={0.3}
      /> */}

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16">
          <SectionHeading 
            title="Galerie Family Values" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description="Tatouages, fan-arts, vinyles rares et souvenirs de concerts : plongez dans la créativité débordante des Korn Kids et découvrez les trésors de la communauté."
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="mt-4"
          >
            <Button
              href="/contributions"
              variant="primary"
            >
              Voir toute la galerie
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* Contributions Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            <div className="col-span-4 text-center">
              <p className="font-mono text-[#E0E0E0]/60 text-sm leading-snug">Chargement des contributions...</p>
            </div>
          ) : (
            contributions.map((contribution, index) => (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                {/* Image container */}
                <HandDrawnBox
                  color="#8B00004D"
                  strokeWidth={3}
                  roughness={2.5}
                  padding="0"
                  hoverColor="#8B0000"
                >
                  <div className="relative aspect-square overflow-hidden transition-all duration-300 cursor-pointer mb-3 bg-[#000000]">
                    {/* Image */}
                    <img
                      src={contribution.image}
                      alt={contribution.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        filter: 'contrast(1.4) brightness(0.7) saturate(0.8)',
                      }}
                    />

                    {/* Type badge - top left */}
                    <div className="absolute top-2 left-2 bg-[#8B0000] px-2 py-1 font-mono text-[#E0E0E0] uppercase z-10 text-xs">
                      {contribution.type}
                    </div>

                    {/* Scanlines overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.15) 2px, rgba(139, 0, 0, 0.15) 4px)',
                      }}
                    />
                  </div>
                </HandDrawnBox>

                {/* Legend below image */}
                <div className="space-y-1">
                  <h4 className="font-heading text-[#E0E0E0] text-lg font-bold uppercase tracking-tight">
                    {contribution.legend}
                  </h4>
                  <p className="font-mono text-[#E0E0E0]/60 text-sm leading-snug">
                    {contribution.subtitle}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Call to Action - Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            padding="0"
          >
            <div className="bg-[#8B0000]/25 p-6">
              <div className="flex items-center gap-12">
                {/* Call to Action Title */}
                <h3 className="font-black text-xl text-[#E0E0E0] whitespace-nowrap uppercase">
                  <span className="text-[#8B0000]">#</span> Rejoins le mur des fans
                </h3>
                
                {/* Text */}
                <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed flex-1 mr-8">
                  Toi aussi, affiche ta passion. Partage tes créations ou ta collection sur Instagram et apparais ici automatiquement. <span className="text-[#8B0000] font-black">Utilise le tag #UntouchablesFR</span>
                </p>
                
                {/* Button */}
                <Button
                  as="a"
                  href="https://www.instagram.com/untouchables.fr/"
                  external
                  variant="primary"
                  size="md"
                >
                  <Instagram size={14} />
                  Poster sur Instagram
                </Button>
              </div>
            </div>
          </HandDrawnBox>
        </motion.div>
      </div>
    </section>
  );
}