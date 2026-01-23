import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { getActiveMembers, getFormerMembers } from '@/app/data/members';
import { ChevronRight } from 'lucide-react';

export function MembersPage() {
  const activeMembers = getActiveMembers();
  const formerMembers = getFormerMembers();

  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1
            className="text-7xl md:text-9xl font-black text-[#E0E0E0] uppercase tracking-tighter mb-6"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText>LES MEMBRES</GlitchText>
          </h1>
          <div className="h-1 w-32 bg-[#8B0000]" />
          <p className="font-mono text-sm text-[#E0E0E0]/70 mt-6 max-w-2xl">
            Les artistes qui ont façonné le son révolutionnaire de Korn. Formation actuelle et légendes historiques.
          </p>
        </motion.div>

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
      </div>
    </div>
  );
}