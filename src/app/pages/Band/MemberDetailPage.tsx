import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { ChevronLeft, Calendar, Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import { membersApi } from '@/app/utils/api';

export function MemberDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load member from backend
  useEffect(() => {
    async function loadMember() {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log('[MemberDetailPage] Loading member:', slug);
        
        // Get all members and find by slug
        const members = await membersApi.getAll();
        const foundMember = members.find((m: any) => m.slug === slug);
        
        if (!foundMember) {
          setError('Membre non trouvé');
          setIsLoading(false);
          return;
        }
        
        console.log('[MemberDetailPage] Found member:', foundMember);
        
        setMember(foundMember);
        setError(null);
      } catch (err) {
        console.error('[MemberDetailPage] Failed to load member:', err);
        setError('Impossible de charger le membre');
      } finally {
        setIsLoading(false);
      }
    }
    loadMember();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="font-mono text-[#8B0000] text-lg animate-pulse">
          Chargement du membre...
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <h1
            className="text-5xl font-black text-[#E0E0E0] uppercase mb-4"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            MEMBRE INTROUVABLE
          </h1>
          <Link
            to="/band/members"
            className="font-mono text-sm text-[#8B0000] hover:underline flex items-center justify-center gap-2"
          >
            <ChevronLeft size={16} />
            RETOUR AUX MEMBRES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title={member.name}
        description={`${member.role}<br />${member.period}`}
        backgroundImage="https://images.unsplash.com/photo-1719353128335-725362ed1c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMHBvcnRyYWl0JTIwZGFya3xlbnwxfHx8fDE3NjkxNzY3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'LE GROUPE', path: '/band' },
          { label: 'MEMBRES', path: '/band/members' },
          { label: member.name.toUpperCase() }
        ]}
        glitchIntensity="high"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/band/members"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#8B0000] hover:text-[#E0E0E0] transition-colors uppercase"
            >
              <ChevronLeft size={16} />
              RETOUR AUX MEMBRES
            </Link>
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left column - Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-32">
                <div className="aspect-[3/4] overflow-hidden border-4 border-[#8B0000] relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  {member.status === 'former' && (
                    <div className="absolute top-6 left-6 font-mono text-xs text-[#E0E0E0] bg-[#8B0000] px-4 py-2">
                      LÉGENDE
                    </div>
                  )}
                </div>

                {/* Quick info */}
                <div className="mt-6 space-y-4">
                  {member.birthDate && (
                    <div className="flex items-start gap-3 font-mono text-xs text-[#E0E0E0]">
                      <Calendar className="text-[#8B0000] mt-0.5" size={16} />
                      <div>
                        <div className="text-[#E0E0E0]/50 uppercase mb-1">Date de naissance</div>
                        <div>{member.birthDate}</div>
                      </div>
                    </div>
                  )}
                  {member.instruments && member.instruments.length > 0 && (
                    <div className="flex items-start gap-3 font-mono text-xs text-[#E0E0E0]">
                      <Music className="text-[#8B0000] mt-0.5" size={16} />
                      <div>
                        <div className="text-[#E0E0E0]/50 uppercase mb-1">Instruments</div>
                        <div>{member.instruments.join(', ')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {/* Name */}
              <h1
                className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-tighter mb-4"
                style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
              >
                <GlitchText>{member.name}</GlitchText>
              </h1>

              {/* Role */}
              <div className="mb-8">
                <p className="font-mono text-lg text-[#8B0000] uppercase mb-2">
                  {member.role}
                </p>
                <p className="font-mono text-sm text-[#E0E0E0]/70">
                  {member.period}
                </p>
              </div>

              <div className="h-1 w-32 bg-[#8B0000] mb-12" />

              {/* Bio */}
              <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-6">
                {member.bio.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Tags/Keywords */}
              {member.instruments && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-12 border-t border-[#E0E0E0]/20"
                >
                  <h3 className="font-mono text-xs text-[#8B0000] uppercase mb-4">
                    INSTRUMENTS & TECHNIQUES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.instruments.map((instrument, i) => (
                      <span
                        key={i}
                        className="font-mono text-xs text-[#E0E0E0] bg-[#E0E0E0]/10 px-4 py-2 border border-[#E0E0E0]/20 hover:border-[#8B0000] transition-colors"
                      >
                        {instrument}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-12 p-6 bg-[#0A0A0A] border-l-4 border-[#8B0000]"
              >
                <div className="font-mono text-xs">
                  <span className="text-[#8B0000] uppercase">STATUT // </span>
                  <span className="text-[#E0E0E0]">
                    {member.status === 'active' ? 'MEMBRE ACTIF' : 'ANCIEN MEMBRE'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}