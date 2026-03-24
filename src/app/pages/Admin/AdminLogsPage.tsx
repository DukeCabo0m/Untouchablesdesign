import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { Button } from '@/app/components/Button';
import { Activity, AlertTriangle, Info, CheckCircle, XCircle, Search, Download } from 'lucide-react';
import { API_BASE_URL } from '@/app/utils/api';

interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  action: string;
  details: string;
  userId: string | null;
  username: string;
}

export function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/logs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelConfig = (level: string) => {
    const configs = {
      info: { color: '#F0F0F0', icon: Info, label: 'Info' },
      success: { color: '#F0F0F0', icon: CheckCircle, label: 'Success' },
      warning: { color: '#8B0000', icon: AlertTriangle, label: 'Warning' },
      error: { color: '#8B0000', icon: XCircle, label: 'Error' }
    };
    return configs[level as keyof typeof configs];
  };

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
        <AdminHeader title="Logs" breadcrumbs={[{ label: 'Système' }, { label: 'Logs' }]} />
        <main className="flex-1 p-6 space-y-6">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard icon={Activity} label="Total Logs" value={logs.length} color="#8B0000" />
              <AdminStatsCard icon={Info} label="Info" value={logs.filter(l => l.level === 'info').length} color="#F0F0F0" />
              <AdminStatsCard icon={AlertTriangle} label="Warnings" value={logs.filter(l => l.level === 'warning').length} color="#8B0000" />
              <AdminStatsCard icon={XCircle} label="Errors" value={logs.filter(l => l.level === 'error').length} color="#8B0000" />
            </div>
          </section>

          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <div className="flex gap-3 justify-between">
              <div className="flex gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher dans les logs..."
                    className="w-full pl-9 pr-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 focus:border-[#8B0000] text-[#F0F0F0] text-xs placeholder:text-[#808080] outline-none"
                  />
                </div>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1A1A1A] border border-[#8B0000]/30 text-[#F0F0F0] text-xs outline-none cursor-pointer"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <Button variant="secondary" size="sm">
                <Download size={16} />
                Exporter
              </Button>
            </div>
          </section>

          <section className="bg-[#0A0A0A] border border-[#8B0000]/30">
            <div className="divide-y divide-[#8B0000]/20">
              {filteredLogs.map((log) => {
                const config = getLevelConfig(log.level);
                const Icon = config.icon;
                return (
                  <div key={log.id} className="p-4 hover:bg-[#1A1A1A]/50">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 flex items-center justify-center border border-[#8B0000]/30" style={{ backgroundColor: `${config.color}10` }}>
                        <Icon size={16} style={{ color: config.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-1 text-xs font-mono uppercase border" style={{ backgroundColor: `${config.color}20`, borderColor: `${config.color}40`, color: config.color }}>
                            {config.label}
                          </span>
                          <span className="font-mono text-xs text-[#8B0000]">{log.action}</span>
                          <span className="font-mono text-xs text-[#808080]">{log.timestamp}</span>
                        </div>
                        <p className="text-[#F0F0F0] text-sm mb-1">{log.details}</p>
                        <p className="font-mono text-xs text-[#808080]">Par: {log.username}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}