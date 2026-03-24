import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { Archive, Download, Trash2, RefreshCw, Plus, HardDrive, CheckCircle, Clock } from 'lucide-react';

export function AdminBackupsPage() {
  const backups = [
    { id: 1, name: 'backup-2026-03-16-12-00.sql.gz', date: '2026-03-16 12:00:00', size: '24.5 MB', type: 'auto', status: 'success' },
    { id: 2, name: 'backup-2026-03-16-00-00.sql.gz', date: '2026-03-16 00:00:00', size: '24.3 MB', type: 'auto', status: 'success' },
    { id: 3, name: 'backup-2026-03-15-18-30.sql.gz', date: '2026-03-15 18:30:00', size: '12.1 MB', type: 'manual', status: 'success' },
    { id: 4, name: 'backup-2026-03-15-00-00.sql.gz', date: '2026-03-15 00:00:00', size: '24.1 MB', type: 'auto', status: 'success' },
    { id: 5, name: 'backup-2026-03-14-00-00.sql.gz', date: '2026-03-14 00:00:00', size: '23.8 MB', type: 'auto', status: 'success' },
    { id: 6, name: 'backup-2026-03-13-00-00.sql.gz', date: '2026-03-13 00:00:00', size: '23.5 MB', type: 'auto', status: 'success' }
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Sauvegardes" breadcrumbs={[{ label: 'Système' }, { label: 'Sauvegardes' }]} />
        <main className="flex-1 p-6 space-y-6">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard icon={Archive} label="Total Backups" value={backups.length} color="#8B0000" />
              <AdminStatsCard icon={HardDrive} label="Espace utilisé" value="146.3 MB" color="#F0F0F0" />
              <AdminStatsCard icon={CheckCircle} label="Dernière sauvegarde" value="12:00" color="#F0F0F0" />
              <AdminStatsCard icon={Clock} label="Prochaine auto" value="00:00" color="#808080" />
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-4">Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="primary" size="md">
                <Plus size={16} />
                Créer une sauvegarde maintenant
              </Button>
              <Button variant="secondary" size="md">
                <RefreshCw size={16} />
                Configurer les sauvegardes auto
              </Button>
            </div>
          </section>

          {/* Backups List */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30">
            <div className="p-6 border-b border-[#8B0000]/30">
              <h3 className="text-[#F0F0F0] font-bold text-sm uppercase flex items-center gap-2">
                <Archive size={16} className="text-[#8B0000]" />
                Sauvegardes disponibles
              </h3>
            </div>
            <div className="divide-y divide-[#8B0000]/20">
              {backups.map((backup) => (
                <div key={backup.id} className="p-6 hover:bg-[#1A1A1A]/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#8B0000]/20 border border-[#8B0000]/50 flex items-center justify-center">
                        <Archive size={24} className="text-[#8B0000]" />
                      </div>
                      <div>
                        <h4 className="text-[#F0F0F0] font-medium mb-1">{backup.name}</h4>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-mono text-[#808080]">
                            {backup.date}
                          </span>
                          <span className="font-mono text-[#8B0000]">
                            {backup.size}
                          </span>
                          <span className="px-2 py-1 text-xs font-mono uppercase border bg-[#F0F0F0]/10 border-[#F0F0F0]/30 text-[#F0F0F0]">
                            {backup.type === 'auto' ? 'Automatique' : 'Manuel'}
                          </span>
                          <span className="flex items-center gap-1 text-[#F0F0F0]">
                            <CheckCircle size={12} className="text-[#F0F0F0]" />
                            Succès
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-3 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#F0F0F0]">
                        <Download size={16} />
                      </button>
                      <button className="p-3 border border-[#8B0000]/30 hover:bg-[#8B0000]/10 text-[#8B0000]">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Backup Settings Info */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-4">Configuration</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between p-3 bg-[#1A1A1A] border border-[#8B0000]/20">
                <span className="text-[#808080]">Fréquence automatique:</span>
                <span className="text-[#F0F0F0]">Quotidienne (00:00)</span>
              </div>
              <div className="flex justify-between p-3 bg-[#1A1A1A] border border-[#8B0000]/20">
                <span className="text-[#808080]">Rétention:</span>
                <span className="text-[#F0F0F0]">30 jours</span>
              </div>
              <div className="flex justify-between p-3 bg-[#1A1A1A] border border-[#8B0000]/20">
                <span className="text-[#808080]">Compression:</span>
                <span className="text-[#F0F0F0]">GZIP</span>
              </div>
              <div className="flex justify-between p-3 bg-[#1A1A1A] border border-[#8B0000]/20">
                <span className="text-[#808080]">Emplacement:</span>
                <span className="text-[#8B0000]">/backups/</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
