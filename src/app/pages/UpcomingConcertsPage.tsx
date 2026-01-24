import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Calendar, MapPin, Clock, Ticket, ExternalLink, UserCheck } from 'lucide-react';
import { FlagIcon } from '@/app/components/FlagIcon';

// Données - Concerts à venir 2026
const upcomingConcerts = [
  {
    id: 1,
    date: '2026-04-25',
    venue: 'Sick New World Las Vegas 2026',
    city: 'Las Vegas',
    state: 'NV',
    country: 'USA',
    time: '20:00',
    ticketsUrl: 'https://www.sicknewworld.com',
    status: 'En vente'
  },
  {
    id: 2,
    date: '2026-05-02',
    venue: 'Coliseo Medplus',
    city: 'Bogotá',
    country: 'Colombie',
    time: '21:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 3,
    date: '2026-05-05',
    venue: 'Costa 21',
    city: 'San Miguel',
    country: 'Pérou',
    time: '21:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 4,
    date: '2026-05-08',
    venue: 'Parque Estadio',
    city: 'Santiago',
    country: 'Chili',
    time: '21:30',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 5,
    date: '2026-05-10',
    venue: 'Parque Sarmiento',
    city: 'Buenos Aires',
    country: 'Argentine',
    time: '20:30',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 6,
    date: '2026-05-13',
    venue: 'Jockey Club del Paraguay',
    city: 'Asunción',
    country: 'Paraguay',
    time: '21:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 7,
    date: '2026-05-16',
    venue: 'Allianz Parque',
    city: 'São Paulo',
    country: 'Brésil',
    time: '21:00',
    ticketsUrl: '#',
    status: 'En vente'
  },
  {
    id: 8,
    date: '2026-05-19',
    venue: 'Palacio de los Deportes',
    city: 'Mexico City',
    country: 'Mexique',
    time: '21:00',
    ticketsUrl: '#',
    status: 'Sold Out'
  }
];

export function UpcomingConcertsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="CONCERTS À VENIR"
        description="Retrouvez toutes les dates de concerts 2026 de Korn.<br />Achetez vos billets et rejoignez la communauté Untouchables sur place."
        backgroundImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBsaXZlfGVufDF8fHx8MTc2OTE5Mjc3OXww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'CONCERTS À VENIR' }
        ]}
        glitchIntensity="high"
      />

      <div className="px-4 py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Section concerts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <Calendar className="text-[#8B0000]" size={32} />
              <h2 className="text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
                TOURNÉE 2026
              </h2>
            </div>

            <div className="space-y-4">
              {upcomingConcerts.map((concert, index) => (
                <motion.div
                  key={concert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="relative bg-[#0A0A0A] border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-all duration-300 p-6 group"
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
                      </div>

                      <h3 className="text-2xl font-black text-[#FFFFFF] uppercase mb-2">
                        {concert.venue}
                      </h3>

                      <div className="flex flex-wrap items-center gap-6 text-[#a8a8a8] font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <FlagIcon country={concert.country} size={20} />
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
                            : 'bg-transparent text-[#8B0000] border-[#8B0000]/50 cursor-not-allowed opacity-70'
                        }`}
                      >
                        <Ticket size={16} />
                        {concert.status === 'En vente' ? 'ACHETER' : 'COMPLET'}
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
        </div>
      </div>
    </div>
  );
}