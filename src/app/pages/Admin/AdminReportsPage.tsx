import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { Shield, AlertTriangle, Eye, CheckCircle, XCircle, Search } from 'lucide-react';
import { API_BASE_URL } from '@/app/utils/api';

interface Report {
  id: string;
  reporterId: string;
  reporterUsername: string;
  targetType: 'comment' | 'user' | 'article' | 'contribution';
  targetId: string;
  reason: string;
  details: string | null;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt: string | null;
  resolvedBy: string | null;
  resolutionNote: string | null;
}

export function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/reports`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (report: Report) => {
    try {
      const token = localStorage.getItem('authToken');
      const note = prompt('Note de résolution (optionnel):');
      
      const response = await fetch(`${API_BASE_URL}/reports/${report.id}/resolve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note })
      });

      if (response.ok) {
        await fetchReports();
      }
    } catch (error) {
      console.error('Error resolving report:', error);
    }
  };

  const handleDismiss = async (report: Report) => {
    try {
      const token = localStorage.getItem('authToken');
      const note = prompt('Note de rejet (optionnel):');
      
      const response = await fetch(`${API_BASE_URL}/reports/${report.id}/dismiss`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note })
      });

      if (response.ok) {
        await fetchReports();
      }
    } catch (error) {
      console.error('Error dismissing report:', error);
    }
  };

  const columns: Column<Report>[] = [
    { key: 'reporterUsername', label: 'Signalé par', sortable: true, render: (v) => <span className="text-[#F0F0F0] font-medium">{v}</span>, width: '15%' },
    { 
      key: 'targetType', 
      label: 'Cible', 
      sortable: true, 
      render: (v, row) => (
        <div>
          <span className="text-[#8B0000]">{row.targetId}</span>
          <span className="ml-2 px-2 py-1 text-xs font-mono uppercase border bg-[#8B0000]/20 border-[#8B0000]/40 text-[#8B0000]">{v}</span>
        </div>
      ), 
      width: '20%' 
    },
    { key: 'reason', label: 'Raison', sortable: false, render: (v) => <span className="text-[#808080] text-sm">{v}</span>, width: '25%' },
    { key: 'createdAt', label: 'Date', sortable: true, render: (v) => <span className="font-mono text-xs text-[#F0F0F0]">{new Date(v).toLocaleString('fr-FR')}</span>, width: '15%' },
    {
      key: 'status', label: 'Statut', sortable: true,
      render: (v) => {
        const config = { pending: { color: '#8B0000', label: 'En attente' }, resolved: { color: '#F0F0F0', label: 'Résolu' }, dismissed: { color: '#808080', label: 'Rejeté' } };
        const c = config[v as keyof typeof config];
        return <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${c.color}20`, borderColor: `${c.color}40`, color: c.color }}>{c.label}</span>;
      },
      width: '15%'
    }
  ];

  const actions: Action<Report>[] = [
    { icon: Eye, label: 'Examiner', onClick: (r) => alert(`Détails:\n\nSignalé par: ${r.reporterUsername}\nRaison: ${r.reason}\nDétails: ${r.details || 'Aucun'}`), variant: 'default' },
    { icon: CheckCircle, label: 'Résoudre', onClick: handleResolve, variant: 'default', show: (r) => r.status === 'pending' },
    { icon: XCircle, label: 'Rejeter', onClick: handleDismiss, variant: 'danger', show: (r) => r.status === 'pending' }
  ];

  const filteredReports = reports.filter(r => statusFilter === 'all' || r.status === statusFilter);

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
        <AdminHeader title="Signalements" breadcrumbs={[{ label: 'Modération' }, { label: 'Signalements' }]} />
        <main className="flex-1 p-6 space-y-6">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard icon={Shield} label="Total" value={reports.length} color="#8B0000" />
              <AdminStatsCard icon={AlertTriangle} label="En attente" value={reports.filter(r => r.status === 'pending').length} color="#8B0000" />
              <AdminStatsCard icon={CheckCircle} label="Résolus" value={reports.filter(r => r.status === 'resolved').length} color="#F0F0F0" />
              <AdminStatsCard icon={XCircle} label="Rejetés" value={reports.filter(r => r.status === 'dismissed').length} color="#808080" />
            </div>
          </section>
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none" />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer">
                <option value="all">Tous</option>
                <option value="pending">En attente</option>
                <option value="resolved">Résolus</option>
                <option value="dismissed">Rejetés</option>
              </select>
            </div>
          </section>
          <section>
            <AdminDataTable data={filteredReports} columns={columns} actions={actions} selectable={true} emptyMessage="Aucun signalement" />
          </section>
        </main>
      </div>
    </div>
  );
}