import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[100] p-4 shadow-lg shadow-black/50 hover:bg-[#E0E0E0] transition-all duration-300 cursor-none group`}
      style={{ 
        backgroundColor: '#8B0000',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#E0E0E0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#8B0000';
      }}
      aria-label="Retour vers le haut"
    >
      <ArrowUp 
        className="w-6 h-6 text-[#E0E0E0] transition-colors" 
        style={{
          color: '#E0E0E0',
        }}
        onMouseEnter={(e) => (e.currentTarget as SVGElement).style.color = '#8B0000'}
        onMouseLeave={(e) => (e.currentTarget as SVGElement).style.color = '#E0E0E0'}
      />
    </button>
  );
}