import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Bell, 
  User, 
  ChevronRight,
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface AdminHeaderProps {
  breadcrumbs?: { label: string; path?: string }[];
  title: string;
}

export function AdminHeader({ breadcrumbs = [], title }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, type: 'warning', message: '5 nouveaux signalements', time: '5 min' },
    { id: 2, type: 'info', message: '23 nouveaux utilisateurs', time: '1h' },
    { id: 3, type: 'success', message: 'Backup complété', time: '3h' },
  ];

  return (
    <header className="bg-[#0A0A0A] border-b border-[#8B0000]/30 sticky top-0 z-40">
      <div className="px-6 py-4">
        {/* Top Row: Breadcrumbs & Actions */}
        <div className="flex items-center justify-between mb-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm">
            <Link 
              to="/admin" 
              className="text-xs text-[#808080] hover:text-[#F0F0F0]"
            >
              Admin
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight size={14} className="text-[#8B0000]" />
                {crumb.path ? (
                  <Link 
                    to={crumb.path}
                    className="text-xs text-[#808080] hover:text-[#F0F0F0]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs text-[#F0F0F0]">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 hover:bg-[#1A1A1A] relative"
              >
                <Bell size={18} className="text-[#F0F0F0]" />
                <span className="absolute -top-1 -right-1 bg-[#8B0000] text-[#F0F0F0] text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0A0A0A] border border-[#8B0000]/30 z-50">
                  <div className="p-4 border-b border-[#8B0000]/30">
                    <h3 className="text-xs text-[#F0F0F0] font-semibold">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className="p-4 border-b border-[#8B0000]/10 hover:bg-[#1A1A1A] cursor-pointer"
                      >
                        <p className="text-sm text-[#F0F0F0] mb-1">{notif.message}</p>
                        <span className="text-[10px] text-[#808080]">
                          Il y a {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[#8B0000]/30 text-center">
                    <button className="text-xs text-[#8B0000] hover:text-[#F0F0F0]">
                      Tout voir
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-2 px-3 hover:bg-[#1A1A1A]"
              >
                <div className="w-8 h-8 bg-[#8B0000] flex items-center justify-center">
                  <User size={16} className="text-[#F0F0F0]" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs text-[#F0F0F0] font-medium">Admin</p>
                  <p className="text-[10px] text-[#808080]">Super Admin</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-[#8B0000]/30 z-50">
                  <Link 
                    to="/admin/settings/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#1A1A1A] border-b border-[#8B0000]/10"
                  >
                    <User size={16} className="text-[#808080]" />
                    <span className="text-xs text-[#F0F0F0]">Profil</span>
                  </Link>
                  <Link 
                    to="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#1A1A1A] border-b border-[#8B0000]/10"
                  >
                    <Settings size={16} className="text-[#808080]" />
                    <span className="text-xs text-[#F0F0F0]">Paramètres</span>
                  </Link>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#8B0000]/20"
                  >
                    <LogOut size={16} className="text-[#8B0000]" />
                    <span className="text-xs text-[#8B0000]">Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Title & Search */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#F0F0F0]">
            {title}
          </h1>

          {/* Global Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="
                w-full pl-10 pr-4 py-2 
                bg-[#1A1A1A] 
                border border-[#8B0000]/30 
                focus:border-[#8B0000] 
                text-[#F0F0F0] 
                text-xs 
                placeholder:text-[#808080]
                outline-none
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
}