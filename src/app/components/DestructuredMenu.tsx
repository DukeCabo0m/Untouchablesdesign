import { useState } from 'react';
import { GlitchText } from './GlitchText';
import { Link } from 'react-router';
import { COLORS } from '@/app/constants/colors';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { label: 'ACCUEIL', href: '/' },
  { label: 'LE GROUPE', href: '/band' },
  { label: 'DISCOGRAPHIE', href: '/discography' },
  { label: 'ACTUALITÉS', href: '/news' },
  { label: 'TOURNÉE', href: '/tour' },
  { label: 'CONTACT', href: '/contact' },
  { label: 'INSCRIPTION', href: '/signup' },
  { label: 'CONNEXION', href: '/login' },
  { label: 'À PROPOS', href: '/about' },
];

export function DestructuredMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-[100] text-[#FFFFFF] transition-colors"
        style={{ 
          color: '#FFFFFF',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red.pure}
        onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
        aria-label="Menu"
      >
        <Menu size={32} strokeWidth={1.5} />
      </button>

      {/* Full screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0A] z-[999] flex items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-[#FFFFFF] transition-colors"
              style={{ 
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red.pure}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
            >
              <X size={48} strokeWidth={1.5} />
            </button>

            <nav className="space-y-12">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-6xl font-black text-[#FFFFFF] transition-colors tracking-tighter uppercase"
                    style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLORS.red.pure}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  >
                    <GlitchText glitchIntensity="high">{item.label}</GlitchText>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: COLORS.red.pure }} />
            <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ backgroundColor: COLORS.red.pure }} />
            <div className="absolute top-0 left-0 w-[2px] h-full" style={{ backgroundColor: COLORS.red.pure }} />
            <div className="absolute top-0 right-0 w-[2px] h-full" style={{ backgroundColor: COLORS.red.pure }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}