import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { concertsApi } from '@/app/utils/api';
import { Calendar, Plus, Eye, Edit, Trash2, Search, Download, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Concert {
  id: number;
  city: string;
  venue: string;
  country: string;
  date: string;
  status: 'upcoming' | 'past' | 'cancelled';
  ticketsAvailable: boolean;
}

export function AdminConcertsPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedConcerts, setSelectedConcerts] = useState<Concert[]>([]);

  // Load concerts from backend
  useEffect(() => {
    async function loadConcerts() {
      try {
        setIsLoading(true);
        console.log('[AdminConcertsPage] Loading concerts');
        
        const allConcerts = await concertsApi.getAll();
        console.log('[AdminConcertsPage] Loaded concerts:', allConcerts.length);
        
        // Map backend concerts to admin format
        const mappedConcerts: Concert[] = allConcerts.map(concert => {
          const concertDate = new Date(concert.date);
          const today = new Date();
          const isPast = concertDate < today;
          
          return {
            id: concert.id,
            city: concert.city,
            venue: concert.venue,
            country: concert.country,
            date: concert.date,
            status: concert.status === 'cancelled' ? 'cancelled' : 
                    isPast ? 'past' : 'upcoming',
            ticketsAvailable: !!concert.ticketUrl
          };
        });
        
        setConcerts(mappedConcerts);
        setError(null);
      } catch (err) {
        console.error('[AdminConcertsPage] Failed to load concerts:', err);
        setError('Impossible de charger les concerts');
      } finally {
        setIsLoading(false);
      }
    }
    loadConcerts();
  }, []);

  const filteredConcerts = concerts.filter(concert => {
    const matchesSearch = 
      concert.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concert.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || concert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const concertColumns: Column<Concert>[] = [
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => {
        const date = new Date(value);
        return (
          <div>
            <p className="font-mono text-sm text-[#8B0000] font-bold">
              {date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
            <p className="font-mono text-xs text-[#808080]">
              {date.toLocaleDateString('fr-FR', { weekday: 'long' })}
            </p>
          </div>
        );
      },
      width: '12%'
    },
    {
      key: 'venue',
      label: 'Lieu',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-[#F0F0F0] font-medium mb-1">{value}</p>
          <p className="font-mono text-xs text-[#808080] flex items-center gap-1">
            <MapPin size={10} />
            {row.city}, {row.country}
          </p>
        </div>
      ),
      width: '25%'
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value) => {
        const statusConfig = {
          upcoming: { color: '#F0F0F0', label: 'À venir', icon: CheckCircle },
          past: { color: '#808080', label: 'Passé', icon: CheckCircle },
          cancelled: { color: '#8B0000', label: 'Annulé', icon: XCircle }
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        const Icon = config.icon;
        return (
          <div className="flex items-center gap-2">
            <Icon size={14} style={{ color: config.color }} />
            <span 
              className="px-2 py-1 text-xs font-mono uppercase border"
              style={{ 
                backgroundColor: `${config.color}20`,
                borderColor: `${config.color}40`,
                color: config.color
              }}
            >
              {config.label}
            </span>
          </div>
        );
      },
      width: '13%'
    }
  ];

  const concertActions: Action<Concert>[] = [
    {
      icon: Eye,
      label: 'Voir',
      onClick: (concert) => console.log('View', concert),
      variant: 'default'
    },
    {
      icon: Edit,
      label: 'Éditer',
      onClick: (concert) => console.log('Edit', concert),
      variant: 'default'
    },
    {
      icon: Trash2,
      label: 'Supprimer',
      onClick: (concert) => console.log('Delete', concert),
      variant: 'danger'
    }
  ];

  const stats = {
    total: concerts.length,
    upcoming: concerts.filter(c => c.status === 'upcoming').length,
    past: concerts.filter(c => c.status === 'past').length,
    cancelled: concerts.filter(c => c.status === 'cancelled').length
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Concerts"
          breadcrumbs={[{ label: 'Gestion' }, { label: 'Concerts' }]}
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard
                icon={Calendar}
                label="Total Concerts"
                value={stats.total}
                color="#8B0000"
              />
              <AdminStatsCard
                icon={CheckCircle}
                label="À venir"
                value={stats.upcoming}
                color="#F0F0F0"
              />
              <AdminStatsCard
                icon={Clock}
                label="Passés"
                value={stats.past}
                color="#808080"
              />
              <AdminStatsCard
                icon={XCircle}
                label="Annulés"
                value={stats.cancelled}
                color="#8B0000"
              />
            </div>
          </section>

          {/* Filters & Actions */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un concert..."
                    className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="upcoming">À venir</option>
                  <option value="past">Passé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm">
                  <Download size={16} />
                  Exporter
                </Button>
                <Button variant="primary" size="sm">
                  <Plus size={16} />
                  Ajouter Concert
                </Button>
              </div>
            </div>
          </section>

          {/* Concerts Table */}
          <section>
            <AdminDataTable
              data={filteredConcerts}
              columns={concertColumns}
              actions={concertActions}
              selectable={true}
              emptyMessage="Aucun concert trouvé"
            />
          </section>

          {/* Pagination */}
          <section className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#808080] uppercase">
              Affichage de {filteredConcerts.length} sur {concerts.length} concerts
            </span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">Précédent</Button>
              <span className="font-mono text-xs text-[#F0F0F0] px-4">Page 1 / 1</span>
              <Button variant="secondary" size="sm">Suivant</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}