import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { AdminChart } from '@/app/components/Admin/AdminChart';
import { 
  Eye, 
  Users, 
  TrendingUp, 
  Clock,
  Globe,
  Monitor,
  Smartphone,
  BarChart3
} from 'lucide-react';

const visitorData = [
  { date: '10 Mars', visits: 1250 },
  { date: '11 Mars', visits: 1580 },
  { date: '12 Mars', visits: 1320 },
  { date: '13 Mars', visits: 1890 },
  { date: '14 Mars', visits: 2100 },
  { date: '15 Mars', visits: 1760 },
  { date: '16 Mars', visits: 2340 }
];

const pageViewsData = [
  { date: '10 Mars', views: 4250 },
  { date: '11 Mars', views: 5180 },
  { date: '12 Mars', views: 4820 },
  { date: '13 Mars', views: 6290 },
  { date: '14 Mars', views: 7100 },
  { date: '15 Mars', views: 6260 },
  { date: '16 Mars', views: 8140 }
];

const topPages = [
  { page: '/discography', views: 12450, bounce: '24%' },
  { page: '/news', views: 8920, bounce: '18%' },
  { page: '/tour', views: 7340, bounce: '32%' },
  { page: '/band/members', views: 6180, bounce: '28%' },
  { page: '/fanzine', views: 4560, bounce: '15%' }
];

const trafficSources = [
  { source: 'Direct', visitors: 3420, percentage: 42 },
  { source: 'Google', visitors: 2180, percentage: 27 },
  { source: 'Social Media', visitors: 1650, percentage: 20 },
  { source: 'Referral', visitors: 890, percentage: 11 }
];

export function AdminAnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Analytics"
          breadcrumbs={[{ label: 'Principal' }, { label: 'Analytics' }]}
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Overview */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard
                icon={Eye}
                label="Pages vues (7j)"
                value={41040}
                color="#8B0000"
              />
              <AdminStatsCard
                icon={Users}
                label="Visiteurs uniques"
                value={12940}
                color="#F0F0F0"
              />
              <AdminStatsCard
                icon={Clock}
                label="Durée moy. session"
                value="4:32"
                color="#808080"
              />
              <AdminStatsCard
                icon={TrendingUp}
                label="Taux de rebond"
                value="23%"
                color="#F0F0F0"
              />
            </div>
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#8B0000]" />
                Visiteurs uniques (7 derniers jours)
              </h3>
              <AdminChart data={visitorData} dataKey="visits" color="#8B0000" />
            </div>

            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#8B0000]" />
                Pages vues (7 derniers jours)
              </h3>
              <AdminChart data={pageViewsData} dataKey="views" color="#F0F0F0" />
            </div>
          </section>

          {/* Top Pages */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6">
              Pages les plus visitées
            </h3>
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#8B0000]/20"
                >
                  <div className="flex-1">
                    <p className="font-mono text-xs text-[#8B0000] mb-1">#{index + 1}</p>
                    <p className="text-[#F0F0F0] font-medium">{page.page}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="font-mono text-xs text-[#808080] uppercase">Vues</p>
                      <p className="font-mono text-lg text-[#F0F0F0] font-bold">{page.views.toLocaleString('fr-FR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-[#808080] uppercase">Rebond</p>
                      <p className="font-mono text-lg text-[#8B0000] font-bold">{page.bounce}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Traffic Sources & Device Stats */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6 flex items-center gap-2">
                <Globe size={16} className="text-[#8B0000]" />
                Sources de trafic
              </h3>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#F0F0F0] text-sm">{source.source}</span>
                      <span className="font-mono text-xs text-[#8B0000]">
                        {source.visitors.toLocaleString('fr-FR')} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#1A1A1A] border border-[#8B0000]/30">
                      <div 
                        className="h-full bg-[#8B0000]"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Stats */}
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <h3 className="text-[#F0F0F0] font-bold text-sm uppercase mb-6">
                Répartition par appareil
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#8B0000]/20">
                  <div className="flex items-center gap-3">
                    <Monitor size={24} className="text-[#8B0000]" />
                    <span className="text-[#F0F0F0] font-medium">Desktop</span>
                  </div>
                  <span className="font-mono text-2xl text-[#F0F0F0] font-bold">64%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#8B0000]/20">
                  <div className="flex items-center gap-3">
                    <Smartphone size={24} className="text-[#F0F0F0]" />
                    <span className="text-[#F0F0F0] font-medium">Mobile</span>
                  </div>
                  <span className="font-mono text-2xl text-[#808080] font-bold">36%</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}