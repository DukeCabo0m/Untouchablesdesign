import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { concerts } from '@/app/data/concerts';
import { FlagIcon } from '@/app/components/FlagIcon';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { COLORS } from '@/app/constants/colors';

export function UpcomingToursSection() {
  // Get next 4 upcoming concerts
  const upcomingConcerts = concerts
    .filter(c => c.status === 'upcoming' || c.status === 'sold-out')
    .slice(0, 4);

  return (
    <section className="bg-[#0A0A0A] py-12 px-0">
      <div>
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16">
          <SectionHeading 
            title="ON_THE_ROAD" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description={
              <>
                Retrouvez toutes les dates de concerts de Korn à travers le monde.<br />
                Réservez vos places dès maintenant pour ne rien manquer de la tournée 2026.
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
              href="/tour"
              variant="primary"
            >
              TOUTES LES DATES
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* Concerts List */}
        <div className="space-y-4">
          {upcomingConcerts.map((concert, index) => (
            <motion.div
              key={concert.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <HandDrawnBox
                color="#8B00004D"
                strokeWidth={3}
                roughness={2.5}
                padding="0"
                hoverColor="#8B0000"
              >
                <div className="bg-[#1A1A1A] flex items-center justify-between gap-6 px-5 py-4">
                  {/* Date */}
                  <div className="bg-[#8B0000] px-4 py-2 min-w-[120px] shrink-0">
                    <p className="font-mono text-sm text-[#E0E0E0] uppercase">
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
                    {concert.status === 'upcoming' ? (
                      <Button
                        as="a"
                        href={concert.ticketsUrl || '#'}
                        external
                        variant="primary"
                        size="md"
                        className="w-[180px]"
                      >
                        <Ticket size={16} />
                        BILLETERIE
                      </Button>
                    ) : (
                      <Button
                        as="button"
                        disabled
                        variant="secondary"
                        size="md"
                        className="w-[180px] opacity-70 cursor-not-allowed"
                      >
                        <Ticket size={16} />
                        COMPLET
                      </Button>
                    )}
                  </div>
                </div>
              </HandDrawnBox>
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
          <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed">
            <span className="text-[#8B0000] font-bold">INFO :</span> Les dates et horaires sont susceptibles de changer. 
            Vérifiez toujours auprès des organisateurs avant d'acheter vos billets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}