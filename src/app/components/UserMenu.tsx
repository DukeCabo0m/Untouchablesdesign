import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Settings, Activity, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { COLORS } from '@/app/constants/colors';

interface UserMenuProps {
  scrolled: boolean;
}

export function UserMenu({ scrolled }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Bouton trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 transition-colors cursor-none group ${
          scrolled
            ? 'border border-[#E0E0E0]/50 bg-transparent hover:bg-[#E0E0E0]/10'
            : 'border border-[#E0E0E0]/30 bg-transparent hover:bg-[#E0E0E0]/10'
        }`}
      >
        {/* Avatar */}
        <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E0E0E0]/50">
          <img 
            src={user.avatar} 
            alt={user.username}
            className="w-full h-full object-cover grayscale"
          />
        </div>
        
        {/* Username */}
        <span className="font-mono text-xs uppercase tracking-wider text-[#E0E0E0]">
          {user.username}
        </span>
        
        {/* Chevron */}
        <ChevronDown 
          className={`w-4 h-4 text-[#E0E0E0] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-56 bg-[#0A0A0A] border-2 border-[#8B0000] shadow-lg shadow-black/50 z-50"
        >
          {/* Header avec info utilisateur */}
          <div className="p-4 border-b border-[#8B0000]/30">
            <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">Connecté en tant que</p>
            <p className="font-bold text-sm text-[#E0E0E0]">{user.username}</p>
            <p className="font-mono text-xs text-[#a8a8a8]">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[#E0E0E0] hover:bg-[#8B0000]/20 transition-colors cursor-none group"
            >
              <User size={16} className="text-[#8B0000]" />
              <span className="font-mono text-xs uppercase tracking-wider">Mon profil</span>
            </Link>

            <Link
              to="/profile/activity"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[#E0E0E0] hover:bg-[#8B0000]/20 transition-colors cursor-none group"
            >
              <Activity size={16} className="text-[#8B0000]" />
              <span className="font-mono text-xs uppercase tracking-wider">Activité</span>
            </Link>

            <Link
              to="/profile/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[#E0E0E0] hover:bg-[#8B0000]/20 transition-colors cursor-none group"
            >
              <Settings size={16} className="text-[#8B0000]" />
              <span className="font-mono text-xs uppercase tracking-wider">Paramètres</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-[#8B0000]/30">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#8B0000] hover:bg-[#8B0000]/20 transition-colors cursor-none group"
            >
              <LogOut size={16} className="text-[#8B0000]" />
              <span className="font-mono text-xs uppercase tracking-wider">Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
