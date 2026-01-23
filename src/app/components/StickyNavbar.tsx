import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlitchText } from './GlitchText';
import { GlitchImage } from './GlitchImage';
import { UserPlus, LogIn } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import logoSvg from '@/imports/svg-1f0qy1uyg3';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 cursor-none ${ 
        scrolled
          ? 'border-b border-[#0A0A0A] shadow-lg shadow-black/50'
          : ''
      }`}
    >
      {/* Background - NO TEXTURES */}
      {scrolled && (
        <div className="absolute inset-0 z-0">
          {/* Base color only */}
          <div className="absolute inset-0" style={{ backgroundColor: COLORS.red.pure }} />
        </div>
      )}

      {/* Content - ABOVE textures */}
      <div className="max-w-7xl mx-auto px-0 py-6 relative z-10">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity cursor-none"
          >
            <GlitchImage 
              src="https://www.untouchables.fr/img/untouchables-white.svg" 
              alt="UNTOUCHABLES"
              className="h-6 w-auto max-w-[120px]"
            />
          </Link>

          {/* Menu items */}
          <ul className="flex items-center gap-6 flex-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`font-mono text-xs font-bold uppercase transition-colors cursor-none tracking-wider ${
                    location.pathname === item.href
                      ? `bg-white px-2 py-1`
                      : scrolled
                        ? 'text-[#B0B0B0] hover:text-white'
                        : 'text-[#E0E0E0]'
                  }`}
                  style={
                    location.pathname === item.href
                      ? { color: COLORS.red.pure, textShadow: `0 0 10px rgba(139, 0, 0, 0.8)` }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.href && !scrolled) {
                      e.currentTarget.style.color = COLORS.red.pure;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.href && !scrolled) {
                      e.currentTarget.style.color = '#E0E0E0';
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {authButtons.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                to={href}
                className={`flex items-center gap-2 px-4 py-2 transition-colors cursor-none group ${
                  label === 'INSCRIPTION'
                    ? scrolled
                      ? 'border border-[#0A0A0A] bg-white hover:bg-[#E0E0E0]'
                      : `border bg-opacity-20`
                    : scrolled
                      ? 'border border-[#E0E0E0]/50 bg-transparent hover:bg-[#E0E0E0]/10'
                      : 'border border-[#E0E0E0]/30 bg-transparent hover:bg-[#E0E0E0]/10'
                }`}
                style={
                  label === 'INSCRIPTION' && !scrolled
                    ? { borderColor: COLORS.red.pure, backgroundColor: `${COLORS.red.pure}33` }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (label === 'INSCRIPTION' && !scrolled) {
                    e.currentTarget.style.backgroundColor = `${COLORS.red.pure}4D`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (label === 'INSCRIPTION' && !scrolled) {
                    e.currentTarget.style.backgroundColor = `${COLORS.red.pure}33`;
                  }
                }}
              >
                <Icon 
                  className={`w-4 h-4 transition-colors ${
                    label === 'INSCRIPTION'
                      ? scrolled
                        ? 'text-[#0A0A0A]'
                        : 'group-hover:text-[#E0E0E0]'
                      : 'text-[#E0E0E0] group-hover:text-white'
                  }`}
                  style={
                    label === 'INSCRIPTION' && !scrolled
                      ? { color: COLORS.red.pure }
                      : undefined
                  }
                />
                <span className={`font-mono text-xs uppercase tracking-wider ${
                  label === 'INSCRIPTION' && scrolled
                    ? 'text-[#0A0A0A]'
                    : 'text-[#E0E0E0]'
                }`}>
                  {label}
                </span>
              </Link>
            ))}
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