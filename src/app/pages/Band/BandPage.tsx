import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { getActiveMembers, getFormerMembers } from '@/app/data/members';
import { ChevronRight, Users, BookOpen } from 'lucide-react';

export function BandPage() {
  const activeMembers = getActiveMembers();
  const formerMembers = getFormerMembers();

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="LE GROUPE"
        description="Découvrez l'histoire et les membres de Korn.<br />De Bakersfield 1993 à aujourd'hui, 30+ ans de révolution nu metal."
        backgroundImage="https://images.unsplash.com/photo-1760574752329-5df6337d37f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kJTIwbWVtYmVycyUyMHBvcnRyYWl0JTIwZGFya3xlbnwxfHx8fDE3NjkxOTI3Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'LE GROUPE' }
        ]}
        glitchIntensity="low"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
          >
            <Link
              to="/band/biography"
              className="group relative bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#8B0000] opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <BookOpen className="w-12 h-12 text-[#8B0000] mb-4" strokeWidth={1.5} />
                <h2
                  className="text-3xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  BIOGRAPHIE COMPLÈTE
                </h2>
                <p className="font-mono text-sm text-[#E0E0E0]/70 mb-4">
                  L'histoire de Korn, de Bakersfield 1993 à aujourd'hui. 30+ ans de révolution nu metal.
                </p>
                <div className="flex items-center text-[#8B0000] font-mono text-xs uppercase group-hover:translate-x-2 transition-transform">
                  <span>LIRE LA BIO</span>
                  <ChevronRight className="ml-2" size={16} />
                </div>
              </div>
            </Link>

            <Link
              to="/band/members"
              className="group relative bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#8B0000] opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10">
                <Users className="w-12 h-12 text-[#8B0000] mb-4" strokeWidth={1.5} />
                <h2
                  className="text-3xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  LES MEMBRES
                </h2>
                <p className="font-mono text-sm text-[#E0E0E0]/70 mb-4">
                  Découvrez les artistes derrière la légende. Biographies détaillées et parcours.
                </p>
                <div className="flex items-center text-[#8B0000] font-mono text-xs uppercase group-hover:translate-x-2 transition-transform">
                  <span>VOIR LES MEMBRES</span>
                  <ChevronRight className="ml-2" size={16} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Active Members Preview */}
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
              <GlitchText glitchIntensity="medium">FORMATION ACTUELLE</GlitchText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeMembers.map((member, index) => (
                <Link
                  key={member.id}
                  to={`/band/members/${member.slug}`}
                  className="group relative bg-[#0A0A0A] border border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-2xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                        style={{ fontFamily: 'Arial Black, sans-serif' }}
                      >
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-[#8B0000] uppercase mb-2">
                        {member.role}
                      </p>
                      <p className="font-mono text-xs text-[#E0E0E0]/50">
                        {member.period}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="text-[#8B0000]" size={24} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
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
                <GlitchText glitchIntensity="medium">ANCIENS MEMBRES</GlitchText>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formerMembers.map((member, index) => (
                  <Link
                    key={member.id}
                    to={`/band/members/${member.slug}`}
                    className="group relative bg-[#0A0A0A] border border-[#E0E0E0]/20 hover:border-[#8B0000] transition-all overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3
                          className="text-2xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                          style={{ fontFamily: 'Arial Black, sans-serif' }}
                        >
                          {member.name}
                        </h3>
                        <p className="font-mono text-xs text-[#8B0000] uppercase mb-2">
                          {member.role}
                        </p>
                        <p className="font-mono text-xs text-[#E0E0E0]/50">
                          {member.period}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="text-[#8B0000]" size={24} />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}