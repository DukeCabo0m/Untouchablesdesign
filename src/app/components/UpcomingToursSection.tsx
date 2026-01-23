import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { concerts } from '@/app/data/concerts';
import { FlagIcon } from '@/app/components/FlagIcon';
import { GlitchText } from './GlitchText';

export function UpcomingToursSection() {
  // Get next 4 upcoming concerts
  const upcomingConcerts = concerts
    .filter(c => c.status === 'upcoming' || c.status === 'sold-out')
    .slice(0, 4);

  return (
    <section className="bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              <span className="text-[#8B0000]">&gt;&gt;</span>{' '}
              <GlitchText glitchIntensity="low">ON_THE_ROAD</GlitchText>
            </h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '128px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-[#8B0000]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/tour"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase hover:bg-[#8B0000] transition-colors cursor-none"
            >
              TOUTES LES DATES
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-[#E0E0E0]/70 mb-12 max-w-3xl"
        >
          <span className="text-[#8B0000] font-black">//</span> Retrouvez toutes les dates de concerts de Korn à travers le monde.<br />
          Réservez vos places dès maintenant pour ne rien manquer de la tournée 2026.
        </motion.p>

        {/* Concerts List */}
        <div className="space-y-4">
          {upcomingConcerts.map((concert, index) => (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-[#1A1A1A] border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-300 group cursor-none"
            >
              <div className="flex items-center justify-between gap-6 px-5 py-4">
                {/* Date */}
                <div className="bg-[#8B0000] px-4 py-2 min-w-[120px] shrink-0">
                  <p className="font-mono text-xs text-[#E0E0E0] uppercase">
                    {new Date(concert.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Ville & Pays + Salle + Support - Tout sur une ligne */}
                <div className="flex-1 min-w-0">
                  <Link to={`/tour/concert/${concert.slug}`}>
                    <div className="flex items-center gap-3">
                      <FlagIcon country={concert.country} size={18} />
                      <h3 className="text-lg font-black text-[#FFFFFF] uppercase group-hover:text-[#8B0000] transition-colors">
                        {concert.city}, {concert.country}
                      </h3>
                      <span className="text-[#a8a8a8] font-mono text-sm">• {concert.venue}</span>
                      {concert.support && (
                        <span className="text-[#8B0000] font-mono text-sm font-bold">• Support : {concert.support}</span>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Bouton */}
                <div className="shrink-0">
                  <a
                    href={concert.ticketsUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-3 px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-none border-2 whitespace-nowrap w-[180px] ${
                      concert.status === 'upcoming'
                        ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] hover:bg-transparent hover:border-[#FFFFFF]'
                        : concert.status === 'sold-out'
                        ? 'bg-transparent text-[#8B0000] border-[#8B0000]/50 cursor-not-allowed opacity-70'
                        : 'bg-transparent text-[#8B0000] border-[#8B0000]/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Ticket size={16} />
                    {concert.status === 'upcoming' ? 'BILLETERIE' : 'COMPLET'}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6"
        >
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
            <span className="text-[#8B0000] font-bold">INFO :</span> Les dates et horaires sont susceptibles de changer. 
            Vérifiez toujours auprès des organisateurs avant d'acheter vos billets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}