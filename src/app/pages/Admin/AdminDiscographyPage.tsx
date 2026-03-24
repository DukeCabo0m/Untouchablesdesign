import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { albumsApi } from '@/app/utils/api';
import { Disc, Plus, Eye, Edit, Trash2, Search, Download, Music, Album, PlayCircle } from 'lucide-react';

interface DiscographyItem {
  id: number;
  title: string;
  type: 'Album' | 'EP' | 'Single' | 'Live';
  year: number;
  tracksCount: number;
  label: string;
  status: 'published' | 'draft';
}

export function AdminDiscographyPage() {
  const [discography, setDiscography] = useState<DiscographyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<DiscographyItem[]>([]);

  // Load discography from backend
  useEffect(() => {
    async function loadDiscography() {
      try {
        setIsLoading(true);
        console.log('[AdminDiscographyPage] Loading discography');
        
        const albums = await albumsApi.getAll();
        console.log('[AdminDiscographyPage] Loaded albums:', albums.length);
        
        // Map backend albums to admin format
        const mappedItems: DiscographyItem[] = albums.map(album => ({
          id: album.id,
          title: album.title,
          type: album.type === 'album' ? 'Album' :
                album.type === 'ep' ? 'EP' :
                album.type === 'single' ? 'Single' : 'Live',
          year: album.releaseDate ? new Date(album.releaseDate).getFullYear() : 2000,
          tracksCount: Array.isArray(album.tracks) ? album.tracks.length : 0,
          label: album.label || 'N/A',
          status: 'published' // Albums are always published
        }));
        
        setDiscography(mappedItems);
        setError(null);
      } catch (err) {
        console.error('[AdminDiscographyPage] Failed to load discography:', err);
        setError('Impossible de charger la discographie');
      } finally {
        setIsLoading(false);
      }
    }
    loadDiscography();
  }, []);

  const filteredDiscography = discography.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const discographyColumns: Column<DiscographyItem>[] = [
    {
      key: 'title',
      label: 'Titre',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#8B0000] flex items-center justify-center">
            <Music size={20} className="text-[#F0F0F0]" />
          </div>
          <div>
            <p className="text-[#F0F0F0] font-medium">{value}</p>
            <p className="font-mono text-xs text-[#808080]">{row.label}</p>
          </div>
        </div>
      ),
      width: '25%'
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-mono uppercase border bg-[#8B0000]/20 border-[#8B0000]/40 text-[#8B0000]">
          {value}
        </span>
      ),
      width: '15%'
    },
    {
      key: 'year',
      label: 'Année',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-xs text-[#F0F0F0]">
          {value}
        </span>
      ),
      width: '12%'
    },
    {
      key: 'tracksCount',
      label: 'Pistes',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm text-[#808080]">
          {value} tracks
        </span>
      ),
      width: '10%'
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value) => {
        const config = value === 'published' 
          ? { color: '#F0F0F0', label: 'Publié' }
          : { color: '#808080', label: 'Brouillon' };
        return (
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
        );
      },
      width: '12%'
    }
  ];

  const discographyActions: Action<DiscographyItem>[] = [
    {
      icon: Eye,
      label: 'Voir',
      onClick: (item) => console.log('View', item),
      variant: 'default'
    },
    {
      icon: Edit,
      label: 'Éditer',
      onClick: (item) => console.log('Edit', item),
      variant: 'default'
    },
    {
      icon: Trash2,
      label: 'Supprimer',
      onClick: (item) => console.log('Delete', item),
      variant: 'danger'
    }
  ];

  const stats = {
    total: discography.length,
    albums: discography.filter(d => d.type === 'Album').length,
    live: discography.filter(d => d.type === 'Live').length,
    singles: discography.filter(d => d.type === 'Single').length
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Discographie"
          breadcrumbs={[{ label: 'Gestion' }, { label: 'Discographie' }]}
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard
                icon={Music}
                label="Total"
                value={stats.total}
                color="#8B0000"
              />
              <AdminStatsCard
                icon={Disc}
                label="Albums Studio"
                value={stats.albums}
                color="#F0F0F0"
              />
              <AdminStatsCard
                icon={Album}
                label="Albums Live"
                value={stats.live}
                color="#808080"
              />
              <AdminStatsCard
                icon={PlayCircle}
                label="Singles"
                value={stats.singles}
                color="#F0F0F0"
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
                    placeholder="Rechercher un album..."
                    className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none"
                  />
                </div>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer"
                >
                  <option value="all">Tous les types</option>
                  <option value="Album">Album</option>
                  <option value="EP">EP</option>
                  <option value="Single">Single</option>
                  <option value="Live">Live</option>
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
                  Ajouter Album
                </Button>
              </div>
            </div>
          </section>

          {/* Discography Table */}
          <section>
            <AdminDataTable
              data={filteredDiscography}
              columns={discographyColumns}
              actions={discographyActions}
              selectable={true}
              emptyMessage="Aucun album trouvé"
            />
          </section>

          {/* Pagination */}
          <section className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#808080] uppercase">
              Affichage de {filteredDiscography.length} sur {discography.length} items
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