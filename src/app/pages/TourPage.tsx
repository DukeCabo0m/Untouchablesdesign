import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { Calendar, MapPin, Clock, Ticket, ExternalLink, Archive, Filter, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FlagIcon } from '@/app/components/FlagIcon';

// Données mock - Concerts à venir
const upcomingConcerts = [
  {
    id: 1,
    date: '2026-06-15',
    venue: 'Hellfest',
    city: 'Clisson',
    country: 'France',
    time: '21:30',
    ticketsUrl: 'https://www.hellfest.fr',
    status: 'En vente'
  },
  {
    id: 2,
    date: '2026-07-10',
    venue: 'Accor Arena',
    city: 'Paris',
    country: 'France',
    time: '20:00',
    ticketsUrl: '#',
    status: 'Sold Out'
  },
  {
    id: 3,
    date: '2026-07-12',
    venue: 'Zénith',
    city: 'Lyon',
    country: 'France',
    time: '20:00',
    ticketsUrl: '#',
    status: 'Bientôt'
  },
  {
    id: 4,
    date: '2026-07-18',
    venue: 'Wacken Open Air',
    city: 'Wacken',
    country: 'Allemagne',
    time: '23:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 5,
    date: '2026-08-05',
    venue: 'Download Festival',
    city: 'Donington',
    country: 'Royaume-Uni',
    time: '21:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 6,
    date: '2026-08-22',
    venue: 'Download Festival',
    city: 'Paris',
    country: 'France',
    time: '22:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 7,
    date: '2026-09-15',
    venue: 'Madison Square Garden',
    city: 'New York',
    country: 'USA',
    time: '20:00',
    ticketsUrl: '#',
    status: 'Sold Out'
  },
  {
    id: 8,
    date: '2026-09-20',
    venue: 'The Forum',
    city: 'Los Angeles',
    country: 'USA',
    time: '20:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 9,
    date: '2026-11-05',
    venue: 'Le Dôme',
    city: 'Marseille',
    country: 'France',
    time: '19:30',
    ticketsUrl: '#',
    status: 'Bientôt'
  }
];

// Données mock - Anciens concerts FRANCE uniquement
const pastConcerts = [
  {
    year: '2023',
    concerts: [
      { date: '2023-06-17', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Gojira, Mastodon' },
      { date: '2023-11-28', venue: 'Accor Arena', city: 'Paris', country: 'France', attendance: '20,000', support: 'Code Orange' }
    ]
  },
  {
    year: '2022',
    concerts: [
      { date: '2022-06-19', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '55,000+', support: 'Lamb of God, Deftones' }
    ]
  },
  {
    year: '2019',
    concerts: [
      { date: '2019-06-21', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '60,000+', support: 'Gojira, Parkway Drive' },
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
      { date: '2016-11-11', venue: 'Zénith', city: 'Nantes', country: 'France', attendance: '9,000', support: 'Cane Hill' }
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
      { date: '2013-06-23', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '45,000+', support: 'Avenged Sevenfold, Volbeat' },
      { date: '2013-11-05', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,500', support: 'Blood Youth' }
    ]
  },
  {
    year: '2011',
    concerts: [
      { date: '2011-06-19', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '40,000+', support: 'System of a Down, Godsmack' },
      { date: '2011-11-22', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,300', support: 'Walls of Jericho' }
    ]
  },
  {
    year: '2007',
    concerts: [
      { date: '2007-06-24', venue: 'Hellfest', city: 'Clisson', country: 'France', attendance: '22,000+', support: 'Type O Negative, Machine Head' },
      { date: '2007-11-20', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,200', support: 'Deftones' }
    ]
  },
  {
    year: '2005',
    concerts: [
      { date: '2005-06-26', venue: 'Fury Fest', city: 'Le Mans', country: 'France', attendance: '15,000+', support: 'Slayer, Anthrax' },
      { date: '2005-11-10', venue: 'Le Zénith', city: 'Paris', country: 'France', attendance: '6,000', support: 'Mudvayne' }
    ]
  }
];

export function TourPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  // Get unique years for filter
  const years = pastConcerts.map(y => y.year);
  
  // Filter concerts based on selected year
  const filteredConcerts = selectedYear === 'all' 
    ? pastConcerts 
    : pastConcerts.filter(y => y.year === selectedYear);

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              LIVE DATES
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">TOURNÉE</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose border-l-4 border-[#8B0000] pl-6">
            Retrouvez toutes les dates de concerts à venir et l'historique complet des passages de Korn dans le monde entier.
          </p>
        </motion.div>

        {/* Concerts à venir */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-12">
            <Calendar className="text-[#8B0000]" size={32} />
            <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
              CONCERTS À VENIR
            </h2>
          </div>

          <div className="space-y-4">
            {upcomingConcerts.map((concert, index) => (
              <motion.div
                key={concert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-300 p-6 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Date & Lieu */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {/* Date */}
                      <div className="bg-[#8B0000] px-4 py-2 min-w-[120px]">
                        <p className="font-mono text-xs text-[#E0E0E0] uppercase">
                          {new Date(concert.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>

                      {/* Status */}
                      <div className={`absolute top-4 right-4 px-3 py-1 font-mono text-[10px] uppercase tracking-wider border ${
                        concert.status === 'Coming Soon'
                          ? 'border-[#00FF00] text-[#00FF00]' 
                          : concert.status === 'Sold Out'
                          ? 'border-[#8B0000] text-[#8B0000]'
                          : 'border-[#8B0000] text-[#8B0000]'
                      }`}>
                        <span className="font-mono text-xs uppercase">{concert.status}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-[#FFFFFF] uppercase mb-2">
                      {concert.venue}
                    </h3>

                    <div className="flex flex-wrap items-center gap-6 text-[#a8a8a8] font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <FlagIcon country={concert.country} size={16} />
                        <MapPin size={14} className="text-[#8B0000]" />
                        <span>{concert.city}, {concert.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#8B0000]" />
                        <span>{concert.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Boutons Actions */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={concert.ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-none border-2 ${
                        concert.status === 'En vente'
                          ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] hover:bg-transparent hover:border-[#FFFFFF]'
                          : concert.status === 'Sold Out'
                          ? 'bg-transparent text-[#8B0000] border-[#8B0000]/50 cursor-not-allowed opacity-70'
                          : 'bg-transparent text-[#8B0000] border-[#8B0000]/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <Ticket size={16} />
                      {concert.status === 'En vente' ? 'ACHETER' : concert.status === 'Sold Out' ? 'COMPLET' : 'BIENTÔT'}
                      {concert.status === 'En vente' && <ExternalLink size={14} />}
                    </a>
                    
                    {/* Bouton J'y serai */}
                    <button
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-none border-2 bg-transparent text-[#E0E0E0] border-[#E0E0E0]/30 hover:bg-[#E0E0E0] hover:text-[#0A0A0A] hover:border-[#E0E0E0]"
                    >
                      <UserCheck size={16} />
                      J'Y SERAI
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
            <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
              <span className="text-[#8B0000] font-bold">INFO :</span> Les dates et horaires sont susceptibles de changer. 
              Vérifiez toujours auprès des organisateurs avant d'acheter vos billets.
            </p>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="border-t-4 border-[#8B0000] mb-24" />

        {/* Archives concerts France */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <Archive className="text-[#8B0000]" size={32} />
            <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
              ARCHIVES - CONCERTS EN FRANCE
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
                      to={`/tour/concert/${concert.date}`}
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
                            <FlagIcon country={concert.country} size={16} />
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
              ARCHIVES DEPUIS 2005 // {pastConcerts.reduce((acc, year) => acc + year.concerts.length, 0)} CONCERTS EN FRANCE
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}