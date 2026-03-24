import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image, 
  Shield,
  Settings,
  BarChart3,
  Music,
  Calendar,
  MessageSquare,
  Bell,
  Database,
  Globe,
  Lock,
  Activity,
  Archive,
  ChevronRight,
  Folder
} from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { GlitchText } from '@/app/components/GlitchText';

interface NavItem {
  icon: any;
  label: string;
  path: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Principal',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
      { icon: FileText, label: 'Articles', path: '/admin/articles' },
      { icon: Music, label: 'Discographie', path: '/admin/discography' },
      { icon: Calendar, label: 'Concerts', path: '/admin/concerts' },
      { icon: Image, label: 'Médias', path: '/admin/media' },
    ],
  },
  {
    title: 'Modération',
    items: [
      { icon: MessageSquare, label: 'Commentaires', path: '/admin/comments', badge: 12 },
      { icon: Shield, label: 'Signalements', path: '/admin/reports', badge: 5 },
      { icon: Lock, label: 'Bannissements', path: '/admin/bans' },
    ],
  },
  {
    title: 'Système',
    items: [
      { icon: Settings, label: 'Configuration', path: '/admin/settings' },
      { icon: Database, label: 'Base de données', path: '/admin/database' },
      { icon: Activity, label: 'Logs', path: '/admin/logs' },
      { icon: Archive, label: 'Sauvegardes', path: '/admin/backups' },
    ],
  },
];

export function AdminSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-[#8B0000]/30 h-screen sticky top-0 overflow-y-auto">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#8B0000]/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#8B0000] flex items-center justify-center">
            <Shield size={24} className="text-[#F0F0F0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#F0F0F0]">
              cPanel
            </h1>
            <p className="text-[10px] text-[#808080] uppercase tracking-wide">
              Untouchables Admin
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h2 className="text-[10px] text-[#8B0000] uppercase tracking-widest mb-3 px-3 font-semibold">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <li key={itemIndex}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center justify-between px-3 py-2.5
                        ${active 
                          ? 'bg-[#8B0000] text-[#F0F0F0]' 
                          : 'text-[#808080] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-xs font-medium">
                          {item.label}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="bg-[#F0F0F0] text-[#0A0A0A] px-2 py-0.5 text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                      {active && <ChevronRight size={14} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-[#8B0000]/30 mt-auto">
        <div className="bg-[#1A1A1A] p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#F0F0F0]" />
            <span className="text-[10px] text-[#F0F0F0] font-semibold uppercase">Système</span>
          </div>
          <div className="text-xs text-[#808080]">
            Uptime: 99.9%
          </div>
        </div>
        
        {/* Back to Site */}
        <Link 
          to="/"
          className="flex items-center gap-2 px-3 py-2.5 bg-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-[#F0F0F0] border border-[#8B0000]/50"
        >
          <Globe size={16} />
          <span className="text-xs font-medium">Retour au site</span>
        </Link>
      </div>
    </aside>
  );
}