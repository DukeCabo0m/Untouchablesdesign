import { FlagIcon } from '@/app/components/FlagIcon';
import { Link } from 'react-router';
import { PageHeader } from '@/app/components/PageHeader';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Ticket, ExternalLink, UserCheck, Archive, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useState, useEffect } from 'react';
import { concertsApi } from '@/app/utils/api';

export function TourPage() {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load concerts from backend
  useEffect(() => {
    async function loadConcerts() {
      try {
        setIsLoading(true);
        console.log('[TourPage] Loading concerts from backend...');
        
        const data = await concertsApi.getAll();
        console.log('[TourPage] Received concerts:', data);
        
        // Sort by date
        const sortedConcerts = data.sort((a: any, b: any) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        setConcerts(sortedConcerts);
        setError(null);
      } catch (err) {
        console.error('[TourPage] Failed to load concerts:', err);
        setError('Impossible de charger les dates de tournée');
        setConcerts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadConcerts();
  }, []);

  // Split concerts into upcoming and past
  const now = new Date();
  const upcomingConcerts = concerts.filter((c: any) => new Date(c.date) >= now);
  const pastConcerts = concerts.filter((c: any) => new Date(c.date) < now);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="TOURNÉE"
        description="Retrouvez toutes les dates de concerts 2026 de Korn.<br />Achetez vos billets et rejoignez la communauté Untouchables sur place."
        backgroundImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBsaXZlfGVufDF8fHx8MTc2OTE5Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'TOURNÉE' }
        ]}
        glitchIntensity="high"
      />

      <div className="px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Section Archives - Call to action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/tour/archives"
              className="group block bg-[#0A0A0A] border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29uY2VydCUyMGFyY2hpdmV8ZW58MXx8fHwxNzY5MTkyNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
                </div>

                <div className="absolute inset-0 flex items-center px-4 md:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 w-full">
                    <Archive className="text-[#8B0000] flex-shrink-0" size={40} />
                    
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#FFFFFF] uppercase mb-1 md:mb-2 group-hover:text-[#8B0000] transition-colors">
                        ARCHIVES DES CONCERTS
                      </h2>
                      <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 line-clamp-2">
                        Revivez l'histoire des concerts de Korn en France depuis 2005 • 24 concerts • 10 années
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 text-[#8B0000] group-hover:text-[#FFFFFF] transition-colors self-end sm:self-auto">
                      <span className="font-black text-xs md:text-sm uppercase tracking-wider hidden lg:block">
                        Consulter les archives
                      </span>
                      <ArrowRight size={24} className="md:w-8 md:h-8 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>

          {/* Section concerts à venir */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 md:mt-14 lg:mt-16"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 lg:mb-12">
              <Calendar className="text-[#8B0000]" size={24} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
                CONCERTS À VENIR 2026
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
                  <div className="font-mono text-[#8B0000] text-base md:text-lg animate-pulse">
                    Chargement des concerts...
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 md:py-20 lg:py-24">
                  <div className="font-mono text-[#E0E0E0]/50 text-base md:text-lg">
                    {error}
                  </div>
                </div>
              ) : upcomingConcerts.length === 0 ? (
                <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8 md:p-12 text-center">
                  <p className="text-[#E0E0E0]/50 font-mono text-base md:text-lg">
                    Aucun concert prévu pour le moment
                  </p>
                  <Link
                    to="/tour/archives"
                    className="inline-block mt-4 md:mt-6 text-[#8B0000] font-mono text-sm hover:underline"
                  >
                    &lt;&lt; Consulter les archives
                  </Link>
                </div>
              ) : (
                upcomingConcerts.map((concert, index) => (
                  <motion.div
                    key={concert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="relative bg-[#0A0A0A] border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-300 p-4 md:p-5 lg:p-6 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
                      {/* Date & Lieu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          {/* Date */}
                          <div className="bg-[#8B0000] px-3 py-1.5 md:px-4 md:py-2 min-w-[100px] md:min-w-[120px]">
                            <p className="font-mono text-xs text-[#E0E0E0] uppercase">
                              {new Date(concert.date).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#FFFFFF] uppercase mb-2">
                          {concert.venue}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[#a8a8a8] font-mono text-xs md:text-sm">
                          <div className="flex items-center gap-2">
                            <FlagIcon country={concert.country} size={16} />
                            <MapPin size={12} className="md:w-[14px] md:h-[14px] text-[#8B0000]" />
                            <span>{concert.city}, {concert.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="md:w-4 md:h-4 text-[#8B0000]" />
                            <span>{new Date(concert.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>

                      {/* Boutons Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 md:gap-3 w-full sm:w-auto lg:w-auto">
                        {concert.ticketUrl ? (
                          <a
                            href={concert.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 border-2 bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] hover:bg-transparent hover:border-[#FFFFFF] cursor-pointer w-full sm:w-auto"
                          >
                            <Ticket size={14} className="md:w-4 md:h-4" />
                            <span className="hidden md:inline">ACHETER</span>
                            <span className="md:hidden">BILLETS</span>
                            <ExternalLink size={12} className="md:w-[14px] md:h-[14px]" />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 border-2 bg-transparent text-[#8B0000] border-[#8B0000]/50 cursor-not-allowed opacity-70 w-full sm:w-auto"
                          >
                            <Ticket size={14} className="md:w-4 md:h-4" />
                            <span className="hidden md:inline">BIENTÔT DISPONIBLE</span>
                            <span className="md:hidden">BIENTÔT</span>
                          </button>
                        )}
                        
                        {/* Bouton J'y serai */}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          <UserCheck size={14} className="md:w-4 md:h-4" />
                          J'Y SERAI
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Note */}
            <div className="mt-6 md:mt-8 bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4 md:p-6">
              <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                <span className="text-[#8B0000] font-bold">INFO :</span> Les dates et horaires sont susceptibles de changer. 
                Vérifiez toujours auprès des organisateurs avant d'acheter vos billets.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}