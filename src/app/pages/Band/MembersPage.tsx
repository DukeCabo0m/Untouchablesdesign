import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { membersApi } from '@/app/utils/api';

export function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load members from backend
  useEffect(() => {
    async function loadMembers() {
      try {
        setIsLoading(true);
        console.log('[MembersPage] Loading members from backend...');
        
        const data = await membersApi.getAll();
        console.log('[MembersPage] Received members:', data);
        
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error('[MembersPage] Failed to load members:', err);
        setError('Impossible de charger les membres');
        setMembers([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadMembers();
  }, []);

  const activeMembers = members.filter((m: any) => m.status === 'active');
  const formerMembers = members.filter((m: any) => m.status === 'former');

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="LES MEMBRES"
        description="Les artistes qui ont façonné le son révolutionnaire de Korn.<br />Formation actuelle et légendes historiques."
        backgroundImage="https://images.unsplash.com/photo-1760094745052-33d1d2087db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYmFuZCUyMG1lbWJlcnMlMjBncm91cHxlbnwxfHx8fDE3NjkxOTM1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'LE GROUPE', path: '/band' },
          { label: 'MEMBRES' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="font-mono text-[#8B0000] text-lg animate-pulse">
                Chargement des membres...
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-20">
              <div className="font-mono text-[#8B0000] text-lg mb-4">
                {error}
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="font-mono text-sm text-[#E0E0E0] hover:text-[#8B0000] transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Content */}
          {!isLoading && !error && (
            <>
              {/* Active Members */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-24"
              >
                <h2
                  className="text-5xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  <span className="text-[#8B0000]">&gt;&gt;</span> FORMATION ACTUELLE
                </h2>
                
                {activeMembers.length === 0 ? (
                  <div className="font-mono text-sm text-[#E0E0E0]/50 text-center py-12">
                    Aucun membre actif pour le moment
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeMembers.map((member, index) => (
                      <Link
                        key={member.id}
                        to={`/band/members/${member.slug}`}
                        className="group relative bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {/* Image */}
                          <div className="aspect-[3/4] overflow-hidden relative">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                          </div>

                          {/* Info */}
                          <div className="p-6 relative">
                            <div className="absolute -top-8 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="text-[#8B0000]" size={32} strokeWidth={2} />
                            </div>
                            <h3
                              className="text-2xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                              style={{ fontFamily: 'Arial Black, sans-serif' }}
                            >
                              {member.name}
                            </h3>
                            <p className="font-mono text-xs text-[#8B0000] uppercase mb-3 leading-relaxed">
                              {member.role}
                            </p>
                            <p className="font-mono text-xs text-[#E0E0E0]/50 mb-4">
                              {member.period}
                            </p>
                            {member.instruments && (
                              <div className="flex flex-wrap gap-2">
                                {member.instruments.map((instrument, i) => (
                                  <span
                                    key={i}
                                    className="font-mono text-[10px] text-[#E0E0E0] bg-[#E0E0E0]/10 px-2 py-1 border border-[#E0E0E0]/20"
                                  >
                                    {instrument}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Former Members */}
              {formerMembers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2
                    className="text-5xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    <span className="text-[#8B0000]">&gt;&gt;</span> ANCIENS MEMBRES
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {formerMembers.map((member, index) => (
                      <Link
                        key={member.id}
                        to={`/band/members/${member.slug}`}
                        className="group relative bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {/* Image */}
                          <div className="aspect-[3/4] overflow-hidden relative">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#E0E0E0] bg-[#8B0000]/80 px-3 py-1">
                              LÉGENDE
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-6 relative">
                            <div className="absolute -top-8 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="text-[#8B0000]" size={32} strokeWidth={2} />
                            </div>
                            <h3
                              className="text-2xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                              style={{ fontFamily: 'Arial Black, sans-serif' }}
                            >
                              {member.name}
                            </h3>
                            <p className="font-mono text-xs text-[#8B0000] uppercase mb-3 leading-relaxed">
                              {member.role}
                            </p>
                            <p className="font-mono text-xs text-[#E0E0E0]/50 mb-4">
                              {member.period}
                            </p>
                            {member.instruments && (
                              <div className="flex flex-wrap gap-2">
                                {member.instruments.map((instrument, i) => (
                                  <span
                                    key={i}
                                    className="font-mono text-[10px] text-[#E0E0E0] bg-[#E0E0E0]/10 px-2 py-1 border border-[#E0E0E0]/20"
                                  >
                                    {instrument}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}