import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Heart, MessageCircle, Filter } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Link } from 'react-router';

const CONTRIBUTION_TYPES = [
  { value: 'all', label: 'Tout' },
  { value: 'tattoo', label: 'Tattoos' },
  { value: 'collection', label: 'Collections' },
  { value: 'fanart', label: 'Fan-arts' },
  { value: 'photo', label: 'Photos' },
];

export function ContributionsPage() {
  const [contributions, setContributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/contributions`
        );
        
        if (response.ok) {
          const data = await response.json();
          setContributions(data.contributions || []);
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const filteredContributions = selectedType === 'all' 
    ? contributions 
    : contributions.filter(c => c.type === selectedType);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Contributions Fans"
        description="Découvrez les créations, collections et souvenirs de la communauté Untouchables.<br />Partagez votre passion pour Korn avec le monde entier."
        backgroundImage="https://images.unsplash.com/photo-1506157786151-b8491531f063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm93ZCUyMGNvbmNlcnQlMjBkYXJrfGVufDF8fHx8MTc2OTE5MzA1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'CONTRIBUTIONS' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Filter Bar */}
          <div className="mb-8 bg-[#0A0A0A] border border-[#8B0000]/30 p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-[#8B0000]" />
                <span className="font-black text-sm text-[#8B0000] uppercase">
                  Filtrer :
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {CONTRIBUTION_TYPES.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 font-mono text-xs uppercase transition-all ${
                      selectedType === type.value
                        ? 'bg-[#8B0000] text-[#F0F0F0] border-2 border-[#8B0000]'
                        : 'bg-transparent text-[#F0F0F0] border-2 border-[#8B0000]/30 hover:border-[#8B0000]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <span className="ml-auto font-mono text-xs text-[#F0F0F0]/60">
                {filteredContributions.length} contribution{filteredContributions.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="font-mono text-sm text-[#8B0000] animate-pulse">
                Chargement des contributions...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredContributions.length === 0 && (
            <div className="text-center py-12 bg-[#0A0A0A] border border-[#8B0000]/30 p-8">
              <p className="font-mono text-sm text-[#F0F0F0]/60">
                Aucune contribution trouvée pour ce filtre.
              </p>
            </div>
          )}

          {/* Contributions Grid */}
          {!loading && filteredContributions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContributions.map((contrib, index) => (
                <motion.div
                  key={contrib.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/20 hover:border-[#8B0000] transition-all overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={contrib.image}
                        alt={contrib.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Scanlines */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                        }}
                      />

                      {/* Type Badge */}
                      <div className="absolute top-2 right-2 bg-[#8B0000] px-2 py-1">
                        <span className="font-mono text-[10px] text-[#F0F0F0] uppercase font-black">
                          {contrib.legend}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Caption */}
                      <p className="font-mono text-xs text-[#F0F0F0] mb-3 line-clamp-2">
                        {contrib.caption}
                      </p>

                      {/* Subtitle */}
                      {contrib.subtitle && (
                        <p className="font-mono text-[10px] text-[#F0F0F0]/60 mb-3">
                          {contrib.subtitle}
                        </p>
                      )}

                      {/* Author & Stats */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[#8B0000] font-black">
                          @{contrib.author}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart size={14} className="text-[#8B0000]" />
                            <span className="font-mono text-[#F0F0F0]/60">
                              {contrib.likes || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={14} className="text-[#8B0000]" />
                            <span className="font-mono text-[#F0F0F0]/60">
                              {contrib.comments || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {contrib.tags && contrib.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#8B0000]/20">
                          {contrib.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] text-[#F0F0F0]/40 bg-[#8B0000]/10 px-2 py-1"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-8">
            <h3 className="font-black text-xl text-[#8B0000] uppercase mb-4">
              Envie de partager ta passion ?
            </h3>
            <p className="font-mono text-sm text-[#F0F0F0]/70 mb-6 max-w-2xl">
              Partage tes tattoos, ta collection, tes fanarts ou tes photos de concerts avec la communauté Untouchables. Chaque contribution approuvée sera mise en avant sur le site et pourra être publiée dans le fanzine mensuel.
            </p>
            <Link
              to="/contribute"
              className="inline-block px-6 py-3 bg-[#8B0000] text-[#F0F0F0] font-black text-sm uppercase hover:bg-transparent hover:border-2 hover:border-[#8B0000] transition-all"
            >
              Soumettre une contribution
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}