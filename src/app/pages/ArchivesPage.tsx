import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Archive, Filter, MapPin } from 'lucide-react';
import { FlagIcon } from '@/app/components/FlagIcon';
import { PageHeader } from '@/app/components/PageHeader';
import { concertsApi } from '@/app/utils/api';

// Fonction pour créer un slug unique pour chaque concert
export function createConcertSlug(venue: string, date: string): string {
  const year = new Date(date).getFullYear();
  const slug = venue
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Retire les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, ''); // Retire les tirets en début/fin
  return `${slug}-${year}`;
}

export function ArchivesPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [concerts, setConcerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load concerts from backend
  useEffect(() => {
    async function loadConcerts() {
      try {
        setIsLoading(true);
        console.log('[ArchivesPage] Loading concerts from backend...');
        
        const data = await concertsApi.getAll();
        console.log('[ArchivesPage] Received concerts:', data);
        
        // Filter only past concerts
        const now = new Date();
        const pastConcerts = data.filter((c: any) => new Date(c.date) < now);
        
        // Sort by date (most recent first)
        const sortedConcerts = pastConcerts.sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setConcerts(sortedConcerts);
        setError(null);
      } catch (err) {
        console.error('[ArchivesPage] Failed to load concerts:', err);
        setError('Impossible de charger les archives');
        setConcerts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadConcerts();
  }, []);
  
  // Group concerts by year
  const concertsByYear = concerts.reduce((acc: any, concert: any) => {
    const year = new Date(concert.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(concert);
    return acc;
  }, {});
  
  const years = Object.keys(concertsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  // Filter concerts based on selected year
  const filteredYears = selectedYear === 'all' 
    ? years 
    : years.filter(y => y === selectedYear);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="ARCHIVES"
        description="Revivez l'histoire des concerts de Korn en France depuis 1998.<br />Plus de 30 dates mythiques, des festivals légendaires aux salles intimistes."
        backgroundImage="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29uY2VydCUyMGFyY2hpdmV8ZW58MXx8fHwxNzY5MTkyNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'TOURNÉE', path: '/tour' },
          { label: 'ARCHIVES' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Archives concerts France */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <Archive className="text-[#8B0000]" size={32} />
              <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
                CONCERTS EN FRANCE
              </h2>
            </div>

            {/* Filtre par année */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="text-[#8B0000]" size={20} />
                <span className="font-mono text-sm text-[#E0E0E0] uppercase">Année :</span>
              </div>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-4 py-2 font-mono text-xs uppercase border-2 transition-all cursor-none ${
                  selectedYear === 'all'
                    ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000]'
                    : 'bg-transparent text-[#8B0000] border-[#8B0000]/30 hover:border-[#8B0000]'
                }`}
              >
                Toutes
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 font-mono text-xs uppercase border-2 transition-all cursor-none ${
                    selectedYear === year
                      ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000]'
                      : 'bg-transparent text-[#8B0000] border-[#8B0000]/30 hover:border-[#8B0000]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="space-y-12">
              {filteredYears.map((year) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * filteredYears.indexOf(year) }}
                  className="border-l-2 border-[#8B0000] pl-8"
                >
                  {/* Year */}
                  <div className="inline-block bg-[#8B0000] px-6 py-2 mb-6 -ml-8">
                    <h3 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                      {year}
                    </h3>
                  </div>

                  {/* Concerts of the year */}
                  <div className="space-y-4">
                    {concertsByYear[year].map((concert, concertIndex) => (
                      <Link
                        key={concertIndex}
                        to={`/tour/concert/${createConcertSlug(concert.venue, concert.date)}`}
                        className="block bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6 hover:border-[#8B0000]/50 transition-colors cursor-none"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <span className="font-mono text-sm text-[#8B0000]">
                                {new Date(concert.date).toLocaleDateString('fr-FR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>

                            <h4 className="text-xl font-black text-[#FFFFFF] uppercase mb-2 group-hover:text-[#8B0000] transition-colors">
                              {concert.venue}
                            </h4>

                            <div className="flex items-center gap-2 mb-2 text-[#a8a8a8] font-mono text-sm">
                              <FlagIcon country={concert.country} size={20} />
                              <MapPin size={14} className="text-[#8B0000]" />
                              <span>{concert.city}, {concert.country}</span>
                            </div>

                            {/* Support bands */}
                            {concert.support && (
                              <div className="mt-2 flex items-start gap-2">
                                <span className="font-mono text-xs text-[#8B0000] uppercase">Support :</span>
                                <span className="font-mono text-xs text-[#E0E0E0]/70">{concert.support}</span>
                              </div>
                            )}
                          </div>

                          {/* Attendance */}
                          <div className="text-right">
                            <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">Affluence</p>
                            <p className="text-2xl font-black text-[#FFFFFF]">{concert.attendance}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-16 border-t-2 border-[#8B0000] pt-8">
              <p className="font-mono text-xs text-[#8B0000] uppercase text-center">
                ARCHIVES DEPUIS 1998 // {concerts.length} CONCERTS EN FRANCE
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}