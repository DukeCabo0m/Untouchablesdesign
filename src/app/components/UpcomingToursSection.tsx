import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { FlagIcon } from '@/app/components/FlagIcon';
import { GlitchText } from './GlitchText';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { HandDrawnVerticalLine } from './HandDrawnVerticalLine';
import { COLORS } from '@/app/constants/colors';
import { useState, useEffect } from 'react';
import { concertsApi } from '@/app/utils/api';

// Map backend concert to frontend format
function mapBackendConcert(concert: any) {
  // Generate slug from id and city if not present
  const slug = concert.slug || `${concert.city.toLowerCase().replace(/\s+/g, '-')}-${concert.id}`;
  
  return {
    id: concert.id,
    slug,
    date: concert.date,
    venue: concert.venue || 'Venue TBA',
    city: concert.city,
    country: concert.country,
    status: concert.status === 'scheduled' ? 'upcoming' : concert.status,
    ticketsUrl: concert.ticketUrl || '#',
    support: concert.support || null,
  };
}

export function UpcomingToursSection() {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load concerts from backend
  useEffect(() => {
    async function loadConcerts() {
      try {
        setIsLoading(true);
        const data = await concertsApi.getAll();
        // Filter scheduled/upcoming concerts and sort by date
        const upcomingConcerts = data
          .filter((c: any) => c.status === 'scheduled')
          .map(mapBackendConcert)
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setConcerts(upcomingConcerts);
        setError(null);
      } catch (err) {
        console.error('[UpcomingToursSection] Failed to load concerts:', err);
        setError('Impossible de charger les concerts');
        setConcerts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadConcerts();
  }, []);

  // Get next 4 upcoming concerts
  const upcomingConcerts = concerts.slice(0, 4);

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0">
        <div>
          <div className="flex items-center justify-center h-48 md:h-64">
            <div className="font-mono text-[#8B0000] text-base md:text-lg animate-pulse">
              Chargement des concerts...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error or no concerts state
  if (error || concerts.length === 0) {
    return (
      <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0">
        <div>
          <div className="flex items-center justify-center h-48 md:h-64">
            <div className="font-mono text-[#E0E0E0]/50 text-base md:text-lg">
              {error || 'Aucun concert à venir pour le moment'}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0A] py-8 md:py-10 lg:py-12 px-0">
      <div>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 mb-12 md:mb-14 lg:mb-16">
          <SectionHeading 
            title="Tournée 2026" 
            glitchIntensity="low"
            maxWidth="max-w-3xl"
            description="Paris, Berlin, Londres... Retrouvez toutes les dates confirmées, les premières parties exceptionnelles et les liens officiels pour garantir votre place dans la fosse."
          />
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
            className="w-full lg:w-auto lg:mt-4"
          >
            <Button
              href="/tour"
              variant="primary"
              className="w-full lg:w-auto"
            >
              <span className="hidden md:inline">Voir le calendrier complet</span>
              <span className="md:hidden">Calendrier complet</span>
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        {/* Concerts List */}
        <div className="space-y-3 md:space-y-4">
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
                <div className="bg-[#1A1A1A]">
                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center justify-between gap-6 px-5 py-4">
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
                          {concert.status === 'sold-out' && (
                            <span className="bg-[#FFFFFF] text-[#000000] px-3 py-1 text-xs font-mono font-bold uppercase">
                              COMPLET
                            </span>
                          )}
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
                          className="w-[340px]"
                        >
                          Réserver ma place à {concert.city}
                        </Button>
                      ) : (
                        <Button
                          as="a"
                          href="https://www.ticketswap.fr"
                          external
                          variant="secondary"
                          size="md"
                          className="w-[340px]"
                        >
                          Chercher une revente officielle
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden p-4">
                    {/* Date Badge */}
                    <div className="bg-[#8B0000] px-3 py-2 mb-3 inline-block">
                      <p className="font-mono text-xs md:text-sm text-[#E0E0E0] uppercase">
                        {new Date(concert.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <Link to={`/tour/concert/${concert.slug}`}>
                      {/* City & Country */}
                      <div className="flex items-center gap-2 mb-2">
                        <FlagIcon country={concert.country} size={16} />
                        <h3 className="text-base md:text-lg font-black text-[#FFFFFF] uppercase group-hover:text-[#8B0000] transition-colors">
                          {concert.city}, {concert.country}
                        </h3>
                        {concert.status === 'sold-out' && (
                          <span className="bg-[#FFFFFF] text-[#000000] px-2 py-0.5 text-xs font-mono font-bold uppercase">
                            COMPLET
                          </span>
                        )}
                      </div>

                      {/* Venue */}
                      <p className="text-[#a8a8a8] font-mono text-xs md:text-sm mb-2">
                        📍 {concert.venue}
                      </p>

                      {/* Support */}
                      {concert.support && (
                        <p className="text-[#8B0000] font-mono text-xs md:text-sm font-bold mb-3">
                          🎸 Support : {concert.support}
                        </p>
                      )}
                    </Link>

                    {/* Button */}
                    <div className="mt-3">
                      {concert.status === 'upcoming' ? (
                        <Button
                          as="a"
                          href={concert.ticketsUrl || '#'}
                          external
                          variant="primary"
                          size="sm"
                          className="w-full"
                        >
                          <span className="hidden sm:inline">Réserver ma place à {concert.city}</span>
                          <span className="sm:hidden">Réserver</span>
                          <Ticket size={14} />
                        </Button>
                      ) : (
                        <Button
                          as="a"
                          href="https://www.ticketswap.fr"
                          external
                          variant="secondary"
                          size="sm"
                          className="w-full"
                        >
                          <span className="hidden sm:inline">Chercher une revente officielle</span>
                          <span className="sm:hidden">Revente</span>
                          <ArrowRight size={14} />
                        </Button>
                      )}
                    </div>
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
          className="mt-6 md:mt-8 relative pl-4 md:pl-6 pr-4 md:pr-6 py-3 md:py-4 bg-[#8B0000]/25"
        >
          <div className="absolute left-0 top-0 bottom-0">
            <HandDrawnVerticalLine 
              color="#8B0000" 
              strokeWidth={4} 
              roughness={2.5} 
              passes={3}
              opacity={0.9}
            />
          </div>
          <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 leading-relaxed">
            <span className="text-[#8B0000] font-bold">Info fans :</span> Les horaires et programmations peuvent évoluer. Nous vérifions les liens, mais privilégiez toujours les billetteries officielles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}