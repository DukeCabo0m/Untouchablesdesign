import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { Lock, UserX, Eye, Unlock, Trash2, Search, Plus } from 'lucide-react';
import { API_BASE_URL } from '@/app/utils/api';

interface Ban {
  id: string;
  userId: string;
  username: string;
  email: string;
  reason: string;
  type: 'permanent' | 'temporary';
  duration: number | null;
  bannedBy: string;
  bannedByUsername: string;
  createdAt: string;
  expiresAt: string | null;
  status: 'active' | 'expired' | 'revoked';
  revokedAt: string | null;
  revokedBy: string | null;
}

export function AdminBansPage() {
  const [bans, setBans] = useState<Ban[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('active');

  useEffect(() => {
    fetchBans();
  }, []);

  const fetchBans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/bans`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bans');
      }

      const data = await response.json();
      setBans(data);
    } catch (error) {
      console.error('Error fetching bans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (ban: Ban) => {
    if (!confirm(`Êtes-vous sûr de vouloir révoquer le bannissement de ${ban.username}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/bans/${ban.id}/revoke`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchBans();
      }
    } catch (error) {
      console.error('Error revoking ban:', error);
    }
  };

  const handleDelete = async (ban: Ban) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ce bannissement?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/bans/${ban.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchBans();
      }
    } catch (error) {
      console.error('Error deleting ban:', error);
    }
  };

  const columns: Column<Ban>[] = [
    {
      key: 'username',
      label: 'Utilisateur',
      sortable: true,
      render: (v, row) => (
        <div>
          <p className="text-[#F0F0F0] font-medium">{v}</p>
          <p className="font-mono text-xs text-[#808080]">{row.email}</p>
        </div>
      ),
      width: '20%'
    },
    { key: 'reason', label: 'Raison', sortable: false, render: (v) => <span className="text-[#808080] text-sm">{v}</span>, width: '25%' },
    { key: 'bannedByUsername', label: 'Banni par', sortable: true, render: (v) => <span className="text-[#8B0000] text-sm">{v}</span>, width: '12%' },
    { key: 'createdAt', label: 'Date', sortable: true, render: (v) => <span className="font-mono text-xs text-[#F0F0F0]">{new Date(v).toLocaleDateString('fr-FR')}</span>, width: '10%' },
    { key: 'expiresAt', label: 'Expire', sortable: true, render: (v) => <span className="font-mono text-xs text-[#808080]">{v ? new Date(v).toLocaleDateString('fr-FR') : 'Permanent'}</span>, width: '10%' },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (v) => {
        const color = v === 'permanent' ? '#8B0000' : '#F0F0F0';
        return <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${color}20`, borderColor: `${color}40`, color }}>{v === 'permanent' ? 'Permanent' : 'Temporaire'}</span>;
      },
      width: '12%'
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (v) => {
        const configs = { 
          active: { color: '#8B0000', label: 'Actif' }, 
          expired: { color: '#808080', label: 'Expiré' },
          revoked: { color: '#F0F0F0', label: 'Révoqué' }
        };
        const config = configs[v as keyof typeof configs];
        return <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${config.color}20`, borderColor: `${config.color}40`, color: config.color }}>{config.label}</span>;
      },
      width: '11%'
    }
  ];

  const actions: Action<Ban>[] = [
    { icon: Eye, label: 'Voir détails', onClick: (b) => alert(`Détails:\n\nUtilisateur: ${b.username}\nRaison: ${b.reason}\nBanni par: ${b.bannedByUsername}\nDate: ${new Date(b.createdAt).toLocaleString('fr-FR')}`), variant: 'default' },
    { icon: Unlock, label: 'Débannir', onClick: handleRevoke, variant: 'default', show: (b) => b.status === 'active' },
    { icon: Trash2, label: 'Supprimer', onClick: handleDelete, variant: 'danger' }
  ];

  const filteredBans = bans.filter(b => statusFilter === 'all' || b.status === statusFilter);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0A0A0A] items-center justify-center">
        <p className="text-[#F0F0F0] font-mono">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Bannissements" breadcrumbs={[{ label: 'Modération' }, { label: 'Bannissements' }]} />
        <main className="flex-1 p-6 space-y-6">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard icon={Lock} label="Total Bans" value={bans.length} color="#8B0000" />
              <AdminStatsCard icon={UserX} label="Actifs" value={bans.filter(b => b.status === 'active').length} color="#8B0000" />
              <AdminStatsCard icon={Lock} label="Permanents" value={bans.filter(b => b.type === 'permanent').length} color="#F0F0F0" />
              <AdminStatsCard icon={Unlock} label="Expirés" value={bans.filter(b => b.status === 'expired').length} color="#808080" />
            </div>
          </section>
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex gap-3 justify-between">
              <div className="flex gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer">
                  <option value="all">Tous</option>
                  <option value="active">Actifs</option>
                  <option value="expired">Expirés</option>
                </select>
              </div>
              <Button variant="primary" size="sm">
                <Plus size={16} />
                Nouveau Ban
              </Button>
            </div>
          </section>
          <section>
            <AdminDataTable data={filteredBans} columns={columns} actions={actions} selectable={true} emptyMessage="Aucun bannissement" />
          </section>
        </main>
      </div>
    </div>
  );
}