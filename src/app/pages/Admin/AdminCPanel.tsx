import { useState } from 'react';
import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
import { AdminHeader } from '@/app/components/Admin/AdminHeader';
import { AdminStatsCard } from '@/app/components/Admin/AdminStatsCard';
import { AdminChart } from '@/app/components/Admin/AdminChart';
import { AdminDataTable, Column, Action } from '@/app/components/Admin/AdminDataTable';
import { Button } from '@/app/components/Button';
import {
  Users,
  FileText,
  Calendar,
  Music,
  TrendingUp,
  Activity,
  MessageSquare,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Plus,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

// Mock Data
const statsData = {
  totalUsers: 1247,
  newUsersToday: 23,
  totalArticles: 156,
  totalConcerts: 89,
  activeUsers: 342,
  pendingModeration: 17,
  monthlyGrowth: 12.5,
  avgSessionTime: '8m 42s'
};

const chartData = {
  userGrowth: [
    { name: 'Jan', users: 850, articles: 120 },
    { name: 'Fév', users: 920, articles: 128 },
    { name: 'Mar', users: 1010, articles: 135 },
    { name: 'Avr', users: 1050, articles: 142 },
    { name: 'Mai', users: 1120, articles: 148 },
    { name: 'Jun', users: 1247, articles: 156 },
  ],
  contentDistribution: [
    { name: 'Articles', value: 156 },
    { name: 'Albums', value: 89 },
    { name: 'Concerts', value: 234 },
    { name: 'Médias', value: 1024 },
  ],
  activity: [
    { name: 'Lun', visites: 420, interactions: 180 },
    { name: 'Mar', visites: 510, interactions: 220 },
    { name: 'Mer', visites: 680, interactions: 340 },
    { name: 'Jeu', visites: 590, interactions: 280 },
    { name: 'Ven', visites: 720, interactions: 390 },
    { name: 'Sam', visites: 850, interactions: 450 },
    { name: 'Dim', visites: 640, interactions: 310 },
  ],
};

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'create' | 'edit' | 'delete' | 'comment' | 'report';
}

const recentActivities: RecentActivity[] = [
  { id: 1, user: 'DarkFreak666', action: 'Nouveau commentaire', target: 'Follow the Leader Review', time: 'Il y a 5 min', type: 'comment' },
  { id: 2, user: 'KornFan89', action: 'Article publié', target: 'Top 10 Korn Riffs', time: 'Il y a 12 min', type: 'create' },
  { id: 3, user: 'MetalHead', action: 'Signalement', target: 'Commentaire spam', time: 'Il y a 23 min', type: 'report' },
  { id: 4, user: 'Untouchable23', action: 'Édition', target: 'Setlist Paris 2024', time: 'Il y a 1h', type: 'edit' },
  { id: 5, user: 'NuMetalKing', action: 'Album ajouté', target: 'The Nothing', time: 'Il y a 2h', type: 'create' },
];

export function AdminCPanel() {
  const [selectedActivity, setSelectedActivity] = useState<RecentActivity | null>(null);

  const activityColumns: Column<RecentActivity>[] = [
    {
      key: 'user',
      label: 'Utilisateur',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-[#F0F0F0]">{value}</span>
      ),
      width: '20%'
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      render: (value, row) => {
        const typeColors = {
          create: '#F0F0F0',
          edit: '#808080',
          delete: '#8B0000',
          comment: '#808080',
          report: '#8B0000'
        };
        const color = typeColors[row.type];
        return (
          <span 
            className="px-2 py-1 text-xs uppercase font-mono border"
            style={{ 
              backgroundColor: `${color}20`,
              borderColor: `${color}40`,
              color 
            }}
          >
            {value}
          </span>
        );
      },
      width: '20%'
    },
    {
      key: 'target',
      label: 'Cible',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-[#808080]">{value}</span>
      ),
      width: '40%'
    },
    {
      key: 'time',
      label: 'Heure',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-xs text-[#808080]">{value}</span>
      ),
      width: '20%'
    },
  ];

  const activityActions: Action<RecentActivity>[] = [
    {
      icon: Eye,
      label: 'Voir',
      onClick: (activity) => setSelectedActivity(activity),
      variant: 'default'
    },
    {
      icon: Edit,
      label: 'Éditer',
      onClick: (activity) => console.log('Edit', activity),
      variant: 'default'
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Dashboard" 
          breadcrumbs={[{ label: 'Tableau de bord' }]}
        />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatsCard
                icon={Users}
                label="Total Utilisateurs"
                value={statsData.totalUsers}
                color="#8B0000"
                trend={{
                  value: statsData.monthlyGrowth,
                  isPositive: true,
                  label: 'vs mois dernier'
                }}
              />
              <AdminStatsCard
                icon={FileText}
                label="Articles"
                value={statsData.totalArticles}
                color="#F0F0F0"
              />
              <AdminStatsCard
                icon={Calendar}
                label="Concerts"
                value={statsData.totalConcerts}
                color="#808080"
              />
              <AdminStatsCard
                icon={Shield}
                label="Modération"
                value={statsData.pendingModeration}
                color="#8B0000"
                trend={{
                  value: 5,
                  isPositive: false,
                  label: 'En attente'
                }}
              />
            </div>
          </section>

          {/* Charts Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <h3 className="text-sm text-[#F0F0F0] font-semibold uppercase tracking-wide mb-4 pb-4 border-b border-[#8B0000]/30">
                Croissance Utilisateurs (6 derniers mois)
              </h3>
              <AdminChart
                data={chartData.userGrowth}
                dataKey="users"
                color="#8B0000"
                height={300}
              />
            </div>

            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <h3 className="text-sm text-[#F0F0F0] font-semibold uppercase tracking-wide mb-4 pb-4 border-b border-[#8B0000]/30">
                Actions Rapides
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="primary" size="sm">
                  <Plus size={16} />
                  Nouvel Article
                </Button>
                <Button variant="secondary" size="sm">
                  <Calendar size={16} />
                  Ajouter Concert
                </Button>
                <Button variant="secondary" size="sm">
                  <Music size={16} />
                  Ajouter Album
                </Button>
                <Button variant="secondary" size="sm">
                  <Shield size={16} />
                  Modération
                </Button>
                <Button variant="secondary" size="sm">
                  <Download size={16} />
                  Export Données
                </Button>
                <Button variant="secondary" size="sm">
                  <RefreshCw size={16} />
                  Rafraîchir Cache
                </Button>
              </div>
            </div>
          </section>

          {/* Activity Chart */}
          <section className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
            <h3 className="text-sm text-[#F0F0F0] font-semibold uppercase tracking-wide mb-4 pb-4 border-b border-[#8B0000]/30">
              Activité de la semaine
            </h3>
            <AdminChart
              data={chartData.activity}
              dataKey="visites"
              color="#F0F0F0"
              height={250}
            />
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-bold text-[#F0F0F0] mb-4 uppercase tracking-wide">
              Activité Récente
            </h2>
            <AdminDataTable
              data={recentActivities}
              columns={activityColumns}
              actions={activityActions}
              emptyMessage="Aucune activité récente"
            />
          </section>

          {/* System Info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#F0F0F0]" />
                <h3 className="text-sm text-[#F0F0F0] font-semibold uppercase">Base de données</h3>
              </div>
              <p className="text-xs text-[#808080]">
                Status: Opérationnelle<br />
                Taille: 2.4 GB<br />
                Dernière backup: Il y a 2h
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#F0F0F0]" />
                <h3 className="text-sm text-[#F0F0F0] font-semibold uppercase">API</h3>
              </div>
              <p className="text-xs text-[#808080]">
                Status: En ligne<br />
                Requêtes/min: 1,247<br />
                Temps de réponse: 45ms
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#F0F0F0]" />
                <h3 className="text-sm text-[#F0F0F0] font-semibold uppercase">Stockage</h3>
              </div>
              <p className="text-xs text-[#808080]">
                Utilisé: 12.8 GB / 50 GB<br />
                Images: 8.2 GB<br />
                Disponible: 37.2 GB
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}