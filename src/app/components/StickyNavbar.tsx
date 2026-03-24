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
  { label: 'ACTUALITÉS', href: '/news' },
  { label: 'TOURNÉE', href: '/tour' },
  { label: 'LE GROUPE', href: '/band' },
  { label: 'DISCOGRAPHIE', href: '/discography' },
  { label: 'FANZINE', href: '/fanzine' },
  { label: 'CONTACT', href: '/contact' },
];

const authButtons = [
  { label: 'INSCRIPTION', href: '/signup', icon: UserPlus },
  { label: 'CONNEXION', href: '/login', icon: LogIn },
];

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300`}
      >
        {/* Background - NO TEXTURES */}
        {scrolled && (
          <div className="absolute inset-0 z-0">
            {/* Base color only */}
            <div className="absolute inset-0" style={{ backgroundColor: COLORS.red.pure }} />
          </div>
        )}

        {/* Content - ABOVE textures */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 relative z-10">
          <div className="flex items-center justify-between gap-4 md:gap-8 lg:gap-12 font-mono font-bold">
            {/* Logo */}
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
            >
              <LogoText className="h-5 md:h-6 max-w-[100px] md:max-w-[120px]" />
            </Link>

            {/* Desktop Menu items */}
            <ul className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1">
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

            {/* Desktop Auth buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {user ? (
                <>
                  <NotificationBell />
                  <UserMenu scrolled={scrolled} />
                </>
              ) : (
                <>
                  <Button
                    as="a"
                    variant="primary"
                    size="sm"
                    href="/signup"
                    className="hidden lg:flex"
                  >
                    <UserPlus className="w-4 h-4" />
                    INSCRIPTION
                  </Button>
                  <Button
                    as="a"
                    variant="secondary"
                    size="sm"
                    href="/login"
                    className="hidden lg:flex"
                  >
                    <LogIn className="w-4 h-4" />
                    CONNEXION
                  </Button>
                  {/* Mobile auth icons only */}
                  <Link to="/signup" className="lg:hidden p-2">
                    <UserPlus className={`w-5 h-5 ${scrolled ? 'text-[#F0F0F0]' : 'text-[#8B0000]'}`} />
                  </Link>
                  <Link to="/login" className="lg:hidden p-2">
                    <LogIn className={`w-5 h-5 ${scrolled ? 'text-[#F0F0F0]' : 'text-[#8B0000]'}`} />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile/Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-[#F0F0F0]' : 'text-[#8B0000]'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-[#F0F0F0]' : 'text-[#8B0000]'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Shadow gradient when not scrolled */}
        {!scrolled && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent pointer-events-none -z-10" />
        )}
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[199] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col pt-24 px-4 md:px-6">
            {/* Navigation Links */}
            <ul className="flex-1 space-y-1">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`block px-6 py-4 text-base md:text-lg font-bold uppercase tracking-wider border-l-4 transition-all ${
                      location.pathname === item.href
                        ? 'border-[#8B0000] bg-[#8B0000]/10 text-[#8B0000]'
                        : 'border-transparent text-[#E0E0E0] hover:border-[#8B0000] hover:bg-[#8B0000]/5'
                    }`}
                  >
                    {location.pathname === item.href && <span className="mr-2">&gt;&gt;</span>}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons (if not logged in) */}
            {!user && (
              <div className="border-t border-[#E0E0E0]/20 pt-6 pb-8 space-y-3">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 w-full bg-[#8B0000] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] font-bold text-sm uppercase tracking-wider px-6 py-4 transition-all duration-300 border-2 border-[#8B0000] hover:border-[#FFFFFF]"
                >
                  <UserPlus className="w-4 h-4" />
                  INSCRIPTION
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-bold text-sm uppercase tracking-wider px-6 py-4 transition-all duration-300 border-2 border-[#8B0000]"
                >
                  <LogIn className="w-4 h-4" />
                  CONNEXION
                </Link>
              </div>
            )}

            {/* Mobile User Info (if logged in) */}
            {user && (
              <div className="border-t border-[#E0E0E0]/20 pt-6 pb-8">
                <div className="flex items-center gap-4 px-6">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                    alt={user.username}
                    className="w-12 h-12 rounded-full border-2 border-[#8B0000]"
                  />
                  <div>
                    <div className="text-[#F0F0F0] font-bold">{user.username}</div>
                    <Link
                      to="/profile"
                      className="text-[#8B0000] text-sm hover:underline"
                    >
                      Voir mon profil
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}