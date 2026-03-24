import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { Database, Table, RefreshCw, Trash2, Download, AlertTriangle } from 'lucide-react';

export function AdminDatabasePage() {
  const tables = [
    { name: 'users', rows: 1247, size: '2.4 MB', lastUpdate: '2026-03-16 12:00' },
    { name: 'articles', rows: 456, size: '8.9 MB', lastUpdate: '2026-03-16 11:45' },
    { name: 'comments', rows: 5678, size: '4.2 MB', lastUpdate: '2026-03-16 12:20' },
    { name: 'concerts', rows: 234, size: '1.1 MB', lastUpdate: '2026-03-15 18:30' },
    { name: 'albums', rows: 89, size: '3.4 MB', lastUpdate: '2026-03-10 14:00' },
    { name: 'media', rows: 890, size: '124 MB', lastUpdate: '2026-03-16 10:15' }
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Base de données" breadcrumbs={[{ label: 'Système' }, { label: 'Base de données' }]} />
        <main className="flex-1 p-6 space-y-6">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard icon={Database} label="Tables" value={tables.length} color="#8B0000" />
              <AdminStatsCard icon={Table} label="Total Entrées" value="8,594" color="#F0F0F0" />
              <AdminStatsCard icon={Database} label="Taille DB" value="144.0 MB" color="#808080" />
              <AdminStatsCard icon={RefreshCw} label="Dernière MàJ" value="12:20" color="#F0F0F0" />
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-4">Actions rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="secondary" size="md">
                <RefreshCw size={16} />
                Optimiser la DB
              </Button>
              <Button variant="secondary" size="md">
                <Download size={16} />
                Exporter SQL
              </Button>
              <Button variant="secondary" size="md">
                <AlertTriangle size={16} />
                Réparer tables
              </Button>
            </div>
          </section>

          {/* Tables List */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30">
            <div className="p-6 border-b border-[#8B0000]/30">
              <h3 className="text-[#F0F0F0] font-bold text-sm uppercase flex items-center gap-2">
                <Table size={16} className="text-[#8B0000]" />
                Tables de la base de données
              </h3>
            </div>
            <div className="divide-y divide-[#8B0000]/20">
              {tables.map((table, index) => (
                <div key={index} className="p-6 hover:bg-[#1A1A1A]/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-[#F0F0F0] font-medium mb-2">{table.name}</h4>
                      <div className="flex items-center gap-6 text-xs">
                        <span className="font-mono text-[#808080]">
                          <span className="text-[#8B0000]">{table.rows.toLocaleString('fr-FR')}</span> lignes
                        </span>
                        <span className="font-mono text-[#808080]">
                          Taille: <span className="text-[#F0F0F0]">{table.size}</span>
                        </span>
                        <span className="font-mono text-[#808080]">
                          MàJ: {table.lastUpdate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#F0F0F0]">
                        <RefreshCw size={14} />
                      </button>
                      <button className="p-2 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#F0F0F0]">
                        <Download size={14} />
                      </button>
                      <button className="p-2 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#8B0000]">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
