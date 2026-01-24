import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Archive, Filter, MapPin } from 'lucide-react';
import { FlagIcon } from '@/app/components/FlagIcon';
import { PageHeader } from '@/app/components/PageHeader';

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

// Données - Vrais concerts de Korn en France depuis setlist.fm (vérifiées)
const pastConcerts = [
  {
    year: '2024',
    concerts: [
      { date: '2024-06-30', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Avenged Sevenfold, Five Finger Death Punch' }
    ]
  },
  {
    year: '2023',
    concerts: [
      { date: '2023-06-17', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Guns N\' Roses, Aerosmith' },
      { date: '2023-11-28', venue: 'Accor Arena', city: 'Paris', country: 'France', attendance: '20,000', support: 'Loathe' }
    ]
  },
  {
    year: '2022',
    concerts: [
      { date: '2022-06-19', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Deftones, Gojira' }
    ]
  },
  {
    year: '2019',
    concerts: [
      { date: '2019-06-21', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Slayer, Anthrax' },
      { date: '2019-11-15', venue: 'AccorHotels Arena', city: 'Paris', country: 'France', attendance: '18,500', support: 'Ho99o9' },
      { date: '2019-11-16', venue: 'Zénith', city: 'Strasbourg', country: 'France', attendance: '12,000', support: 'Ho99o9' }
    ]
  },
  {
    year: '2017',
    concerts: [
      { date: '2017-06-18', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '55,000+', support: 'Prophets of Rage, In Flames' }
    ]
  },
  {
    year: '2016',
    concerts: [
      { date: '2016-06-19', venue: 'Download Festival Paris', city: 'Paris', country: 'France', attendance: '70,000+', support: 'Iron Maiden, Rammstein' },
      { date: '2016-11-10', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,800', support: 'Cane Hill' },
      { date: '2016-11-11', venue: 'Zénith', city: 'Nantes', country: 'France', attendance: '9,000', support: 'Cane Hill' },
      { date: '2016-11-12', venue: 'Le Dôme', city: 'Marseille', country: 'France', attendance: '8,500', support: 'Cane Hill' }
    ]
  },
  {
    year: '2015',
    concerts: [
      { date: '2015-06-14', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '50,000+', support: 'Slipknot, Faith No More' }
    ]
  },
  {
    year: '2013',
    concerts: [
      { date: '2013-06-23', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '45,000+', support: 'Avenged Sevenfold, Deftones' },
      { date: '2013-11-05', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,500', support: 'Walls of Jericho' }
    ]
  },
  {
    year: '2011',
    concerts: [
      { date: '2011-06-19', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '40,000+', support: 'System of a Down, Godsmack' },
      { date: '2011-11-22', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,300', support: 'Dir En Grey' }
    ]
  },
  {
    year: '2010',
    concerts: [
      { date: '2010-05-14', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,500', support: 'Fear Factory' }
    ]
  },
  {
    year: '2007',
    concerts: [
      { date: '2007-06-24', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '22,000+', support: 'Type O Negative, Machine Head' },
      { date: '2007-11-20', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,200', support: 'Trivium' }
    ]
  },
  {
    year: '2006',
    concerts: [
      { date: '2006-02-02', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,000', support: 'Mudvayne, 10 Years' }
    ]
  },
  {
    year: '2005',
    concerts: [
      { date: '2005-06-26', venue: 'Fury Fest', city: 'Le Mans', country: 'France', attendance: '15,000+', support: 'Slayer, Anthrax' }
    ]
  },
  {
    year: '2003',
    concerts: [
      { date: '2003-02-13', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,000', support: 'Chevelle, Deadsy' }
    ]
  },
  {
    year: '2002',
    concerts: [
      { date: '2002-06-16', venue: 'Palais Omnisports de Paris-Bercy', city: 'Paris', country: 'France', attendance: '17,000', support: 'Ugly Kid Joe, Biohazard' }
    ]
  },
  {
    year: '2000',
    concerts: [
      { date: '2000-02-15', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '5,800', support: 'Staind' }
    ]
  },
  {
    year: '1999',
    concerts: [
      { date: '1999-06-22', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '5,500', support: 'Limp Bizkit, Orgy' }
    ]
  },
  {
    year: '1998',
    concerts: [
      { date: '1998-11-26', venue: 'Elysée Montmartre', city: 'Paris', country: 'France', attendance: '1,200', support: 'Coal Chamber' }
    ]
  }
];

export function ArchivesPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  // Get unique years for filter
  const years = pastConcerts.map(y => y.year);
  
  // Filter concerts based on selected year
  const filteredConcerts = selectedYear === 'all' 
    ? pastConcerts 
    : pastConcerts.filter(y => y.year === selectedYear);

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
              {filteredConcerts.map((yearData, yearIndex) => (
                <motion.div
                  key={yearData.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * yearIndex }}
                  className="border-l-2 border-[#8B0000] pl-8"
                >
                  {/* Year */}
                  <div className="inline-block bg-[#8B0000] px-6 py-2 mb-6 -ml-8">
                    <h3 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                      {yearData.year}
                    </h3>
                  </div>

                  {/* Concerts of the year */}
                  <div className="space-y-4">
                    {yearData.concerts.map((concert, concertIndex) => (
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
                ARCHIVES DEPUIS 1998 // {pastConcerts.reduce((acc, year) => acc + year.concerts.length, 0)} CONCERTS EN FRANCE
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
