import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { BookOpen, Download, ArrowRight, Edit3, FileText, Palette, Music } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Link } from 'react-router';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { HandDrawnVerticalLine } from './HandDrawnVerticalLine';
import { getGafferTexture } from '@/app/utils/gafferTexture';
import fanzineCover from 'figma:asset/296b34a179fdfc8137e3c3204449a6f5ed2d93e7.png';
import { useState, useEffect } from 'react';
import { projectId } from '/utils/supabase/info';

export function FanzineSection() {
  const [fanzine, setFanzine] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFanzine = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/fanzines/latest`
        );
        
        if (response.ok) {
          const data = await response.json();
          setFanzine(data.fanzine);
        }
      } catch (error) {
        console.error('Error fetching latest fanzine:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFanzine();
  }, []);

  // Format publication date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  // Default to fallback if no fanzine
  const displayFanzine = fanzine || {
    issueNumber: 1,
    title: 'KORN 2026 : REWIND',
    publicationDate: '2026-04-01',
    coverImage: fanzineCover,
    description: 'Pourquoi le groupe retourne à l\'enregistrement sur bande.',
    pages: 12,
  };

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
            title="L'Édition Papier" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description={
              <>
                Marre des écrans ? Recevez chaque mois un véritable objet de collection dans votre boîte aux lettres.{' '}
                <span className="text-[#8B0000] font-black">12 pages d'analyses exclusives, poster A3 et stickers pour les puristes.</span>
              </>
            }
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="mt-4"
          >
            <Button
              href="/fanzine"
              variant="primary"
            >
              S'abonner au Fanzine
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* Layout 3 Colonnes Équilibrées - Option C */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE 1 : Couverture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="group cursor-pointer flex w-full">
              <HandDrawnBox
                color="#8B0000"
                strokeWidth={3}
                roughness={2.5}
                padding="0"
                className="w-full"
              >
                <div className="relative overflow-hidden w-full bg-[#8B0000]" style={{ aspectRatio: '210/297' }}>
                  <img
                    src={displayFanzine.coverImage}
                    alt={`Fanzine Untouchables #${displayFanzine.issueNumber}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      console.error('Image failed to load:', displayFanzine.coverImage);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Label overlay */}
                  <div 
                    className="absolute bottom-4 right-4 z-10 px-3 py-2 font-mono tracking-tight"
                    style={{
                      color: '#FFFFFF',
                      backgroundImage: `url(${getGafferTexture('red')})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      clipPath: `polygon(
                        3% 0%, 5% 2%, 8% 1%, 12% 3%, 15% 1%, 20% 2%, 25% 0%, 30% 1%, 35% 3%, 40% 1%, 
                        45% 2%, 50% 0%, 55% 2%, 60% 1%, 65% 3%, 70% 1%, 75% 2%, 80% 0%, 85% 3%, 
                        90% 1%, 94% 2%, 97% 0%, 99% 3%, 100% 6%, 100% 10%, 99% 15%, 100% 20%, 
                        99% 30%, 100% 40%, 99% 50%, 100% 60%, 99% 70%, 100% 80%, 99% 85%, 100% 90%, 
                        99% 94%, 97% 97%, 100% 100%, 95% 99%, 90% 100%, 85% 98%, 80% 100%, 75% 99%, 
                        70% 100%, 65% 98%, 60% 100%, 55% 99%, 50% 100%, 45% 99%, 40% 100%, 35% 98%, 
                        30% 100%, 25% 99%, 20% 100%, 15% 98%, 10% 100%, 5% 99%, 2% 97%, 0% 100%, 
                        1% 95%, 0% 90%, 2% 85%, 0% 80%, 1% 70%, 0% 60%, 1% 50%, 0% 40%, 1% 30%, 
                        0% 20%, 1% 15%, 0% 10%, 2% 6%
                      )`,
                      transform: 'rotate(-0.5deg)',
                    }}
                  >
                    <p className="font-black text-xs uppercase tracking-wider text-center">
                      NUMÉRO #{displayFanzine.issueNumber} • {formatDate(displayFanzine.publicationDate).toUpperCase()}
                    </p>
                  </div>
                </div>
              </HandDrawnBox>
            </div>
          </motion.div>

          {/* COLONNE 2 : Info Dossier + Prix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Info Dossier */}
            <div className="flex flex-col">
              <h3 className="font-black text-2xl text-[#E0E0E0] uppercase mb-4 leading-tight">
                Dossier : Korn et le Retour de l'Analogique
              </h3>
              
              <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed mb-6">
                {displayFanzine.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#8B0000] text-sm">▸</span>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    <span className="font-black text-[#E0E0E0]">RAW POWER</span> - Retour à l'enregistrement sur bande
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#8B0000] text-sm">▸</span>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    <span className="font-black text-[#E0E0E0]">HERE TO STAY</span> - Rétrospective Untouchables (2002-2026)
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#8B0000] text-sm">▸</span>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    <span className="font-black text-[#E0E0E0]">FAMILY VALUES</span> - Tattoos, collections & communauté
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#8B0000] text-sm">▸</span>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    <span className="font-black text-[#E0E0E0]">Poster A3 exclusif</span> + stickers collector
                  </p>
                </div>
              </div>
            </div>

            {/* Section Prix */}
            <div className="relative pl-6 pr-6 py-6 bg-[#8B0000]/25">
              <div className="absolute left-0 top-0 bottom-0">
                <HandDrawnVerticalLine 
                  color="#8B0000" 
                  strokeWidth={4} 
                  roughness={2.5} 
                  passes={3}
                  opacity={0.9}
                />
              </div>
              
              <h4 className="font-black text-sm text-[#8B0000] uppercase mb-2">
                Pack 3 mois
              </h4>
              <p className="font-mono text-xs text-[#E0E0E0]/60 italic mb-4">
                Un engagement court, idéal pour tester.
              </p>
              
              <div className="space-y-2 mb-4">
                <p className="font-mono text-sm text-[#E0E0E0]/70">
                  🇫🇷 Dès 22,50 €
                </p>
                <p className="font-mono text-sm text-[#E0E0E0]/70">
                  🇧🇪🇨🇭 Dès 30,00 €
                </p>
              </div>

              <div className="w-fit">
                <Button
                  href="/fanzine"
                  variant="primary"
                  size="sm"
                >
                  Commander
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* COLONNE 3 : Contribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <HandDrawnBox
              color="#8B0000"
              strokeWidth={3}
              roughness={2.5}
              padding="0"
            >
              <div className="bg-[#8B0000]/25 p-6 flex flex-col h-full">
                <h3 className="font-black text-lg text-[#E0E0E0] uppercase mb-4 leading-tight">
                  Devenez Rédacteur
                </h3>
                <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed mb-6">
                  Ce fanzine est le vôtre. Votre plume ou votre art méritent d'être imprimés.
                </p>
                
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <FileText size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-[#E0E0E0] uppercase mb-1 text-sm">
                        Chroniques
                      </h4>
                      <p className="font-mono text-xs text-[#E0E0E0]/60">
                        Analyses & concerts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Palette size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-[#E0E0E0] uppercase mb-1 text-sm">
                        Fan-Arts
                      </h4>
                      <p className="font-mono text-xs text-[#E0E0E0]/60">
                        Illustrations & Photo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Music size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-[#E0E0E0] uppercase mb-1 text-sm">
                        Collections
                      </h4>
                      <p className="font-mono text-xs text-[#E0E0E0]/60">
                        Merch rare & Tattoos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-fit ml-auto">
                  <Button
                    href="/fanzine"
                    variant="primary"
                    size="sm"
                  >
                    <Edit3 size={16} />
                    Contribuer
                  </Button>
                </div>
              </div>
            </HandDrawnBox>
          </motion.div>
        </div>
      </div>
    </section>
  );
}