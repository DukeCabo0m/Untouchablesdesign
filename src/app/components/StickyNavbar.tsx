import { UserMenu } from '@/app/components/UserMenu';
import { Button } from '@/app/components/Button';
import { HandDrawnLine } from './HandDrawnLine';
import { HandDrawnCircle } from './HandDrawnCircle';
import { NotificationBell } from './NotificationBell';
import { UserPlus, LogIn, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Link, useLocation } from 'react-router';
import { LogoText } from './LogoText';

const COLORS = {
  red: {
    pure: '#8B0000',
  },
};

const menuItems = [
  { label: 'ACCUEIL', href: '/' },
  { label: 'LE GROUPE', href: '/band' },
  { label: 'DISCOGRAPHIE', href: '/discography' },
  { label: 'ACTUALITÉS', href: '/news' },
  { label: 'TOURNÉE', href: '/tour' },
  { label: 'CONTACT', href: '/contact' },
];

const authButtons = [
  { label: 'INSCRIPTION', href: '/signup', icon: UserPlus },
  { label: 'CONNEXION', href: '/login', icon: LogIn },
];

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 cursor-none`}
    >
      {/* Background - NO TEXTURES */}
      {scrolled && (
        <div className="absolute inset-0 z-0">
          {/* Base color only */}
          <div className="absolute inset-0" style={{ backgroundColor: COLORS.red.pure }} />
        </div>
      )}

      {/* Content - ABOVE textures */}
      <div className="max-w-[1920px] mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center gap-12 font-mono font-bold navbar-text-lg">
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LogoText className="h-6 max-w-[120px]" />
          </Link>

          {/* Menu items */}
          <ul className="flex items-center gap-6 flex-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                {location.pathname === item.href ? (
                  <Link
                    to={item.href}
                    className="text-xs font-bold uppercase cursor-pointer tracking-wider flex items-center gap-2"
                    style={{
                      color: scrolled ? '#F0F0F0' : COLORS.red.pure,
                    }}
                  >
                    <span style={{ color: '#F0F0F0' }}>&gt;&gt;</span>
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-xs font-bold uppercase transition-colors cursor-pointer tracking-wider ${
                      scrolled ? 'text-[#B0B0B0] hover:text-white' : 'text-[#E0E0E0]'
                    }`}
                    onMouseEnter={(e) => {
                      if (!scrolled) {
                        e.currentTarget.style.color = COLORS.red.pure;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!scrolled) {
                        e.currentTarget.style.color = '#E0E0E0';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <NotificationBell />
                <UserMenu scrolled={scrolled} />
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  href="/signup"
                >
                  <UserPlus className="w-4 h-4" />
                  INSCRIPTION
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  href="/login"
                >
                  <LogIn className="w-4 h-4" />
                  CONNEXION
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Shadow gradient when not scrolled */}
      {!scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent pointer-events-none -z-10" />
      )}
    </nav>
  );
}